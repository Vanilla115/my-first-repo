export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="cart-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueButton = page.locator('[data-test="continue-shopping"]');;
  }

  async hasItem(itemName) {
  return await this.page.locator('.inventory_item_name', { hasText: itemName }).isVisible();
  }

  async hasItemAfterDelete(itemName) {
  const count = await this.page.locator('.inventory_item_name', { hasText: itemName }).count();
  return count > 0;
}

async removeItem(itemName) {
    await this.page.locator('.cart_item')
        .filter({ hasText: itemName })
        .locator('[data-test^="remove-"]')
        .click();
}

  async continueShopping() {
    await this.continueButton.click();
  }
  async goToCheckout() {
    await this.checkoutButton.click();
  }
};