import { spawnSync } from "node:child_process";
import { mkdtemp, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { build } from "vite";

async function findTests(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map(async (entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return findTests(path);
    return entry.name.endsWith(".test.ts") ? [path] : [];
  }));
  return nested.flat();
}

const tests = (await findTests("src")).sort();
if (tests.length === 0) throw new Error("No frontend tests found");

const outputDirectory = await mkdtemp(join(tmpdir(), "pc-club-tests-"));
try {
  await build({
    configFile: false,
    logLevel: "silent",
    build: {
      ssr: true,
      outDir: outputDirectory,
      emptyOutDir: true,
      rollupOptions: {
        input: tests,
        output: { entryFileNames: "[name].mjs" },
      },
    },
  });
  const files = (await readdir(outputDirectory))
    .filter((file) => file.endsWith(".test.mjs"))
    .map((file) => join(outputDirectory, file));
  const result = spawnSync(process.execPath, ["--test", ...files], { stdio: "inherit" });
  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  await rm(outputDirectory, { recursive: true, force: true });
}
