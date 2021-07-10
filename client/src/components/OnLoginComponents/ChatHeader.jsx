import React from 'react'
import {useHistory} from 'react-router-dom'
//Icon imports
import {HiUserGroup} from 'react-icons/hi'
import {BsPencil} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import {BsCameraVideoFill} from 'react-icons/bs'
import {IoCall} from 'react-icons/io5'
import {MdPeopleOutline} from 'react-icons/md'
//Others
import './chatsection.css'
import uuidv4 from "../../utils/uuidv4";

function ChatHeader(props) {
    let history = useHistory();
    return (
        <div className="chat-header-main">
            <div className="chat-header-left">
                <div className="chat-header-left-group-one">
                    <HiUserGroup style={{fontSize:'1.3rem',color:'#f0f0f0'}}/>
                </div>
                <div className="chat-header-left-group-two">
                    <div className="text-xl font-bold">{props.groupName}</div>
                    <span className="mx-2 text-lg"><BsPencil/></span>
                </div>
                <div className="ml-1 mr-2 chat-header-text-one" 
                    style={{borderBottom:"solid #6264a7",color:"black"}}>
                    Chat
                </div>
                <div className="chat-header-text-two">Files</div>
                <div className="chat-header-text-three">Photos</div>
                <div className="px-1 py-1 mx-2 mb-2 text-xl">
                    <AiOutlinePlus  style={{color:"gray"}}/>
                </div>
            </div>
            <div className="chat-header-left-group-three">
                <div className="chat-header-icon-one">
                    <BsCameraVideoFill onClick={()=>history.push(`/meeting/room.html?room=${uuidv4()}`)}/>
                </div>
                <div className="chat-header-icon-two"><IoCall /></div>
                <div className="px-2 py-2 mx-2 mb-2 text-xl" 
                    style={{borderLeft: "1px solid #dddbdb"}}>
                    <MdPeopleOutline/>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader
