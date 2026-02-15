import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { applyTemplateSetup } from "../scripts/setup-template-lib.mjs";

const seedWorkspace = async (cwd: string) => {
  await writeFile(
    path.join(cwd, "package.json"),
    JSON.stringify(
      {
        name: "electron-starter-template",
        description: "Setup-first robust Electron starter template"
      },
      null,
      2
    )
  );

  await writeFile(
    path.join(cwd, "README.md"),
    "Electron Starter Template\nelectron-starter-template\ncom.template.electronstarter\n"
  );

  await writeFile(
    path.join(cwd, "apps/desktop/package.json"),
    JSON.stringify(
      {
        name: "@starter/desktop",
        productName: "Electron Starter Template",
        description: "A robust Electron starter app"
      },
      null,
      2
    )
  );

  await writeFile(
    path.join(cwd, "apps/desktop/forge.config.ts"),
    "appBundleId: \"com.template.electronstarter\", executableName: \"electron-starter-template\""
  );

  await writeFile(
    path.join(cwd, "apps/desktop/src/main/index.ts"),
    "title: \"Electron Starter Template\""
  );
};

describe("setup-template", () => {
  it("replaces template placeholders", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "electron-starter-template-"));
    await mkdir(path.join(tempDir, "apps/desktop/src/main"), { recursive: true });
    await seedWorkspace(tempDir);

    const result = await applyTemplateSetup({
      cwd: tempDir,
      appName: "Acme Desktop",
      appId: "com.acme.desktop",
      description: "Acme productivity app"
    });

    expect(result.slug).toBe("acme-desktop");

    const rootPackage = JSON.parse(await readFile(path.join(tempDir, "package.json"), "utf8"));
    expect(rootPackage.name).toBe("acme-desktop");

    const desktopPackage = JSON.parse(
      await readFile(path.join(tempDir, "apps/desktop/package.json"), "utf8")
    );
    expect(desktopPackage.productName).toBe("Acme Desktop");

    const forge = await readFile(path.join(tempDir, "apps/desktop/forge.config.ts"), "utf8");
    expect(forge).toContain("com.acme.desktop");
  });
});
