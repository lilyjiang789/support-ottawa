import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import Sidebar from "@/components/ui/side-nav-bar";

export default function () {
  return (
    <div className="flex flex-col h-screen w-full">
        <Sidebar/>
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-8 pt-4">
          <div className="flex flex-col pl-[350px] pt-4">
            <h1 className="text-5xl font-bold text-left leading-tight">
              Find Food Bank...
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              The food bank recommended to you is...
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
                     <p className="mt-2 px-5"><span className="font-medium">Fresh Produce: </span><span className="font-light">10/20</span></p>
                     <p className="mt-2 px-5"><span className="font-medium">Canned Foods: </span><span className="font-light">2.5 km</span></p>
                   </div>

                   <div className="border-b pb-4">
                     <div className="mb-2">
                       <div className="flex items-center gap-2">
                         <span className="font-bold px-4">Why this:</span>
                       </div>
                       <p className="font-light mt-2 px-5">We found a shelter for you that has space available right now and is not too far from where you are. We also try to make sure that no single shelter becomes too crowded while others remain empty. This helps everyone have a fair chance at getting a safe place to stay and ensures the staff can provide the best care possible. If you have any preferences or concerns please let us know</p>
                     </div>
                   </div>

                   <div className="border-b pb-4">
                     <div className="mb-2">
                       <div className="flex items-center gap-2">
                         <span className="font-bold px-4">Preferences:</span>
                       </div>
                       <textarea 
                         className="w-full mt-2 px-3 py-2 border rounded-md text-sm resize-y" 
                         rows={3}
                         placeholder="Enter any specific needs, preferences, or concerns (e.g., accessibility requirements, pet-friendly, family accommodation)"
                       />
                       <div className="mt-3 flex justify-center">
                         <Button variant="default">Regenerate</Button>
                       </div>
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
