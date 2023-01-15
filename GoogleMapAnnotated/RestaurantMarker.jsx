import React from 'react'
import { Marker} from "@react-google-maps/api";
import {useHistory } from 'react-router-dom'

// https://react-google-maps-api-docs.netlify.app/#marker

const RestaurantMarker = ({restaurant}) => {
    const history = useHistory()

    const textDisplay = `${restaurant.name}\n${restaurant.address}\nRating: ${restaurant.rating}` //this is for creating a text overlay. onHover will display the above info

    return (
        <Marker position = {{lat: restaurant.latitude, lng: restaurant.longitude }} //set position
        animation={2} //sets the animation for loading in. 2 refers to "drop", 1 refers to "bounce"
        title={textDisplay}
        onClick={()=> history.push(`/restaurantListing/${restaurant.id}`)}  //this was a method i used for redirecting from the pin. 
        />                                                                  //instead we probably want to dispatch an updateLocation method from our store
    )
}

export default RestaurantMarker
