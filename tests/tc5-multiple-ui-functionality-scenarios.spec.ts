import { expect, test } from '@playwright/test';
import {LoginPage} from '../pages/login-page';
import { aboutPageTitle, baseUrl, homePageTitle, seleniumPageTitle, successLoginCredentials } from '../test-data/sauce-demo-test-data';
import { AboutPage } from '../pages/about-page';

test.describe('Multiple UI Functionality Scenarios', () => {

    test('Login ,Goto About section , Verify Header Resources, Hover onto Developers section and verify , Click on Selenium link and verify newly opend page ',{tag :['@tc5','@regression']}, async ({ page, context }) => {    
        const loginPage=new LoginPage(page,context);
        const aboutPage=new AboutPage(page,context); 

        //Login to the application
        await loginPage.clearCookies();
        await loginPage.navigateTo(baseUrl);
        await loginPage.login(successLoginCredentials.username,successLoginCredentials.password);
        const isTitleCorrect = await loginPage.verifyPageTitle(homePageTitle);
        expect(isTitleCorrect).toBeTruthy();

        //Goto About section
        await aboutPage.clickMenuButton();
        await aboutPage.clickAboutLink();
        const isAboutPageTitleCorrect = await aboutPage.verifyAboutPageTitle(aboutPageTitle);
        expect(isAboutPageTitleCorrect).toBeTruthy();

        //Verify Header Resources
        const areHeaderResourcesVisible = await aboutPage.areHeaderResourcesVisible();
        expect(areHeaderResourcesVisible).toBeTruthy();

        //Hover onto Developers section and verify the dropdown is displayed
        await aboutPage.hoverOnDevelopersHeader();
        const areFrameworksAvailableUnderQuickStartGuide= await aboutPage.areFrameworksAvailableUnderQuickStartGuide();
        expect(areFrameworksAvailableUnderQuickStartGuide).toBeTruthy();

        //Click on Selenium link and verify newly opend page
        await aboutPage.clickSeleniumLink();
        const isNewPageTitleCorrect = await aboutPage.verifyNewlyOpenedPageTitle(seleniumPageTitle);
        expect(isNewPageTitleCorrect).toBeTruthy();

    });

})