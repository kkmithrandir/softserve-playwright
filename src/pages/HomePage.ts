import { Page, Locator } from '@playwright/test';
import { TIMEOUT } from 'dns';

export class HomePage {
  readonly page: Page;
  readonly banner: Locator;
  readonly careersButton: Locator;
  readonly logo: Locator;
  readonly searchButton: Locator;
  readonly contactUsButton: Locator;
  readonly openMenuButton: Locator;
  readonly menuNavigation: Locator;
  readonly cookieBanner!: Locator;
  readonly cookieAcceptAllButton!: Locator;
  readonly menuItems: Locator;

  constructor(page: Page) {
    this.page            = page;
    this.logo            = page.locator('#app > div.layout > header > div > a > img');
    this.banner          = page.getByText('For The FutureWe are advisors');
    this.careersButton   = page.getByRole('link',{ name: 'Careers open'});
    this.searchButton    = page.locator('#menu').getByRole('link', { name: 'Search' });
    this.contactUsButton = page.getByRole('button', { name: 'Contact us' });
    this.openMenuButton  = page.getByRole('button', { name: 'Open menu' });
    this.menuNavigation  = page.getByText('HomeYour Digital')
    this.menuItems       = this.menuNavigation.locator('li');
    this.cookieBanner    = page.locator('body > div.cky-consent-container.cky-box-bottom-left > div > div > div > div.cky-notice-btn-wrapper');
    this.cookieAcceptAllButton = this.cookieBanner.locator('> button.cky-btn.cky-btn-accept');
  }

  async navigate() {
    await this.page.goto('https://www.softserveinc.com/');
    await this.page.waitForLoadState();
    //await this.cookieBanner.waitFor({timeout: 10000});
    await this.cookieAcceptAllButton.click({force: true});
  }
}