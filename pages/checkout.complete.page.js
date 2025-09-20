
export class CheckoutCompletePage {
  constructor(page) {
    this.page = page;
    this.completeHeader = page.locator('[data-test="complete-header"]'); 
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async getCompletionMessage() {
    return await this.completeHeader.textContent();
  }

  async backHome() {
    await this.backHomeButton.click();
  }
};
