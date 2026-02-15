#!/usr/bin/env node

import { applyTemplateSetup } from "./setup-template-lib.mjs";

const args = process.argv.slice(2);

const readFlag = (flagName) => {
  const index = args.indexOf(flagName);
  if (index === -1) {
    return undefined;
  }

  const next = args[index + 1];
  if (!next || next.startsWith("--")) {
    return undefined;
  }

  return next;
};

const options = {
  appName: readFlag("--app-name"),
  appId: readFlag("--app-id"),
  description: readFlag("--description"),
  force: args.includes("--force"),
};

applyTemplateSetup(options)
  .then((result) => {
    console.log("Template setup complete.");
    console.log(`App Name: ${result.appName}`);
    console.log(`App ID: ${result.appId}`);
    console.log(`Description: ${result.description}`);
    console.log("Updated files:");
    for (const file of result.changedFiles) {
      console.log(`- ${file}`);
    }
    console.log("Next commands: pnpm install, pnpm dev, pnpm test");
  })
  .catch((error) => {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Setup failed: ${message}`);
    process.exitCode = 1;
  });
