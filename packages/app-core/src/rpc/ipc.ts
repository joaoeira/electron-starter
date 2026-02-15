import { createIpcKit } from "electron-effect-rpc";

import { appContract } from "./contracts";

export const appIpc = createIpcKit({
  contract: appContract,
  channelPrefix: {
    rpc: "rpc/",
    event: "event/",
  },
  bridge: {
    global: "desktopApi",
  },
  decode: {
    rpc: "envelope",
    events: "safe",
  },
});
