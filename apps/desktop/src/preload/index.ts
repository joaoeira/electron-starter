import { appIpc } from "@starter/app-core/ipc";

appIpc.preload({ global: "desktopApi" }).expose();
