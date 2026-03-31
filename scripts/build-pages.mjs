import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const siteDir = path.join(root, "_site");
const docsDir = path.join(root, "docs", ".vitepress", "dist");
const destination = path.join(siteDir, "docs");

async function ensureExists(target) {
  try {
    await fs.access(target);
  } catch {
    throw new Error(`Missing required path: ${target}`);
  }
}

async function copyDirectory(source, target) {
  await fs.mkdir(target, { recursive: true });
  const entries = await fs.readdir(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      await copyDirectory(sourcePath, targetPath);
      continue;
    }

    await fs.copyFile(sourcePath, targetPath);
  }
}

await ensureExists(siteDir);
await ensureExists(docsDir);
await fs.rm(destination, { recursive: true, force: true });
await copyDirectory(docsDir, destination);

console.log(`Merged VitePress docs from ${docsDir} into ${destination}`);
