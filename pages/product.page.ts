import { expect, Locator, Page } from "@playwright/test";
import { Header } from "../pageFragments/header";

export class ProductPage{
    page: Page;
    productName: Locator;
    unitPrice: Locator;
    addToCartBtn: Locator;
    addToFavouritesBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = this.page.getByTestId("product-name");
        this.unitPrice = this.page.getByTestId('unit-price');
        this.addToCartBtn = this.page.getByTestId('add-to-cart')
        this.addToFavouritesBtn = this.page.getByTestId('add-to-favorites')
    }

async openProduct(title: string): Promise<void> {
        await this.page.getByAltText(title).click();
        await this.page.url().includes('/product')
}

async checkProductInfo(title: string, price: number, ): Promise<void> {
    await expect(this.productName).toHaveText(title);
    await expect(this.unitPrice).toHaveText(price.toFixed(2));
    await expect(this.addToCartBtn).toBeVisible();
    await expect(this.addToFavouritesBtn).toBeVisible();
}

async checkCartIcon(alert:string):Promise<void> {
    await expect (this.page.getByRole('alert')).toBeVisible();
    await expect (this.page.getByRole('alert')).toHaveText(alert);
    await expect (this.page.getByRole('alert')).toBeHidden({ timeout: 8000 })
}
  }
    
  
       