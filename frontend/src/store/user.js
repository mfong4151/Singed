import jwtFetch from "./jwt";
import { getCurrentUser } from "./session";

const RECEIVE_USERS = "users/RECEIVE_USERS";
const RECEIVE_USER = "users/RECEIVE_USER";
const REMOVE_USER = "users/REMOVE_USER";

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    payload: user
})

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    payload: users
})

const removeUser = (userId) => ({
    type: REMOVE_USER,
    payload: userId
})

export const fetchUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`)
    if(res.ok){
        const data = await res.json();
        dispatch(receiveUser(data.user))
    }
}

export const updateUser = (user) => async dispatch => {
    const res = await jwtFetch(`/api/users/${user.id}`, {
        method: "PATCH",
        body: JSON.stringify(user)
    })
    if (res.ok){
        const data = await res.json();
        dispatch(receiveUser(data.user))
        dispatch(getCurrentUser());
    }
}

const userReducer = (state = {}, action) => {
    switch(action.type){
        case RECEIVE_USERS:
            return {...action.payload}
        case RECEIVE_USER:
            return {...state, [action.payload._id]: action.payload};
        case REMOVE_USER:
            const newState = {...state}
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}

export default userReducer;
