import { BasePage } from "../page-util/base-page";
import { Utility } from "../utils/utility";


export class CheckoutOverviewPage extends BasePage {
    constructor(page, browserContext) {
        super(page, browserContext);
    }

    private finishButton = '#finish';
    private cancelButton = '#cancel';
    private inventoryItemName = '.inventory_item_name';
    private inventoryItemPrice = '.inventory_item_price';
    private summarySubtotalLabel = '.summary_subtotal_label';
    private summaryTaxLabel = '.summary_tax_label';
    private summaryTotalLabel = '.summary_total_label'; 
    private cartItemList = '.cart_item';


    async getItemCount(): Promise<number> {
        const items = await this.page.$$(this.cartItemList);
        return items.length;
    }

    async clickFinish(): Promise<void> {
        await Utility.clickElement(this.page,this.finishButton);
    }
    async clickCancel(): Promise<void> {
        await Utility.clickElement(this.page,this.cancelButton);
    }

    async getItemTotal(): Promise<number> {
        const subtotalElement = await this.page.$(this.summarySubtotalLabel);   
        if (subtotalElement) {
            const subtotalText = await subtotalElement.textContent();
            const match = subtotalText?.match(/Item total: \$([0-9]+\.[0-9]{2})/);
            if (match && match[1]) {
                return parseFloat(match[1]);
            }   
        }
        return 0;
    }
    



}