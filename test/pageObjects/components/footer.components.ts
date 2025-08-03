import { FooterLinks } from "../../types";

class Footer {
  private listMedia: FooterLinks[] = [
    { name: "Twitter", url: "https://twitter.com/saucelabs" },
    { name: "Facebook", url: "https://www.facebook.com/saucelabs" },
    { name: "Linkedin", url: "https://www.linkedin.com/company/sauce-labs/" },
  ];

  private icon(site: FooterLinks) {
    const siteName = site.name.toLowerCase();
    return $(`[data-test="social-${siteName}"]`);
  }

  async linksCheck() {
    for (const media of this.listMedia) {
        const link = this.icon(media)
        await expect(link).toHaveHref(media.url)
        await expect(link).toHaveAttribute("target", "_blank")
    }
  }
}

export default Footer;