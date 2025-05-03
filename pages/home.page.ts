import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
    page: Page;
    baseUrl: string;
    readonly productTitles: Locator;

constructor (page:Page, baseUrl: string) {
    this.page = page;
    this.baseUrl = baseUrl
    this.productTitles = page.locator(".product-title");
}

async open():Promise<void> {
    await this.page.goto(this.baseUrl)
}

async getProductNames(): Promise<string[]> {
    const count = await this.productTitles.count();
    const names: string[] = [];

    for (let i = 0; i < count; i++) {
      names.push(await this.productTitles.nth(i).innerText());
    }

    return names;
  }
  async getProductPrices(): Promise<number[]> {
    const productCards = this.page.locator('[data-test="product-card"]');
    const count = await productCards.count();

    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const priceText = await productCards
        .nth(i)
        .locator('[data-test="product-price"]')
        .innerText();
      const price = parseFloat(priceText.replace("$", ""));
      prices.push(price);
    }

    return prices;
  }

}