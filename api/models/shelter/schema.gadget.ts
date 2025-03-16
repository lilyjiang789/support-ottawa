import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shelter" model, go to https://support-ottawa.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "289TgNgTdaWO",
  comment:
    "Represents a physical shelter with its details, used for managing and displaying information about shelters in the application.",
  fields: {
    address: { type: "string", storageKey: "zt1IN8Lmiz08" },
    capacity: {
      type: "number",
      decimals: 0,
      storageKey: "fzXZk0o-gwPf",
    },
    current: {
      type: "number",
      default: 0,
      decimals: 0,
      storageKey: "EZBHywYC9Ms9",
    },
    latitude: { type: "number", storageKey: "MaN8WKuRF9Qr" },
    longitude: { type: "number", storageKey: "tluwGxN7N85y" },
    name: { type: "string", storageKey: "fpIr1MgMCkEa" },
  },
};
