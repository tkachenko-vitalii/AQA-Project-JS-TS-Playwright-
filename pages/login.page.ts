import { expect, Locator, Page } from "@playwright/test";


export class LoginPage{
    readonly page: Page;
    readonly emailLocator: Locator;
    readonly password: Locator;
    readonly submitButton: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailLocator = this.page.getByTestId('email');
        this.password = this.page.getByTestId('password');
        this.submitButton = this.page.getByTestId('login-submit')
        this.pageTitle = this.page.getByTestId('page-title')
    }

    async open():Promise<void> {
      await this.page.goto('/auth/login');
  }
    
    async login(email: string, password: string): Promise<void> {
      await this.emailLocator.fill(email);
      await this.password.fill(password);
      await this.submitButton.click();
    }

    async checkTitle(title:string):Promise<void> {
      await expect (this.pageTitle).toContainText(title)
    }
}