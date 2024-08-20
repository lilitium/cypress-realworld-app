import { expect, test } from "@playwright/test";
import { signIn, isMobile} from "./common/utils";
import { fetchDataFromDatabase } from "./common/fetchData";
import { PASSWORD } from './common/constants';


test.describe('User Sign-up and Login', () => {

    test('should redirect unauthenticated user to signin page', async({ page }) => {
        await page.goto('/personal');
        await expect(page).toHaveURL('/signin');
        await page.screenshot({path: "tests/screenshots/redirect-to-signin.png"});
    });

    test('should redirect to the home page after login', async({ page }) => {
        await page.goto('/signin');
        const users = await fetchDataFromDatabase('users');
        const user = users[0];
        await signIn(page, user.username, PASSWORD, true);
        await expect(page).toHaveURL('/');
    });

    test('should remember a user for 30 days after login', async({ page }) => {

        const users = await fetchDataFromDatabase('users');
        const user = users[0];
   
        await signIn(page, user.username, PASSWORD, true);
        await expect(page).toHaveURL('/');

        const allCoockies = await page.context().cookies();
        const userCookie = allCoockies.find((cookie) => cookie.name === 'connect.sid');
        expect(userCookie).not.toBe(null);
        expect(userCookie!.expires * 1000).toBeGreaterThan(Date.now() + 29 * 24 * 60 * 60 * 1000);

        const isMobileDevice = await isMobile(page);
        if (isMobileDevice) {
            await page.click('[data-test="sidenav-toggle"]')
        }
        await page.click('[data-test="sidenav-signout"]');
        await page.screenshot({path: "tests/screenshots/redirect-to-signin.png"});
        expect(page).toHaveURL('/signin');
    });
});
