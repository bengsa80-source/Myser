import { test, expect } from "@playwright/test";

test("simple homepage keeps business and justice platforms separate", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "وش تحتاج تنجز؟",
  );
  await expect(page.locator(".portal-sector")).toHaveCount(4);
  await page
    .locator(".portal-sector")
    .filter({ hasText: "التجارة والأعمال" })
    .click();
  await expect(page).toHaveURL(/\/sectors\/business$/);
  await expect(page.locator(".directory-card")).toHaveCount(5);
  await expect(page.locator(".directory-grid")).toContainText(
    "المركز السعودي للأعمال",
  );
  await expect(page.locator(".directory-grid")).not.toContainText("ناجز");
  await page.getByRole("link", { name: "الرئيسية", exact: true }).click();
  await page
    .locator(".portal-sector")
    .filter({ hasText: "العدل والقضاء" })
    .click();
  await expect(page).toHaveURL(/\/sectors\/justice$/);
  await expect(page.locator(".directory-card")).toHaveCount(3);
  await expect(page.locator(".directory-grid")).toContainText("ناجز");
  await expect(page.locator(".directory-grid")).not.toContainText(
    "السجل التجاري",
  );
});

test("business journey adapts by activity and keeps progress after reload", async ({
  page,
}) => {
  await page.goto("/business");
  await expect(page.locator(".business-step")).toHaveCount(4);
  await page.getByRole("radio", { name: "مقهى أو مطعم" }).check();
  await expect(page.locator(".business-steps")).toContainText(
    "المتطلبات الصحية",
  );
  await page.locator(".completion-toggle input").nth(0).check();
  await page.locator(".completion-toggle input").nth(1).check();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "2",
  );
  await page.reload();
  await expect(page.getByRole("radio", { name: "مقهى أو مطعم" })).toBeChecked();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "2",
  );
  await page.getByRole("radio", { name: "متجر إلكتروني" }).check();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
  await expect(page.locator(".business-steps")).toContainText("مقر أو مستودع");
  await page.getByRole("radio", { name: "مقهى أو مطعم" }).check();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "2",
  );
  await page
    .getByRole("button", { name: "إعادة ضبط تقدّم هذا النشاط" })
    .click();
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "0",
  );
});

test("official links have exact destinations and do not imply completion", async ({
  page,
}) => {
  await page.goto("/business");
  const links = page.locator(".business-step a");
  for (const [i, url] of [
    "https://business.sa/",
    "https://business.sa/",
    "https://balady.gov.sa/",
    "https://zatca.gov.sa/",
  ].entries()) {
    await expect(links.nth(i)).toHaveAttribute("href", url);
    await expect(links.nth(i)).toHaveAttribute("target", "_blank");
    await expect(links.nth(i)).toHaveAttribute("rel", "noopener noreferrer");
  }
  await page.locator(".completion-toggle input").nth(0).check();
  await expect(
    page.locator(".business-step").nth(1).getByText("خطوتك التالية"),
  ).toBeVisible();
  await expect(
    page.locator(".completion-toggle input").nth(1),
  ).not.toBeChecked();
  await expect(page.locator(".business-note")).toContainText("ليس قائمة شاملة");
});

test("portal and business journey support English and mobile layouts", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/business",
    "/sectors/business",
    "/sectors/justice",
  ]) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Switch to English" }).click();
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
  await page.goto("/business");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator(".business-steps")).toContainText(
    "Commercial Registration",
  );
  await expect(page.locator(".business-steps")).toContainText(
    "Tax Identification Number",
  );
});
