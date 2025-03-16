import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "announcements" model, go to https://support-ottawa.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "xuZ_Gu-I4Kxn",
  fields: {
    contact: { type: "string", storageKey: "05UcUuvvI0dW" },
    date: {
      type: "dateTime",
      includeTime: true,
      storageKey: "RD4oIeowKUnI",
    },
    description: { type: "string", storageKey: "9U5WAHRfi4yj" },
    time: {
      type: "dateTime",
      includeTime: true,
      storageKey: "6jlwI9vQ1Jp1",
    },
    title: { type: "string", storageKey: "PQ_Y5m7ezcE6" },
    type: { type: "string", storageKey: "k8NRFHFU803C" },
    user: {
      type: "belongsTo",
      parent: { model: "user" },
      storageKey: "xuZ_Gu-I4Kxn-BelongsTo-User",
    },
    where: { type: "string", storageKey: "3QCfCCioj2zj" },
  },
};
