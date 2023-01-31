import React from 'react'
import { useHistory } from 'react-router-dom'



//preconditions: friend, should have an id, name, and picture?
const MyGroupItem = ({group}) => {
  const history = useHistory()
  
  

  return (
    <li className='udc-left friend-list-item' onClick={() => history.push(`/groups/${group._id}`)}>

        {/* //Do we wnat profile pictures? made a placeholder for it */}
        {group.name}
    </li>
  )
}

export default MyGroupItem


//leaving a group
//going to a group page