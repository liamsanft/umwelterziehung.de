import { Collection } from "tinacms";

export const offices: Collection = {
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
};
