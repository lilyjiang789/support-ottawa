import type { GadgetModel } from "gadget-server";

// This file describes the schema for the "user" model, go to https://support-ottawa.gadget.app/edit to view/edit your model in Gadget
// For more information on how to update this file http://docs.gadget.dev

export const schema: GadgetModel = {
  type: "gadget/model-schema/v1",
  storageKey: "4ikhq8HkujPf",
  fields: {
    email: {
      type: "email",
      validations: { required: true, unique: true },
      storageKey: "wOKZTrKQyyI_",
    },
    emailVerificationToken: {
      type: "string",
      storageKey: "cQ4I4rZ0pFfG",
    },
    emailVerificationTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "7RBkaZPN_QVR",
    },
    emailVerified: {
      type: "boolean",
      default: false,
      storageKey: "s-UKi6uBXrmE",
    },
    firstName: { type: "string", storageKey: "P8fx-rddD7qS" },
    googleImageUrl: { type: "url", storageKey: "qDDr5xhcUJbl" },
    googleProfileId: { type: "string", storageKey: "yP-LFX3gxuFA" },
    lastName: { type: "string", storageKey: "uZor11lXQNyl" },
    lastSignedIn: {
      type: "dateTime",
      includeTime: true,
      storageKey: "AKqGKN2FYEET",
    },
    password: {
      type: "password",
      validations: { strongPassword: true },
      storageKey: "RgRIOtZjM56T",
    },
    resetPasswordToken: {
      type: "string",
      storageKey: "IoeiEw3cnkxu",
    },
    resetPasswordTokenExpiration: {
      type: "dateTime",
      includeTime: true,
      storageKey: "ix5eBgFHPlLQ",
    },
    roles: {
      type: "roleList",
      default: ["unauthenticated"],
      storageKey: "HmiOEhz6jtn9",
    },
  },
};
