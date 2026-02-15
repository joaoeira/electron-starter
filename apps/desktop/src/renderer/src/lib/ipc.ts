import { appContract } from "@starter/app-core";
import { createEventSubscriber, createRpcClient } from "electron-effect-rpc/renderer";

export const createIpc = (bridge: Window["desktopApi"]) => ({
  client: createRpcClient(appContract, {
    invoke: bridge.invoke,
    rpcDecodeMode: "envelope",
  }),
  events: createEventSubscriber(appContract, {
    subscribe: bridge.subscribe,
    decodeMode: "safe",
  }),
});
