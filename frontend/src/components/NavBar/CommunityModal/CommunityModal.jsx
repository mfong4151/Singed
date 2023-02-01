import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './CommunityModal.css'
import GroupAddItem from './GroupAddItem'
import SearchBar from './SearchBar'
import { getCurrentUser, logout } from '../../../store/session';
import { fetchUsers, getUsers } from '../../../store/user'
import { normalizeGroupAllergiesProfile, normalizeGroupFlavorProfile, normalizeGroupGenreProfile, normalizeGroupDietProfile } from './utils/CommunityModalsUtils'
import { createGroup, fetchGroup, fetchGroups, getDistinctGroups} from '../../../store/group'
import {useHistory} from 'react-router-dom'
import UsersGroupItem from './UsersGroupItem'

export const openCommunityModal = () => {

    document.getElementById("modal-overlay").style.width = "100vw";
    document.getElementById("modal-menu-content").style.width = "250px";
    // document.getElementById("modal-menu-content").style.display = "inline";
    document.getElementById("modal-menu-content").style.padding = "20px";

    let children = document.querySelectorAll('#modal-menu-content > *'); //this workaround is bc my children does not disappear when modal is gone
    for (let i = 0; i < children.length; i++) {
        children[i].style.display = "inline";
}
}
export const closeCommunityModal = () => {
    document.getElementById("modal-overlay").style.width = "0";
    document.getElementById("modal-menu-content").style.width = "0";
    document.getElementById("modal-menu-content").style.padding = "0";
    let children = document.querySelectorAll('#modal-menu-content > *');
    for (let i = 0; i < children.length; i++) {
        children[i].style.display = "none";
    }
}

const CommunityModal = () => {
    //state for opening add to group modal, delete on refactor
    const [groupList, setGroupList] = useState([])
    const [searchTerms, setSearchTerms] = useState('Find your friends here!')
    const [groupName, setGroupName] = useState('Name your group!')
    const [filteredUsers, setFilteredUsers] = useState([])
    const [errors, setErrors] = useState([])
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const usersGroups = useSelector(getDistinctGroups)
    const allUsers = useSelector(getUsers)
    const history = useHistory()

  
    
    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    const handleOnClick = (e)=>{
        e.preventDefault();
        e.stopPropagation();

    }
    const addToGroup = user =>{
        if(!groupList.includes(user)) setGroupList([...groupList, user])
    }

    const handleSendGroupInvite = e =>{
        e.preventDefault()
        e.stopPropagation()

        if (groupName === '' || groupName === 'Name your group!') setErrors(["You need to have a group name!"])    
        
        else{
            let flavorProfiles = [], genreProfiles = [], allergyProfiles=[], dietProfiles = [], userIds = [sessionUser._id];
            for(const gm of groupList){
                flavorProfiles.push(gm.flavorProfile)
                genreProfiles.push(gm.genre)
                allergyProfiles.push(gm.allergies)
                dietProfiles.push(gm.diet)
                userIds.push(gm._id)
            }
    
            let normalizedFlavorProfile = normalizeGroupFlavorProfile(flavorProfiles)
            let normalizedGenreProfile = normalizeGroupGenreProfile(genreProfiles)
            let normalizedAllergyProfile = normalizeGroupAllergiesProfile(allergyProfiles)
            let normalizedDietProfile = normalizeGroupDietProfile(dietProfiles)
    
           dispatch(createGroup(
                {
                    name: groupName,
                    flavorProfile: normalizedFlavorProfile,
                    genre: normalizedGenreProfile,
                    allergies: normalizedAllergyProfile,
                    diet: normalizedDietProfile,
                    userIds
                }
            ))
        
            .then(async (group) => {
                history.push(`/groups/${group._id}`);
            })
            setGroupName('')
            setGroupList([])

        }
        
        
    }

    const filterUsers = (searchTerms) =>{
        const res = [];

        if(!searchTerms || searchTerms=== 'Find your friends here!')
            return res
        else{
            allUsers.forEach(user=>{
                if (user?.username.toLowerCase().includes(searchTerms) && user?._id !== sessionUser.user?._id ) res.push(user)           //change to user.name.lower() later
            })
            return res
        }
    }

   
    useEffect(()=>{
        setFilteredUsers(filterUsers(searchTerms))
        if(searchTerms === '') setSearchTerms('Find your friends here!')
    }, [searchTerms])

    useEffect(()=>{
        if (groupName && groupName !== 'Name your group!') setErrors([])
     }, [groupName])
    
    useEffect(()=>{
        dispatch(getCurrentUser())
        dispatch(fetchUsers())
    }, [])

    useEffect(()=>{
        dispatch(fetchGroups(sessionUser._id))
    }, [dispatch])


    return (
        <div>
            <div id='modal-overlay' onClick={closeCommunityModal}>
                <div className="modal-menu-container">
                    <div id="modal-menu-content" onClick={e => e.stopPropagation()}>

                        <div id='community-upper'>
                            <div className="modal-profile-content">
                                <h2>{sessionUser.username}</h2>
                            </div>
                            <form>
                                <input id="search-bar" type='text' placeholder={searchTerms} onChange={e =>setSearchTerms(e.target.value)}/>
                            </form>

                            <ul id="search-result-display">
                                {filteredUsers?.map((user, idx) =>
                                <li className='search-bar-result' key={idx} onClick={handleOnClick}>
                                    <span>
                                        {user.username.length > 20 ? user.username.slice(0,20).concat('...') : user.username }
                                    </span>
                                    <button id='add-to-group' onClick={()=> addToGroup(user)} value={user}>+</button>
                                </li>
                                )}
                            </ul>

                            <div id='group-finalization'>
                                <ul id='group-list'>
                                    {groupList.map((groupMember, idx) =>
                                        <GroupAddItem groupMember={groupMember} groupList={groupList} setGroupList={setGroupList}
                                        key={idx}/>
                                        )}
                                </ul>
                                <div id='bottom-buttons'>
                                    <form id='group-form'>
                                        <input id="search-bar" type='text' placeholder={groupName} onChange={e =>setGroupName(e.target.value)}/>
                                    </form>
                                    <div className="modal-buttons-container">
                                        <button className='bottom-button-size' onClick={handleSendGroupInvite}>Send Group Invite</button>
                                    </div>
                                    <div className="group-errors">
                                        {errors.length > 0 && errors[0]}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id='community-lower'>
                            <div className="modal-profile-content">
                                <h2>My Groups</h2>
                            </div>

                            <ul className="group-list" id="my-groups-container">
                                {usersGroups.map((group, idx) =>
                                    <UsersGroupItem group={group} sessionUserId={sessionUser._id} key={idx}/>
                                )}
                            </ul>

                            <div className="modal-buttons-container">
                                <button className='bottom-button-size' onClick={logoutUser}>Logout</button>
                            </div>

                        </div>
                     </div>
                </div>
            </div>
        </div>
  )
}

export default CommunityModal
