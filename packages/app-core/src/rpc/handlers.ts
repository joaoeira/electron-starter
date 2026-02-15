import { Effect } from "effect";

import { appContract } from "./contracts";

const APP_TEMPLATE_NAME = "Electron Starter Template";

export const appRpcHandlers = {
  GetBootstrapData: () =>
    Effect.succeed({
      appName: APP_TEMPLATE_NAME,
      message: "Renderer connected to main through typed Effect RPC",
      timestamp: new Date().toISOString()
    })
};

export type AppContract = typeof appContract;
