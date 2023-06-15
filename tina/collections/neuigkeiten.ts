import { Collection } from "tinacms";

export const neuigkeiten: Collection = {
  name: "neuigkeiten",
  label: "Neuigkeiten",
  path: "src/content/neuigkeiten",
  ui: {
    filename: {
      readonly: true,
      slugify: (values) => {
        return `${values?.titel?.toLowerCase().replace(/ /g, "-")}-${new Date(
          values?.datum
        )
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
};
