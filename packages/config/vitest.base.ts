import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.ts", "**/*.test.tsx"],
    globals: true,
    reporters: ["default"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"]
    }
  }
});
