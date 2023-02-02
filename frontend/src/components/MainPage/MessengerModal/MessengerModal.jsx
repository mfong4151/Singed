import React, { useEffect, useRef, useState } from 'react'
import MessageForm from './MessegeForm'
import {useDispatch, useSelector} from 'react-redux';
import { RxDoubleArrowUp, RxDoubleArrowDown } from "react-icons/rx";
import { useLocation, useParams } from 'react-router-dom';
import { fetchMessages,createMessage, addMessage } from '../../../store/message';
import socket from '../../../util/socket';

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
  const location = useLocation();
  const messages = useSelector((store) => store.messages);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const sessionUser = useSelector((store) => store.session.user);
  const ref = useChatScroll(messages);
  const group = useSelector((store) => Object.values(store.groups).find(el=>el._id===groupId));
  // const group = useSelector((store) => store.groups[groupId])
  // const group = groups[groupId]
  console.log(group)

      
  // if (messengerModal) document.body.classList.add('active-modal')
  // else document.body.classList.remove('active-modal')
  useEffect(() => {
    socket.emit("setup", sessionUser);
    // console.log(group);
    
  }, [])

  useEffect(() => {
    if(groupId){
      dispatch(fetchMessages(groupId));
      socket.emit("join chat", groupId);
      console.log(group)
    }
  }, [dispatch, groupId])

  useEffect(() => {
    socket.on("message received", (newMessageRecieved) => {
      dispatch(addMessage(newMessageRecieved))
    })
  },[])

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

  const usersInChat = () => {
    if(groupId){
      return(
        <>
          {
            group?.userIds.map ((user, idx) => (
                <li className='chat-username' key={idx}>
                  {user.username}
                </li>
              )
            )
          }
        </>
      )
    }
  }

  const newMessage = {
    sender: sessionUser._id,
    username: sessionUser.username,
    content: body,
    messageLocation: groupId
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createMessage(newMessage))
      setBody("");
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
                  <ul className='users-in-chatroom'>
                    {usersInChat()}
                  </ul>
              </div>
              <div id='messenger-body' >
                <div className='all-messages' ref={ref}>
                  <ul className="message-body-scroll">
                    {groupMessages()}
                  </ul>
                </div>
                <div className="message-form-container">
                  <form className="message-form" onSubmit={handleSubmit}>
                      <input 
                          type="text"
                          value={body}
                          onChange={(e) => setBody(e.currentTarget.value)}
                          placeholder='Message your friends!'/>
                  </form>
                </div>
              </div>
            </div>
          </div>
      </div>
  )}
}

export default MessengerModal


