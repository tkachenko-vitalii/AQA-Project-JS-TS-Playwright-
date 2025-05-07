import { expect, Locator, Page } from "@playwright/test";
import { Header } from "../pageFragments/header";

export class ProductPage{
    page: Page;
    productName: Locator;
    unitPrice: Locator;
    addToCartBtn: Locator;
    addToFavouritesBtn: Locator;
    alert: Locator;
    productQuantity: Locator;
    productTitle: Locator;
    proceedToCheckoutBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productName = this.page.getByTestId("product-name");
        this.unitPrice = this.page.getByTestId('unit-price');
        this.addToCartBtn = this.page.getByTestId('add-to-cart')
        this.addToFavouritesBtn = this.page.getByTestId('add-to-favorites')
        this.alert = this.page.locator("[id='toast-container']")
        this.productQuantity = this.page.getByTestId("product-quantity")
        this.productTitle = this.page.getByTestId("product-title")
        this.proceedToCheckoutBtn = this.page.getByTestId("proceed-1")
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

async checkToastNotification(alert:string):Promise<void> {
    await expect (this.alert).toBeVisible();
    await expect (this.alert).toHaveText(alert);
    await expect (this.alert).toBeHidden({ timeout: 8000 })
}

async checkProductValue(value:number):Promise<void> {
    await expect (this.productQuantity).toHaveValue(value.toString())
}

async checkProductName(string:string):Promise<void> {
    await expect (this.productTitle).toHaveText(string)
}

async checkProceedBtn():Promise<void> {
    await expect (this.proceedToCheckoutBtn).toBeVisible()
}
  }
    
  
       