import { Locator, Page } from "@playwright/test";
import { Header } from "./header";

export class ProductsFiltersFragment {
  sortDropdown: Locator;

  constructor(readonly page: Page) {
    this.sortDropdown = page.getByTestId('sort');
  }

  
  async selectSortOption(optionText: string) {
    await this.sortDropdown.selectOption({ label: optionText });
  }

  async filterByCategory(label: string) {
    const checkbox = this.page.locator('label').filter({ hasText: label });
    await checkbox.click();
  }
}