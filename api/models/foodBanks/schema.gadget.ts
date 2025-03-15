import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "foodBanks" model, go to https://support-ottawa.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "7xEE8oHmOdYf",
  fields: {
    address: { type: "string", storageKey: "iXMpOwIC0SnW" },
    capacity: {
      type: "number",
      decimals: 0,
      storageKey: "QybaGhKAW_La",
    },
    current: {
      type: "number",
      decimals: 0,
      storageKey: "pca1mgjB96pq",
    },
    name: { type: "string", storageKey: "nxBd55DEa1FO" },
  },
};
