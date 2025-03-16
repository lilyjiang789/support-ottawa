import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { useGlobalAction } from "@gadgetinc/react";
import { api } from "../api";
import { useState, useEffect } from "react";
import Sidebar from "@/components/ui/side-nav-bar";
import { APIProvider, Map } from '@vis.gl/react-google-maps';

/*
    <Card className="p-8">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">👋 Hey, Developer!</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
      </CardContent>
    </Card>
*/

export default function () {
  const [{ data, error, fetching }, distribute] = useGlobalAction(api.distribute);
  const [output, setOutput] = useState("Click Me!");
  
  const handleDistribute = async () => {
    setOutput("Processing...");
    setOutput((await distribute({ prompt: "say hi!" })).data);
  };
  
  // Google Maps API key from environment variables
  const GOOGLE_API_KEY = "AIzaSyD8Pv6cvrVjIbU8fcKtlVjaRsSustYnh3M";
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-start pt-16 p-8">
        <h1 className="text-5xl font-bold text-left leading-tight">
          Welcome to,
          <br />
          Ottawa Support Community
        </h1>
        <div className="w-full flex justify-center" style={{ marginTop: "20px" }}>
          <APIProvider apiKey={GOOGLE_API_KEY}>
            <Map 
              style={{ width: '1400px', height: '800px' , overflow:'hidden'}} 
              defaultZoom={13} 
              center={{ lat: 45.38368, lng: -75.7006336 }} 
              gestureHandling={'greedy'} 
              disableDefaultUI={true} 
            />
          </APIProvider>
        </div>
      </main>
    </div>
  );
}
