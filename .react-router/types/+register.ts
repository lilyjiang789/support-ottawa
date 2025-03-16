import "react-router";

declare module "react-router" {
  interface Register {
    params: Params;
  }
}

type Params = {
  "/": {};
  "/forgot-password": {};
  "/reset-password": {};
  "/find-shelter": {};
  "/verify-email": {};
  "/find-food": {};
  "/sign-in": {};
  "/sign-up": {};
  "/donate": {};
  "/about": {};
  "/stats": {};
  "/signed-in": {};
  "/profile": {};
};