import { $ } from '@wdio/globals'
import Page from './page.ts';

class CartPage extends Page {
  private pageUrl: string = "https://www.saucedemo.com/cart.html";
  private pageTitle: string = "Your Cart";

  private get inventoryItemName() {
    return $('[data-test="inventory-item-name"]');
  }

  private get checkOutButton() {
    return $('[data-test="checkout"]');
  }

  async pageVerification() {
    await super.pageVerification(this.pageUrl, this.pageTitle);
  }

  async CheckItem(itemName: string) {
    await expect(this.inventoryItemName).toHaveText(itemName);
  }

  async clickCheckOutButton() {
    await this.checkOutButton.click();
  }
}

export default new CartPage();