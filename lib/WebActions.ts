import type { Page } from '@playwright/test';
import { BrowserContext } from '@playwright/test';
import * as CryptoJS from 'crypto-js';
import { testConfig } from '../testConfig';

export class WebActions {
    readonly page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async decipherPassword(): Promise<string> {
        const key = `SECRET`;
        //ENCRYPT
        const cipher = CryptoJS.AES.encrypt('Password123', key);
        console.log(cipher.toString());
        //return cipher.toString();
        return CryptoJS.AES.decrypt(cipher, key).toString(CryptoJS.enc.Utf8);
    }
}