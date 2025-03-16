import { Outlet, redirect, useOutletContext } from "react-router";
import type { RootOutletContext } from "../root";
import type { Route } from "./+types/_anon";
import {APIProvider} from "@vis.gl/react-google-maps";

export const loader = async ({ context }: Route.LoaderArgs) => {
  const { session, gadgetConfig } = context;

  const signedIn = !!session?.get("user");

  /*if (signedIn) {
    return redirect(
      gadgetConfig.authentication!.redirectOnSuccessfulSignInPath!
    );
  }*/

  return {};
};

export default function () {
  const context = useOutletContext<RootOutletContext>();
  const GOOGLE_API_KEY = "AIzaSyD8Pv6cvrVjIbU8fcKtlVjaRsSustYnh3M";

  return (
    <div className="w-screen h-screen grid place-items-center">
      <APIProvider apiKey={GOOGLE_API_KEY}>
      <Outlet context={context} />
      </APIProvider>
    </div>
  );
}
