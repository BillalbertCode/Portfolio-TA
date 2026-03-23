import { expect,test } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('should load the home page and show main elements', async ({ page }) => {
    // Navigate to the Spanish home page as default
    await page.goto('/es');

    // Check if the page title is correct (from en.json/es.json name)
    await expect(page).toHaveTitle(/Billalbert Martinez/);

    // Check for the main heading in the main content area
    await expect(page.locator('main').first().getByRole('heading', { name: 'Billalbert Martinez' })).toBeVisible();

    // Check for the Three.js/Rain canvas
    const canvas = page.locator('canvas');
    await expect(canvas).toBeVisible();
  });

  test('should have visible navigation links', async ({ page }) => {
    await page.goto('/es');
    
    // Check for sidebar navigation específicamente
    const sidebar = page.locator('aside');
    await expect(sidebar.getByRole('link', { name: 'Proyectos' })).toBeVisible();
    await expect(sidebar.getByRole('link', { name: 'Experiencia' })).toBeVisible();
  });
});
