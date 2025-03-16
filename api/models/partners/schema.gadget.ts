import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "partners" model, go to https://support-ottawa.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "dTDyXMdJrqBW",
  fields: {
    acceptingDonations: {
      type: "boolean",
      storageKey: "eVYVlKhnGpGQ",
    },
    address: { type: "string", storageKey: "4Xdn_vY_FgpD" },
    clothing: { type: "number", storageKey: "TgKUn_CAUVOw" },
    clothingCapacity: { type: "number", storageKey: "bSD7pVfK0byx" },
    email: { type: "string", storageKey: "3ydaVw-rVldQ" },
    food: { type: "number", storageKey: "DirWWV2hy1dx" },
    foodCapacity: { type: "number", storageKey: "2yRUeGdCLaBl" },
    fridayHours: { type: "string", storageKey: "geDGMee_-Iy0" },
    hygiene: { type: "number", storageKey: "p92diultS8Pk" },
    hygieneCapacity: { type: "number", storageKey: "lBl6_CveMCmN" },
    mondayHours: { type: "string", storageKey: "oakp563IFhrb" },
    name: { type: "string", storageKey: "CdMS7navFtQa" },
    phoneNumber: { type: "string", storageKey: "EmHTZvN1Tvig" },
    saturdayHours: { type: "string", storageKey: "f8widyP7oVCg" },
    sundayHours: { type: "string", storageKey: "K_gArSRGHjiV" },
    thursdayHours: { type: "string", storageKey: "y4GY2mRBOwoh" },
    tuesdayHours: { type: "string", storageKey: "m1S0zDLUCOlT" },
    type: {
      type: "roleList",
      default: ["signed-in"],
      storageKey: "Y1_ZOFQf8lpY",
    },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "dTDyXMdJrqBW-BelongsTo-User",
    },
    wednesdayHours: { type: "string", storageKey: "6Ey-acrWRhqq" },
  },
};
