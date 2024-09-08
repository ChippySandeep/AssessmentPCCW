import { Page, BrowserContext, Locator, expect } from '@playwright/test';
import { WebActions } from "@lib/WebActions";
import { Console } from 'console';
import { number } from 'zod';

let webActions: WebActions;

export class LoginPage {

    readonly page: Page;
    readonly context: BrowserContext;
    readonly txtusername: Locator;
    readonly txtpassword: Locator;
    readonly btnSubmit: Locator;
    readonly loginheader: Locator;
    readonly loginSuccessful: Locator;
    readonly lblError: Locator

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
        webActions = new WebActions(this.page, this.context);
        this.txtusername = page.locator('#username');
        this.txtpassword = page.locator('#password');
        this.btnSubmit = page.locator('#submit');
        this.loginheader = page.getByRole('heading', { name: 'Test Login' });
        this.loginSuccessful = page.getByRole('heading', { name: 'Logged In Successfully' });
        this.lblError = page.locator('#error');
    }

    async navigateToURL(): Promise<void> {
        await this.page.goto("/practice-test-login/");
    }

    async verifyPageTitle(title: string): Promise<void> {
        await expect(this.page).toHaveTitle(title);

    }
    async verifyPageHeader() {
        await expect(this.loginheader).toBeVisible();
    }

    async loginToApplication(strusername: string, strpassword: string): Promise<void> {
        const decipherPassword = await webActions.decipherPassword();
        await this.txtusername.fill(strusername);
        await this.txtpassword.fill(strpassword);
        await this.btnSubmit.click();
    }

    async verifyLoginSuccessful(): Promise<void> {
        await expect(this.loginSuccessful).toBeVisible();
    }

    async verifyPageurl(strUrl: string): Promise<void> {
        await expect(this.page).toHaveURL(strUrl);
    }


    async verifyLogoutButtonExist(): Promise<void> {
        await expect(this.page.getByText('Log out')).toBeVisible();
    }

    async verifyInvalidUsernameErrorExist(): Promise<void> {
        await expect(this.lblError).toBeVisible();
        await expect(this.lblError).toHaveText('Your username is invalid!');
    }

    async verifyInvalidPasswordErrorExist(): Promise<void> {
        await expect(this.lblError).toBeVisible();
        await expect(this.lblError).toHaveText('Your password is invalid!');
    }


}
