import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './CommunityModal.css'
import FriendsListItem from './FriendsListItem'
import SearchBar from './SearchBar'

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
            <div className='modal-overlay' onClick={()=>setCommunityModal(!communityModal)}>
                <div className="modal-menu-content" onClick={e => e.stopPropagation()}>
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
