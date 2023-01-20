import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './CommunityModal.css'
import GroupListItem from './GroupListItem'
import SearchBar from './SearchBar'
import { logout } from '../../../store/session';
import { fetchUsers, getUsers } from '../../../store/user'
import { normalizeGroupAllergiesProfile, normalizeGroupFlavorProfile, normalizeGroupGenreProfile, normalizeGroupDietProfile } from './utils/CommunityModalsUtils'
import { createGroup } from '../../../store/group'
import {useHistory} from 'react-router-dom'

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
    
    //We should get a list of peoples names at the very least
    // const friendsList = useSelector(state => state)
    const dispatch = useDispatch()
    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
        history.push('/')
    }

    const sessionUser = useSelector((store) => store.session.user);
    //get rid of this once we have an actual friends list selector going 
    const friendsList = ['Ricky', 'Tammy', 'Juan', 'McDonalds','Fuck ruby']
    useEffect(()=>{
        
    }, [dispatch])

    // if (communityModal) document.body.classList.add('active-modal')
    // else document.body.classList.remove('active-modal')
    
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
                                        {user.username}
                                    </span>
                                    <button id='add-to-group' onClick={()=> addToGroup(user)} value={user}>+</button>
                                </li>
                                )}  
                            </ul>
                        </div>

                        <div id='community-lower'>
                        
                            <ul id='group-list'>
                                {groupList.map((groupMember, idx) =>
                                    <GroupListItem groupMember={groupMember} groupList={groupList} setGroupList={setGroupList}
                                    key={idx}/>
                                    )}
                            </ul>
                            <div id='bottom-buttons'>
                                <form id='group-form'>
                                    <input id="search-bar" type='text' placeholder={groupName} onChange={e =>setGroupName(e.target.value)}/>
                                </form>
                                <div>
                                    <button className='bottom-button-size' onClick={handleSendGroupInvite}>Send Group Invite</button>
                                    <button className='bottom-button-size' onClick={logoutUser}>Logout</button>


                                </div>

                            </div>
                           
                        </div>   
                     </div>
                </div>
            </div>
        </div>
  )
}

export default CommunityModal
