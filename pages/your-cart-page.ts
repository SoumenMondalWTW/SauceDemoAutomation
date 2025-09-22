import { BasePage } from "../page-util/base-page";
import { Utility } from "../utils/utility";

export class YourCartPage extends BasePage {
    constructor(page, browserContext) {
        super(page, browserContext);
    }   

    private cartItemList = '.cart_item';
    private checkoutButton = '#checkout';
    private continueShoppingButton = '#continue-shopping';
    private removeButtonGivenProductName= (productName: string) => `//div[text()='${productName}']/ancestor::div[@class='cart_item']//button[text()='Remove']`;
    private shoppingCartBadge = '.shopping_cart_badge';
    private shoppingCartLink = '.shopping_cart_link';
    private productPrice = (productName: string) => `//div[text()='${productName}']/ancestor::div[@class='cart_item']//div[@class='inventory_item_price']`;
    private getQtyGivenProductName= (productName: string) => `//div[text()='${productName}']/ancestor::div[@class='cart_item']//div[@class='cart_quantity']`;
    //Sauce Labs Backpack

    async cartItemCount(): Promise<number> {
        const items = await this.page.$$(this.cartItemList);
        return items.length;
    }
    async clickCheckout(): Promise<void> {
        await Utility.clickElement(this.page,this.checkoutButton);
    }
    async clickContinueShopping(): Promise<void> {
        await Utility.clickElement(this.page,this.continueShoppingButton);
    }
    async removeProductFromCartByProductName(productName: string): Promise<void> {
        await Utility.clickElement(this.page, this.removeButtonGivenProductName(productName));
    }
    async getShoppingCartItemCount(): Promise<number> {
        const badge = await this.page.$(this.shoppingCartBadge);
        if (badge) {
            const textContent = await badge.textContent();
            return parseInt(textContent || '0', 10);
        }
        return 0;
    }
    
    async productPriceByName(productName: string): Promise<number> {
        const priceSelector = this.productPrice(productName);
        const priceElement = await this.page.$(priceSelector);  
        if (priceElement) {
            const priceText = await priceElement.textContent();
            return parseFloat(priceText?.replace('$', '') || '0');
        }
        return 0;
    }
    
    async productQtyByName(productName: string): Promise<number> {
        const qtySelector = this.getQtyGivenProductName(productName);
        const qtyElement = await this.page.$(qtySelector);  
        if (qtyElement) {
            const qtyText = await qtyElement.textContent();
            return parseInt(qtyText || '0', 10);
        }
        return 0;
    }


}
