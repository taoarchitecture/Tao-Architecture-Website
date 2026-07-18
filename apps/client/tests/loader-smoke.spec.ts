import { test, expect } from '@playwright/test';

async function waitForLoaderToClear(page: Parameters<typeof test>[0]['page']) {
  await page.waitForFunction(() => !document.querySelector('.loader-mask'), undefined, {
    timeout: 15000,
  });
}

test('homepage loader clears and content is interactive', async ({ page }) => {
  await page.goto('/');
  await waitForLoaderToClear(page);

  await expect(
    page.getByRole('heading', {
      name: /Touching intangible beauty of nature, through tangible forms of Architecture/i,
    })
  ).toBeVisible();

  const searchInput = page.locator('input[placeholder*="search" i]').first();
  await searchInput.fill('villa');
  await expect(page.getByRole('link', { name: /Anand Villa/i })).toBeVisible();
});

test('query navigation does not leave the global loader stuck', async ({ page }) => {
  await page.goto('/video?q=villa');
  await waitForLoaderToClear(page);

  const searchInput = page.locator('input[name="q"]');
  await searchInput.fill('house');
  await searchInput.press('Enter');

  await expect(page).toHaveURL(/\/video\?q=house/);
  await waitForLoaderToClear(page);
  await expect(page.locator('.loader-mask')).toHaveCount(0);
});
