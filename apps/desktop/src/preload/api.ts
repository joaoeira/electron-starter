import type { IpcBridgeGlobal } from "electron-effect-rpc";

export type DesktopApi = IpcBridgeGlobal<"desktopApi">["desktopApi"];
