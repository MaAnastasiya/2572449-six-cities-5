import { test, expect } from '@playwright/test';

test('check loading cards from server', async ({ page }) => {

    await page.goto('http://localhost:5173');

    await page.waitForSelector('.cities__card'); // Ждем появления не менее одной карточки

    const cardElements = await page.locator('.cities__card');
    const cardElementsCount = await cardElements.count(); // Ищем все элементы на странице с выбранным классом
    
    expect(cardElementsCount).toBeGreaterThan(0); // Количество карточек больше0?
    expect(cardElementsCount).toBeLessThanOrEqual(20); // Количество карточек не больше 20?

    for (let i = 0; i < cardElementsCount; i++) {
        const currentCardElement = cardElements.nth(i);
        await expect(currentCardElement.locator('.place-card__image')).toHaveAttribute('src', /https:\/\/.+[.]jpg/); // Есть картинка?
        await expect(currentCardElement.locator('.place-card__price')).toHaveText(/^\€\d+/); // Есть цена?
        await expect(currentCardElement.locator('.place-card__rating')).toBeVisible(); // Есть рейтинг?
    }
});
 
