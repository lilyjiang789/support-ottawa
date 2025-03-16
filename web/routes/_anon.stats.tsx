import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import Sidebar from "@/components/ui/side-nav-bar";

interface PartnerStats {
  livingCapacity: string;
  clothing: string;
  hygiene: string;
  food: string;
}

interface Partner {
  id: string;
  name: string;
  type: 'foodBank' | 'shelter';
  stats: PartnerStats;
  description: string;
}

export default function () {
  // Sample data for partners
  const partners: Partner[] = [
    {
      id: "ofb",
      name: "Ottawa Food Bank",
      type: "foodBank",
      stats: {
        livingCapacity: "N/A",
        clothing: "120 pieces",
        hygiene: "180 pieces",
        food: "450 pieces"
      },
      description: "Serving Ottawa's communities since 1984"
    },
    {
      id: "pfc",
      name: "Parkdale Food Centre",
      type: "foodBank",
      stats: {
        livingCapacity: "N/A",
        clothing: "85 pieces",
        hygiene: "110 pieces",
        food: "300 pieces"
      },
      description: "Community-based food bank focused on healthy food access"
    },
    {
      id: "gefc",
      name: "Gloucester Emergency Food Cupboard",
      type: "foodBank",
      stats: {
        livingCapacity: "N/A",
        clothing: "60 pieces",
        hygiene: "90 pieces",
        food: "250 pieces"
      },
      description: "Supporting Gloucester residents with emergency food needs"
    },
    {
      id: "kfc",
      name: "Kanata Food Cupboard",
      type: "foodBank",
      stats: {
        livingCapacity: "N/A",
        clothing: "70 pieces",
        hygiene: "75 pieces",
        food: "220 pieces"
      },
      description: "Helping Kanata residents through food security programs"
    },
    {
      id: "sgh",
      name: "Shepherds of Good Hope",
      type: "shelter",
      stats: {
        livingCapacity: "20/45",
        clothing: "200 pieces",
        hygiene: "225 pieces",
        food: "380 pieces"
      },
      description: "Ottawa's largest non-profit organization dedicated to the homeless"
    },
    {
      id: "om",
      name: "Ottawa Mission",
      type: "shelter",
      stats: {
        livingCapacity: "12/50",
        clothing: "180 pieces",
        hygiene: "195 pieces",
        food: "410 pieces"
      },
      description: "Providing food, shelter, and hope since 1906"
    },
    {
      id: "cws",
      name: "Cornerstone Women's Shelter",
      type: "shelter",
      stats: {
        livingCapacity: "18/35",
        clothing: "160 pieces",
        hygiene: "210 pieces",
        food: "290 pieces"
      },
      description: "Supporting women experiencing homelessness and at risk of homelessness"
    },
    {
      id: "ysb",
      name: "Youth Services Bureau",
      type: "shelter",
      stats: {
        livingCapacity: "15/30",
        clothing: "140 pieces",
        hygiene: "170 pieces",
        food: "260 pieces"
      },
      description: "Serving youth and families in Ottawa since 1960"
    }
  ];

  // State to track selected partner
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  return (
    <div className="flex flex-col h-screen w-full">
        <Sidebar/>
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-8 pt-4">
          <div className="flex pl-[350px] pt-4">
            <h1 className="text-5xl font-bold text-left leading-tight">
              Statistics
            </h1>
          </div>
          </div>
        <div className="flex justify-end md:pr-8">
          <div className="flex">
            <Card className="rounded-lg shadow-md bg-accent max-w-xl">
               <CardHeader>
                 <CardTitle className="text-xl">Our Partners</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   <div className="border-b pb-2">
                     <div className="flex items-center gap-2 mb-2">
                       <div className="w-4 h-4 rounded-full bg-secondary"></div>
                       <span className="font-medium">Food Banks:</span>
                     </div>
                     <div className="pt-2 pl-6 space-y-2 text-sm">
                         {partners.filter(partner => partner.type === "foodBank").map(partner => (
                           <div 
                             key={partner.id}
                             className={`py-1 rounded px-2 whitespace-normal break-words cursor-pointer ${selectedPartner?.id === partner.id ? 'bg-secondary/40' : 'hover:bg-secondary/20'}`}
                             onClick={() => setSelectedPartner(partner)}
                           >
                             {partner.name}
                           </div>
                         ))}
                       </div>
                   </div>

                   <div className="border-b pb-2">
                     <div className="flex items-center gap-2 mb-2">
                       <div className="w-4 h-4 rounded-full bg-primary"></div>
                       <span className="font-medium">Shelters:</span>
                     </div>
                     <div className="pt-2 pl-6 space-y-2 text-sm">
                         {partners.filter(partner => partner.type === "shelter").map(partner => (
                           <div 
                             key={partner.id}
                             className={`py-1 rounded px-2 whitespace-normal break-words cursor-pointer ${selectedPartner?.id === partner.id ? 'bg-primary/40' : 'hover:bg-primary/20'}`}
                             onClick={() => setSelectedPartner(partner)}
                           >
                             {partner.name}
                           </div>
                         ))}
                       </div>
                   </div>
                 </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="mt-8 pl-[350px]">
            <Card className="rounded-lg shadow-md bg-secondary w-full">
              <CardHeader>
                <CardTitle className="text-xl text-white">
                  {selectedPartner ? `${selectedPartner.name} Statistics` : "Select a Partner to View Statistics"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedPartner ? (
                  <>
                    <div className="text-sm text-white mb-4 opacity-80">
                      {selectedPartner.description}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-3xl text-white font-bold">
                          {selectedPartner.stats.livingCapacity}
                        </div>
                        <div className="text-sm text-white opacity-80">Living Capacity</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-3xl text-white font-bold">
                          {selectedPartner.stats.clothing}
                        </div>
                        <div className="text-sm text-white opacity-80">Clothing</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-3xl text-white font-bold">
                          {selectedPartner.stats.hygiene}
                        </div>
                        <div className="text-sm text-white opacity-80">Hygiene</div>
                      </div>
                      <div className="bg-white/10 p-4 rounded-lg">
                        <div className="text-3xl text-white font-bold">
                          {selectedPartner.stats.food}
                        </div>
                        <div className="text-sm text-white opacity-80">Food</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6 text-white">
                    <p>Click on a partner from the list above to view their detailed statistics.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
    </div>
  );
}
