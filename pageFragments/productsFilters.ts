import { expect, Locator, Page } from "@playwright/test";

export class ProductsFiltersFragment {
  sortDropdown: Locator;

  constructor(readonly page: Page) {
    this.sortDropdown = page.locator('[data-test="sort"]');
  }

  
  async selectSortOption(optionText: string) {
    await this.sortDropdown.selectOption({ label: optionText });
  }

  async filterByCategory(label: string) {
    const checkbox = this.page.locator('label').filter({ hasText: label });
    await checkbox.click();
  }
}