import path from "node:path";
import { fileURLToPath } from "node:url";

import { app, BrowserWindow, ipcMain } from "electron";
import * as Runtime from "effect/Runtime";

import { appRpcHandlers } from "@starter/app-core";
import { appIpc } from "@starter/app-core/ipc";

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string | undefined;
declare const MAIN_WINDOW_VITE_NAME: string;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let mainWindow: BrowserWindow | null = null;
let ipcHandle: ReturnType<typeof appIpc.main> | null = null;

const createMainWindow = (): BrowserWindow => {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#f0f9ff",
    title: "Electron Starter Template",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    void window.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    void window.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  return window;
};

app.whenReady().then(() => {
  mainWindow = createMainWindow();

  ipcHandle = appIpc.main({
    ipcMain,
    handlers: appRpcHandlers,
    runtime: Runtime.defaultRuntime,
    getWindow: () => mainWindow,
  });

  ipcHandle.start();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainWindow = createMainWindow();
    }
  });
});

app.on("before-quit", () => {
  if (ipcHandle) {
    ipcHandle.dispose();
    ipcHandle = null;
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
