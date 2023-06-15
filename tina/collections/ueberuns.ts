import { Collection } from "tinacms";

export const ueberuns: Collection = {
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
};
