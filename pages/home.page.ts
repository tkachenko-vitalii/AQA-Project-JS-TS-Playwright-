import {Locator, Page } from "@playwright/test";
import { Header } from "../pageFragments/header";
import { ProductsFiltersFragment } from '../pageFragments/productsFilters'

export class HomePage {
    readonly page: Page;
    readonly productTitles: Locator;
    readonly filters: ProductsFiltersFragment
    readonly header: Header

constructor (page:Page,) {
    this.page = page;
    this.productTitles = page.locator(".product-title");
    this.filters = new ProductsFiltersFragment(page)
    this.header = new Header(page)
}

async open():Promise<void> {
    await this.page.goto('')
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
    const productCards = this.page.getByTestId('product-card');
    const count = await productCards.count();

    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const priceText = await productCards
        .nth(i)
        .getByTestId('product-price')
        .innerText();
      const price = parseFloat(priceText.replace("$", ""));
      prices.push(price);
    }

    return prices;
  }
  async sortPrices(prices: number[], ascending: boolean): Promise<number[]> {
    return [...prices].sort((a, b) => ascending ? a - b : b - a);
  }

  async sortNames(productNames: string[], ascending: boolean): Promise<string[]> {
    return [...productNames].sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a)
  )
  }

}