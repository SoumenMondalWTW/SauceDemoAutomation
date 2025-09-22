import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import {baseUrl, successLoginCredentials,lockedOutUserCredentials,homePageTitle,errorMessageForLockedOutUser} from '../test-data/sauce-demo-test-data';

test.describe('Saucedemo tests for successful and unsuccessful login', () => {
    
    test('Successful Login Test', {tag :['@tc1','@loginSuccess','@regression']} ,async ({ page, context }) => {
        const loginPage=new LoginPage(page,context);
        //Login to the application
        await loginPage.clearCookies();
        await loginPage.navigateTo(baseUrl);
        await loginPage.login(successLoginCredentials.username,successLoginCredentials.password);
        const isTitleCorrect = await loginPage.verifyPageTitle(homePageTitle);
        expect(isTitleCorrect).toBeTruthy();

    });

    test('Unsuccessful Login Test - Locked Out User', {tag :['@tc2','@loginFailure','@regression']},async ({ page, context }) => {
        const loginPage=new LoginPage(page,context);
        await loginPage.clearCookies();
        await loginPage.navigateTo(baseUrl);
        await loginPage.login(lockedOutUserCredentials.username,lockedOutUserCredentials.password);
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain(errorMessageForLockedOutUser);
    }); 
});