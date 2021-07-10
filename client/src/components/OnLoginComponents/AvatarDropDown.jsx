import React,{useEffect} from 'react'
import './avatardropdown.css'
import {Avatar} from '@material-ui/core'
import {useStateValue} from '../../StateProvider'
import {actionTypes} from '../../reducer'
import {auth} from '../../firebase'

function AvatarDropDown() {
    const [{user},dispatch] = useStateValue();

    //The following function sets global user to null by keeping a check of authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser)=> {
            if(authUser)
            {
                console.log(user)
            }
            else {
                dispatch(
                    {
                        type: actionTypes.SET_USER,
                        user: null
                    }
                )
            }
        })
        return () => {
            unsubscribe(); //Perform cleanup to prevent data repetition.
        }
    },[user]);

    //Signs user out
    const handleSignOut=(e) => {
        e.preventDefault();
        console.log(e);
        auth.signOut()
    }

    return (
        <div className="avatar-drop-down">
            <div className="avatar-top-div">
                <div className="avatar">
                <Avatar 
                    style={{ height: '32px', width: '32px' }}
                    className="header-avatar" 
                    alt={user?.displayName} 
                    src={user?.photoURL}
                />
                </div>
                <div className="user-info">
                    <p>
                        {user?.displayName}
                    </p>
                    <p className="avatar-custom-font">
                        {user?.email}
                    </p>
                    <p className="avatar-custom-font" style={{color:"green"}}>
                        Available
                    </p>
                </div>
            </div>
            <div className="line-break"></div>
            <div className="avatar-bottom-div" onClick={handleSignOut}>
                Sign Out
            </div>
        </div>
    )
}

export default AvatarDropDown
