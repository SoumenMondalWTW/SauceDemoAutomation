import { BasePage } from "../page-util/base-page";
import { Utility } from "../utils/utility";

export class CheckoutInfoPage extends BasePage {
    constructor(page, browserContext) {
        super(page, browserContext);
    }
    private firstNameInput = '#first-name';
    private lastNameInput = '#last-name';
    private postalCodeInput = '#postal-code';
    private continueButton = '#continue';
    private cancelButton = '#cancel';

    async enterUserInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await Utility.enterText(this.page,this.firstNameInput, firstName);
        await Utility.enterText(this.page,this.lastNameInput, lastName);
        await Utility.enterText(this.page,this.postalCodeInput, postalCode);
    }

    async clickContinue(): Promise<void> {
        await Utility.clickElement(this.page,this.continueButton);
    }

    async clickCancel(): Promise<void> {
        await Utility.clickElement(this.page,this.cancelButton);
    }
    

}