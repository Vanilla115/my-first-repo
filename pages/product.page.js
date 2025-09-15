
export class ProductPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    //this.sortDropdown = page.locator('[data-test="product_sort_container"]');
    //this.inventoryItems = page.locator('[data-test="inventory-item"]');
  }

  async getPageTitle() {
    return await this.title.textContent();
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }

async addMostExpensiveItemToCart() {
    // Получаем все цены
    const priceElements = await this.page.locator('.inventory_item_price').all();
    const prices = [];
    
    for (const priceEl of priceElements) {
        const priceText = await priceEl.innerText();
        prices.push(parseFloat(priceText.replace('$', '')));
    }
    
    // Находим индекс самой высокой цены
    const maxPriceIndex = prices.indexOf(Math.max(...prices));
    
    // Кликаем кнопку добавления по этому индексу
    const addButtons = await this.page.locator('button.btn_inventory').all();
    await addButtons[maxPriceIndex].click();
}

  async openCart() {
    await this.cartIcon.click();
  }
}