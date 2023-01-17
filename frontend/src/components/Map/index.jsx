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

export function PriceCard({restaurant, onClick}) {
  console.log(restaurant.rating)
  return (
    <div className="map-price-card cursor" onClick={onClick}>
      <p>Star: {restaurant.rating}</p>
    </div>
  )
}

export function MapContainer({restaurants, center}) {
  console.log(process.env.REACT_APP_MAPS_API_KEY)
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY
  });

  // console.log(restaurants)

  const centerM = useMemo(() => (center), [])
  const history = useHistory()

  const priceCardOnClick = (e, restaurant) => {
    e.preventDefault()
    console.log(restaurant)
  }

  if (!isLoaded) return <div>Loading...</div>
  return (
    <>
      <GoogleMap zoom={11} center={centerM} mapContainerClassName="map-container" options={{styles: styles}}>
        {restaurants.map(restaurant => {
          console.log({lat:restaurant.longitude, lng:restaurant.latitude})
          // console.log(typeof restaurant.longitude)
          console.log({lat:37.773972, lng:-122.431297})
          // console.log(typeof 37.773972)
          return (
            // <OverlayView key = {restaurant._id} position={{lat:37.773972, lng:-122.431297}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <OverlayView key = {restaurant._id} position={{lat:restaurant.longitude, lng:restaurant.latitude}} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              {/* <PriceCard restaurant={restaurant} onClick={(e) => priceCardOnClick(e, restaurant)} /> */}
              <div style={{ background: `white`, border: `1px solid #ccc`, padding: 15 }}>
                <h1>OverlayView</h1>
              </div>
            </OverlayView>
          )
        })}
      </GoogleMap>
    </>
  )
}
