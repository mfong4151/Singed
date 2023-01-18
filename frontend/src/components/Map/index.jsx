import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";
import './Map.css'
import {styles} from './MapStyles'
import { useHistory } from "react-router-dom";
import * as restaurantActions from '../../store/restaurant'

export default function Map() {
  const dispatch = useDispatch()
  let restaurants = useSelector(state => state.restaurants)

  useEffect(() => {
    dispatch(restaurantActions.fetchRestaurants())
  },[dispatch])

  return <MapContainer restaurants={Object.values(restaurants)} center={{lat:37.773972, lng:-122.431297}}/>
}

export function RestaurantCard({restaurant, onClick}) {
  console.log(restaurant.rating)
  return (
    <div className="map-price-card cursor" onClick={onClick}>
      <p>Star: {restaurant.rating}</p>
    </div>
  )
}

export function MapContainer({restaurants, center}) {
  const dispatch = useDispatch();
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  });

  const centerM = useMemo(() => (center), [])
  const history = useHistory()

  const restaurantCardOnClick = (e, restaurant) => {
    e.preventDefault()
    console.log(restaurant)
  }

  const mapOnClick = (e => {
    console.log("lat = ", e.latLng.lat());
    console.log("lng = ", e.latLng.lng());
    dispatch(restaurantActions.fetchRestaurantsCoordinate({lat: e.latLng.lat(), lng: e.latLng.lng()}))
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <GoogleMap zoom={12} center={centerM} onClick={mapOnClick} mapContainerClassName="map-container" options={{styles: styles}}>
        {restaurants.map(restaurant => {
          return (
            <OverlayView key = {restaurant._id} position={{lat:restaurant.latitude, lng:restaurant.longitude}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <RestaurantCard restaurant={restaurant} onClick={(e) => restaurantCardOnClick(e, restaurant)} />
            </OverlayView>
          )
        })}
      </GoogleMap>
    </>
  )
}
