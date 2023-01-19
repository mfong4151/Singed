import React from 'react'
import { useDispatch } from 'react-redux'

const SearchSuggestionsModal = ({filteredUsers}) => {
    const dispatch = useDispatch()


    const newFriend = user =>({  //helper method for creating a new friend in the friendlist
        userId: user.id


    })

    const handleOnClick = e =>{
        e.preventDefualt()
        e.stopPropogation()
        // dispatch(updateFriendsList(newFriend(e.target.value)))   
    }

    return (
    <div className="modal-searchsuggestions-container">
         {filteredUsers?.map((user, idx) =>
                    //change this to user.name later
            <div className='search-bar-result' key={idx} onClick={handleOnClick}>{user}</div>
        )}
    </div>
  )
}

export default SearchSuggestionsModal