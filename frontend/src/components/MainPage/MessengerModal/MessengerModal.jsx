import React from 'react'
import MessageForm from './MessegeForm'
import {useSelector} from 'react-redux';
const MessengerModal = ({messengerModal, setMessengerModal}) => {

  // const chats = useSelector(state => state)
      
  if (messengerModal) document.body.classList.add('active-modal')
  else document.body.classList.remove('active-modal')

  return (
        <div>
            <div className='modal-overlay' onClick={()=>setMessengerModal(!messengerModal)}>

                <div className='messenger-univ' id='messenger-show-body' onClick={e => e.stopPropagation()}>

                  <div id="chats">
                      {/* <ul>
                        {
                          Object.values(chats).map((chat, idx) =>(
                            <li id="chatroom" key={idx}>{chat}</li>

                          ))
                        }

                      </ul> */}

                  </div>
                  <div id='messenger-body'>

                    <ul className="message-body-scroll">
                      {/* {
                        Object.values(messages)?.map((message) => {
                            return (
                                <li className="channel-message" key={message?.id}>
                                    <div className="user-circle" id={message?.author?.status?.toLowerCase()}>
                                        <img src={logo} alt="logo-icon" className="logo-icon"/>
                                    </div>
                                    <div className="message-container">
                                        <div className="message-info">
                                            <div className="message-username">{message?.author?.username}</div>
                                            <div className="message-date">{formatMessageDate(message?.created_at)}</div>
                                        </div>
                                        <div className="message-content">
                                            {message.content}
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                      } */}
                    </ul>
                    <MessageForm/>


                  </div>
               </div>
        </div>
    </div>
  )
}

export default MessengerModal


