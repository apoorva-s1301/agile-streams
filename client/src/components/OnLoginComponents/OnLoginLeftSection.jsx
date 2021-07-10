import React from 'react'
import {Link} from 'react-router-dom'
import './onloginleftsection.css'
import {HiBell} from 'react-icons/hi'
import {IoChatbubbleSharp} from 'react-icons/io5'
import {BsCalendarFill} from 'react-icons/bs'
import {FaFile} from 'react-icons/fa'

function LeftIcon(props) {
    return  (
        <div className="left-section-icon">
            <div>{props.icon}</div>
            <div><h1 className="py-1">{props.content}</h1></div>
        </div>
    )
}
function OnLoginLeftSection() {
    return (
        <div className="on-login-left-section">
            <Link to="/SignUp/activity/:id">
                <button className="left-section-btn"><LeftIcon icon={<HiBell/>} content="Activity"/></button>
            </Link>
            <Link to="/SignUp/chat/:id">
                <button className="left-section-btn"><LeftIcon icon={<IoChatbubbleSharp/>} content="Chat"/></button>
            </Link>
            <Link to="/SignUp/calendar/:id">
                <button className="left-section-btn"><LeftIcon icon={<BsCalendarFill/>} content="Calendar"/></button>
            </Link>     
            <Link to="/SignUp/files/file">
                <button className="left-section-btn"><LeftIcon icon={<FaFile/>} content="Files"/></button>
            </Link>   
        </div>
    )
}

export default OnLoginLeftSection
