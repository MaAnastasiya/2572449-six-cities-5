import { test, expect } from '@playwright/test';

test('check sorting of cards by price', async ({ page }) => {

    await page.goto('http://localhost:5133');

    await page.waitForSelector('.cities__card');


    const pricesBeforeSorting = (
        await page.locator('.place-card__price-value').allTextContents()
    ).map((price) => Number(price.replace('€', '').trim()));

    const sortedPricesUp = pricesBeforeSorting.slice().sort((a, b) => a - b); 
    const sortedPricesDown = pricesBeforeSorting.slice().sort((a, b) => b - a);


    await page.click('.places__sorting-type');
    await page.click('text="Price: low to high"');

    const pricesAfterSortingUp = (
        await page.locator('.place-card__price-value').allTextContents()
    ).map((price) => Number(price.replace('€', '').trim()));

    await page.click('.places__sorting-type');
    await page.click('text="Price: high to low"');

    const pricesAfterSortingDown = (
        await page.locator('.place-card__price-value').allTextContents()
    ).map((price) => Number(price.replace('€', '').trim()));

    expect(pricesAfterSortingUp).toEqual(sortedPricesUp);
    expect(pricesAfterSortingDown).toEqual(sortedPricesDown);


    await page.click('.places__sorting-type');
    await page.click('text="Popular"');

    const pricesAfterSorting = (
        await page.locator('.place-card__price-value').allTextContents()
    ).map((price) => Number(price.replace('€', '').trim()));

    expect(pricesAfterSorting).toEqual(pricesBeforeSorting);

    expect(pricesAfterSorting).not.toEqual(pricesAfterSortingDown);

    expect(pricesAfterSorting).not.toEqual(sortedPricesUp);
});
