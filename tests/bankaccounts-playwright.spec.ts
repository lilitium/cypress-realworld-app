import { test, expect } from '@playwright/test';
import { signIn, createBankAccount, isMobile } from './common/utils';
import { fetchDataFromDatabase } from './common/fetchData';
import { PASSWORD } from './common/constants';
import { faker } from '@faker-js/faker';
import { seedData } from './common/seedData';

test.beforeEach(async () => {
    await seedData();
});

test.describe('Bank Accaunts', () => {
    test('User should be allowed to create new bank account', async({page}) => {
        const users = await fetchDataFromDatabase('users');
        const user = users[0];
   
        await signIn(page, user.username, PASSWORD, true);
        
        const mobileDevice = await isMobile(page);
        if (mobileDevice) {
            await page.click('[data-test="sidenav-toggle"]');
        }
        await page.click('[data-test="sidenav-bankaccounts"]');
        await page.click('[data-test="bankaccount-new"]');

        const bankData = {
            bankName: faker.company.buzzPhrase(),
            routingNumber: faker.string.alphanumeric(9).toLocaleLowerCase(),
            accountNumber: faker.string.alphanumeric(10).toLocaleLowerCase()
        };

        await createBankAccount(page, bankData);
        const bank = (page.locator('text=' + bankData.bankName));
        await expect(bank.nth(0)).toBeVisible();
    });
});