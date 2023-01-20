import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRestaurantsCoordinate, fetchRestaurantsCoordinatePreference } from "../../store/restaurant";
import RestaurantCard from './RestaurantCard.jsx'


export default function MainPageRestaurants({preference}) {
  const dispatch = useDispatch()
  const restaurants = useSelector(state => state.restaurants);
  // preference = new Array(5).fill(0.447);
  useEffect(() => {
    let lat =  37.779180920571605;
    let lng =  -122.42151230151367;
    // dispatch(fetchRestaurantsCoordinate({lat, lng}))
    dispatch(fetchRestaurantsCoordinatePreference({lat, lng, preference}))
  },[])

  return (
    <div className="mainpage-restaurants">
      {Object.values(restaurants).map(restaurant => {
        return <RestaurantCard key={restaurant._id} restaurant={restaurant} />
      })}


    </div>
  )
}
