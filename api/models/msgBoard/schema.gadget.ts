import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "msgBoard" model, go to https://support-ottawa.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "xuZ_Gu-I4Kxn",
  fields: {
    msg: { type: "string", storageKey: "9U5WAHRfi4yj" },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "xuZ_Gu-I4Kxn-BelongsTo-User",
    },
  },
};
