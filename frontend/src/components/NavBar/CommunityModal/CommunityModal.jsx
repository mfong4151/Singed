import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './CommunityModal.css'
import FriendsListItem from './FriendsListItem'
import SearchBar from './SearchBar'

export const openCommunityModal = () => {
    document.getElementById("modal-overlay").style.width = "100vw";
    document.getElementById("modal-menu-content").style.width = "250px";
    document.getElementById("modal-menu-content").style.display = "inline";
    document.getElementById("modal-menu-content").style.padding = "20";


}
export const closeCommunityModal = () => {
    document.getElementById("modal-overlay").style.width = "0";
    document.getElementById("modal-menu-content").style.width = "0";
    document.getElementById("modal-menu-content").style.padding = "0";
}

const CommunityModal = ({communityModal, setCommunityModal}) => {
    
    //We should get a list of peoples names at the very least
    // const friendsList = useSelector(state => state)
    const dispatch = useDispatch()


    //get rid of this once we have an actual friends list selector going 
    const friendsList = ['Ricky', 'Tammy', 'Juan', 'McDonalds','Fuck ruby']
  
    useEffect(()=>{
        

    }, [dispatch])

    if (communityModal) document.body.classList.add('active-modal')
    else document.body.classList.remove('active-modal')
    
    

    return (
        <div>
            <div id='modal-overlay' onClick={closeCommunityModal}>
                <div id="modal-menu-content" onClick={e => e.stopPropagation()}>
                    <SearchBar/>
                    <ul>
                        {friendsList.map((friend, idx) => 
                            <FriendsListItem friend={friend} key={idx}/>
                        )}
                    </ul>
                 </div>     
            </div>
        </div>
  )
}

export default CommunityModal
