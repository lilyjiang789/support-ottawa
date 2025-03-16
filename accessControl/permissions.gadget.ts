import type { GadgetPermissions } from "gadget-server";

/**
 * This metadata describes the access control configuration available in your application.
 * Grants that are not defined here are set to false by default.
 *
 * View and edit your roles and permissions in the Gadget editor at https://support-ottawa.gadget.app/edit/settings/permissions
 */
export const permissions: GadgetPermissions = {
  type: "gadget/permissions/v1",
  roles: {
    "signed-in": {
      storageKey: "signed-in",
      default: {
        read: true,
        action: true,
      },
      models: {
        foodBank: {
          read: {
            filter: "accessControl/filters/foodBank/tenant.gelly",
          },
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        foodBanks: {
          read: {
            filter: "accessControl/filters/foodBanks/tenant.gelly",
          },
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        msgBoard: {
          read: {
            filter: "accessControl/filters/msgBoard/tenant.gelly",
          },
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shelter: {
          read: true,
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        shelters: {
          read: {
            filter: "accessControl/filters/shelters/tenant.gelly",
          },
          actions: {
            create: true,
            delete: true,
            update: true,
          },
        },
        user: {
          read: {
            filter: "accessControl/filters/user/tenant.gelly",
          },
          actions: {
            changePassword: {
              filter: "accessControl/filters/user/tenant.gelly",
            },
            signOut: {
              filter: "accessControl/filters/user/tenant.gelly",
            },
          },
        },
      },
      actions: {
        distribute: true,
        fixGrab: true,
      },
    },
    unauthenticated: {
      storageKey: "unauthenticated",
      models: {
        foodBank: {
          read: true,
        },
        foodBanks: {
          read: true,
        },
        msgBoard: {
          read: true,
        },
        shelter: {
          read: true,
        },
        shelters: {
          read: true,
        },
        user: {
          actions: {
            resetPassword: true,
            sendResetPassword: true,
            sendVerifyEmail: true,
            signIn: true,
            signUp: true,
            verifyEmail: true,
          },
        },
      },
      actions: {
        distribute: true,
      },
    },
  },
};
