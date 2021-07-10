import React from 'react'
import './chatsection.css'
import {FaUserCircle} from "react-icons/fa"

function Message({message,timestamp,user,userImage}) {
    return (
        <div className="chat-card">
            <div className="user-img">
                {userImage ?
                <img alt="user" src={userImage} style={{borderRadius:"50%"}}/> :
                <FaUserCircle className="user-img" style={{color:"gray"}}/>
                }     
            </div>
            <div className="chat-content">
                <div className="chat-content-top">
                    <h4 className="user-name">{user}</h4>
                    <span className="time ml-3">
                        {new Date(timestamp?.toDate()).toLocaleDateString([], { month:"numeric", day:"numeric" })}
                    </span>
                    <span className="time ml-1">
                        {new Date(timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <p className="chat-msg">{message}</p>
            </div>
        </div>
    )
}

export default Message
