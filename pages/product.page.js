
export class ProductPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }

  async getPageTitle() {
    return await this.title.textContent();
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

  async addMostExpensiveItemToCart() {
    await this.sortDropdown.selectOption('hilo');
    const firstItem = this.inventoryItems.first();
    const itemName = (await firstItem.locator('[data-test="inventory-item-name"]').textContent()).trim();
    await firstItem.locator('button').click();
    return itemName;
  }

  async openCart() {
    await this.cartIcon.click();
  }
}