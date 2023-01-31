import jwtFetch from "./jwt";

export const ADD_GROUPS = "groups/ADD_GROUPS";
export const ADD_GROUP = "groups/ADD_GROUP";
export const REMOVE_GROUP = "groups/REMOVE_GROUP";
export const CLEAR_GROUPS = "groups/CLEAR_GROUP";

export const addGroups = (groups) => ({
    type: ADD_GROUPS, 
    payload: groups
})

export const addGroup = (group) => ({
    type: ADD_GROUP, 
    payload: group
})

export const removeGroup = (groupId) => ({
    type: REMOVE_GROUP, 
    payload: groupId
})

export const clearGroups = () => ({
    type: CLEAR_GROUPS
});

//The one way to optimize this is if we held groups in sets versus how we have it now in arrays

export const getUsersGroups = userId => state => {
    const res = []
    if(!state.group) return res
    for(const group of state.group){

    }
}

//The problem we tried to solve here was that we were adding in a new item under a weird key that we didnt want
//this should be a short term bandaid to a long term problem.The problem should be handled by modifying the backend

export const getDistinctGroups = state =>{
    const res = {}
    if(!state.groups) return [];
    for(const group of Object.values(state.groups)){
        if(res[group.name] && group.userIds[0] instanceof Object) continue
        else res[group.name] = group
    }
    return Object.values(res)
}


//original fetch groups for reference
// export const fetchGroups = () => async dispatch => {
//     const res = await jwtFetch('/api/groups');
//     if(res.ok){
//         const data = await res.json();
//         dispatch(addGroups(data))
//     }
// }


//Fetch groups to limit by id
export const fetchGroups = (id) => async dispatch => {
    const res = await jwtFetch(`/api/groups/usersgroups?id=${id}`);
    if(res.ok){
        const data = await res.json();
        dispatch(addGroups(data))
    }
}



export const fetchGroup = (groupId) => async dispatch => {
    const res = await jwtFetch(`/api/groups/${groupId}`);
    if(res.ok){
        const data = await res.json();
        dispatch(addGroup(data))
    }
}

export const createGroup = (groupData) => async dispatch => {
    const res = await jwtFetch('/api/groups/creategroup', {
        method: "POST",
        body: JSON.stringify(groupData)
    })
    if(res.ok){
        const data = await res.json();
        dispatch(addGroup(data))
        return data
    }
}

export const deleteGroup = (groupId) => async dispatch => {
    const res = await jwtFetch(`/api/groups/deletegroup/${groupId}`, {
        method: "DELETE"
    })
    if(res.ok){
        dispatch(removeGroup(groupId))
    }
}

export const updateGroup = (groupData) => async dispatch => {
    const res = jwtFetch(`/api/groups/editgroup/${groupData._id}`, {
        method: "PATCH",
        body: JSON.stringify(groupData)
    })
    if(res.ok){
        const data = await res.json();
        dispatch(addGroup(data))
    }
}

//This is a non-traditional TAC just for leaving a group, as of 1/31/2023 the updateGroup method isn't being used in production

export const leaveGroup = (groupData) => async dispatch => {
    const res = jwtFetch(`/api/groups/editgroup/${groupData._id}`, {
        method: "PATCH",
        body: JSON.stringify(groupData)
    })
    if(res.ok){
        dispatch(removeGroup(groupData._id))
    }
}

const groupReducer = (state={}, action) => {
    switch (action.type){
        case ADD_GROUPS:
            return {...action.payload }
        case ADD_GROUP:
            return {...state, [action.payload._id]: action.payload};
        case REMOVE_GROUP:
            const newState = {...state}
            delete newState[action.payload]
            return newState
        case CLEAR_GROUPS:
            return {};
        default: 
            return state 
    }
}

export default groupReducer