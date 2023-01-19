export default function RestaurantCard({restaurant}) {
  console.log(restaurant)
  return (
    <div className="restaurant-container">
      <div className="restaurant-img">
        <img src={restaurant.imageUrl} alt="" />
      </div>
      <div className="restaurant-info">
        <ul>
          <li>{restaurant.name}</li>
          <li>{restaurant.address}</li>
          <li>{restaurant.rating}</li>
          <li>{restaurant.cuisine_type}</li>
        </ul>

      </div>
    </div>
  )
}
