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
                Donate for the cause...
              </h1>
              <div className="flex items-center gap-12 mt-2">
                <p className="text-xl text-gray-600">
                  What would you like to donate?
                </p>
                <Select value={donationType} onValueChange={setDonationType}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Select donation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Hygiene">Hygiene</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-xl text-gray-600 mt-20">
                  If possible donate to this location...
                </p>
            </div>
          </div>
        <div className="flex justify-end md:pr-8">
          <div className="flex">
            <Card className="rounded-lg shadow-md bg-accent w-[250px]">
               <CardHeader>
                 <CardTitle className="text-xl">Our Choice</CardTitle>
               </CardHeader>
               <CardContent className="px-2">
                 <div className="space-y-4">
                   <div className="border-b pb-4">
                     <div className="flex items-center gap-2 mb-2">
                       <span className="font-bold px-4">Details:</span>
                     </div>
                     <p className="mt-2 px-5"><span className="font-medium">Stock: </span><span className="font-light">10/20</span></p>
                     <p className="mt-2 px-5"><span className="font-medium">Distance: </span><span className="font-light">2.5 km</span></p>
                   </div>

                   <div className="border-b pb-4">
                     <div className="mb-2">
                       <div className="flex items-center gap-2">
                         <span className="font-bold px-4">Why this:</span>
                       </div>
                       <p className="font-light mt-2 px-5">Thank you for your generosity! Based on your donation, I’ve found the closest shelter or organization that needs it the most. This location is currently low on [donated item], so your contribution will have an immediate impact. It’s also the closest drop-off point to make it easier for you.</p>
                     </div>
                   </div>
                 </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
    </div>
  );
}
