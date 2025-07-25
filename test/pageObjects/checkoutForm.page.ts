import { $ } from '@wdio/globals'
import Page from './page.ts';

class CheckoutFormPage extends Page {
  private pageUrl: string = "https://www.saucedemo.com/checkout-step-one.html";
  private pageTitle: string = "Checkout: Your Information";

  private get firstName() {
    return $('[data-test="firstName"]');
  }

  private get lastName() {
    return $('[data-test="lastName"]');
  }

  private get postalCode() {
    return $('[data-test="postalCode"]');
  }

  private get continueButton() {
    return $('[data-test="continue"]');
  }

  async pageVerification() {
    await super.pageVerification(this.pageUrl, this.pageTitle);
  }

  async fillFirstName(firstName: string) {
    await this.firstName.setValue(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastName.setValue(lastName);
  }

  async fillPostalCode(postalCode: number) {
    await this.postalCode.setValue(postalCode.toString());
  }

  async submitCheckoutForm() {
    await this.continueButton.click();
  }
}

export default new CheckoutFormPage();