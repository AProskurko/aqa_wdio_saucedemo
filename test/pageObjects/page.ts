import { $ } from '@wdio/globals'
import { browser } from '@wdio/globals'


export default class Page {
  private pageTitleElement() {
    return $('[data-test="title"]');
  }

  openPage(path?: string) {
    return browser.url(`https://www.saucedemo.com/${path}`);
  }

  async pageVerification(url: string, title?: string) {
    await expect(browser).toHaveUrl(url);
    if (title !== undefined) {
      await expect(this.pageTitleElement()).toHaveText(title);
    }
  }

  async clickAt(element: WebdriverIO.Element) {
    await element.click();
  }
}
