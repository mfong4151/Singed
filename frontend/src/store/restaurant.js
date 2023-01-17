import jwtFetch from "./jwt";

const RECEIVE_RESTAURANTS = 'restaurant/RECEIVE_RESTAURANTS'
const RECEIVE_RESTAURANT_ERRORS = 'restaurant/RECEIVE_RESTAURANT_ERRORS'

export const receiveRestaurants = (restaurants) => {
  return {
    type: RECEIVE_RESTAURANTS,
    payload: restaurants
  };
};

export const fetchRestaurants = () => async dispatch => {
  const response = await jwtFetch("/api/restaurants/map");
  if (response.ok) {
    const data = await response.json();
    dispatch(receiveRestaurants(data.restaurants));
  }
};

const initialState = {};

const restaurantReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_RESTAURANTS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default restaurantReducer;
