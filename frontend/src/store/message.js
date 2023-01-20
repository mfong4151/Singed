import jwtFetch from './jwt';

export const ADD_MESSAGES = "messages/ADD_MESSAGES";
export const ADD_MESSAGE = "messages/ADD_MESSAGE";
export const REMOVE_MESSAGE = "message/REMOVE_MESSAGE";

export const addMessages = (messages) => ({
    type: ADD_MESSAGES,
    payload: messages
})

export const addMessage = (message) => ({
    type: ADD_MESSAGE,
    payload: message
})

export const removeMessage = (messageId) => ({
    type: REMOVE_MESSAGE,
    payload: messageId
})

export const fetchMessages = (groupId) => async dispatch => {
    const res = await jwtFetch(`/api/groups/${groupId}/messages`)
    if(res.ok){
        const data = await res.json();
        dispatch(addMessages(data))
    }
}

// export const createMessage = (messageData) => async dispatch => {
//     const res = await jwtFetch(`/api/groups/${messageData.messageLocation}/createmessage`,{
//         method: "POST",
//         body: JSON.stringify(messageData)
//     });
//     if(res.ok){
//         const data = await res.json();
//         dispatch(addMessage(data))
//     }
// }

export const createMessage = (messageData) => async dispatch => {
    const res = await jwtFetch(`/api/messages/createmessage`,{
        method: "POST",
        body: JSON.stringify(messageData)
    });
    if(res.ok){
        const data = await res.json();
        dispatch(addMessage(data))
    }
}


export const deleteMessage = (messageId) => async dispatch => {
    const res = await jwtFetch(`/messages/${messageId}`, {
        method: "DELETE",
    });
    if(res.ok){
        dispatch(removeMessage(messageId))
    }
}

const messageReducer = (state = {}, action) => {
    switch(action.type){
        case ADD_MESSAGES:
            return {...action.payload}
        case ADD_MESSAGE:
            return { ...state, [action.payload._id]: action.payload}
        case REMOVE_MESSAGE:
            const newState = {...state}
            delete newState[action.payload]
            return newState
        default:
            return state
    }
}

export default messageReducer