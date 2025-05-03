import { expect, Locator, Page } from "@playwright/test";
// import { HeaderFragment } from "../pages/fragments/headerFragment"


export class ProductPage{
    page: Page;
   // header: HeaderFragment; // ініціалізуємо фрагмент тут
    productName: Locator;
    unitPrice: Locator;
    addToCartBtn: Locator;
    addToFavouritesBtn: Locator;

    constructor(page: Page) {
        this.page = page;
      //  this.header = new HeaderFragment(page); // фрагмент всередині Page Object
        this.productName = this.page.getByTestId("product-name");
        this.unitPrice = this.page.getByTestId('unit-price');
        this.addToCartBtn = this.page.getByTestId('add-to-cart')
        this.addToFavouritesBtn = this.page.getByTestId('add-to-favorites')
    }

    async openProduct(title: string): Promise<void> {
        await this.page.getByAltText(title).click();
        await this.page.url().includes('/product')
}

async productInfo(title: string, price: number, ): Promise<void> {
    await expect(this.productName).toHaveText(title);
    await expect(this.unitPrice).toHaveText(price.toFixed(2));
    await expect(this.addToCartBtn).toBeVisible();
    await expect(this.addToFavouritesBtn).toBeVisible();
}

async cartIcon(alert:string):Promise<void> {
    await expect (this.page.locator("[id='toast-container']")).toBeVisible();
    await expect (this.page.locator("[id='toast-container']")).toHaveText(alert);
    await expect (this.page.locator("[id='toast-container']")).toBeHidden({ timeout: 8000 })
}
}