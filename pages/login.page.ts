import { Locator, Page } from "@playwright/test";
// import { HeaderFragment } from "../pages/fragments/headerFragment"


export class LoginPage{
    page: Page;
   // header: HeaderFragment; // ініціалізуємо фрагмент тут
    emailLocator: Locator;
    password: Locator;
    submitButton: Locator;
    constructor(page: Page) {
        this.page = page;
      //  this.header = new HeaderFragment(page); // фрагмент всередині Page Object
        this.emailLocator = this.page.locator('[data-test="email"]');
        this.password = this.page.locator('[data-test="password"]');
        this.submitButton = this.page.locator('[data-test="login-submit"]')
    }
    
    async login(email: string, password: string): Promise<void> {
      await this.emailLocator.fill(email);
      await this.password.fill(password);
      await this.submitButton.click();
    }
}