import { describe, expect, it } from "vitest";

import { uiStore } from "../src/state/uiStore";

describe("uiStore", () => {
  it("updates deterministically", () => {
    const store = uiStore;

    store.send({ type: "resetCounter" });
    store.send({ type: "increment", by: 2 });
    store.send({ type: "toggleSidebar" });

    const snapshot = store.getSnapshot();
    expect(snapshot.context.counter).toBe(2);
    expect(snapshot.context.sidebarOpen).toBe(true);
  });
});
