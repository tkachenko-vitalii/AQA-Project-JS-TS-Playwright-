import { expect, Locator, Page } from "@playwright/test";

export class Header {
    page: Page;
    cartQty: Locator
    cartIcon: Locator
    accName: Locator

    constructor(page:Page) {
        this.page = page;
        this.cartQty = this.page.getByTestId("cart-quantity");
        this.cartIcon = this.page.getByTestId("nav-cart");
        this.accName = this.page.getByTestId("nav-menu")
    }
    

    async checkQty(title:string): Promise<void> {
        await expect(this.page.getByTestId("cart-quantity")).toHaveText(title)
    }

    async openCart(): Promise<void> {
        await this.page.getByTestId("nav-cart").click()
    }

    async checkAccName(title:string): Promise<void> {
        await expect(this.page.getByTestId("nav-menu")).toContainText(title)
    }
}