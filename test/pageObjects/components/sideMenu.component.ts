import { $ } from '@wdio/globals'

class SideMenu {
  private aboutUrl: string = "https://saucelabs.com/";

  private get burgerButton() {
    return $("#react-burger-menu-btn");
  }
  private get sideMenuFrame() {
    return $('[data-test="logout-sidebar-link"]');
  }
  private get closeMenuButton() {
    return $("#react-burger-cross-btn");
  }
  private get allItemOption() {
    return $('[data-test="inventory-sidebar-link"]');
  }
  private get aboutOption() {
    return $('[data-test="about-sidebar-link"]');
  }
  private get logoutOption() {
    return $('[data-test="logout-sidebar-link"]');
  }
  private get resetAppOption() {
    return $('[data-test="reset-sidebar-link"]');
  }

  async openSideMenu() {
    const isVisible = await this.sideMenuFrame.isDisplayed();
    if (!isVisible) {
      await this.burgerButton.click();
    }
  }

  async closeSideMenu() {
    const isVisible = await this.sideMenuFrame.isDisplayed();
    if (isVisible) {
      await this.closeMenuButton.click();
    }
  }

  async selectAllItems(){
    await this.allItemOption.click()
  }

  async selectAbout() {
    await this.aboutOption.click();
  }

  async verifyAboutUrl(){
    await expect(browser).toHaveUrl(this.aboutUrl)
  }

  async selectResetApp() {
    await this.resetAppOption.click();
  }

  async selectLogout() {
    await this.logoutOption.click();
  }
}

export default new SideMenu();
