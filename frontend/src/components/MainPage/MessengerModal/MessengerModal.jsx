import React, { useEffect, useRef, useState } from 'react'
import MessageForm from './MessegeForm'
import {useDispatch, useSelector} from 'react-redux';
import { RxDoubleArrowUp, RxDoubleArrowDown } from "react-icons/rx";
import { useLocation, useParams } from 'react-router-dom';
import { fetchMessages } from '../../../store/message';

const useChatScroll = (dep) => {
  const ref = useRef(null);
  useEffect(() => {
    if(ref.current){
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep])
  return ref
}

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
  const {groupId} = useParams();
  const group = useSelector((store) => store.groups[groupId]);
  const location = useLocation();
  const messages = useSelector((store) => store.messages);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  // const ref = useChatScroll(messages);
      
  // if (messengerModal) document.body.classList.add('active-modal')
  // else document.body.classList.remove('active-modal')

  useEffect(() => {
    dispatch(fetchMessages(groupId))
  }, [dispatch, groupId])

  const handleOpen = (e) => {
    e.stopPropagation();
    openMessengerModal();
    setOpen(true);
  } 

  const handleClose = (e) => {
    e.stopPropagation();
    closeMessengerModal();
    setOpen(false);
  } 

  const formatMessageDate = (timestamp) => {
    let dateObj = new Date(timestamp);
    let date = dateObj.getDate();
    let month = dateObj.getMonth() + 1;
    let year = dateObj.getFullYear();
    let hours = dateObj.getHours();
    let minutes = dateObj.getMinutes();
    let meridiem = "AM";
    if (date < 10) {
      date = "0" + date;
    }
    if (month < 10) {
      month = "0" + month;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (hours > 12) {
      hours %= 12;
      meridiem = "PM";
    }
    return `${month}/${date}/${year} ${hours}:${minutes} ${meridiem}`;
  };

  const groupMessages = () => {
    if(open){
      return(
        <>
        {
          Object.values(messages)?.map((message) => {
            return (
                <li className="channel-message" key={message?.id}>
                    <div className="message-container">
                        <div className="message-info">
                            <div className="message-username">{message?.username}</div>
                            <div className="message-date">{formatMessageDate(message?.createdAt)}</div>
                        </div>
                        <div className="message-content">
                            {message.content}
                        </div>
                    </div>
                </li>
            )
          }) 
        }
        </>
      )
    } else {
      return null
    }
  }

  if(location.pathname !== `/groups/${groupId}`){
    return null
  } else{
  return (
      <div id='modal-overlay-chat' onClick={closeMessengerModal}>
        <div className='messenger-univ' id='messenger-show-body' onClick={handleOpen}>
          <div className="messages-top" id="messages-top">
            <h2>Messages</h2>
            <RxDoubleArrowUp id="uparrow-messenger"/>
            <RxDoubleArrowDown id="downarrow-messenger" onClick={handleClose}/>
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
                              <div className="message-container">
                                  <div className="message-info">
                                      <div className="message-username">{message?.username}</div>
                                      <div className="message-date">{formatMessageDate(message?.createdAt)}</div>
                                  </div>
                                  <div className="message-content">
                                      {message.content}
                                  </div>
                              </div>
                          </li>
                      )
                  }) 
                  } */}
                  {groupMessages()}
                </ul>
                <MessageForm/>
              </div>
            </div>
          </div>
      </div>
  )}
}

export default MessengerModal


