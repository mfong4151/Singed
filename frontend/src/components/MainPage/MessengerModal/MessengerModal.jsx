import React, { useEffect, useRef } from 'react'
import MessageForm from './MessegeForm'
import {useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMessages } from '../../../store/message';
import { io } from 'socket.io-client';

const useChatScroll = (dep) => {
  const ref = useRef(null);
  useEffect(() => {
    if(ref.current){
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep])
  return ref
}
const MessengerModal = ({messengerModal, setMessengerModal}) => {
  const socket = io("http://localhost:3001", {transports: ['websocket']});
  const {groupId} = useParams();
  const group = useSelector((store) => store.groups[groupId]);
  const sessionUser = useSelector((store) => store.session.user);

  const messages = useSelector((store) => store.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    if(groupId){
      dispatch(fetchMessages(groupId))
        .then(async() => {
          socket.emit("setup")
        })

    }
  }, [])

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

      
  if (messengerModal) document.body.classList.add('active-modal')
  else document.body.classList.remove('active-modal')

  if(!sessionUser){
    return null
  } else {
  return (
        <div>
            <div className='modal-overlay' onClick={()=>setMessengerModal(!messengerModal)}>

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
                    </ul>
                    <MessageForm socket={socket}/>


                  </div>
               </div>
        </div>
    </div>
  )}
}

export default MessengerModal


