/// <reference types="vite/client" />

import type { DesktopApi } from "../../preload/api";

declare global {
  interface Window {
    desktopApi: DesktopApi;
  }
}

export {};
