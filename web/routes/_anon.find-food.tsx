import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router";
import Sidebar from "@/components/ui/side-nav-bar";
import { useGlobalAction, useFindBy } from "@gadgetinc/react";
import { APIProvider, Map, useMapsLibrary, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { api } from "../api";
import { useState, useEffect } from "react";

export default function () {
  const [{ data, error, fetching }, distribute] = useGlobalAction(api.distribute);
  const [lats,setLat] = useState(0);
  const [lngs,setLng] = useState(0);
  const [places, setPlaces] = useState([]);
  const [goTo,setGoTo] = useState([]);
  const [detail,setDetails] = useState("");
  //const service = useMapsLibrary('routes');
  //const unit = useMapsLibrary('core');

  function distance(lat1, lon1, lat2, lon2) {
  const r = 6371; // km
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                  (1 - Math.cos((lon2 - lon1) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

  const genPath = async () => { 
    /*e.preventDefault;
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());*/
    
    updateLoc();
    /*const req = {
      origins:[{lat:lats,lng:lngs}],
      destinations:[],
      travelMode: service.TravelMode.WALKING,
      unitSystem: unit.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false
    }*/
     let dists = [];
    const foodBanks = await api.foodBanks.findMany();
    let n = 0;
    await foodBanks.forEach((entry) =>{
      //req.destinations.push({lat:entry.latitude,lng:entry.longitude});
      let dis = 1000*distance(lats,lngs,entry.latitude,entry.longitude);
      if(dis <= 0 /* We can check within a radius around you! 10000*/) dists.push([n,dis]);
      n++;
    });
    /*const distServ = await new service.DistanceMatrixService();
    distServ.getDistanceMatrix(req).then((response) => {
      let n = 0;
      for(let entry of response.rows[0].elements){
        if(entry.distance <= 10000){
          dists.push([n,entry.distance]);
        }
      }
    });
    setGoTo(dists);*/
    const res = await api.distribute({db:"food",going:1,details: detail ,dist:dists});
    //let place = res.split('\n')[0];
    const place = await api.foodBanks.findFirst({
      filter: {name: {equals: res.split('\n')[0]}}
    });
    setGoTo([place]);
    setPlaces([<AdvancedMarker position={{ lat: place.latitude, lng: place.longitude }}/>]);
  }

  useEffect(() => {
    updateLoc();
    const fetchPlaces = async () => {
      await updatePlaces();
    };
    fetchPlaces();
  }, []);

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
      const foodBanks = await api.foodBanks.findMany();
      
      const markers = [];
      
      // Add food bank markers
      foodBanks.forEach((entry) => {
        markers.push(
          <AdvancedMarker 
            key={`foodbank-${entry.id}`} 
            position={{ lat: entry.latitude, lng: entry.longitude }} 
          />
        );
      });
      if(places.length == 1){
        setPlaces([...places, ...markers]);
      }else{
        setPlaces(markers);
      }
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
          <div className="flex flex-col pl-[350px] pt-4">
            <h1 className="text-5xl font-bold text-left leading-tight">
              Find Food Bank...
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              The food bank recommended to you is...
            </p>
          </div>
        </div>
        <div className="flex justify-end md:pr-0 pl-[318px]">
          <div className="w-full flex justify-center" style={{ marginTop: "20px" }}>
          
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
          
        </div>
          <div className="flex inset-y-0 right-0">
            <Card className="rounded-lg shadow-md bg-accent w-[250px]">
               <CardHeader>
                 <CardTitle className="text-xl">Our Choice: {goTo == "" ? "":"\n" + goTo[0].name}</CardTitle>
               </CardHeader>
               <CardContent className="px-2">
                 <div className="space-y-4">
                   <div className="border-b pb-4">
                     <div className="flex items-center gap-2 mb-2">
                       <span className="font-bold px-4">Details:</span>
                     </div>
                     <p className="mt-2 px-5"><span className="font-medium">Capacity: {goTo == "" ? "10/20": goTo[0].current + "/" + goTo[0].capacity}</span><span className="font-light"></span></p>
                     <p className="mt-2 px-5"><span className="font-medium">Distance: {goTo == "" ? "2.5": (distance(lats,lngs,goTo[0].latitude,goTo[0].longitude)).toFixed(2)}km</span><span className="font-light"></span></p>
                     <p className="mt-2 px-5"><span className="font-medium">Address: {goTo == "" ? "Sample Address":"\n" + goTo[0].address}</span><span className="font-light"></span></p>
                   </div>

                   <div className="border-b pb-4">
                     <div className="mb-2">
                       <div className="flex items-center gap-2">
                         <span className="font-bold px-4">Why this:</span>
                       </div>
                       <p className="font-light mt-2 px-5">We found a food bank for you that has space available right now and is not too far from where you are. We also try to make sure that no single food bank becomes too low on food while others remain full. This helps everyone have a fair chance at getting food to eat and ensures the staff can provide the best care possible. If you have any preferences or concerns please let us know</p>
                     </div>
                   </div>

                   <div className="border-b pb-4">
                     <div className="mb-2">
                       <div className="flex items-center gap-2">
                         <span className="font-bold px-4">Preferences:</span>
                       </div>
                       
                       <textarea 
                         name="details"
                         className="w-full mt-2 px-3 py-2 border rounded-md text-sm resize-y" 
                         rows={3}
                         value={detail}
                         onChange={e => setDetails(e.target.value)}
                         placeholder="Enter any specific needs, preferences, or concerns (e.g., accessibility requirements, pet-friendly, family accommodation)"
                       />
                       <div className="mt-3 flex justify-center">
                         <Button variant="default" onClick={genPath} disabled={fetching}>
                           {fetching ? "Processing..." : "Regenerate"}</Button>
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
