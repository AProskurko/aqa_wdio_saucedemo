import Page from "./page.ts";

class CartPage extends Page {
  private pageUrl: string = "https://www.saucedemo.com/cart.html";
  private pageTitle: string = "Your Cart";

  private get inventoryItemName() {
    return $('[data-test="inventory-item-name"]');
  }

  private get checkOutButton() {
    return $('[data-test="checkout"]');
  }

  private get alertEmptyCartVerification() {
    return $('[data-test="alert"]');
  }

  public open() {
    return super.openPage("/cart.html");
  }

  async pageVerification() {
    await super.pageVerification(this.pageUrl, this.pageTitle);
  }

  async checkItem(itemName: string) {
    await expect(this.inventoryItemName).toHaveText(itemName);
  }

  async checkNoItemVisible() {
    await expect(this.inventoryItemName).not.toBeDisplayed();
  }

  async clickCheckOutButton() {
    await this.checkOutButton.click();
  }

  async verifyFailedCheckout() {
    await this.pageVerification();
    await expect(this.alertEmptyCartVerification).toBeDisabled();
    await expect(this.alertEmptyCartVerification).toHaveText("'Cart is empty'");
  }
}

export default CartPage;
