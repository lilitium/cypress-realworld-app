import { test, expect } from '@playwright/test';
import { signIn, createBankAccount } from './common/utils';
import { fetchDataFromDatabase } from './common/fetchData';
import { PASSWORD } from './common/constants';
import { faker } from '@faker-js/faker';


test.describe('Bank accaunt creation', () => {
    test('User should be aalowed to create new bank account', async({page}) => {
        
        const users = await fetchDataFromDatabase('users');
        const user = users[0];
   
        await signIn(page, user.username, PASSWORD, true);
        const newBankName = 'AAA bank';
        
        await page.click('[data-test="sidenav-bankaccounts"]');
        await page.click('[data-test="bankaccount-new"]');

        const bankData = {
            bankName: faker.company.buzzPhrase(),
            routingNumber: faker.string.alphanumeric(9).toLocaleLowerCase(),
            accountNumber: faker.string.alphanumeric(10).toLocaleLowerCase()
        };

        await createBankAccount(page, bankData);
        const bank = (page.locator('text=' + newBankName));
        await expect(bank.nth(0)).toBeVisible();
    });
});