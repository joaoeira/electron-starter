import { createActor } from "xstate";
import { describe, expect, it } from "vitest";

import { appMachine } from "../src/state/appMachine";

describe("appMachine", () => {
  it("boots into ready state", async () => {
    const actor = createActor(appMachine, {});
    actor.start();

    actor.send({ type: "BOOT" });

    await new Promise((resolve) => setTimeout(resolve, 10));

    const snapshot = actor.getSnapshot();
    expect(snapshot.value).toBe("ready");
    expect(snapshot.context.message).toBe("Starter runtime initialized");
  });
});
