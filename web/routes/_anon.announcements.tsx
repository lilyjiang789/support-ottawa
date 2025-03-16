import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Link, useNavigate } from "react-router";
import Sidebar from "@/components/ui/side-nav-bar";
import { useState } from "react";
import { useSession, useUser } from "@gadgetinc/react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { PlusCircle, Calendar, Clock, MapPin, Mail } from "lucide-react";
import { useFindMany } from "@gadgetinc/react";
import { api } from "../api";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function () {
  const [foodBanksExpanded, setFoodBanksExpanded] = useState(false);
  const [sheltersExpanded, setSheltersExpanded] = useState(false);
  const [selectedAnnouncementType, setSelectedAnnouncementType] = useState<string | null>(null);
  
  // Get authenticated user status
  const session = useSession(api);
  const user = useUser(api);
  const isAuthenticated = Boolean(user);
  
  // Create a dynamic select object based on authentication status
  const selectObject = {
    id: true,
    title: true,
    description: true,
    date: true,
    time: true,
    where: true,
    contact: true,
    ...(isAuthenticated ? {
      user: {
        id: true,
        firstName: true,
        lastName: true,
        googleImageUrl: true,
      }
    } : {})
  };
  
  // Fetch announcements with related user data only if the user is authenticated
  const [{ data: announcements, fetching, error }] = useFindMany(api.announcements, {
    select: selectObject,
    sort: { date: "Descending" }
  });
  
  const toggleFoodBanks = () => {
    setFoodBanksExpanded(!foodBanksExpanded);
  };
  
  const toggleShelters = () => {
    setSheltersExpanded(!sheltersExpanded);
  };
  
  const navigate = useNavigate();
  
  const handleAnnouncementTypeSelect = (type: string) => {
    if (isAuthenticated) {
      setSelectedAnnouncementType(type);
      // Additional logic for handling the selected announcement type can be added here
    } else {
      // Redirect unauthenticated users to sign-in with relevant parameters
      navigate(`/sign-in?from=announcements&type=${type}`);
    }
  };
  
  // Format date to be more user-friendly
  const formatDate = (dateString: string | Date | null | undefined) => {
    if (!dateString) return "No date";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  // Format time to be more user-friendly
  const formatTime = (timeString: string | Date | null | undefined) => {
    if (!timeString) return "No time";
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Get initials for avatar fallback
  const getInitials = (firstName: string | null | undefined, lastName: string | null | undefined) => {
    const first = firstName?.[0] || '';
    const last = lastName?.[0] || '';
    return (first + last).toUpperCase();
  };
  
  return (
    <div className="flex flex-col h-screen w-full">
        <Sidebar/>
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-8 pt-4">
            <div className="flex flex-col pl-[350px] pt-4">
              <h1 className="text-5xl font-bold text-left leading-tight">
                Announcements
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="mt-4 w-32 text-white" variant="secondary">
                    <PlusCircle className="h-4 w-4 mr-2" />
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
                  <DropdownMenuItem onClick={() => handleAnnouncementTypeSelect("Volunteer")}>
                    Volunteer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="mt-8 pl-[350px]">
            {fetching && (
              <div className="text-center py-8">
                <p>Loading announcements...</p>
              </div>
            )}
            
            {error && (
              <div className="text-center py-8">
                <p className="text-red-500">Error loading announcements: {error.toString()}</p>
              </div>
            )}
            
            {!fetching && announcements && announcements.length === 0 && (
              <div className="text-center py-8">
                <p>No announcements available yet.</p>
              </div>
            )}
            
            <div className="w-full">
              {announcements && announcements.map((announcement) => (
                <Card key={announcement.id} className="rounded-lg shadow-md bg-accent w-full mt-4">
                  <CardHeader>
                    {isAuthenticated && announcement.user && (
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar>
                          <AvatarImage src={announcement.user.googleImageUrl || undefined} />
                          <AvatarFallback>{getInitials(announcement.user.firstName, announcement.user.lastName)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {announcement.user.firstName} {announcement.user.lastName}
                          </p>
                        </div>
                      </div>
                    )}
                    <CardTitle className={!isAuthenticated ? "mt-2" : ""}>{announcement.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {announcement.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2 text-sm">
                      {announcement.date && (
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{formatDate(announcement.date)}</span>
                        </div>
                      )}
                      {announcement.time && (
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{formatTime(announcement.time)}</span>
                        </div>
                      )}
                      {announcement.where && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{announcement.where}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {announcement.contact && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${announcement.contact}`} className="text-blue-600 hover:underline">
                          {announcement.contact}
                        </a>
                      </div>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </main>
    </div>
  );
}
