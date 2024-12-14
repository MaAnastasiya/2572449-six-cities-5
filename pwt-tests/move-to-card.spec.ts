import { test, expect } from '@playwright/test';

test('check navigation to offer page', async ({ page }) => {

    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card'); 

    const firstCardName = await page.locator('.place-card__name').first().textContent();
    const firstCardPrice = await page.locator('.place-card__price-value').first().textContent();

    await page.locator('.place-card__name').first().click();

    await page.waitForSelector('.offer__name');

    const offerName = await page.textContent('.offer__name');
    const offerPrice = await page.textContent('.offer__price-value');

    expect(offerName).toBe(firstCardName);
    expect(offerPrice).toBe(firstCardPrice);

    expect(await page.isVisible('.offer__gallery')).toBe(true);
    expect(await page.isVisible('.offer__rating')).toBe(true);
    expect(await page.isVisible('.offer__price')).toBe(true);
    expect(await page.isVisible('.offer__inside')).toBe(true);
    expect(await page.isVisible('.offer__host')).toBe(true);
    expect(await page.isVisible('.offer__description')).toBe(true);
    expect(await page.isVisible('.reviews')).toBe(true);
});
