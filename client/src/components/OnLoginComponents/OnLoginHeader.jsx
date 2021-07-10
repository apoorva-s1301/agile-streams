import React, {useState} from 'react'
import './onloginheader.css'
import AvatarDropDown from './AvatarDropDown'
import {IoIosSearch} from 'react-icons/io'
import {BsThreeDots} from 'react-icons/bs'
import {Avatar} from '@material-ui/core'
import {IconContext} from "react-icons";
import {useStateValue} from '../../StateProvider'

function OnLoginHeader () {
    const [{user}] = useStateValue();

    //Checks the state of avatar dropdown on top right of on-login header
    const [avatarDropDownActive,setAvatardDropdownActive] = useState(false); 

    return (
        <div className="on-login-header">
        {/* Conditionally render avatar dropdown */}
        { avatarDropDownActive && <AvatarDropDown />} 
          <div className="header-left-empty"></div>
          <div className="search-bar">
            <IconContext.Provider value={{size: 22, color: 'gray'}}>
            <IoIosSearch />
            </IconContext.Provider>
            <input style={{outline :"none"}} placeholder="Search" />
          </div>
          
          <div className="header-right">
              <div className="settings"><BsThreeDots /></div>
              <div className="avatar-dropdown" onClick={()=>setAvatardDropdownActive(!avatarDropDownActive)}> 
                    <div className="text-xs">{user?.displayName || "Personal"}</div>
                    <div>
                    <Avatar 
                        style={{ height: '32px', width: '32px' }}
                        className="header-avatar" 
                        alt={user?.displayName} 
                        src={user?.photoURL}
                    />
                    </div>
              </div>
          </div>
        </div>
    )
}

export default OnLoginHeader
