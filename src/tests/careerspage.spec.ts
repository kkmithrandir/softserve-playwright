import { test, expect, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CareersPage } from '../pages/CareersPage';

test.describe('Careers Page Tests', () => {
  let homePage: HomePage;
  let careersPage: CareersPage;
  let newCareersPage: CareersPage;
  let newTab: Page;

  test.beforeEach(async ({ page }) => {
    // Initialize the home page and careers page
    homePage = new HomePage(page);
    careersPage = new CareersPage(page);
    await homePage.navigate();
  });

  test('user navigates to Careers page and verifies content', async () => {
    // Navigate to the Careers page and get the new tab
    newTab = await careersPage.navigateToCareersPage();
    newCareersPage = await CareersPage.createFromNewTab(newTab);
    await expect(newCareersPage.careersPointer).toHaveText(/Be\s+one\s*of\s+us/, { timeout: 10000 });
    await expect(newCareersPage.careersHeadingSubText).toHaveText('Find your perfect IT job at SoftServe');
  });

  test('user uses the search functionality', async () => {
    // Navigate to the Careers page and get the new tab
    newTab = await careersPage.navigateToCareersPage();
    newCareersPage = await CareersPage.createFromNewTab(newTab);
    await newCareersPage.page.waitForTimeout(2000);
    await expect(newCareersPage.careersJobCount).toBeVisible({timeout: 2000});
    // Verify search input is visible and check job count before and after searching
    const initialJobCountText = await newCareersPage.careersJobCount.textContent();
    console.log(`Initial job count: ${initialJobCountText}`);
    await newCareersPage.careersSearch.click();
    await newCareersPage.careersSearch.fill('Middle Test Automation Engineer');
    await newCareersPage.careersSearch.press('Enter');
    await newCareersPage.careersJobCount.scrollIntoViewIfNeeded();
    await newCareersPage.page.waitForTimeout(5000);
    await newCareersPage.careersJobCount.scrollIntoViewIfNeeded();
    const newJobCountText = await newCareersPage.careersJobCount.textContent();
    console.log(`New job count: ${newJobCountText}`);
    expect(newJobCountText).not.toEqual(initialJobCountText);
  });
});
