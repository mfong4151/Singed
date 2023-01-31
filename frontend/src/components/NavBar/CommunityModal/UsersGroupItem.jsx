import React from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {fetchGroups, updateGroup, deleteGroup} from '../../../store/group'


const UsersGroupItem = ({group, sessionUserId}) => {
  const history = useHistory()
  const dispatch = useDispatch()

  //factory method for creating new group
  const groupFact = (newUserIds) =>{
     return{
        _id: group._id,
        allergies: group.allergies,
        diet: group.diet,
        flavorProfile: group.flavorProfile, 
        genre: group.genre,
        name: group.name,
        userIds: newUserIds
     }
  }


  //update method
  //theres currently a bug with this where leaving a group allows a group to stay within "my groups"
  const leaveGroup = e => {
    e.preventDefault();
    e.stopPropagation();
    const newUserIds = []
    for(const i of group.userIds){
      if(i === sessionUserId) continue
      newUserIds.push(i)
    }
    
    dispatch(updateGroup(groupFact(newUserIds)))
    .then( fetchGroups(sessionUserId))
    
    }


  //delete method
  const disbandGroup = e =>{
    e.preventDefault();
    e.stopPropagation()
    dispatch(deleteGroup(group._id))
    .then( dispatch(fetchGroups(sessionUserId)))
  }

  

  return (
    <li className='udc-left friend-list-item' >
        <div className="group-item">
          <span>          
            {group.name}
          </span>

        </div>

        <div className="group-item">
            <button className="group-button" onClick={() => history.push(`/groups/${group._id}`)}>
                See group event
            </button>
            <button className="group-button" onClick={leaveGroup}>
                Leave Group
            </button>

            { 
             group.userIds[0] === sessionUserId &&
              <button className="group-button" onClick={disbandGroup}>
                Disband your Group
              </button>
            }
        </div>
    </li>
  )
}

export default UsersGroupItem


//leaving a group
//going to a group page