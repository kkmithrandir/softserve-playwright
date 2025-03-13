import { Page, Locator, expect } from '@playwright/test';
import { HomePage } from './HomePage';

export class CareersPage extends HomePage {
  readonly careersPointer: Locator;
  readonly careersPolicy: Locator;
  readonly careersPolicyAccept: Locator;
  readonly careersHeadingSubText: Locator;
  readonly careersSearch: Locator;
  readonly careersJobCount: Locator;

  constructor(page: Page) {
    super(page);
    this.careersPointer         = page.locator('h1 > span.heading-text');
    this.careersPolicy          = page.locator('.cky-consent-bar');
    this.careersPolicyAccept    = page.getByRole('button', { name: 'Accept All' });
    this.careersHeadingSubText  = page.getByText('Find your perfect IT job at');
    this.careersSearch          = page.locator('div.search > input');
    this.careersJobCount        = page.locator('div.vacancies > span');
  }

  async navigateToCareersPage(): Promise<Page> {
    try {
      try {
        await this.careersButton.waitFor({ state: 'visible', timeout: 10000 });
      } catch (error) {
        console.log('Refreshing page to bypass security...');
        await this.page.reload();
        await this.page.waitForLoadState('networkidle');
        await this.careersButton.waitFor({ state: 'visible', timeout: 10000 });
      }
      // Click the careers button and wait for the new tab to open
      const [newTab] = await Promise.all([
        this.page.context().waitForEvent('page'),
        this.careersButton.click({ timeout: 15000 })
      ]);
      await newTab.waitForLoadState('networkidle');
      console.log(`Opened new page: ${await newTab.title()}`);

      // Verify the new tab URL
      const url = new URL(newTab.url());
      expect(url.hostname).toBe('career.softserveinc.com');

      // Handle the privacy policy modal if it appears
      await this.handlePrivacyPolicy(newTab);
      
      return newTab;
    } catch (error) {
      console.error('Error navigating to careers page:', error);
      throw error;
    }
  }

  private async handlePrivacyPolicy(page: Page): Promise<void> {
    try {
      const policy = page.locator('.cky-consent-bar');
      const policyAccept = page.getByRole('button', { name: 'Accept All' });
      await policy.waitFor({ state: 'visible', timeout: 5000 });
      await policyAccept.click();
      console.log('Accepted privacy policy');
    } catch (error) {
      console.log('Privacy policy modal did not appear, continuing regardless');
    }
  }
  
  static async createFromNewTab(newTab: Page): Promise<CareersPage> {
    console.log('Creating CareersPage from new tab');
    const careersPage = new CareersPage(newTab);
    await newTab.waitForLoadState('domcontentloaded');
    await expect(careersPage.careersPointer).toBeVisible();
    return careersPage;
  }
}
