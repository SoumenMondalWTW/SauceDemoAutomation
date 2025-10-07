import { Page,BrowserContext } from 'playwright';


export class BasePage {
    protected page: Page;
    protected browserContext: BrowserContext;

    constructor(page: Page , browserContext: BrowserContext) {
        this.page = page; 
        this.browserContext = browserContext;
    }

    async clearCookies(): Promise<void> {
        await this.browserContext.clearCookies();
        await this.browserContext.clearPermissions();
    }
  
   async navigateTo(url: string): Promise<void> {
        await this.page.goto(url);
    }
    
}