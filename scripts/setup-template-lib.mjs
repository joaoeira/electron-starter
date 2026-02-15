import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DEFAULT_TEMPLATE_NAME = "electron-starter-template";
const DEFAULT_PRODUCT_NAME = "Electron Starter Template";
const DEFAULT_APP_ID = "com.template.electronstarter";

const APP_ID_REGEX = /^[a-zA-Z][a-zA-Z0-9]*(\.[a-zA-Z][a-zA-Z0-9]*)+$/;

const toSlug = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const replaceInFile = async (filePath, updates) => {
  const source = await readFile(filePath, "utf8");
  let output = source;

  for (const [before, after] of updates) {
    output = output.split(before).join(after);
  }

  if (output !== source) {
    await writeFile(filePath, output, "utf8");
    return true;
  }

  return false;
};

const loadJson = async (filePath) => JSON.parse(await readFile(filePath, "utf8"));
const saveJson = async (filePath, data) =>
  writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");

export const validateSetupInput = ({ appName, appId }) => {
  if (!appName || appName.trim().length === 0) {
    throw new Error("--app-name is required and cannot be empty");
  }

  if (!appId || !APP_ID_REGEX.test(appId)) {
    throw new Error(
      "--app-id must be a reverse-domain identifier, for example com.example.desktop"
    );
  }
};

export const applyTemplateSetup = async ({
  appName,
  appId,
  description,
  force = false,
  cwd = process.cwd()
}) => {
  validateSetupInput({ appName, appId });

  const rootPackagePath = path.join(cwd, "package.json");
  const desktopPackagePath = path.join(cwd, "apps/desktop/package.json");
  const forgeConfigPath = path.join(cwd, "apps/desktop/forge.config.ts");
  const mainEntryPath = path.join(cwd, "apps/desktop/src/main/index.ts");
  const readmePath = path.join(cwd, "README.md");

  const rootPackage = await loadJson(rootPackagePath);

  if (!force && rootPackage.name !== DEFAULT_TEMPLATE_NAME) {
    throw new Error(
      "Template appears already initialized. Pass --force to re-apply setup values."
    );
  }

  const slug = toSlug(appName);
  const normalizedDescription = description?.trim() || `${appName} desktop app`;

  rootPackage.name = slug;
  rootPackage.description = normalizedDescription;

  await saveJson(rootPackagePath, rootPackage);

  const desktopPackage = await loadJson(desktopPackagePath);
  desktopPackage.productName = appName;
  desktopPackage.description = normalizedDescription;
  desktopPackage.name = `@apps/${slug}-desktop`;
  await saveJson(desktopPackagePath, desktopPackage);

  const changedFiles = [rootPackagePath, desktopPackagePath];

  const forgeChanged = await replaceInFile(forgeConfigPath, [
    [DEFAULT_APP_ID, appId],
    ["electron-starter-template", slug]
  ]);
  if (forgeChanged) {
    changedFiles.push(forgeConfigPath);
  }

  const mainChanged = await replaceInFile(mainEntryPath, [[DEFAULT_PRODUCT_NAME, appName]]);
  if (mainChanged) {
    changedFiles.push(mainEntryPath);
  }

  const readmeChanged = await replaceInFile(readmePath, [
    [DEFAULT_PRODUCT_NAME, appName],
    [DEFAULT_TEMPLATE_NAME, slug],
    [DEFAULT_APP_ID, appId]
  ]);
  if (readmeChanged) {
    changedFiles.push(readmePath);
  }

  return {
    changedFiles,
    appName,
    appId,
    description: normalizedDescription,
    slug
  };
};
