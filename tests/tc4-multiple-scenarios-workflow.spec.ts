import { expect, test } from '@playwright/test';
import {LoginPage} from '../pages/login-page';
import {InventoryPage} from '../pages/inventory-page';
import {YourCartPage} from '../pages/your-cart-page';
import { CheckoutInfoPage } from '../pages/checkout-information-page';  
import {CheckoutOverviewPage} from '../pages/checkout-overview-page';
import { CheckoutCompletePage } from '../pages/checkout-complete-page';
import {MenuLogoutPage} from '../pages/menu-logout-page';
import * as data from '../test-data/sauce-demo-test-data';

test.describe('Multiple Scenarios Workflow', () => {

    test('On Product page, sort the product by price (low to high) and verify ascending order',{tag :['@tc4','@regression']}, async ({ page, context }) => {   
        const loginPage = new LoginPage(page, context);
        const inventoryPage=new InventoryPage(page,context);
        //Login to the application
        await loginPage.clearCookies();
        await loginPage.navigateTo(data.baseUrl);
        await loginPage.login(data.successLoginCredentials.username,data.successLoginCredentials.password);
        const isTitleCorrect = await loginPage.verifyPageTitle(data.homePageTitle);
        expect(isTitleCorrect).toBeTruthy();
        //Sort the product by price(low to high) and verify ascending order
        await inventoryPage.isInventoryPageDisplayed();
        await inventoryPage.sortProductsByGivenOption(data.sortByPriceLowToHigh);
        const isSorted = await inventoryPage.verifyProductsSortedByPriceLowToHigh();
        expect(isSorted).toBeTruthy();
    });

    test('Add multiple items to cart ,check remove button enabled, capture price , validate cart items in your cart page , assert price, remove items from cart then checkout ',{tag :['@tc4','@regression']},async ({ page, context }) => {
        const loginPage=new LoginPage(page,context);
        const inventoryPage=new InventoryPage(page,context);
        const yourCartPage=new YourCartPage(page,context);
        const checkoutInfoPage=new CheckoutInfoPage(page,context);
        const checkoutOverviewPage=new CheckoutOverviewPage(page,context);
        const checkoutCompletePage=new CheckoutCompletePage(page,context);
        const menuLogoutPage=new MenuLogoutPage(page,context);

        //Login to the application
        await loginPage.clearCookies();
        await loginPage.navigateTo(data.baseUrl);
        await loginPage.login(data.successLoginCredentials.username,data.successLoginCredentials.password);
        const isTitleCorrect = await loginPage.verifyPageTitle(data.homePageTitle);
        expect(isTitleCorrect).toBeTruthy();

        //Add multiple items to the cart and capture the price
        await inventoryPage.isInventoryPageDisplayed();
        await inventoryPage.addProductToCartByProductName(data.firstProductName);
        await inventoryPage.addProductToCartByProductName(data.secondProductName);
        await inventoryPage.isRemoveButtonVisibleForProduct(data.firstProductName);
        await inventoryPage.isRemoveButtonVisibleForProduct(data.secondProductName);
        const firstProductPriceInIventoryPage= await inventoryPage.getProductPriceByName(data.firstProductName);
        console.log(data.firstProductName+' price in inventory page:', firstProductPriceInIventoryPage);
        const secondProductPriceInIventoryPage= await inventoryPage.getProductPriceByName(data.secondProductName);
        console.log(data.secondProductName+' price in inventory page:', secondProductPriceInIventoryPage);
        const cartItemCountInventoryPage = await inventoryPage.getShoppingCartItemCount();
        expect(cartItemCountInventoryPage).toBe(2);
        await inventoryPage.navigateToCart();

        //Validate the items are added to the cart and validate the price in your cart page then remove one item from the cart
        const firstProductPriceInYourCartPage= await yourCartPage.productPriceByName(data.firstProductName);
        console.log(data.firstProductName+' price in your cart page:', firstProductPriceInYourCartPage);
        const secondProductPriceInYourCartPage= await yourCartPage.productPriceByName(data.secondProductName);
        console.log(data.secondProductName+' price in your cart page:', secondProductPriceInYourCartPage);
        expect(firstProductPriceInIventoryPage).toBe(firstProductPriceInYourCartPage);
        expect(secondProductPriceInIventoryPage).toBe(secondProductPriceInYourCartPage);
        console.log('Removing '+data.secondProductName+' from the cart');
        await yourCartPage.removeProductFromCartByProductName(data.secondProductName); // secondProductName = 'Sauce Labs Onesie'
        const qty=await yourCartPage.productQtyByName(data.firstProductName); // firstProductName = 'Sauce Labs Bike Light'
        const cartItemCountYourCartPage = await yourCartPage.cartItemCount();
        expect(cartItemCountYourCartPage).toBe(qty);
        await yourCartPage.clickCheckout();

        //Enter checkout information and continue
        await checkoutInfoPage.enterUserInformation(data.checkoutInformation.firstName,data.checkoutInformation.lastName,data.checkoutInformation.postalCode);
        await checkoutInfoPage.clickContinue(); 

        //Capture item total and assert the price in checkout overview page
        const itemTotalInCheckoutOverviewPage= await checkoutOverviewPage.getItemTotal();
        console.log('Item total in checkout overview page:', itemTotalInCheckoutOverviewPage);
        expect(itemTotalInCheckoutOverviewPage).toBe(firstProductPriceInIventoryPage);
        await checkoutOverviewPage.clickFinish();

        //Validate the thank you message is displayed
        await checkoutCompletePage.verifySuccessOrderMessage(data.thankYouMessage,data.orderMessage);

        //Logout from the application
        await menuLogoutPage.clickMenuButton();
        await menuLogoutPage.clickLogoutLink();
        const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
        expect(isLoginButtonVisible).toBeTruthy();  
    
    });
});



