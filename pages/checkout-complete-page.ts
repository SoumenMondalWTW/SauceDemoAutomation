import { BasePage } from "../page-util/base-page";
import { Utility } from "../utils/utility";

export class CheckoutCompletePage extends BasePage {
    constructor(page, browserContext) {
        super(page, browserContext);
    } 
    
    private backHomeButton = '#back-to-products';
    private completeHeader = '.complete-header';
    private completeText = '.complete-text';

    async clickBackHome(): Promise<void> {
        await Utility.clickElement(this.page,this.backHomeButton);
    }

    async verifySuccessOrderMessage(thankyouMsg:string,orderMsg:string): Promise<void> {
        const header = await this.page.textContent(this.completeHeader);
        const text = await this.page.textContent(this.completeText);
        if(header?.includes(thankyouMsg)===false){
            throw new Error(`Expected header message to be '${thankyouMsg}' but got '${header}'`);
        }
        if(text?.includes(orderMsg)===false){
            throw new Error(`Expected order message to be '${orderMsg}' but got '${text}'`);
        }
    }
    


}