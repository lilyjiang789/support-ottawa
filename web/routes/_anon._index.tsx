import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { useGlobalAction } from "@gadgetinc/react";
import { api } from "../api";
import { useState } from "react";

export default function () {
  const [{data, error ,fetching}, distribute] = useGlobalAction(api.distribute);
  const [output, setOutput] = useState("Click Me!");
  const [lng, setLng] = useState(0);
  const [lat,setLat] = useState(0);
  //const [address, setAddress] = useState("Unknown Address");
  const handleDistribute = async () => {
    setOutput("Processing...")
    const txt = await distribute({prompt:"say hi!"});
    setOutput((await distribute({prompt:"say hi!"})).data);
  };
  const findLoc = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const pos ={
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        };
        setLng(pos.lng);
        setLat(pos.lat);
        //setAddress(pos.lng + " " + JSON.stringify(pos.lat));
      },
      () => {
        //setAddress("Make Sure To Enable Location!")
        setLng(-181);
        setLat(-181);
      }
    );
  }
  return (
    <Card className="p-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">👋 Hey, Developer!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-base">
          Start building your app&apos;s signed out area in <a
            href="/edit/files/web/routes/_anon._index.jsx"
            target="_blank"
            rel="noreferrer"
            className="font-medium hover:underline"
          >
            web/routes/_anon._index.jsx
          </a>
        </p>
        
        <Button
          variant="default"
          size="lg"
          className="w-full"
          asChild
        >
          <Link to="/sign-up">Sign up</Link>
        </Button>
        <Button
          variant="outline"
          size="lg"
          className="w-full"
          asChild
        >
          <Link to="/sign-in">Sign in</Link>
        </Button>
        <Button onClick={handleDistribute}>
              {output}
        </Button>
        <Button onClick={findLoc}>
          {lng} {lat}
        </Button>
      </CardContent>
    </Card>
  );
}
