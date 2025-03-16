import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import Sidebar from "@/components/ui/side-nav-bar";
import { useState } from "react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";

export default function () {
  const [foodBanksExpanded, setFoodBanksExpanded] = useState(false);
  const [sheltersExpanded, setSheltersExpanded] = useState(false);
  const [selectedAnnouncementType, setSelectedAnnouncementType] = useState<string | null>(null);
  
  const toggleFoodBanks = () => {
    setFoodBanksExpanded(!foodBanksExpanded);
  };
  
  const toggleShelters = () => {
    setSheltersExpanded(!sheltersExpanded);
  };
  
  const handleAnnouncementTypeSelect = (type: string) => {
    setSelectedAnnouncementType(type);
    // Additional logic for handling the selected announcement type can be added here
  };
  return (
    <div className="flex flex-col h-screen w-full">
        <Sidebar/>
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-8 pt-4">
          <div className="flex flex-col pl-[350px] pt-4">
            <h1 className="text-5xl font-bold text-left leading-tight">
              Announcements,
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="mt-4 w-32 text-white" variant="secondary">
                  <PlusCircle className=" h-4 w-4" />
                  Create New
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleAnnouncementTypeSelect("Event")}>
                  Event
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAnnouncementTypeSelect("Donation")}>
                  Donation
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAnnouncementTypeSelect("Event")}>
                  Volunteer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
          <div className="mt-8 pl-[350px]">
            <Card className="rounded-lg shadow-md bg-secondary w-full">
              <CardHeader>
                <CardTitle className="text-xl text-white">Donation Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                
              </CardContent>
            </Card>
          </div>
        </main>
    </div>
  );
}
