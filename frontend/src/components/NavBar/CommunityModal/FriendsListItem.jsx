import React from 'react'


//preconditions: friend, should have an id, name, and picture?
const FriendsListItem = ({friend}) => {
  




  return (
    <div className='udc-right friend-list-item'>
          {/* //Do we wnat profile pictures? made a placeholder for it */}
          {/* <div className="friends-container"> */}
            {/* <div className='profile-picture '></div> */}
            <div className="friendslist-name"> {friend} </div>
            <div className="friendslist-items-container">
              <button className="friendslist-item-button">Add to group</button>
              <button className="friendslist-item-button">+</button>
              <button className="friendslist-item-button">-</button>
            </div>
          {/* </div> */}
    </div>
  )
}

export default FriendsListItem
