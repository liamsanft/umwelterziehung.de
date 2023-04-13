import { string } from "astro/zod";
import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

const umlautMap = {
  "\u00fc": "ue",
  "\u00e4": "ae",
  "\u00f6": "oe",
  "\u00df": "ss",
};

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
        name: "offices",
        label: "Büros",
        path: "src/content/offices",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "offices",
            label: "Büros",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.name };
              },
            },
            fields: [
              {
                type: "string",
                name: "name",
                label: "Büroname",
                required: true,
              },
              {
                type: "string",
                name: "bundeslaender",
                label: "Bundesländer",
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
                name: "adresse",
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
        name: "ueber_uns",
        label: "Über uns",
        path: "src/content/ueber-uns",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Inhalt",
            required: true,
            isBody: true,
          },
          {
            type: "object",
            name: "mitgliedschaft",
            label: "Mitgliedschaft",
            required: true,
            fields: [
              {
                type: "string",
                name: "kurzbeschreibung",
                label: "Kurzbeschreibung",
                required: true,
              },
              {
                type: "rich-text",
                name: "content",
                label: "Inhalt",
                required: true,
              },
            ],
          },
          {
            type: "object",
            name: "foerderer_kooperationspartner",
            label: "Förderer und Kooperationspartner",
            required: true,
            fields: [
              {
                type: "string",
                name: "kurzbeschreibung",
                label: "Kurzbeschreibung",
                required: true,
              },
              {
                type: "object",
                name: "foerderer",
                label: "Förderer",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.name };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "email_web",
                    label: "Email oder Website",
                    required: true,
                  },
                ],
              },
              {
                type: "object",
                name: "kooperationspartner",
                label: "Kooperationspartner",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.name };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "email_web",
                    label: "Email oder Website",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            type: "object",
            name: "vorstand",
            label: "Vorstand",
            required: true,
            fields: [
              {
                type: "object",
                name: "personen",
                label: "Personen",
                list: true,
                ui: {
                  itemProps: (item) => {
                    return { label: item?.name };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "funktion",
                    label: "Funktion",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "name",
                    label: "Name",
                    required: true,
                  },
                  {
                    type: "string",
                    name: "adresse",
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
                ],
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
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Inhalt",
            required: true,
            isBody: true,
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
        fields: [
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
});
