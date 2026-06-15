import { test, expect } from "@playwright/test";

test("create -> plant -> get link -> open as her -> plant back", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(String(e)));

  await page.goto("/");
  await page.getByLabel(/your name/i).fill("Sam");
  await page.getByLabel(/their name/i).fill("Robin");
  await page.getByRole("button", { name: /seaside/i }).click();
  await page.getByRole("button", { name: /start our garden/i }).click();

  await page.getByRole("button", { name: /plant a flower/i }).click();
  await page.getByLabel(/note/i).fill("for you");
  await page.getByRole("button", { name: /plant it/i }).click();

  const shareInput = page.locator(".share input");
  await expect(shareInput).toHaveValue(/#g=/);
  const link = await shareInput.inputValue();
  expect(link).toContain("#g=");

  await page.goto(link);
  await expect(page.getByText(/turn|waiting/i)).toBeVisible();
  await page.getByRole("button", { name: /plant a flower/i }).click();
  await page.getByRole("button", { name: /plant it/i }).click();
  const shareInput2 = page.locator(".share input");
  await expect(shareInput2).toHaveValue(/#g=/);
  const link2 = await shareInput2.inputValue();
  expect(link2).not.toEqual(link);

  expect(errors).toEqual([]);
});
