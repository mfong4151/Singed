import React from 'react'


//preconditions: friend, should have an id, name, and picture?
const FriendsListItem = ({friend}) => {
  




  return (
    <li className='udc-right friend-list-item'>

        {/* //Do we wnat profile pictures? made a placeholder for it */}
        <div className='profile-picture '>

        </div>

          {friend}

          <button className="friendslist-item-button">+</button>
          <button className="friendslist-item-button">-</button>

    </li>
  )
}

export default FriendsListItem
