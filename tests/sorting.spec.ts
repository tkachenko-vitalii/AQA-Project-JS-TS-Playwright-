import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { ProductPage } from '../pages/product.page.ts';
import { ProductsFiltersFragment } from '../pageFragments/productsFilters.ts';
import { PowerTools } from '../tools.ts';
import dotenv from 'dotenv';
dotenv.config();


test.describe('Sorting by name', () => {
    const sortOptions = [
      { label: 'Name (A - Z)', ascending: true },
      { label: 'Name (Z - A)', ascending: false },
    ];
  
    for (const { label, ascending } of sortOptions) {
      
      test(`Verify sorting by ${label}`, async ({ page }) => {
        
        const homePage = new HomePage(page)
        const filters = new ProductsFiltersFragment(page);
        await homePage.open();

        await filters.selectSortOption(label);
        const productNames = await homePage.getProductNames();
  
        const sortedNames = await homePage.sortNames(productNames,ascending)
  
        expect(productNames).toEqual(sortedNames);
      });
    }
  });
  
  test.describe('Verify sorting by price', () => {
      const sortingOptions = [
        { label: 'Price (Low - High)', ascending: true },
        { label: 'Price (High - Low)', ascending: false },
      ];
    
      for (const { label, ascending } of sortingOptions) {
        test(`Sorting by ${label}`, async ({ page }) => {
          const homePage = new HomePage(page);
          const filters = new ProductsFiltersFragment(page);
        
          await homePage.open();

          await filters.selectSortOption(label);
    
          const prices = await homePage.getProductPrices();

          const sorted = await homePage.sortPrices(prices, ascending);
    
          expect(prices).toEqual(sorted);
        });
      }
    });
  
    test('Filter products by category', async ({ page }) => {
      const homePage = new HomePage(page);
      const filters = new ProductsFiltersFragment(page);
      await homePage.open();

      await filters.filterByCategory(PowerTools.Sander);
    
      const productNames = await homePage.getProductNames();
    
      for (const name of productNames) {
        expect(name).toContain('Sander');
      }
    });
    