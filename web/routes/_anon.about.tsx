import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Link } from "react-router";
import Sidebar from "@/components/ui/side-nav-bar";
import { useState } from "react";

export default function () {
  const [donationType, setDonationType] = useState<string>("Select type");
  return (
    <div className="flex flex-col h-screen w-full">
        <Sidebar/>
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-8 pt-4">
            <div className="flex flex-col pl-[350px] pt-4">
              <h1 className="text-5xl font-bold text-left leading-tight">
                About,
              </h1>
          </div>
          </div>  
        </main>
    </div>
  );
}
