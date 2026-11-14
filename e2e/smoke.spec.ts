import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/services",
  "/services/phone-consultation",
  "/services/just-links",
  "/services/closet-clean",
  "/services/day-to-day-styling",
  "/services/event-styling",
  "/services/the-works",
  "/services/digital-lookbook",
  "/lookbook",
  "/lookbook/monday-uniform",
  "/lookbook/the-gala-edit",
  "/lookbook/closet-before-after",
  "/process",
  "/about",
  "/contact",
  "/faq",
  "/privacy",
  "/terms",
  "/styleguide",
];

for (const route of routes) {
  test(`${route} renders without horizontal overflow`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.getByRole("link", { name: /book/i }).first()).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
    // Every image has alt text.
    expect(await page.locator("img:not([alt]), img[alt='']").count()).toBe(0);
  });
}

test("unknown routes return the branded 404", async ({ page }) => {
  const response = await page.goto("/not-a-real-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("collection");
});

test("?service= shows the selected service on /contact", async ({ page }) => {
  await page.goto("/contact?service=event-styling");
  await expect(page.getByText("Selected service:")).toContainText("Event Styling");
});

test("mobile menu opens, closes with Escape and returns focus", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "mobile only");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Menu" });
  await toggle.click();
  await expect(page.getByRole("button", { name: "Close" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await expect(page.getByRole("link", { name: /Lookbook/ }).first()).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "Menu" })).toBeFocused();
});

test("renders with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
