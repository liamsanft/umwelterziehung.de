import { defineConfig } from "tinacms";
import { umlautMap } from "./utilities/umlautMap";
import { object } from "astro/zod";

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
        name: "projekte",
        label: "Projekte",
        path: "src/content/projekte",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => {
              return `${values?.title
                ?.toLowerCase()
                .replace(/ /g, "-")
                .replace(/ö/, "oe")
                .replace(/ä/, "ae")
                .replace(/ü/, "ue")
                .replace(/[^a-zA-Z\d\-]/g, "")}`;
            },
          },
        },
        templates: [
          {
            name: "extern",
            label: "Mit externer Seite",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Projektname",
                required: true,
              },
              {
                type: "string",
                name: "kurzbeschreibung",
                label: "Kurzbeschreibung",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
              {
                type: "image",
                name: "bild",
                label: "Bild",
                required: true,
              },
              {
                type: "string",
                name: "url",
                label: "Link",
                required: true,
              },
              {
                type: "boolean",
                name: "on_start",
                label: "Auf Startseite zeigen?",
              },
              {
                type: "number",
                name: "priority",
                label: "Priorität",
              },
            ],
          },
          {
            name: "seite",
            label: "Eigene Seite",
            fields: [
              {
                type: "string",
                name: "title",
                label: "Projektname",
                required: true,
              },
              {
                type: "string",
                name: "kurzbeschreibung",
                label: "Kurzbeschreibung",
                ui: {
                  component: "textarea",
                },
                required: true,
              },
              {
                type: "image",
                name: "bild",
                label: "Bild",
                required: true,
              },
              {
                type: "object",
                name: "content",
                label: "Inhalt",
                list: true,
                templates: [
                  {
                    name: "text",
                    label: "Text",
                    fields: [
                      {
                        type: "rich-text",
                        name: "content",
                        label: "Inhalt",
                      },
                    ],
                  },
                  {
                    name: "text_image",
                    label: "Text mit Bild",
                    fields: [
                      {
                        type: "image",
                        name: "image",
                        label: "Bild",
                      },
                      {
                        type: "rich-text",
                        name: "content",
                        label: "Inhalt",
                      },
                    ],
                  },
                  {
                    name: "sponsors",
                    label: "Sponsoren",
                    fields: [
                      {
                        type: "object",
                        name: "sponsors",
                        label: "Sponsoren",
                        ui: {
                          itemProps: (item) => {
                            return { label: item?.name };
                          },
                        },
                        list: true,
                        fields: [
                          {
                            type: "string",
                            name: "name",
                            label: "Name",
                            required: true,
                          },
                          {
                            type: "image",
                            name: "logo",
                            label: "Logo",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "boolean",
                name: "on_start",
                label: "Auf Startseite zeigen?",
              },
              {
                type: "number",
                name: "priority",
                label: "Priorität",
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
        name: "downloads",
        label: "Downloads",
        path: "src/content/downloads",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        fields: [
          {
            type: "object",
            name: "download",
            label: "Download-Section",
            list: true,
            templates: [
              {
                name: "default",
                label: "Standard",
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Titel",
                    required: true,
                  },
                  {
                    type: "rich-text",
                    name: "body",
                    label: "Inhalt",
                  },
                  {
                    type: "object",
                    name: "downloadobject",
                    label: "Download",
                    required: true,
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.downloadtitle };
                      },
                    },
                    fields: [
                      {
                        type: "string",
                        name: "downloadtitle",
                        label: "Titel",
                        required: true,
                      },
                      {
                        type: "image",
                        name: "downloadmedia",
                        label: "Download",
                        required: true,
                      },
                    ],
                  },
                ],
              },
              {
                name: "table",
                label: "Mit Tabelle",
                ui: {
                  itemProps: (item) => {
                    return { label: item?.title };
                  },
                },
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Titel",
                    required: true,
                  },
                  {
                    type: "rich-text",
                    name: "body",
                    label: "Inhalt",
                  },
                  {
                    type: "object",
                    name: "downloadsection",
                    label: "Download",
                    required: true,
                    list: true,
                    ui: {
                      itemProps: (item) => {
                        return { label: item?.key };
                      },
                    },
                    fields: [
                      {
                        type: "string",
                        name: "key",
                        label: "Schlüssel",
                        required: true,
                      },
                      {
                        type: "object",
                        name: "downloadobject",
                        label: "Download",
                        required: true,
                        list: true,
                        ui: {
                          itemProps: (item) => {
                            return { label: item?.downloadtitle };
                          },
                        },
                        fields: [
                          {
                            type: "string",
                            name: "downloadtitle",
                            label: "Titel",
                            required: true,
                          },
                          {
                            type: "image",
                            name: "downloadmedia",
                            label: "Download",
                            required: true,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "wwwumwelt",
        label: "www.umwelt",
        path: "src/content/wwwumwelt",
        ui: {
          filename: {
            readonly: true,
            slugify: (values) => values?.title,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Titel",
            required: true,
          },
          {
            type: "object",
            name: "items",
            label: "Items",
            list: true,
            ui: {
              itemProps: (item) => {
                return { label: item?.title };
              },
            },
            fields: [
              {
                type: "string",
                name: "title",
                label: "Titel",
              },
              {
                type: "string",
                name: "url",
                label: "Link",
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
