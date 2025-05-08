import { Locator, Page } from "@playwright/test";

export class ProductsFiltersFragment {
  sortDropdown: Locator;

  constructor(readonly page: Page) {
    this.sortDropdown = page.getByTestId('sort');
  }

  
  async selectSortOption(optionText: string):Promise<void> {
    await this.sortDropdown.selectOption({ label: optionText });
  }

  async filterByCategory(label: string):Promise<void> {
    const checkbox = this.page.locator('label').filter({ hasText: label });
    await checkbox.click();
  }
}