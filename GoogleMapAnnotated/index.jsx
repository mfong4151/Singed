import React from 'react';
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import "./GoogleMap.css"
import RestaurantMarker from './RestaurantMarker';
import { UXContext } from '../../../UXContext';

// https://react-google-maps-api-docs.netlify.app/#googlemap


//in my Uber Eats Clone, the preconditions (inputs) for this componenet were as follows:
//restaurants: a hash mapping restaurantId to a profile of the restaurants, an example of a row of this data can be found in the seed data shared in repo
//userLocation: a state variable defined by useState, given as an object with keys lat, lng as a float E.g.: {lat:-77, lng:120}
//setUserLocation: a setter for adjusting the user location

const Map = ({restaurants, userLocation, setUserLocation}) => {
  
  //useLoaded is a custom hook that comes with the google-maps/api library, 
  //you want this to make sure that your map doesnt try to render before its loaded

  const { isLoaded} = useLoadScript({googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY})


  if(!isLoaded) return(<h1>loading...</h1>) //simply return a loading message
  


  const options = {
        mapId: '73cef3161f877bcd',  //here is where you define a map aesthetic through 
        disableDefaultUI:false,    //This turns off the default UI, including buttons for zoom
        clickableIcons:false,     //This turns off clickable icons on the map

    };


  //This is the important part, we retrieve latitude and longitude which are given as values on e
  const handleOnClick = e =>{
    setUserLocation({lng: e.latLng.lng(), lat: e.latLng.lat()})
  }
  


  return (
    <GoogleMap 
      zoom={13}                                               //sets map zoom
      center={userLocation}                                   //centers the map on the user location
      mapContainerClassName="map-container"                   //sets area map takes up on the screen :see GoogleMap.css
      options={options}                                       //see above const options
      onClick={handleOnClick}                                 //see above, handleOnClick
      >
            {Object.values(restaurants).map((restaurant, idx) =>(
              <RestaurantMarker restaurant={restaurant} key={idx}/>   //creates markers, see RestaurantMarker.jsx
            )
            )}

      </GoogleMap>)
}

export default Map;
