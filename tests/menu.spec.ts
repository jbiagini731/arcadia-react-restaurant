import { test, expect } from "@playwright/test";

// Unit: 1 function or 1 component
// Integration test: Test a feature in the browser against mocked endpoints
// E2E: Test a feature in the browser against real endpoints

test("should support adding a new food, displaying the new food on the menu page, showing the menu heading, and deleting the new food", async ({
  page,
}) => {
  await page.goto("http://localhost:4000/admin");

  // Check validation by submitting an empty form
  await page.getByRole("button", { name: "Add Food" }).click();
  await expect(page.getByText("Name is required")).toHaveCount(1);
  await expect(page.getByText("Description is required")).toHaveCount(1);
  await expect(page.getByText("Select at least one tag")).toHaveCount(1);

  // Fill out new food form
  await page.getByLabel("Name").fill("New food");
  await page.getByLabel("Description").fill("New food description");
  await page.getByLabel("Price").fill("1");
  await page.getByLabel("Breakfast").check();
  await page.getByRole("button", { name: "Add Food" }).click();

  // Now should be redirected to the Menu page, so check that the new food displays
  await expect(page.getByRole("heading", { name: "Menu" })).toHaveCount(1);
  await expect(page.getByRole("heading", { name: "New food" })).toHaveCount(1);
  await expect(page.getByText("Food added successfully!")).toHaveCount(1);

  await page.getByRole("button", { name: "Delete New food" }).click();
  await expect(
    page.getByRole("button", { name: "Delete New food" }),
  ).toHaveCount(0);
});
