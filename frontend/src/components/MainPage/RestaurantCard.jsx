export default function RestaurantCard({restaurant}) {
  return (
    <div className="restaurant-container">
      <div className="restaurant-img">
        <img src={restaurant.imageUrl} alt="" />
      </div>
      <div className="restaurant-info">
        <ul>
          <h2>{restaurant.name}</h2>
          <li>- {restaurant.address}</li>
          <li>- rating: {restaurant.rating}</li>
          <li>- {restaurant.cuisine_type}</li>
        </ul>

      </div>
    </div>
  )
}
