import path from "node:path";
import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "evh83z0t",
    dataset: "production",
  },
  studioHost: "uxhi",
  // Pin the deployed Studio app (→ https://uxhi.sanity.studio) so `sanity deploy`
  // never prompts for / picks the wrong studio app.
  deployment: {
    appId: "wrxzr7idlwp7xd2f8ri8a1pk",
  },

  // `sanity deploy` builds the Studio with Vite, which does not read Next's
  // tsconfig paths — so a schema file importing "@/..." resolved fine in the
  // app and broke the Studio build. That is what happened when a directory
  // schema started importing its taxonomy from components/directory/constants:
  // the embedded Studio at /studio kept working, while uxhi.sanity.studio could
  // not be republished at all.
  vite: (config) => ({
    ...config,
    resolve: {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        "@": path.resolve(__dirname, "src"),
      },
    },
  }),
});
