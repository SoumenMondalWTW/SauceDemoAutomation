import { BasePage } from "../page-util/base-page";
import { Utility } from "../utils/utility";

export class MenuLogoutPage extends BasePage {
    constructor(page, browserContext) {
        super(page, browserContext);
    }

    private menuButton = '#react-burger-menu-btn';
    private logoutLink = '#logout_sidebar_link';

    async clickMenuButton(): Promise<void> {
        await Utility.clickElement(this.page,this.menuButton);
    }
    async clickLogoutLink(): Promise<void> {
        await Utility.clickElement(this.page,this.logoutLink);
    }       

}