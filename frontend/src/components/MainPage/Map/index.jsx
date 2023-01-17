import React from 'react';
import {GoogleMap, useLoadScript, Marker} from "@react-google-maps/api";
import "./Map.css"
import RestaurantMarker from './RestaurantMarker';
import { useState } from 'react';
// https://react-google-maps-api-docs.netlify.app/#googlemap

const Map = ({restaurants}) => {
  
  //This needs to be moved to the top level of the componenet tree, i only leave it here for now so that we can move forward
  const [userLocation, setUserLocation] = useState({lat: 37.747401957356246, lng: -122.4456108834198});


  const { isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  })
  if(!isLoaded) return(<h1>loading...</h1>)
  
  const options = {
        mapId: '73cef3161f877bcd',
        disableDefaultUI:false,
        clickableIcons:false,

    };
  const handleOnClick = e =>{
    setUserLocation({lng: e.latLng.lng(), lat: e.latLng.lat()})
  }
  
  return (
    <GoogleMap 
      zoom={13} 
      center={userLocation} 
      mapContainerClassName="map-container"
      options={options}
      onClick={handleOnClick}
      >
            {/* {Object.values(restaurants).map((restaurant, idx) =>(
              <RestaurantMarker restaurant={restaurant} key={idx}/>
            )
            )} */}

      </GoogleMap>)
}

export default Map;
