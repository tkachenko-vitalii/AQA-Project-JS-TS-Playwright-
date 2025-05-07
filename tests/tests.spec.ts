import { expect, test} from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import dotenv from 'dotenv';
import { ProductPage } from '../pages/product.page';
import { HomePage } from '../pages/home.page';
dotenv.config();


test('Authorization', async ({ page }) => {

  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await page.goto('/auth/login')

await loginPage.login(process.env.USER_EMAIL!,process.env.USER_PASSWORD!)

await homePage.header.checkUrl('/account')

await loginPage.checkTitle('My account')

await homePage.header.checkAccName(process.env.USER_NAME!)

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


  await homePage.open();

  await productPage.openProduct('Slip Joint Pliers')

  await productPage.checkProductInfo('Slip Joint Pliers', 9.17)

  await expect (productPage.addToCartBtn).toBeVisible();

  await expect (productPage.addToFavouritesBtn).toBeVisible();

  await productPage.addToCartBtn.click()

  await productPage.checkToastNotification('Product added to shopping cart.')

  await homePage.header.checkQty('1');
  
  await homePage.header.openCart();

  await homePage.header.checkUrl('/checkout')

  await productPage.checkProductValue(1)

  await productPage.checkProductName('Slip Joint Pliers')
  
  await productPage.checkProceedBtn()
})

