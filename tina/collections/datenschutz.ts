import { Collection } from "tinacms";

export const datenschutz: Collection = {
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
};
