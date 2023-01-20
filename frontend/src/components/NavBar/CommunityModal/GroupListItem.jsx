import React from 'react'


//preconditions: friend, should have an id, name, and picture?
const GroupListItem = ({groupMember}) => {
  
  console.log(groupMember)

  return (
    <li className='udc-right friend-list-item'>

        {/* //Do we wnat profile pictures? made a placeholder for it */}
        <div className='profile-picture '>

        </div>

          {groupMember}

          <button className="friendslist-item-button">+</button>
          <button className="friendslist-item-button">-</button>

    </li>
  )
}

export default GroupListItem
