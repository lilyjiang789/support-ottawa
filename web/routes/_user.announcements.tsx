import { useFindMany } from "@gadgetinc/react";
import { api } from "../api";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, MailIcon, MapPinIcon, PlusIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function Announcements() {
  const [announcementType, setAnnouncementType] = useState<string>("all");
  const [{ data: announcements, fetching, error }] = useFindMany(api.announcements, {
    filter: announcementType !== "all" ? { type: { equals: announcementType } } : undefined,
    sort: { createdAt: "Descending" },
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      time: true,
      type: true,
      where: true,
      contact: true,
      createdAt: true,
    },
  });

  // Function to get announcement type badge color
  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "event":
        return "bg-blue-500";
      case "emergency":
        return "bg-red-500";
      case "food":
        return "bg-green-500";
      case "shelter":
        return "bg-amber-500";
      case "volunteer":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Announcements</h1>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Create New
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => window.location.href = "/create-announcement?type=event"}>
              Event Announcement
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = "/create-announcement?type=emergency"}>
              Emergency Alert
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = "/create-announcement?type=food"}>
              Food Distribution
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = "/create-announcement?type=shelter"}>
              Shelter Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = "/create-announcement?type=volunteer"}>
              Volunteer Opportunity
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Tabs defaultValue="all" value={announcementType} onValueChange={setAnnouncementType} className="w-full">
        <TabsList className="grid grid-cols-6 mb-8">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="event">Events</TabsTrigger>
          <TabsTrigger value="emergency">Emergencies</TabsTrigger>
          <TabsTrigger value="food">Food</TabsTrigger>
          <TabsTrigger value="shelter">Shelter</TabsTrigger>
          <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
        </TabsList>

        <TabsContent value={announcementType} className="mt-0">
          {fetching ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> Unable to load announcements. Please try again later.</span>
            </div>
          ) : announcements?.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-lg">
              <h3 className="font-medium text-lg mb-2">No announcements found</h3>
              <p className="text-gray-500 mb-4">There are no announcements in this category yet.</p>
              <Button onClick={() => window.location.href = "/create-announcement"}>
                <PlusIcon className="mr-2 h-4 w-4" />
                Create Announcement
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {announcements.map((announcement) => (
                <Card key={announcement.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{announcement.title}</CardTitle>
                      <Badge className={`${getTypeColor(announcement.type)}`}>{announcement.type}</Badge>
                    </div>
                    <CardDescription className="line-clamp-2">{announcement.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      {announcement.date && (
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                          <span>{format(new Date(announcement.date), "MMMM d, yyyy")}</span>
                          {announcement.time && (
                            <span className="ml-1">
                              at {format(new Date(announcement.time), "h:mm a")}
                            </span>
                          )}
                        </div>
                      )}
                      {announcement.where && (
                        <div className="flex items-center">
                          <MapPinIcon className="mr-2 h-4 w-4 opacity-70" />
                          <span>{announcement.where}</span>
                        </div>
                      )}
                      {announcement.contact && (
                        <div className="flex items-center">
                          <MailIcon className="mr-2 h-4 w-4 opacity-70" />
                          <a href={`mailto:${announcement.contact}`} className="text-blue-600 hover:underline">
                            {announcement.contact}
                          </a>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="border-t bg-gray-50 py-2 text-xs text-gray-500">
                    Posted {format(new Date(announcement.createdAt), "MMMM d, yyyy")}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}