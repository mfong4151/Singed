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

        <div >
          {groupMember.username.length > 20 ? groupMember.username.slice(0,20).concat('...') : groupMember.username }
        </div>

          <button className="friendslist-item-button remove-button" onClick={()=> removeFromGroup(groupMember)}>-</button>

    </li>
  )
}

export default GroupAddItem
