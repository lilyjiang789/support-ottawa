import { useOutletContext } from "react-router";
import { useFindMany } from "@gadgetinc/react";
import { api } from "../api";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import type { AuthOutletContext } from "./_user";

export default function () {
  const { user } = useOutletContext<AuthOutletContext>();
  
  // Fetch partners data (food banks and shelters)
  const [{ data: partners, fetching: fetchingPartners }] = useFindMany(api.partners, {
    select: {
      id: true,
      name: true,
      type: true,
      address: true,
      email: true,
      phoneNumber: true,
      acceptingDonations: true,
      food: true,
      foodCapacity: true,
      clothing: true,
      clothingCapacity: true,
      hygiene: true,
      hygieneCapacity: true,
      mondayHours: true,
      tuesdayHours: true,
      wednesdayHours: true,
      thursdayHours: true,
      fridayHours: true,
      saturdayHours: true,
      sundayHours: true,
    }
  });

  // Fetch announcements
  const [{ data: announcements, fetching: fetchingAnnouncements }] = useFindMany(api.announcements, {
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      time: true,
      where: true,
      type: true,
      contact: true,
    }
  });

  const foodbanks = partners?.filter(partner => partner.type.includes("foodbank-admin"));
  const shelters = partners?.filter(partner => partner.type.includes("shelter-admin"));

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user.firstName || user.email.split('@')[0]}</h1>
            <p className="text-muted-foreground">Find resources and help in Ottawa</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Button asChild>
              <Link to="/announcements">View Announcements</Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Food Banks Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Food Banks</h2>
          
          {fetchingPartners ? (
            <div className="py-4 text-center">Loading food banks...</div>
          ) : foodbanks && foodbanks.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {foodbanks.map((foodbank) => (
                <AccordionItem key={foodbank.id} value={foodbank.id}>
                  <AccordionTrigger className="text-lg font-medium">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span>{foodbank.name}</span>
                      {foodbank.acceptingDonations && (
                        <Badge className="ml-2" variant="outline">
                          Accepting Donations
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div>
                        <h4 className="font-semibold">Address</h4>
                        <p>{foodbank.address}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Contact</h4>
                        <p>{foodbank.email}</p>
                        <p>{foodbank.phoneNumber}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Hours</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {foodbank.mondayHours && <p><span className="font-medium">Monday:</span> {foodbank.mondayHours}</p>}
                          {foodbank.tuesdayHours && <p><span className="font-medium">Tuesday:</span> {foodbank.tuesdayHours}</p>}
                          {foodbank.wednesdayHours && <p><span className="font-medium">Wednesday:</span> {foodbank.wednesdayHours}</p>}
                          {foodbank.thursdayHours && <p><span className="font-medium">Thursday:</span> {foodbank.thursdayHours}</p>}
                          {foodbank.fridayHours && <p><span className="font-medium">Friday:</span> {foodbank.fridayHours}</p>}
                          {foodbank.saturdayHours && <p><span className="font-medium">Saturday:</span> {foodbank.saturdayHours}</p>}
                          {foodbank.sundayHours && <p><span className="font-medium">Sunday:</span> {foodbank.sundayHours}</p>}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">Inventory Status</h4>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Food</span>
                            <div className="flex items-center">
                              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${foodbank.food > (foodbank.foodCapacity / 2) ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                  style={{ width: `${(foodbank.food / foodbank.foodCapacity) * 100}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs">{Math.round((foodbank.food / foodbank.foodCapacity) * 100)}%</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Clothing</span>
                            <div className="flex items-center">
                              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${foodbank.clothing > (foodbank.clothingCapacity / 2) ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                  style={{ width: `${(foodbank.clothing / foodbank.clothingCapacity) * 100}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs">{Math.round((foodbank.clothing / foodbank.clothingCapacity) * 100)}%</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Hygiene</span>
                            <div className="flex items-center">
                              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${foodbank.hygiene > (foodbank.hygieneCapacity / 2) ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                  style={{ width: `${(foodbank.hygiene / foodbank.hygieneCapacity) * 100}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs">{Math.round((foodbank.hygiene / foodbank.hygieneCapacity) * 100)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="py-4 text-center text-muted-foreground">No food banks found</p>
          )}
        </Card>

        {/* Shelters Section */}
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Shelters</h2>
          
          {fetchingPartners ? (
            <div className="py-4 text-center">Loading shelters...</div>
          ) : shelters && shelters.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {shelters.map((shelter) => (
                <AccordionItem key={shelter.id} value={shelter.id}>
                  <AccordionTrigger className="text-lg font-medium">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span>{shelter.name}</span>
                      {shelter.acceptingDonations && (
                        <Badge className="ml-2" variant="outline">
                          Accepting Donations
                        </Badge>
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div>
                        <h4 className="font-semibold">Address</h4>
                        <p>{shelter.address}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Contact</h4>
                        <p>{shelter.email}</p>
                        <p>{shelter.phoneNumber}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold">Hours</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {shelter.mondayHours && <p><span className="font-medium">Monday:</span> {shelter.mondayHours}</p>}
                          {shelter.tuesdayHours && <p><span className="font-medium">Tuesday:</span> {shelter.tuesdayHours}</p>}
                          {shelter.wednesdayHours && <p><span className="font-medium">Wednesday:</span> {shelter.wednesdayHours}</p>}
                          {shelter.thursdayHours && <p><span className="font-medium">Thursday:</span> {shelter.thursdayHours}</p>}
                          {shelter.fridayHours && <p><span className="font-medium">Friday:</span> {shelter.fridayHours}</p>}
                          {shelter.saturdayHours && <p><span className="font-medium">Saturday:</span> {shelter.saturdayHours}</p>}
                          {shelter.sundayHours && <p><span className="font-medium">Sunday:</span> {shelter.sundayHours}</p>}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold">Inventory Status</h4>
                        <div className="grid grid-cols-2 gap-4 mt-2">
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Food</span>
                            <div className="flex items-center">
                              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${shelter.food > (shelter.foodCapacity / 2) ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                  style={{ width: `${(shelter.food / shelter.foodCapacity) * 100}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs">{Math.round((shelter.food / shelter.foodCapacity) * 100)}%</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Clothing</span>
                            <div className="flex items-center">
                              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${shelter.clothing > (shelter.clothingCapacity / 2) ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                  style={{ width: `${(shelter.clothing / shelter.clothingCapacity) * 100}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs">{Math.round((shelter.clothing / shelter.clothingCapacity) * 100)}%</span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-sm text-muted-foreground">Hygiene</span>
                            <div className="flex items-center">
                              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${shelter.hygiene > (shelter.hygieneCapacity / 2) ? 'bg-green-500' : 'bg-yellow-500'}`} 
                                  style={{ width: `${(shelter.hygiene / shelter.hygieneCapacity) * 100}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs">{Math.round((shelter.hygiene / shelter.hygieneCapacity) * 100)}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="py-4 text-center text-muted-foreground">No shelters found</p>
          )}
        </Card>
      </div>

      {/* Recent Announcements Section */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Announcements</h2>
          <Button variant="outline" asChild>
            <Link to="/announcements">View All</Link>
          </Button>
        </div>
        
        {fetchingAnnouncements ? (
          <div className="py-4 text-center">Loading announcements...</div>
        ) : announcements && announcements.length > 0 ? (
          <div className="space-y-4">
            {announcements.slice(0, 3).map((announcement) => (
              <div key={announcement.id} className="border rounded-md p-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold text-lg">{announcement.title}</h3>
                  <Badge>{announcement.type}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{announcement.description}</p>
                <div className="mt-2 text-sm flex gap-4">
                  <span>
                    {announcement.date?.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  {announcement.where && <span>Location: {announcement.where}</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-4 text-center text-muted-foreground">No recent announcements</p>
        )}
      </Card>

      {/* User Profile Card */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Name
            </dt>
            <dd className="text-base">{`${user.firstName || ''} ${user.lastName || ''}`}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Email
            </dt>
            <dd className="text-base">
              <a
                href={`mailto:${user.email}`}
                className="text-primary hover:underline"
              >
                {user.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Account Type
            </dt>
            <dd className="text-base">
              {user.roles.includes("foodbank-admin") 
                ? "Food Bank Administrator" 
                : user.roles.includes("shelter-admin")
                ? "Shelter Administrator"
                : "Community Member"}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-muted-foreground">
              Member Since
            </dt>
            <dd className="text-base">
              {user.createdAt.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </dd>
          </div>
        </dl>
        <div className="mt-4">
          <Button asChild variant="outline">
            <Link to="/profile">Edit Profile</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}