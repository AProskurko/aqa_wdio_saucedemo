import Page from "./page.ts";

class CheckoutCompletePage extends Page {
  private pageUrl: string = "https://www.saucedemo.com/checkout-complete.html";
  private pageTitle: string = "Checkout: Complete!";

  private messageText: string = "Thank you for your order!";

  private get completeMessage() {
    return $('[data-test="complete-header"]');
  }
  private get backHomeButton() {
    return $('[data-test="back-to-products"]');
  }

  public open() {
    return super.openPage("/checkout-complete.html");
  }

  async pageVerification() {
    await super.pageVerification(this.pageUrl, this.pageTitle);
  }

  async checkCompleteMessage(messageText: string = this.messageText) {
    await expect(this.completeMessage).toHaveText(messageText);
  }

  async clickBackHomeButton() {
    await this.backHomeButton.click();
  }
}

export default CheckoutCompletePage;
