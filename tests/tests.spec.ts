import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();


test('Authorization', async ({ page }) => {
  await page.goto('/auth/login')
await page.getByTestId("email").fill(process.env.USER_EMAIL!)
await page.getByTestId("password").fill(process.env.USER_PASSWORD!)
await page.getByTestId("login-submit").click()
await expect(page).toHaveURL('/account')
await expect(await page.getByTestId('page-title')).toContainText('My account')
await expect(await page.getByTestId("nav-menu")).toContainText(process.env.USER_NAME!)
});


test('ProductInfo', async ({ page }) => {
    await page.goto('')
    await page.getByTestId("product-01JSM50PVH983VHEGPWSHC31F0").click();
    await expect(page.url()).toContain('/product')
    await expect(await page.getByTestId("product-name")).toHaveText('Combination Pliers')
    await expect(await page.getByTestId('unit-price')).toHaveText('14.15')
    await expect(await page.getByTestId('add-to-cart')).toBeVisible()
    await expect(await page.getByTestId('add-to-favorites')).toBeVisible()
})



test('AddToCart', async ({ page }) => {
    await page.goto('')
    await page.getByTestId("product-01JSM50PVRYCV4KYD8Q1GWXRN3").click();
    await expect(page.url()).toContain('/product')
    await expect(await page.getByTestId("product-name")).toHaveText('Slip Joint Pliers')
    await expect(await page.getByTestId("unit-price")).toHaveText('9.17')
    await page.getByTestId("add-to-cart").click()
    await expect(await page.locator("[id='toast-container']")).toBeVisible()
    await expect(await page.locator("[id='toast-container']")).toHaveText('Product added to shopping cart.')
    await expect(await page.locator("[id='toast-container']")).toBeHidden({ timeout: 8000 })
    await expect(await page.getByTestId("cart-quantity")).toHaveText('1')
    await page.getByTestId("nav-cart").click()
    await expect(page).toHaveURL('/checkout')
    await expect(await page.getByTestId("product-quantity")).toHaveValue('1')
    await expect(await page.getByTestId("product-title")).toHaveText('Slip Joint Pliers')
    await expect(await page.getByTestId("proceed-1")).toBeVisible()
})

