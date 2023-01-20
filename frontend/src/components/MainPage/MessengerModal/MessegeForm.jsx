import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import './MessengerModal.css'
import { createMessage } from "../../../store/message";
import { io } from 'socket.io-client';

const MessageForm = () => {
    const socket = io();
    const [body, setBody] = useState("");
    const {groupId} = useParams();
    const sessionUser = useSelector((store) => store.session.user)

    const dispatch = useDispatch();
    const message = {
        sender: sessionUser.user._id,
        username: sessionUser.user.username,
        content: body,
        messageLocation: groupId
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createMessage(message))
        setBody("");
    }

    return(
        <div className="message-form-container">
            <form className="message-form" onSubmit={handleSubmit}>
            {/* <form className="message-form" > */}
                <input 
                    type="text"
                    value={body}
                    onChange={(e) => setBody(e.currentTarget.value)}
                    placeholder='Message your friends!'/>
            </form>
        </div>
    )

}

export default MessageForm