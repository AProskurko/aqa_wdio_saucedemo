import Page from "./page.ts";
import { filterResults } from "../utils/fixtures.ts";
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
  private get itemName() {
    return $('data-test="inventory-item-name"');
  }
  private get allItemsList() {
    return $$('[data-test="inventory-item-name"]');
  }
  private get itemPrice() {
    return $('[data-test="inventory-item-price"]');
  }

  private get elementFilter() {
    return $('[data-test="product-sort-container"]');
  }

  private get elementAllFilter() {
    return $$('[data-test="product-sort-container"]');
  }

  public open() {
    return super.openPage("/inventory.html");
  }

  async pageVerification(): Promise<void> {
    await super.pageVerification(this.pageUrl, this.pageTitle);
  }

  async addItemToCart(itemName: string): Promise<void> {
    await this.addItem(itemName).click();
    await expect(this.addItem(itemName)).not.toExist();
  }

  async addListOfItemsToCart(list: string[]) {
    for (const item of list) {
      await this.addItemToCart(item);
    }
  }

  async removeItemFromCart(itemName: string): Promise<void> {
    await this.removeItem(itemName).click();
    await expect(this.removeItem(itemName)).not.toExist();
  }

  async checkMultipleProductsVisibility(list: string[]): Promise<void> {
    const visibleTexts: string[] = [];
    const alItems = await this.allItemsList;

    for (const items of alItems) {
      if (await items.isDisplayed()) {
        visibleTexts.push((await items.getText()).toLocaleLowerCase());
      }
    }
    const lowerCaseList = list.map((s) => s.toLowerCase());
    await expect(visibleTexts).toEqual(expect.arrayContaining(lowerCaseList));
  }

  async checkAllRemoveButtonsAreNotVisible(listOfItems: string[]) {
    for (const item of listOfItems) {
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

  async filterProductsAndCheck(option: "az" | "za" | "lohi" | "hilo") {
    await this.elementFilter.selectByAttribute("value", option);
    const firstItemInList = await this.allItemsList[0].getText();

    switch (option) {
      case "az":
        await expect(firstItemInList).toEqual(filterResults.az);
        break;
      case "za":
        await expect(firstItemInList).toEqual(filterResults.za);
        break;
      case "lohi":
        await expect(firstItemInList).toEqual(filterResults.lohi);
        break;
      case "hilo":
        await expect(firstItemInList).toEqual(filterResults.hilo);
        break;
    }
  }
}

export default ProductsPage;
