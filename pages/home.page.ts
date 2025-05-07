import {expect, Locator, Page } from "@playwright/test";
import { Header } from "../pageFragments/header";
import { ProductsFiltersFragment } from '../pageFragments/productsFilters'
import { sortPrices, sortNames } from "../utils/sorting";

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
  return await this.productTitles.allTextContents();
}

async getProductPrices(): Promise<number[]> {
  const priceTexts = await this.page.getByTestId('product-price').allTextContents();
  return priceTexts.map(text => parseFloat(text.replace('$', '')));
}
  sortPrices(prices: number[], ascending: boolean): number[] {
    return [...prices].sort((a, b) => ascending ? a - b : b - a);
  }

  sortNames(productNames: string[], ascending: boolean): string[] {
    return [...productNames].sort((a, b) => ascending ? a.localeCompare(b) : b.localeCompare(a)
  )
  }

  async checkUrl(title:string):Promise<void> {
    await expect(this.page).toHaveURL(title)
  }

}