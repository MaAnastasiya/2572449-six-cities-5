import { test, expect } from '@playwright/test';

test('comment form submission should work only when logged in', async ({ page }) => {

    await page.goto('http://localhost:5173');

    // Пользователь не залогинен
    await page.waitForSelector('.cities__card'); 
    await page.locator('.place-card__name').first().click(); 
    await page.waitForSelector('.offer__name'); 
    expect(await page.isVisible('.reviews__form')).toBe(false);



    await page.click('.header__login'); 
    await expect(page).toHaveURL('http://localhost:5173/login');

    // Логинимся
    await page.fill('input[name="email"]', 'test@test.com');
    await page.fill('input[name="password"]', 'qwerty123');
    
    await page.click('button[type="submit"]'); 
    await page.waitForTimeout(2000); 
    expect(page.url()).toBe('http://localhost:5173/'); 
    await page.waitForSelector('.cities__card'); 
    await page.locator('.place-card__name').first().click();
    await page.waitForSelector('.offer__name');
    expect(await page.isVisible('.reviews__form')).toBe(true);

    await page.fill('[name="review"]', 'This is a test review that is long enough. 50 characters typed!');
    await page.getByTitle('excellent').click();

    await page.click('.reviews__submit'); 
    await page.waitForTimeout(2000); 
    await expect(page.locator('.reviews__item').first()).toContainText('This is a test review that is long enough. 50 characters typed!');
});
