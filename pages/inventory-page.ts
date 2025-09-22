import { BasePage } from "../page-util/base-page";
import { Utility } from "../utils/utility";

export class InventoryPage extends BasePage {
    constructor(page, browserContext) {
        super(page, browserContext);
    }   

    private inventoryContainer = '#inventory_container';
    private addToCartButtonGivenProductName= (productName: string) => `//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button[text()='Add to cart']`;
    private removeButtonGivenProductName= (productName: string) => `//div[text()='${productName}']/ancestor::div[@class='inventory_item']//button[text()='Remove']`
    private shoppingCartBadge = '.shopping_cart_badge';
    private shoppingCartLink = '.shopping_cart_link';
    private sortDropdown = '.product_sort_container';
    private productPrice = (productName: string) => `//div[text()='${productName}']/ancestor::div[@class='inventory_item']//div[@class='inventory_item_price']`;


    //Sauce Labs Backpack

    async isInventoryPageDisplayed(): Promise<void> {
         await Utility.waitForElementToBeVisible(this.page, this.inventoryContainer);
    }

    async addProductToCartByProductName(productName: string): Promise<void> {
        await Utility.clickElement(this.page, this.addToCartButtonGivenProductName(productName));
    }
    async isRemoveButtonVisibleForProduct(productName: string): Promise<boolean> {
        return await Utility.isElementVisible(this.page, this.removeButtonGivenProductName(productName));
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
    async navigateToCart(): Promise<void> {
        await Utility.clickElement(this.page,this.shoppingCartLink);
    }

    async sortProductsByGivenOption(option: string): Promise<void> {
        await this.page.selectOption(this.sortDropdown, { label: option });
    }

    async verifyProductsSortedByPriceLowToHigh(): Promise<boolean> {
        const prices = await this.page.$$eval('.inventory_item_price', elements =>
            elements.map(el => parseFloat(el.textContent?.replace('$', '') || '0'))
        );
        for (let i = 1; i < prices.length; i++) {
            if (prices[i] < prices[i - 1]) {
                return false;
            }   
        }
        console.log('Products are sorted by price from low to high:', prices);
        return true;
    }

    async getProductPriceByName(productName: string): Promise<number> {
        const priceSelector = this.productPrice(productName);
        const priceElement = await this.page.$(priceSelector);  
        if (priceElement) {
            const priceText = await priceElement.textContent();
            return parseFloat(priceText?.replace('$', '') || '0');
        }
        return 0;
    }



}