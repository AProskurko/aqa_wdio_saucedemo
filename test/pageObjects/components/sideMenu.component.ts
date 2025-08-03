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

  async sideMenuIsVisible() {
    await expect(this.sideMenuFrame).toBeDisplayed();
    await expect(this.allItemOption).toBeDisplayed();
    await expect(this.aboutOption).toBeDisplayed();
    await expect(this.logoutOption).toBeDisplayed();
    await expect(this.resetAppOption).toBeDisplayed();
  }

  async openSideMenu() {
    await this.burgerButton.click();
    await this.sideMenuIsVisible();
  }

  async closeSideMenu() {
    const isVisible = await this.sideMenuFrame.isDisplayed();
    if (isVisible) {
      await this.closeMenuButton.click();
    }
  }

  async selectAllItems() {
    await this.allItemOption.click();
  }

  async selectAbout() {
    await this.aboutOption.click();
  }

  async verifyAboutHref() {
    await expect(this.aboutOption).toBeDisplayed();
    await expect(this.aboutOption).toHaveHref(this.aboutUrl);
  }

  async selectResetApp() {
    await this.resetAppOption.click();
  }

  async selectLogout() {
    await this.logoutOption.click();
  }
}

export default SideMenu;
