import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchRestaurantsCoordinate } from "../../store/restaurant";
import RestaurantCard from './RestaurantCard.jsx'

export default function MainPageRestaurants() {
  const dispatch = useDispatch()
  const restaurants = useSelector(state => state.restaurants);

  useEffect(() => {
    let lat =  37.779180920571605;
    let lng =  -122.42151230151367;
    dispatch(fetchRestaurantsCoordinate({lat, lng}))
  },[])

  return (
    <div className="mainpage-restaurants">
      {Object.values(restaurants).map(restaurant => {
        return <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      })}
    </div>
  )
}
