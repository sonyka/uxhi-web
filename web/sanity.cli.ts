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
});
