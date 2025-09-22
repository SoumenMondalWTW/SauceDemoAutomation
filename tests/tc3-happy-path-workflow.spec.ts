import { expect, test } from '@playwright/test';
import {LoginPage} from '../pages/login-page';
import {InventoryPage} from '../pages/inventory-page';
import {YourCartPage} from '../pages/your-cart-page';
import { CheckoutInfoPage } from '../pages/checkout-information-page';  
import {CheckoutOverviewPage} from '../pages/checkout-overview-page';
import { CheckoutCompletePage } from '../pages/checkout-complete-page';
import {MenuLogoutPage} from '../pages/menu-logout-page';
import * as data from '../test-data/sauce-demo-test-data';
test.describe('Happy Path Workflow - User add an item to cart then checkout ', () => {

    test('User add an item to cart then checkout',{tag :['@tc3','@regression']}, async ({ page, context }) => {
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

        //Add an item to the cart
        await inventoryPage.isInventoryPageDisplayed();
        await inventoryPage.addProductToCartByProductName(data.productName);
        const cartItemCountInventoryPage = await inventoryPage.getShoppingCartItemCount();
        expect(cartItemCountInventoryPage).toBe(1);

        //Navigate to the cart and validate the item is added to the cart and click on checkout
        await inventoryPage.navigateToCart();
        const itemsInCart = await yourCartPage.cartItemCount();
        expect(itemsInCart).toBe(1);
        const cartItemCountYourCartPage = await yourCartPage.cartItemCount();
        expect(cartItemCountYourCartPage).toBe(1);
        await yourCartPage.clickCheckout();

        //Enter checkout information and continue
        await checkoutInfoPage.enterUserInformation(data.checkoutInformation.firstName,data.checkoutInformation.lastName,data.checkoutInformation.postalCode);
        await checkoutInfoPage.clickContinue();

        //Validate the item is listed in the checkout overview page and finish the checkout
        const itemsInCheckoutOverview = await checkoutOverviewPage.getItemCount();
        expect(itemsInCheckoutOverview).toBe(1);
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