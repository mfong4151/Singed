import { useState } from "react";
import MessageForm from './MessegeForm'
import {useSelector} from 'react-redux';
import { RxDoubleArrowUp, RxDoubleArrowDown } from "react-icons/rx";

export const openMessengerModal = () => {
  document.getElementById("modal-overlay-chat").style.height = "100vw";
  document.getElementById("messenger-show-body").style.height = "500px";
  // document.getElementById("modal-menu-content").style.display = "inline";
  // document.getElementById("messenger-show-body").style.padding = "20px";
  document.getElementById("uparrow-messenger").style.display = "none";
  document.getElementById("downarrow-messenger").style.display = "inline";
  document.getElementById("messages-top").style.cursor = "default";


}
export const closeMessengerModal = () => {
  document.getElementById("modal-overlay-chat").style.height = "0";
  document.getElementById("messenger-show-body").style.height = "50px";
  // document.getElementById("messenger-show-body").style.padding = "0";
  document.getElementById("uparrow-messenger").style.display = "inline";
  document.getElementById("downarrow-messenger").style.display = "none";
  document.getElementById("messages-top").style.cursor = "pointer";

}

const MessengerModal = () => {

  // const chats = useSelector(state => state)
      
  // if (messengerModal) document.body.classList.add('active-modal')
  // else document.body.classList.remove('active-modal')

  const handleOpen = (e) => {
    e.stopPropagation();
    openMessengerModal();
  } 
  return (
      <div id='modal-overlay-chat' onClick={closeMessengerModal}>
        <div className='messenger-univ' id='messenger-show-body' onClick={handleOpen}>
          <div className="messages-top" id="messages-top">
            <h2>Messages</h2>
            <RxDoubleArrowUp id="uparrow-messenger"/>
            <RxDoubleArrowDown id="downarrow-messenger"/>
          </div>
          <div className="messages-bottom">
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


