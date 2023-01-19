import React from 'react'
import MessageForm from './MessegeForm'
import {useSelector} from 'react-redux';

export const openMessengerModal = () => {

  document.getElementById("modal-overlay").style.height = "100vw";
  document.getElementById("messenger-show-body").style.height = "40px";
  // document.getElementById("modal-menu-content").style.display = "inline";
  // document.getElementById("messenger-show-body").style.padding = "20px";
  let children = document.querySelectorAll('#messenger-show-body > *'); //this workaround is bc my children does not disappear when modal is gone
  for (let i = 0; i < children.length; i++) {
      children[i].style.display = "inline";
  }
}
export const closeMessengerModal = () => {
  document.getElementById("modal-overlay-chat").style.height = "0";
  document.getElementById("messenger-show-body").style.height = "0";
  // document.getElementById("messenger-show-body").style.padding = "0";
  let children = document.querySelectorAll('#messenger-show-body > *');
  for (let i = 0; i < children.length; i++) {
      children[i].style.display = "none";
      console.log('hello')
  }
}

const MessengerModal = () => {

  // const chats = useSelector(state => state)
      
  // if (messengerModal) document.body.classList.add('active-modal')
  // else document.body.classList.remove('active-modal')

  console.log('messenger modal running')
  return (
        <div>
            {/* <div id='modal-overlay-chat' onClick={()=>setMessengerModal(!messengerModal)}> */}
            <div id='modal-overlay-chat' onClick={closeMessengerModal}>

                <div className='messenger-univ' id='messenger-show-body' onClick={e => e.stopPropagation()}>
                  <div id="my-chatrooms">
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


