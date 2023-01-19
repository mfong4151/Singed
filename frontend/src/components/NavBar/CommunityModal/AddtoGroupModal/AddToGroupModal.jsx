import React, { useEffect, useState } from 'react'
import "../CommunityModal.css"
import "./AddToGroupModal.css"

const AddToGroupModal = ({addToGroupModal, setAddToGroupModal}) => {
    const [friendsListQuery, setFriendsListQuery] = useState('')
    const handleOnClick = e =>{
        e.preventDefault()
    }



  return (
    <div>
        <div id='add-to-group-modal-overlay' onClick={()=>setAddToGroupModal(!addToGroupModal)}>
            <div id="add-to-group-modal" onClick={e => e.stopPropagation()}>
                <h2>Add to Group</h2>
                <form id='search-form' >
                    <input id='search-form-input' type="" />
                </form>
             </div>
    </div>
</div>
  )
}

export default AddToGroupModal