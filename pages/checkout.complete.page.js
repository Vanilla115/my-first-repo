
export class CheckoutStepTwoPage{
  constructor(page) {
    this.page = page;
    this.orderSummary = page.locator('[data-test="summary_info"]');  
    this.totalPrice = page.locator('[data-test="total-label"]');     
    this.finishButton = page.locator('[data-test="finish"]');        
  }

  async finishCheckout() {
    await this.finishButton.click();
  }


  async getTotal() {
    return await this.totalPrice.textContent();
  }


  async isSummaryVisible() {
    return await this.orderSummary.isVisible();
  }
};
