import Page from "./page.ts";

class LoginPage extends Page {
  private pageUrl: string = "https://www.saucedemo.com/";

  private get inputUsername() {
    return $('[data-test="username"]');
  }
  private get errorIconUsername() {
    return $('[data-test="username"] ~ [data-icon="times-circle"]');
  }
  private get inputPassword() {
    return $('[data-test="password"]');
  }
  private get errorIconPassword() {
    return $('[data-test="password"] ~ [data-icon="times-circle"]');
  }
  private get btnSubmit() {
    return $('[data-test="login-button"]');
  }
  private get errorAlert() {
    return $('[data-test="error"]');
  }

  async pageVerification() {
    await super.pageVerification(this.pageUrl);
  }

  async formIsEmpty() {
    await expect(this.inputUsername).toHaveText("");
    await expect(this.inputPassword).toHaveText("");
  }

  async login(username?: string, password?: string) {
    username && (await this.inputUsername.setValue(username));
    if (password) {
      await this.inputPassword.setValue(password);
      await expect(this.inputPassword).toHaveAttribute("type", "password");
    }
    await this.btnSubmit.click();
  }

  async errorLoginCheck(error: "no login" | "no password" | "mismatch") {
    await expect(this.errorIconUsername).toExist();
    await expect(this.errorIconPassword).toExist();
    switch (error) {
      case "no login":
        await expect(this.errorAlert).toHaveText(
          "Epic sadface: Username is required"
        );
        break;
      case "no password":
        await expect(this.errorAlert).toHaveText(
          "Epic sadface: Password is required"
        );
        break;
      case "mismatch":
        await expect(this.errorAlert).toHaveText(
          "Epic sadface: Username and password do not match any user in this service"
        );
        break;
    }
  }

  public open() {
    return super.openPage("");
  }
}

export default LoginPage;
