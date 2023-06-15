import { defineConfig } from "tinacms";
import { umlautMap } from "./utilities/umlautMap";

import { neuigkeiten } from "./collections/neuigkeiten";
import { offices } from "./collections/offices";
import { ueberuns } from "./collections/ueberuns";
import { impressum } from "./collections/impressum";
import { datenschutz } from "./collections/datenschutz";
import { downloads } from "./collections/downloads";

const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      neuigkeiten,
      offices,
      ueberuns,
      downloads,
      impressum,
      datenschutz,
    ],
  },
});
