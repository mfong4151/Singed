import React from 'react'
import { useHistory } from 'react-router-dom'



//preconditions: friend, should have an id, name, and picture?
const MyGroupItem = ({group}) => {
  const history = useHistory()
  
  

  return (
    <li className='udc-right friend-list-item' onClick={useHistory.push(`/groups/${group._id}`)}>

        {/* //Do we wnat profile pictures? made a placeholder for it */}
        {group.name}
    </li>
  )
}

export default MyGroupItem
