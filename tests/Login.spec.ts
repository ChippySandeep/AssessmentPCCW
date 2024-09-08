import test from '@lib/BaseTest';
import { testConfig } from '../testConfig';
import { WebActions } from "@lib/WebActions";

let webActions: WebActions;

test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigateToURL();
});


test(`Positive Login Test`, { tag: '@E2E' }, async ({ loginPage }) => {
    await test.step('Verify Title', async () => {
        await loginPage.verifyPageTitle('Test Login | Practice Test Automation')
    });

    await test.step('Verify list header', async () => {
        await loginPage.verifyPageHeader();
    });

    await test.step('Verify user can login with valid credentials', async () => {
        await loginPage.loginToApplication(testConfig.username, testConfig.password);
        await loginPage.verifyPageurl('/logged-in-successfully/');
        await loginPage.verifyLoginSuccessful();
        await loginPage.verifyLogoutButtonExist();
    });
});

test(`Negative username test`, { tag: '@E2E' }, async ({ loginPage }) => {
    await test.step('Login with Invalid Username', async () => {

        await loginPage.loginToApplication("incorrectUser", testConfig.password);
        await loginPage.verifyInvalidUsernameErrorExist();
    });


});

test(`Negative password test`, { tag: '@E2E' }, async ({ loginPage }) => {
    await test.step('Login with Invalid Username', async () => {
        await loginPage.loginToApplication(testConfig.username, "incorrectPassword ");
        await loginPage.verifyInvalidPasswordErrorExist();
    });


});

