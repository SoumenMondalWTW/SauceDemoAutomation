import { Page } from 'playwright';
export class Utility {

    static async getPageTitle(page:Page): Promise<string> {
        return page.title();
    }
   
    static async clickElement(page:Page , selector: string): Promise<void> {
        await page.click(selector);
    }

    static async waitforPageLoad(page:Page): Promise<void> {
        await page.waitForLoadState('load');
    }
  
    static async enterText(page:Page ,selector: string, text: string): Promise<void> {
        await page.fill(selector, text);
    }

   
    static async getElementText(page:Page,selector: string): Promise<string> {
        return (await page.textContent(selector)) ?? '';
    }

    
    static async isElementVisible(page:Page,selector: string): Promise<boolean> {
        return await page.isVisible(selector);
    }

  
    static async navigateTo(page:Page,url: string): Promise<void> {
        await page.goto(url);
    }
}