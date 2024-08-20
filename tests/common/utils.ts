import { Page } from '@playwright/test'

export async function signIn (page: Page, username: string, password: string, rememberUser: boolean = false){ 
    await page.goto('http://localhost:3000/signin');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    if (rememberUser){
        await page.check('input[name="remember"]'); 
    }
    await page.click('button[type="submit"]');    
};

export const isMobile = async (page: Page) => {
    return page.viewportSize()!.width < 414; 
};

export async function signUp(page: Page, {firstName, lastName, username, password}:{firstName: string, lastName: string, username: string, password: string} ) {      
    await page.goto('/signin');
    await page.click('[data-test="signup"]');
    await page.click('[data-test="signup"]');
    await page.fill('input[name="firstName"]', firstName)
    await page.fill('input[name="lastName"]', lastName);
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.fill('input[name="confirmPassword"]', password);
    await page.click('button[type="submit"]');
};

export async function createBankAccount (page: Page, {bankName, routingNumber, accountNumber}:{bankName: string, routingNumber: string, accountNumber: string} ) {
    await page.fill('input[name="bankName"]', bankName);
    await page.fill('input[name="routingNumber"]', routingNumber);
    await page.fill('input[name="accountNumber"]', accountNumber);
    await page.click('button[type="submit"]');
};