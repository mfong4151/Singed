import jwtFetch from "./jwt"

const RECEIVE_DISHES = "dishes/RECEIVE_DISHES"
const RECEIVE_DISH = "dishes/RECEIVE_DISH"
const REMOVE_DISH = "dishes/REMOVE_DISH"
const CLEAR_DISHES = "dishes/CLEAR_DISHES"

const receiveDishes = (dishes) => ({
  type: RECEIVE_DISHES,
  payload: dishes
})

const receiveDish = (dish) => ({
  type: RECEIVE_DISH,
  payload: dish
})

const removeDish = (dishId) => ({
  type: REMOVE_DISH,
  payload: dishId
})

export const fetchSurveyDishes = ({allergies, diet}) => async dispatch => {
  const [fish, nuts, shellfish] = allergies;
  const [gluten, milk, vegan] = diet;
  const params = new URLSearchParams({fish, nuts, shellfish, gluten, milk, vegan})
  const res = await jwtFetch('/api/dishes?'+params);
  if(res.ok){
    const data = await res.json();
    dispatch(receiveDishes(data.dishes))
  }
};

export const fetchDishes = () => async dispatch => {
  const res = await jwtFetch('/api/dishes');
  if(res.ok){
    const data = await res.json();
    dispatch(receiveDishes(data.dishes))
  }
};

export const fetchDish = (id) => async dispatch => {
  const res = await jwtFetch(`/api/dishes/${id}`);
  if(res.ok){
    const data = await res.json();
    dispatch(receiveDish(data.dishes))
  }
}

export const deleteDish = (dishId) => async dispatch => {
  const res = await jwtFetch(`/api/dishes/${dishId}`, {
    method: "DELETE"
  })
  if(res.ok){
    dispatch(removeDish(dishId))
  }
}

export const clearDishes = () => ({
  type: CLEAR_DISHES
})

const initialState = {
  dishes: undefined
}

const dishReducer = (state = initialState, action) => {
  switch(action.type){
    case RECEIVE_DISHES:
      return {...action.payload}
    case RECEIVE_DISH:
      return {...state, [action.payload._id]: action.payload};
    case REMOVE_DISH:
      const newState = {...state}
      delete newState[action.payload]
      return newState
    case CLEAR_DISHES:
      return initialState
    default:
      return state
  }
}

export default dishReducer;
