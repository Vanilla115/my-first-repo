export class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="cart-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueButton = page.locator('[data-test="continue-shopping"]');;
  }

  async hasItem(itemName) {
    const item = this.page.locator(`[data-test=${itemName}]`);
    return await item.isVisible();
  }

  async removeItem(itemName) {
    await this.page.locator(`[data-test="remove-${itemName}"]`).click();
  }

  async continueShopping() {
    await this.continueButton.click();
  }
  async goToCheckout() {
    await this.checkoutButton.click();
  }

  
};