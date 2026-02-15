import path from "node:path";
import { fileURLToPath } from "node:url";

import { _electron as electron, test, expect } from "@playwright/test";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("desktop boot smoke", async () => {
  const app = await electron.launch({
    args: [path.join(__dirname, "../../.vite/build/main.js")],
  });

  const page = await app.firstWindow();
  await expect(page.getByText("Desktop App Shell")).toBeVisible();

  await app.close();
});
