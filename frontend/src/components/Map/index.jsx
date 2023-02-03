import { useMemo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";
import './Map.css'
import {styles} from './MapStyles'
import { useHistory } from "react-router-dom";
import {fetchRestaurantsCoordinatePreference} from '../../store/restaurant'
import './RestaurantInfo.css'

export default function Map({restaurants, preference}) {
  let lat =  37.779180920571605;
  let lng =  -122.42151230151367;

  return <MapContainer restaurants={Object.values(restaurants)} center={{lat, lng}} preference={preference}/>
}

export function RestaurantInfo({restaurant}) {
  return (
    <div className='restaurant-hover-info'>
      <img className="restaurant-hover-info-photo" src={restaurant.imageUrl} alt="" />
      <p className="">{restaurant?.name}</p>
      <p className="">{restaurant?.address}</p>
      <p className="">Rating: {restaurant?.rating}</p>
      <p className="">Type: {restaurant?.cuisine_type}</p>
    </div>
  )
}

//Take this out after proper edits
const reduceScore = (score) =>{
  while(score > 100){
    
    score/= 2
  }
  
  return Math.floor(score)
}

export function RestaurantCard({restaurant, onClick}) {
  const [condition, setCondition] = useState(false)
  return (
    <div className="map-price-card cursor" onClick={onClick} onMouseOver={()=>setCondition(true)} onMouseOut={()=>setCondition(false)}>
      <p>Score: {Math.round(restaurant.dotProduct*100) > 100 ? reduceScore(Math.round(restaurant.dotProduct*100)): Math.round(restaurant.dotProduct*100)}</p>
      {condition ? <RestaurantInfo restaurant={restaurant}/> : null}
    </div>
  )
}

export function MapContainer({restaurants, center, preference}) {
  const dispatch = useDispatch();
  //The reason for the ternary operation is that render has issues when we use the ENV variable in render,
  //so I've hard coded a key in here to show when process.ENV.(key) comes through as undefined
  //Darrens suggestion with the FSP was that these had to be hard coded in anyways.
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY  ? process.env.REACT_APP_MAPS_API_KEY : 'AIzaSyASdAh77--unS806Dxb3JGAEJ1Vvl9j3ZY'
  });

  const centerM = useMemo(() => (center), [])

  const options = {
    mapId: '73cef3161f877bcd',
    disableDefaultUI:false,
    clickableIcons:false,
    disableDoubleClickZoom: true,
  };

  const restaurantCardOnClick = (e, restaurant, ref) => {
    e.preventDefault()
    ref.current?.scrollIntoView({behavior: 'smooth'});
  }

  const mapOnClick = (e => {
    dispatch(fetchRestaurantsCoordinatePreference({lat: e.latLng.lat(), lng: e.latLng.lng(), preference}))
  })

  if (!isLoaded) return <div>Loading...</div>
  return (
    <div className="map-div">
      <GoogleMap zoom={14} center={centerM} onClick={mapOnClick} mapContainerClassName="map-container" options={options}>
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
