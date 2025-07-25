import { $ } from '@wdio/globals'
import Page from './page.ts';

class LoginPage extends Page {
  private pageUrl: string = "https://www.saucedemo.com/";

  private get inputUsername() {
    return $('[data-test="username"]');
  }
  private get inputPassword() {
    return $('[data-test="password"]');
  }
  private get btnSubmit() {
    return $('[data-test="login-button"]');
  }

  async pageVerification() {
    await super.pageVerification(this.pageUrl);
  }

  async login(username: string, password: string) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  public open() {
    return super.openPage("");
  }
}

export default new LoginPage();