import { expect,test } from '@playwright/test';

test.describe('Internationalization Tests', () => {
  test('should switch from Spanish to English', async ({ page }) => {
    // Start at Spanish page
    await page.goto('/es');
    
    // Check Spanish text in the main content
    await expect(page.locator('main').getByRole('heading', { name: 'Proyectos Destacados' })).toBeVisible();
    
    // Click on English toggle specifically in the sidebar (desktop)
    await page.locator('aside').getByRole('button', { name: 'EN' }).click();
    
    // Verify URL change
    await expect(page).toHaveURL(/\/en/);
    
    // Check English text (from en.json)
    await expect(page.getByRole('heading', { name: 'Featured Projects' })).toBeVisible();
  });

  test('should persist language on navigation', async ({ page }) => {
    await page.goto('/en');
    const sidebar = page.locator('aside');
    await expect(sidebar.getByRole('link', { name: 'Experience' })).toBeVisible();
    
    // Refresh and check if it's still English
    await page.reload();
    await expect(sidebar.getByRole('link', { name: 'Experience' })).toBeVisible();
  });
});
