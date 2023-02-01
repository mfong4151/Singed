import React from 'react'


//preconditions: friend, should have an id, name, and picture?
const GroupAddItem = ({groupMember, groupList, setGroupList}) => {
  
  const removeFromGroup = user =>{
    let newGroupList = []
    for(const[idx, u] of groupList.entries()){
        if(idx === groupList.indexOf(user)) continue
        newGroupList.push(u)
    }
    setGroupList(newGroupList)
}
  return (
    <li className='udc-right friend-list-item'>

        {/* //Do we wnat profile pictures? made a placeholder for it */}
        <div className='profile-picture '>

        </div>

          {groupMember.username.length > 20 ? groupMember.username.slice(0,20).concat('...') : groupMember.username }

          <button className="friendslist-item-button" onClick={()=> removeFromGroup(groupMember)}>Remove</button>

    </li>
  )
}

export default GroupAddItem
