import { TestInfo } from "@playwright/test";
import { TESTS_STARTED_AT } from "./constants";

export const getScreenshotPath = (testName: string, testInfo: TestInfo) => {
    const browser = testInfo.project.name;
    const mobile = testInfo.project.use.isMobile ? 'mobile' : 'desktop';

    return `tests/screenshots/${TESTS_STARTED_AT}/${testName}-${browser}-${mobile}.png`;
}