import path from "node:path";
import { fileURLToPath } from "node:url";

import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rendererRoot = path.resolve(__dirname, "src/renderer");

export default defineConfig({
  root: rendererRoot,
  base: "./",
  plugins: [
    react(),
    TanStackRouterVite({
      target: "react",
      autoCodeSplitting: true,
      generatedRouteTree: "src/renderer/src/routeTree.gen.ts",
      routesDirectory: "src/renderer/src/routes",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(rendererRoot, "src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, ".vite/renderer/main_window"),
    emptyOutDir: false,
  },
});
