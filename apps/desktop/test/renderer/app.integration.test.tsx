import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createHashHistory, createRouter } from "@tanstack/react-router";
import { describe, expect, it, vi } from "vitest";

import { routeTree } from "../../src/renderer/src/routeTree.gen";

describe("renderer integration", () => {
  it("renders route and calls preload RPC bridge", async () => {
    const invoke = vi.fn().mockResolvedValue({
      type: "success",
      data: {
        appName: "Electron Starter Template",
        message: "Renderer connected to main through typed Effect RPC",
        timestamp: "2026-02-15T00:00:00.000Z",
      },
    });

    const subscribe = vi.fn().mockReturnValue(() => undefined);

    Object.defineProperty(window, "desktopApi", {
      configurable: true,
      value: { invoke, subscribe },
    });

    const router = createRouter({
      routeTree,
      history: createHashHistory(),
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => expect(invoke).toHaveBeenCalledWith("GetBootstrapData", {}));
    expect(screen.getByText("Desktop App Shell")).toBeTruthy();
    expect(screen.getByText(/Renderer connected to main through typed Effect RPC/)).toBeTruthy();
  });
});
