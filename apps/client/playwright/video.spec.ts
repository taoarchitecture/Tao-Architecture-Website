import { test, expect } from '@playwright/test';

test('Video page renders', async ({ page }) => {
  await page.goto('http://localhost:3000/video');
  await expect(page.getByText('Search')).toBeVisible();
});
