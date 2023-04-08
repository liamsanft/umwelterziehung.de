import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
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
      {
        name: "office",
        label: "Offices",
        path: "src/content/offices",
        templates: [
          {
            name: "default",
            label: "Default",
            ui: {
              defaultItem: {
                draft: false,
              },
            },
            fields: [
              {
                type: "boolean",
                name: "draft",
                label: "Entwurf",
                required: true,
              },
              {
                type: "string",
                name: "name",
                label: "Name des Büros",
                isTitle: true,
                required: true,
              },
              {
                type: "string",
                name: "verwaltungsbereiche",
                label: "Verwaltungsbereiche",
                list: true,
              },
              {
                type: "string",
                name: "ansprechpartner",
                label: "Ansprechpartner",
                list: true,
              },
              {
                type: "string",
                name: "address",
                label: "Adresse",
              },
              {
                type: "string",
                name: "telefon",
                label: "Telefon",
              },
              {
                type: "string",
                name: "fax",
                label: "Fax",
              },
              {
                type: "string",
                name: "email",
                label: "Email",
              },
              {
                type: "string",
                name: "projekte",
                label: "Projekte",
                list: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
