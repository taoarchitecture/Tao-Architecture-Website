import { test, expect } from '@playwright/test';

test('Homepage Visual Regression', async ({ page }) => {
  await page.goto('/');
  // Wait for fonts to load
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('home-page.png', { fullPage: true });
});

test('Work Page Visual Regression', async ({ page }) => {
  await page.goto('/work');
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('work-page.png', { fullPage: true });
});
