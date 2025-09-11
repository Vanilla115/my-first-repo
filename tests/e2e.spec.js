const { test, expect } = require('@playwright/test');
import { LoginPage } from '../pages/login.page';
import { ProductPage } from '../pages/product.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutStepOnePage } from '../pages/checkout.overview.page';
import {CheckoutStepTwoPage } from '../pages/checkout.complete.page';
import { CheckoutCompletePage } from '../pages/checkout.information.page';
//test.describe.configure({ mode: 'serial' });

test('Успешный логин и проверка страницы товаров', async ({ page }) => {
    // инициализация
    const loginPage = new LoginPage (page);
    const productPage = new ProductPage (page);

    // авторизация
    await loginPage.open();
    await loginPage.login('standard_user','secret_sauce');
    await loginPage.getErrorMessage;

    // переход на страницу и проверка
    const pageTitle = await productPage.getPageTitle();
    await expect(pageTitle).toBe('Products')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
})

test('Проверка страницы продуктов и корзины', async ({ page }) => {

    const productPage = new ProductPage (page);
    const cartPage = new CartPage (page);

    // добавляем самый дорогой товар,сохраняем его имя и переходим в корзину
    //productPage.open()
    const expensiveItemName = await productPage.addMostExpensiveItemToCart();
    await productPage.openCart();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // проверка наличия
    expect(await cartPage.hasItem(expensiveItemName)).toBeTruthy();

    // удаление (проверка кнопки Remove)
    await cartPage.removeItem(expensiveItemName);

    // проверка наличия
    expect(await cartPage.hasItem(expensiveItemName)).toBeTruthy();

    // возвращаем товар в корзину
    await inventoryPage.addMostExpensiveItemToCart();

    // проверка кнопки "обратно к старнице товаров"
    await cartPage.continueShopping()
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await productPage.openCart();

    // переход на страницу оформления 
    await cartPage.goToCheckout();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
})

test('Отправка информации пользователя и оформление заказа', async ({ page }) => {
    const checkoutStepOnePage = new CheckoutStepOnePage(page);

    // заполняем форму и нажимаем continue
    //checkoutStepOnePage.open()
    await checkoutStepOnePage.fillUserInfo("Test","User","12345");

    const stepTwoPage = new CheckoutStepTwoPage(page);

    // проверка старницы подтверждения заказа
    expect(await stepTwoPage.isSummaryVisible()).toBeTruthy();

    expect(await stepTwoPage.getTotal()).toContain('Total:');

    // Завершаем заказ
    await stepTwoPage.finishCheckout();

    // финальные действия
    const complete = new CheckoutCompletePage(page)
    complete.getCompletionMessage();
    complete.backHomeButton();
})