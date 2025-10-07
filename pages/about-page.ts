import { BasePage } from "../page-util/base-page";
import { Utility } from "../utils/utility";

export class AboutPage extends BasePage {
    constructor(page, browserContext) {
        super(page, browserContext);
    }

    private menuButton = '#react-burger-menu-btn';
    private aboutLink = '#about_sidebar_link';
    private productHeader = '//header//span[text()="Products"]';
    private solutionsHeader = '//header//span[text()="Solutions"]';
    private pricingHeader = '//header//span[text()="Pricing"]';
    private developersHeader = '//header//span[text()="Developers"]';
    private resourcesHeader = '//header//span[text()="Resources"]';
    private quickStartGuideSection = '//span[text()="Quickstart guides"]';
    private seleniumLink= '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Selenium"]';
    private cypressLink= '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Cypress"]';
    private appiumLink= '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Appium"]';   
    private playwrightLink= '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Playwright"]'; 
    private clickOkButtonOnAlert = '//button[text()="OK"]';   

    async clickMenuButton(): Promise<void> {
        await Utility.clickElement(this.page,this.menuButton);
    }
    async clickAboutLink(): Promise<void> {
        await Utility.clickElement(this.page,this.aboutLink);
    }
    async verifyAboutPageTitle(expectedTitle: string): Promise<boolean> {
        const actualTitle = await Utility.getPageTitle(this.page);
        console.log('About Page Title:', actualTitle);
        return actualTitle === expectedTitle;
    }

    async areHeaderResourcesVisible(): Promise<boolean> {
        await Utility.waitforPageLoad(this.page);
        const productVisible = await Utility.isElementVisible(this.page,this.productHeader);
        const solutionsVisible = await Utility.isElementVisible(this.page,this.solutionsHeader);
        const pricingVisible = await Utility.isElementVisible(this.page,this.pricingHeader);
        const developersVisible = await Utility.isElementVisible(this.page,this.developersHeader);
        const resourcesVisible = await Utility.isElementVisible(this.page,this.resourcesHeader);
        return productVisible && solutionsVisible && pricingVisible && developersVisible && resourcesVisible;
    }
    async hoverOnDevelopersHeader(): Promise<void> {
        await this.page.hover(this.developersHeader);
    }

    async areFrameworksAvailableUnderQuickStartGuide(): Promise<boolean> {
        await Utility.waitforPageLoad(this.page);
        const seleniumVisible = await Utility.isElementVisible(this.page,this.seleniumLink);
        const cypressVisible = await Utility.isElementVisible(this.page,this.cypressLink);
        const appiumVisible = await Utility.isElementVisible(this.page,this.appiumLink);
        const playwrightVisible = await Utility.isElementVisible(this.page,this.playwrightLink);
        return seleniumVisible && cypressVisible && appiumVisible && playwrightVisible;
    }

    async clickSeleniumLink(): Promise<void> {
        const [newPage] = await Promise.all([
            this.browserContext.waitForEvent('page'),
            this.page.click(this.seleniumLink), // Opens a new tab
        ]);
        await newPage.waitForLoadState();
        this.page = newPage; // Switch context to the new page
    }

    async verifyNewlyOpenedPageTitle(expectedTitle: string): Promise<boolean> {
        const actualTitle = await Utility.getPageTitle(this.page);
        return actualTitle === expectedTitle;
    }
   async handleAlertIfPresent(): Promise<void> {
        try {
            await this.page.waitForSelector(this.clickOkButtonOnAlert);
            await Utility.clickElement(this.page, this.clickOkButtonOnAlert);
        } catch (error) {
            // No alert appeared within the timeout
        }
   }

}