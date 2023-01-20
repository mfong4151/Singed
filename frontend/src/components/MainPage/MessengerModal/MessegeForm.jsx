import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import './MessengerModal.css';
import { createMessage } from "../../../store/message";

const MessageForm = () => {
    const [body, setBody] = useState("");
    const {groupId} = useParams();
    const sessionUser = useSelector((store) => store.session.user);

    const dispatch = useDispatch();
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

    return(
        <div className="message-form-container">
            <form className="message-form" onSubmit={handleSubmit}>
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