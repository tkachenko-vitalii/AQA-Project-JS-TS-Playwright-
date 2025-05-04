import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import dotenv from 'dotenv';
import { ProductPage } from '../pages/product.page';
import { HomePage } from '../pages/home.page';
import { Header } from '../pageFragments/header.ts';
dotenv.config();


test('Authorization', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const header = new Header(page);

  await page.goto('/auth/login')

await loginPage.login(process.env.USER_EMAIL!,process.env.USER_PASSWORD!)

await expect(page).toHaveURL('/account')
await expect(await page.getByTestId('page-title')).toContainText('My account')

await header.checkAccName(process.env.USER_NAME!)
});


test('ProductInfo', async ({ page }) => {
  const homePage = new HomePage(page) 

  const productPage = new ProductPage(page)

  await homePage.open();

  await productPage.openProduct('Combination Pliers')
    
  await productPage.checkProductInfo('Combination Pliers', 14.15)
})



test('AddToCart', async ({ page }) => {

  const homePage = new HomePage(page) 
  const productPage = new ProductPage(page)
  const header = new Header(page);

  await homePage.open();

  await productPage.openProduct('Slip Joint Pliers')

  await productPage.checkProductInfo('Slip Joint Pliers', 9.17)

  await page.getByTestId("add-to-cart").click()

  await productPage.checkCartIcon('Product added to shopping cart.')

  await header.checkQty('1');
  
  await header.openCart();

  await expect(page).toHaveURL('/checkout')

  await expect(await page.getByTestId("product-quantity")).toHaveValue('1')
  await expect(await page.getByTestId("product-title")).toHaveText('Slip Joint Pliers')
  await expect(await page.getByTestId("proceed-1")).toBeVisible()
})

