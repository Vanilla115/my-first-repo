
export class CheckoutStepOnePage{
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#first-name');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
  }

  async open() {
    await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
  }

  async fillUserInfo(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
    await this.continueButton.click();
  }
};