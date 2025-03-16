import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "shelters" model, go to https://support-ottawa.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "fy03RKDfaAI3",
  fields: {
    address: { type: "string", storageKey: "YzUKCkBgriqZ" },
    capacity: {
      type: "number",
      decimals: 0,
      storageKey: "Wvqc80XRHGjq",
    },
    current: {
      type: "number",
      default: 0,
      decimals: 0,
      storageKey: "M0te2zTtsTKj",
    },
    latitude: { type: "number", storageKey: "3h_l9_rWRYdE" },
    longitude: { type: "number", storageKey: "8hIOSH-HoSgj" },
    name: { type: "string", storageKey: "ruUmCTNNr1bF" },
  },
};
