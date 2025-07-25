import { $ } from '@wdio/globals'
import Page from './page.ts';

class ProductsPage extends Page {
  private pageUrl: string = "https://www.saucedemo.com/inventory.html";
  private pageTitle: string = "Products";

  private addItem(itemName: string) {
    const productSelectorId = itemName.toLowerCase().replace(/ /g, "-");
    return $(`[data-test="add-to-cart-${productSelectorId}"]`);
  }
  private removeItem(itemName: string) {
    const productSelectorId = itemName.toLowerCase().replace(/ /g, "-");
    return $(`[data-test="remove-${productSelectorId}"]`);
  }
  private get shoppingCartBadge() {
    return $('[data-test="shopping-cart-badge"]');
  }
  private get shoppingCartIcon() {
    return $('[data-test="shopping-cart-link"]');
  }
  private get itemPrice() {
    return $('[data-test="inventory-item-price"]');
  }

  async pageVerification() {
    await super.pageVerification(this.pageUrl, this.pageTitle);
  }

  async addItemToCart(itemName: string) {
    await this.addItem(itemName).click();
    await expect(this.addItem(itemName)).not.toExist();
  }

  async removeItemFromCart(itemName: string) {
    await this.removeItem(itemName).click();
    await expect(this.removeItem(itemName)).not.toExist();
  }

  async checkAllRemoveButtonsAreNotVisible(listOfItems: string[]){
    for (const item of listOfItems){
        await expect(this.removeItem(item)).not.toExist();
    }
  }

  async getPrice() {
    return await this.itemPrice.getText();
  }

  async clickCart() {
    await this.shoppingCartIcon.click();
  }

  async shoppingCartBadgeCheck(value: number) {
    if (value > 0) {
        await expect(this.shoppingCartBadge).toHaveText(value.toString());
    } else {
        await expect(this.shoppingCartBadge).not.toExist();
    }
  }
}

export default new ProductsPage();