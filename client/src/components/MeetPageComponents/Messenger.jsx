import React from 'react'
import './messenger.css'
import {VscClose} from 'react-icons/vsc'
import {IoMdSend} from 'react-icons/io'

function Messenger(props) {
    return (
        <div className="messenger-panel">
            <div className="messenger-panel-header">
                <div>Meeting chat</div>
                <div onClick={props.func} className="messenger-close-icon"><VscClose/></div>
            </div>
            <div className="chat-section" style={{overflow:"auto"}}>
                {/* Renders all the chat messages and aligns the chat messages according to message type on the user's screen. */}
                {props.chat.map((msg)=>(
                    <div className={msg.type === "sent" ? "message-info-sent" : "message-info-received"}>
                    {/* The message body of the message sent by the user only has a timestamp and the message.
                    However, the message sent by the other user will have his/her name, message timestamp and the message.
                    This condition is also checked by the message type. */}
                    {msg.type === "sent" ? 
                        <div className="time">{msg.timestamp}</div> : 
                        <div className="flex items-center">
                            <div className="sender-name">{msg.sender || "Anonymous"}</div>
                            <div className="time ml-2">{msg.timestamp}</div>
                        </div>
                    }    
                    <div className="message">{msg.msg}</div>
                    </div>
                ))}
                {/* Dummy div to bring bring the scroller to bottom on overflow */}
                <div ref={props.dummy}></div>
            </div>
            <div>
                <form className="chat-input-section" onSubmit={(e)=>e.preventDefault()}>
                <div>
                    <input 
                        className="chat-input" 
                        value={props.sendMsg}
                        onChange={(e)=> props.setSendMsg(e.target.value)} 
                        placeholder="Type a new message"
                    >
                    </input>
                </div>
                <button 
                    className="send-btn" 
                    type="submit" 
                    onClick={()=>props.onEnter(props.sendMsg)}
                >
                <IoMdSend />
                </button>
                </form>
            </div>
        </div>
    )
}

export default Messenger
