import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";
import './Map.css'
import {styles} from './MapStyles'
import { useHistory } from "react-router-dom";
import {fetchRestaurantsCoordinatePreference} from '../../store/restaurant'

export default function Map({restaurants, preference}) {
  let lat =  37.779180920571605;
  let lng =  -122.42151230151367;

  return <MapContainer restaurants={Object.values(restaurants)} center={{lat, lng}} preference={preference}/>
}

export function RestaurantCard({restaurant, onClick}) {
  return (
    <div className="map-price-card cursor" onClick={onClick}>
      <p>Score: {Math.round(restaurant.dotProduct*100)}</p>
    </div>
  )
}

export function MapContainer({restaurants, center, preference}) {
  const dispatch = useDispatch();
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  });

  const centerM = useMemo(() => (center), [])

  const options = {
    mapId: '73cef3161f877bcd',
    disableDefaultUI:false,
    clickableIcons:false,
  };

  const restaurantCardOnClick = (e, restaurant, ref) => {
    e.preventDefault()
    console.log(ref);
    ref.current?.scrollIntoView({behavior: 'smooth'});
  }

  const mapOnClick = (e => {
    dispatch(fetchRestaurantsCoordinatePreference({lat: e.latLng.lat(), lng: e.latLng.lng(), preference}))
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div className="map-div">
      <GoogleMap zoom={12} center={centerM} onClick={mapOnClick} mapContainerClassName="map-container" options={options}>
        {restaurants.map((restaurant, index) => {
          return (
            <OverlayView key = {restaurant._id} position={{lat:restaurant.latitude, lng:restaurant.longitude}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <RestaurantCard restaurant={restaurant} onClick={(e) => restaurantCardOnClick(e, restaurant)} />
            </OverlayView>
          )
        })}
      </GoogleMap>
    </div>
  )
}
