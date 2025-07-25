import { $ } from '@wdio/globals'
import Page from './page.ts';

class CheckoutOverviewPage extends Page {
  private pageUrl: string = "https://www.saucedemo.com/checkout-step-two.html";
  private pageTitle: string = "Checkout: Overview";

  private itemPricePreText: string = "$";
  private itemTotalPricePreText: string = "Item total: $";

  private get itemPrice() {
    return $('[data-test="inventory-item-price"]');
  }

  private get itemTotalPrice() {
    return $('[data-test="subtotal-label"]');
  }

  private get finishButton(){
    return $('[data-test="finish"]');
  }

  async pageVerification() {
    await super.pageVerification(this.pageUrl, this.pageTitle);
  }

  async checkItemPrice(price: number) {
    await expect(this.itemPrice).toHaveText(
      this.itemPricePreText + price.toString()
    );
  }

  async checkItemTotalPrice(price: number) {
    const priceText: string = this.itemTotalPricePreText + price;
    await expect(this.itemTotalPrice).toHaveText(priceText);
  }

  async submit() {
    await this.finishButton.click()
  }
}

export default new CheckoutOverviewPage();