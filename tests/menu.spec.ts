import { test, expect } from "@playwright/test";

test("should support adding a new food, display the new food on the menu page, show menu heading and deleting the new food", async ({
  page,
}) => {
  await page.goto("http://localhost:4000/admin");

  // Check validation by submitting an empty form
  await page.getByRole("button", { name: "Add Food" }).click();
  // Expect form requirements to prevent form submission
  await expect(page.getByText("Name is required")).toHaveCount(1);
  await expect(page.getByText("Description is required")).toHaveCount(1);
  await expect(page.getByText("At least one tag is required")).toHaveCount(1);

  // Fill out new food form
  await page.getByLabel("Name").fill("New Food");
  await page.getByLabel("Description").fill("New Food Description");
  await page.getByLabel("Price").fill("123");
  await page.getByLabel("Breakfast").check();
  await page.getByRole("button", { name: "Add Food" }).click();

  // Expect to find the Menu heading
  await expect(page.getByRole("heading", { name: "Menu" })).toHaveCount(1);
  // Expect the successful toast message to appear
  await expect(page.getByText("Food added successfully!")).toHaveCount(1);
  // Expect the new food to be added
  await expect(page.getByRole("heading", { name: "New Food" })).toHaveCount(1);
  // Delete the New Food
  await page.getByRole("button", { name: "Delete New Food" }).click();
  // Expect the New Food was deleted
  await expect(
    page.getByRole("button", { name: "Delete New Food" }),
  ).toHaveCount(0);
});
