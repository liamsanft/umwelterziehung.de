import { Collection } from "tinacms";

export const impressum: Collection = {
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
};
