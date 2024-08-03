import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  LoadScript,
} from "@react-google-maps/api";
import FallbackLoading from "./loading";

const containerStyle = {
  width: "100%",
  height: "100%",
};


function Map({lat, lng}:{lat: number, lng: number}) {
  const [mapLoading, setMapLoading] = useState(false)

  const handleMapLoad = () =>  {
    setMapLoading(true)
  }

  return (
    <LoadScript 
    googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""} 
    onLoad={handleMapLoad}>
      {mapLoading?
       <GoogleMap
       mapContainerStyle={containerStyle}
       center={{lat,lng}}
       zoom={12}
       onUnmount={() => {}}
       options={{
        styles: [
          {
            featureType: "all",
            elementType: "all",
            stylers: [{ saturation: -200 }]
          }
        ]
      }}>
       <Marker position={{lat,lng}} />
     </GoogleMap>:
     <FallbackLoading/>}
    </LoadScript>
  );
}

export default React.memo(Map);