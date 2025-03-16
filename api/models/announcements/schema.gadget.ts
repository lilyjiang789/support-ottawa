import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "announcements" model, go to https://support-ottawa.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "dVwj-vwPqXvm",
  fields: {
    contact: { type: "email", storageKey: "jYCEmyv6UmpT" },
    date: {
      type: "dateTime",
      includeTime: true,
      storageKey: "LaN4aAhWQgsg",
    },
    description: { type: "string", storageKey: "r8ZjG6s58vaR" },
    time: {
      type: "dateTime",
      includeTime: true,
      storageKey: "yWyQzKq7SkJm",
    },
    title: { type: "string", storageKey: "QdmRuRfhZ69j" },
    type: { type: "string", storageKey: "dbYFq8Nh8XVg" },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "dVwj-vwPqXvm-BelongsTo-User",
    },
    where: { type: "string", storageKey: "i2UlKjpE8p3Q" },
  },
};
