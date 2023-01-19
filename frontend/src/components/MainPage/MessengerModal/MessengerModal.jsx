import React from 'react'
import MessageForm from './MessegeForm'
const MessengerModal = ({messengerModal, setMessengerModal}) => {


      
  if (messengerModal) document.body.classList.add('active-modal')
  else document.body.classList.remove('active-modal')

  return (
        <div>
            <div className='modal-overlay' onClick={()=>setMessengerModal(!messengerModal)}>
                <div className='messenger-univ' id='messenger-show-body' onClick={e => e.stopPropagation()}>
                <div id='messenger-log'>


                </div>
                <MessageForm/>
             </div>
        </div>
    </div>
  )
}

export default MessengerModal


