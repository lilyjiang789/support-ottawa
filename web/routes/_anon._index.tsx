import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import { useGlobalAction } from "@gadgetinc/react";
import { api } from "../api";
import { useState, useEffect } from "react";
import Sidebar from "@/components/ui/side-nav-bar";
import { APIProvider, Map, Marker, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import {ChevronDown, ChevronUp} from "lucide-react";

export default function () {
  const [{ data, error, fetching }, distribute] = useGlobalAction(api.distribute);
  const [lats,setLat] = useState(0);
  const [lngs,setLng] = useState(0);
  const [places, setPlaces] = useState([]);
  const [foodBanksExpanded, setFoodBanksExpanded] = useState(false);
  const [sheltersExpanded, setSheltersExpanded] = useState(false);

  useEffect(() => {
    updateLoc();
    const fetchPlaces = async () => {
      await updatePlaces();
    };
    fetchPlaces();
  }, []);

  const toggleFoodBanks = () => {
    setFoodBanksExpanded(!foodBanksExpanded);
  };
  
  const toggleShelters = () => {
    setSheltersExpanded(!sheltersExpanded);
  };

  const updateLoc = () =>{
  if(!navigator.geolocation){
    
  }else{
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
      
    }, () => {
      setLat(0);
      setLng(0);
    });
  }
  };

  const updatePlaces = async () => {
    try {
      //const foodBanks = await api.foodBank.findMany();
      const shelters = await api.shelter.findMany();
      
      const markers = [];
      
      // Add food bank markers
      /**foodBanks.forEach((entry) => {
        markers.push(
          <Marker 
            //key={`foodbank-${entry.id}`} 
            position={{ lat: entry.latitude, lng: entry.longitude }} 
          />
        );
      });*/
      
      // Add shelter markers
      shelters.forEach((entry) => {
        markers.push(
          <Marker 
            //key={`shelter-${entry.id}`} 
            position={{ lat: entry.latitude, lng: entry.longitude }} 
          />
        );
      });
      
      setPlaces(markers);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  }
  
  // Google Maps API key from environment variables
  const GOOGLE_API_KEY = "AIzaSyD8Pv6cvrVjIbU8fcKtlVjaRsSustYnh3M";
  
  return (
    <div className="flex flex-col h-screen w-full max-w-9/10">
        <Sidebar/>
        <main className="flex-1 p-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-8 pt-4">
          <div className="flex pl-[350px] pt-4">
            <h1 className="text-5xl font-bold text-left leading-tight">
              Welcome to,
              <br />
              Ottawa Support Community
            </h1>
          </div>
        </div>
        <div className="flex justify-end md:pr-0 pl-[318px]">
          <div className="w-full flex justify-center" style={{ marginTop: "20px" }}>
          <APIProvider apiKey={GOOGLE_API_KEY}>
            <Map 
              style={{ width: '1050px', height: '800px' , overflow:'hidden'}} 
              defaultZoom={13} 
              center={{ lat: lats, lng: lngs }} 
              gestureHandling={'greedy'} 
              disableDefaultUI={true}
              mapId="DEMO_MAP_ID"
            >
            <AdvancedMarker position={{ lat: lats, lng: lngs }}>
              <Pin
                background={'#00008B'}
                borderColor={'#006425'}
                glyphColor={'#89CFF0'}
                />
            </AdvancedMarker>
              {places}
          </Map>
          </APIProvider>
        </div>
          <div className="flex inset-y-0 right-0">
            
            <Card className="rounded-lg shadow-md bg-accent max-w-xl">
               <CardHeader>
                 <CardTitle className="text-xl">Our Partners</CardTitle>
               </CardHeader>
               <CardContent>
                 <div className="space-y-4">
                   <div className="border-b pb-2">
                     <button 
                       onClick={toggleFoodBanks}
                       className="flex justify-between items-center w-full"
                     >
                       <div className="flex items-center gap-2">
                         <div className="w-4 h-4 rounded-full bg-secondary"></div>
                         <span className="font-medium">Food Banks:</span>
                       </div>
                       {foodBanksExpanded ? (
                         <ChevronUp className="h-4 w-4" />
                       ) : (
                         <ChevronDown className="h-4 w-4" />
                       )}
                     </button>
                     {foodBanksExpanded && (
                       <div className="pt-2 pl-6 space-y-2 text-sm transition-all duration-200 ease-in-out">
                         <div className="py-1 hover:bg-secondary/20 rounded px-2 whitespace-normal break-words">Ottawa Food Bank</div>
                         <div className="py-1 hover:bg-secondary/20 rounded px-2 whitespace-normal break-words">Parkdale Food Centre</div>
                         <div className="py-1 hover:bg-secondary/20 rounded px-2 whitespace-normal break-words">Gloucester Emergency Food Cupboard</div>
                         <div className="py-1 hover:bg-secondary/20 rounded px-2 whitespace-normal break-words">Kanata Food Cupboard</div>
                       </div>
                     )}
                   </div>

                   <div className="border-b pb-2">
                     <button 
                       onClick={toggleShelters}
                       className="flex justify-between items-center w-full"
                     >
                       <div className="flex items-center gap-2">
                         <div className="w-4 h-4 rounded-full bg-primary"></div>
                         <span className="font-medium">Shelters:</span>
                       </div>
                       {sheltersExpanded ? (
                         <ChevronUp className="h-4 w-4" />
                       ) : (
                         <ChevronDown className="h-4 w-4" />
                       )}
                     </button>
                     {sheltersExpanded && (
                       <div className="pt-2 pl-6 space-y-2 text-sm transition-all duration-200 ease-in-out">
                         <div className="py-1 hover:bg-primary/20 rounded px-2 whitespace-normal break-words">Shepherds of Good Hope</div>
                         <div className="py-1 hover:bg-primary/20 rounded px-2 whitespace-normal break-words">Ottawa Mission</div>
                         <div className="py-1 hover:bg-primary/20 rounded px-2 whitespace-normal break-words">Cornerstone Women's Shelter</div>
                         <div className="py-1 hover:bg-primary/20 rounded px-2 whitespace-normal break-words">Youth Services Bureau</div>
                       </div>
                     )}
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
