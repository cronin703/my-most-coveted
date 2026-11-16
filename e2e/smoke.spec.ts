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
    // Every meaningful image has alt text (decorative ones live inside aria-hidden).
    const missingAlt = await page.evaluate(
      () =>
        [...document.querySelectorAll("img")].filter(
          (img) => !img.closest("[aria-hidden='true']") && !img.getAttribute("alt"),
        ).length,
    );
    expect(missingAlt).toBe(0);
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

test("overlay menu: dialog, focus trap, Escape returns focus", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "menu is used below 1024px");
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close" })).toBeFocused();
  // Focus stays inside the dialog.
  for (let i = 0; i < 12; i++) await page.keyboard.press("Tab");
  expect(await dialog.evaluate((el) => el.contains(document.activeElement))).toBe(true);
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("overlay menu link navigates and closes", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "menu is used below 1024px");
  await page.goto("/");
  await page.getByRole("button", { name: "Menu" }).click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: /Lookbook/ })
    .click();
  await expect(page).toHaveURL(/\/lookbook$/);
  await expect(page.getByRole("dialog")).toBeHidden();
});

test("no console errors on the styleguide", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.goto("/styleguide");
  await page.mouse.wheel(0, 4000);
  await page.waitForTimeout(800);
  expect(errors).toEqual([]);
});

test("renders with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("opening sequence plays once per session and never blocks clicks", async ({ page }) => {
  await page.goto("/");
  const intro = page.locator(".intro");
  await expect(intro).toHaveCSS("pointer-events", "none");
  await expect(intro).toHaveCSS("visibility", "hidden", { timeout: 4000 });
  await page.reload();
  await expect(intro).toHaveCSS("display", "none");
});

test("opening sequence is skipped with reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".intro")).toHaveCSS("display", "none");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
