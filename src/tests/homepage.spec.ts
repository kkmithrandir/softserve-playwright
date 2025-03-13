import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test.describe('Home Page Tests', () => {
  let homePage: HomePage;

  // This hook runs before each test in the suite
  test.beforeEach(async ({ page }) => {
    // Initialize the HomePage object using the current page instance
    homePage = new HomePage(page);
    // Navigate to the home page
    await homePage.navigate();
  
  });
  test('SoftServe logo is visible', async ({ page }) => {
    await expect(homePage.logo).toBeVisible();
  });

  test('homepage banner is visible', async ({ page }) => {
    // Verify that the banner is visible on the page
    await expect(homePage.banner).toBeVisible();
  });

  test('action buttons are visible', async ({ page }) => {
    // Verify that the action buttons are visible
    await expect(homePage.careersButton).toBeVisible();
    await expect(homePage.searchButton).toBeVisible();
    await expect(homePage.contactUsButton).toBeVisible();
    await expect(homePage.openMenuButton).toBeVisible();
  });

  test('opening the menu from the button',async({ page }) => {
    // Verify that the menu opens
    await (homePage.openMenuButton).click();
    await expect (homePage.menuNavigation).toBeVisible();
  });

  test('verify the order of the items in the menu', async ({ page }) => {
    // Open the menu and ensure it's visible
    await homePage.openMenuButton.click();
    await expect(homePage.menuNavigation).toBeVisible();
    // Extract each menu item as an object with text and link
    const liArray = await homePage.menuItems.evaluateAll(liElements =>
      liElements.map(li => ({
        text: li.getAttribute('data-item-counter') || '',
        link: li.textContent?.trim() || ''
      }))
      .filter(item => item.link !== '')
    );
    // Expected items array
    const expectedItems = [
      { text: '01', link: 'Home' },
      { text: '02', link: 'Your Digital Journey' },
      { text: '03', link: 'Industries' },
      { text: '04', link: 'Services' },
      { text: '05', link: 'Resources' },
      { text: '06', link: 'News & Events' },
      { text: '07', link: 'Careers' },
      { text: '08', link: 'About us' },
      { text: '09', link: 'Our Partners' },
      { text: '10', link: 'University' },
      { text: '11', link: 'Social Responsibility' },
      { text: '12', link: 'Blog' },
      { text: '13', link: 'Locations' },
      { text: '14', link: 'Contact' }
    ];
    //console.log('adjusted',adjustedItemsArray);
    //console.log('expected',expectedItems);
    // Compare the actual array with the expected array
    expect(liArray).toEqual(expectedItems);
  });
});