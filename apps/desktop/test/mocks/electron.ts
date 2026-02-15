export const app = {
  whenReady: () => Promise.resolve(),
  on: () => undefined,
  quit: () => undefined,
  getVersion: () => "0.0.0",
};

export class BrowserWindow {
  static getAllWindows(): Array<BrowserWindow> {
    return [];
  }

  constructor(_options: unknown) {}

  loadURL(_url: string): Promise<void> {
    return Promise.resolve();
  }

  loadFile(_file: string): Promise<void> {
    return Promise.resolve();
  }

  isDestroyed(): boolean {
    return false;
  }

  webContents = {
    send: (_channel: string, _payload: unknown) => undefined,
  };
}

export const ipcMain = {
  handle: (_channel: string, _listener: unknown) => undefined,
  removeHandler: (_channel: string) => undefined,
};

export const contextBridge = {
  exposeInMainWorld: (_name: string, _value: unknown) => undefined,
};

export const ipcRenderer = {
  invoke: async (_channel: string, _payload: unknown) => ({ type: "success", data: {} }),
  on: (_channel: string, _listener: unknown) => undefined,
  removeListener: (_channel: string, _listener: unknown) => undefined,
};
