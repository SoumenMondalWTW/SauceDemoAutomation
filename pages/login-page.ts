import { BasePage } from "../page-util/base-page";
import { Utility } from "../utils/utility";


export class LoginPage extends BasePage {

    constructor(page, browserContext) {
        super(page, browserContext);
    }

    private usernameInput = '#user-name';
    private passwordInput = '#password'
    private loginButton = '#login-button';
    private errorMessage = '[data-test="error"]';
    
   
    async login(username: string,password: string): Promise<void> {
        await Utility.enterText(this.page,this.usernameInput, username);
        await Utility.enterText(this.page,this.passwordInput, password);
        await Utility.clickElement(this.page,this.loginButton);
    }

    async verifyPageTitle(expectedTitle: string): Promise<boolean> {
        const actualTitle = await Utility.getPageTitle(this.page);
        return actualTitle === expectedTitle;
    }
  
    async getErrorMessage(): Promise<string> {
        return (await this.page.textContent(this.errorMessage)) || '';
    }

    async isLoginButtonVisible(): Promise<boolean> {
        return await Utility.isElementVisible(this.page,this.loginButton);
    }

   

}