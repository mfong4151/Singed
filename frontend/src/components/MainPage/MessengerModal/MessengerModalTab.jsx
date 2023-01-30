import React from 'react'
import './MessengerModal.css'

//Don't feel like you have to use this implementation
//Yea its not being used anymore
const MessengerModalTab = ({messengerModal, setMessengerModal}) => {

  return (
    <div className='messenger-univ'id='messenger-modal-tab' onClick={()=> setMessengerModal(!messengerModal)}>
        MessengerModalTab
    </div>
  )
}

export default MessengerModalTab