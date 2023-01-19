import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './CommunityModal.css'
import GroupListItem from './GroupListItem'
import SearchBar from './SearchBar'
import { logout } from '../../../store/session';
import AddToGroupModal from './AddtoGroupModal/AddToGroupModal'



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
    const [groupList, setGroupList] = useState({})


    //We should get a list of peoples names at the very least
    // const friendsList = useSelector(state => state)
    const dispatch = useDispatch()
    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }



    const sessionUser = useSelector((store) => store.session.user);
    //get rid of this once we have an actual friends list selector going 
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
                            <div>
                                <SearchBar groupList={groupList} setGroupList={setGroupList}/>
                            </div>                        
                        </div>
                        <div id='community-lower'>
                            <ul>
                                {Object.values(groupList)?.map((groupMember, idx) =>
                                    <GroupListItem groupMember={groupMember} key={idx}/>
                                    )}
                            </ul>
                            <button>Add To Group </button>
                            <button onClick={logoutUser}>Logout</button>
                           
                        </div>   
                     </div>
                </div>    
            </div>
        </div>
  )
}

export default CommunityModal
