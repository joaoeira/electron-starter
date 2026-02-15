import { Effect } from "effect";
import { describe, expect, it } from "vitest";

import { appRpcHandlers } from "@starter/app-core";

describe("main rpc handlers", () => {
  it("returns bootstrap payload", async () => {
    const result = await Effect.runPromise(appRpcHandlers.GetBootstrapData());

    expect(result.appName).toBe("Electron Starter Template");
    expect(result.message).toContain("typed Effect RPC");
  });
});
