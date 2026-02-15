import { contextBridge, ipcRenderer } from "electron";

import type { DesktopApi } from "./api";

const desktopApi: DesktopApi = {
  invoke: (method, payload) => ipcRenderer.invoke(`rpc/${method}`, payload),
  subscribe: (name, listener) => {
    const channel = `event/${name}`;
    const wrapped = (_event: unknown, payload: unknown) => {
      listener(payload);
    };

    ipcRenderer.on(channel, wrapped);

    return () => {
      ipcRenderer.removeListener(channel, wrapped);
    };
  },
};

contextBridge.exposeInMainWorld("desktopApi", desktopApi);
