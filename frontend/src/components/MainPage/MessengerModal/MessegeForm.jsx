import { useState } from "react";


const MessageForm = () => {
    const [body, setBody] = useState("");

    // const dispatch = useDispatch();

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     let message = {content: body}
    //     dispatch(createMessage(channelId, message))
    //     setBody("");
    // }

    return(
        <div className="message-form-container">
            {/* <form className="message-form" onSubmit={handleSubmit}> */}
            <form className="message-form">
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