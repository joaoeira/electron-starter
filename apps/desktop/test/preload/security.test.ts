import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe("preload security", () => {
  it("uses a constrained bridge global and avoids raw ipc exposure", () => {
    const preloadSource = readFileSync(path.join(__dirname, "../../src/preload/index.ts"), "utf8");

    expect(preloadSource).toContain('appIpc.preload({ global: "desktopApi" }).expose()');
    expect(preloadSource).not.toContain("window.ipcRenderer");
    expect(preloadSource).not.toContain('exposeInMainWorld("ipcRenderer"');
  });
});
