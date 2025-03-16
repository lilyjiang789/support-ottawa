import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "foodBank" model, go to https://support-ottawa.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "PMJiuwDRn3CF",
  fields: {
    address: { type: "string", storageKey: "bSuWFu2GlzlM" },
    capacity: { type: "number", storageKey: "HW-gybeZZ7qB" },
    current: { type: "number", storageKey: "7lt_eCaHEUu4" },
    latitude: { type: "number", storageKey: "BrBsJm9FQrZh" },
    longitude: { type: "number", storageKey: "bOM0QVju99b1" },
    name: { type: "string", storageKey: "vU_tcvdCktTB" },
  },
};
