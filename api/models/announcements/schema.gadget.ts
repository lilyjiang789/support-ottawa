import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "announcements" model, go to https://support-ottawa.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "dVwj-vwPqXvm",
  fields: {
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "dVwj-vwPqXvm-BelongsTo-User",
    },
  },
};
