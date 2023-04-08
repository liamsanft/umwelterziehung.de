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
        name: "neuigkeiten",
        label: "Neuigkeiten",
        path: "src/content/neuigkeiten",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.titel
                ?.toLowerCase()
                .replace(/ /g, "-")}-${new Date(values?.datum)
                .toLocaleDateString()
                .replace(/\//gm, "-")}`;
            },
          },
        },
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
                type: "datetime",
                name: "datum",
                label: "Datum",
                required: true,
                ui: {
                  dateFormat: "MMMM YYYY",
                },
              },
              {
                type: "string",
                name: "titel",
                label: "Titel",
                required: true,
                isTitle: true,
              },
              {
                type: "rich-text",
                name: "body",
                label: "Inhalt",
                isBody: true,
              },
              {
                type: "object",
                name: "anhang",
                label: "Anhang",
                fields: [
                  {
                    type: "string",
                    name: "label",
                    label: "Label",
                    required: true,
                  },
                  {
                    type: "image",
                    name: "media",
                    label: "Datei",
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
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
      {
        name: "impressum",
        label: "Impressum",
        path: "src/content/impressum",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
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
                type: "rich-text",
                name: "body",
                label: "Inhalt",
                required: true,
                isBody: true,
              },
            ],
          },
        ],
      },
      {
        name: "datenschutz",
        label: "Datenschutzerklärung",
        path: "src/content/datenschutz",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
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
                type: "rich-text",
                name: "body",
                label: "Inhalt",
                required: true,
                isBody: true,
              },
            ],
          },
        ],
      },
    ],
  },
});
