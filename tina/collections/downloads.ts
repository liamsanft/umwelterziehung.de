import { Collection } from "tinacms";

export const downloads: Collection = {
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
};
