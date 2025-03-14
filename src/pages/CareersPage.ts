import { Page, Locator, expect, test } from '@playwright/test';
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
    const context = this.page.context();
    const newPagePromise = context.waitForEvent('page');
    this.careersButton.click({ timeout: 2000 })
    const newPage = await newPagePromise;  
    let url = newPage.url();
    
    // Retry reload if URL still indicates a failed navigation
    if (test.info().project.name === 'chromium') {
         // Wait for the new page to finish loading
        await newPage.waitForLoadState('networkidle');
        newPage.url();
        let attempts = 0;
        while (url.includes("chromewebdata") && attempts < 3) {
        await newPage.reload();
        await newPage.waitForLoadState('networkidle');
        url = newPage.url();
        attempts++;
        }
    }
  
    const hostname = new URL(url).hostname;
    expect(hostname).toBe('career.softserveinc.com');
    return newPage;
  }
  
  static async createFromNewTab(newTab: Page): Promise<CareersPage> {
    console.log('Creating CareersPage from new tab');
    const careersPage = new CareersPage(newTab);
    await newTab.waitForLoadState('domcontentloaded');
    await expect(careersPage.careersPointer).toBeVisible();
    return careersPage;
  }
}