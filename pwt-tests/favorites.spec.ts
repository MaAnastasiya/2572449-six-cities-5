import { test, expect } from '@playwright/test';

test('favorites screen functionality', async ({ page }) => {

    await page.goto('http://localhost:5133');
    await page.waitForSelector('.cities__card');
    await page.locator('.place-card__name').first().click(); 
    await page.waitForSelector('.offer__name'); 
    await page.click('.place-card__bookmark-button'); 
    await expect(page).toHaveURL('http://localhost:5133/login');

    await page.goto('http://localhost:5173');
    await page.waitForSelector('.cities__card');
    await page.locator('.place-card__bookmark-button').first().click(); 
    await expect(page).toHaveURL('http://localhost:5133/login'); 

    await page.goto('http://localhost:5173/favorites');
    await expect(page).toHaveURL('http://localhost:5133/login');


    await page.goto('http://localhost:5133/favorites');

    await expect(page).toHaveURL('http://localhost:5133/login');

    // Логинимся
    await page.fill('input[name="email"]', 'test@test.com');
    await page.fill('input[name="password"]', 'qwerty123');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(2000);

    await expect(page).toHaveURL('http://localhost:5133/');

    let initialFavoritesCount = Number(await page.locator('.header__favorite-count').textContent());

    await page.waitForSelector('.cities__card');
    const firstBookmarkButton = page.locator('.place-card__bookmark-button').first();

    const initialFirstClasses = await firstBookmarkButton.getAttribute('class');
    const isInitiallyFirstFavorite = initialFirstClasses ? initialFirstClasses.includes('place-card__bookmark-button--active') : false;

    await firstBookmarkButton.click();
    await page.waitForTimeout(1000); 

    await expect(page).toHaveURL('http://localhost:5133/');
    const updatedFirstClasses = await firstBookmarkButton.getAttribute('class');
    const isNowFirstFavorite = updatedFirstClasses ? updatedFirstClasses.includes('place-card__bookmark-button--active') : false;
    expect(isNowFirstFavorite).toBe(!isInitiallyFirstFavorite);

    let expectedFavoritesCount = initialFavoritesCount;
    if (initialFavoritesCount > 0) {
        expectedFavoritesCount += isNowFirstFavorite ? 1 : -1;
    } else {
        expectedFavoritesCount = isNowFirstFavorite ? 1 : 0;
    }

    let updatedFavoritesCount = Number(await page.locator('.header__favorite-count').textContent());

    expect(updatedFavoritesCount).toBe(expectedFavoritesCount);



    await page.goto('http://localhost:5133/favorites');

    await expect(page).toHaveURL('http://localhost:5133/favorites');
});
