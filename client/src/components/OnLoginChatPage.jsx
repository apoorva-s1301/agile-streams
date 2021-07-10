import {React, useState} from 'react'
import {useHistory} from 'react-router-dom'
//Component and stylesheet imports
import OnLoginHeader from './OnLoginComponents/OnLoginHeader'
import OnLoginLeftSection from './OnLoginComponents/OnLoginLeftSection'
import OnloginMiddleSection from './OnLoginComponents/OnLoginMiddleSection'
import OnLoginRightSection from './OnLoginComponents/OnLoginRightSection'
import './OnLoginComponents/meetingmodal.css'
//Icon imports
import {VscListFilter} from 'react-icons/vsc'
import {BsCameraVideo} from 'react-icons/bs'
import {RiEditBoxLine} from 'react-icons/ri'
import {VscClose} from 'react-icons/vsc'
//Other imports
import uuidv4 from '../utils/uuidv4'
import db from '../firebase'
import firebase from 'firebase';

function OnLoginPage(){
    let history = useHistory();
    const [newGroupActive,setNewGroupActive]= useState(false)
    const [newGroupName,setNewGroupName]= useState('')
    function handleNewGroupCreation() {
        setNewGroupActive(!newGroupActive)
    }
    
    //The following function creates a new group in the 'groups' collection of firestore db 
    //with the entered groupname and time of creation.

    //Group wouldn't be created if the groupname isn't entered.
    const createNewGroup = (e) => {
        e.preventDefault();
        if(newGroupName){
            db.collection('Groups').add({
                GroupName: newGroupName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
            //The following state changes clear the input on submit and closes the modal.
            setNewGroupName("");
            setNewGroupActive(!newGroupActive);
        }
    }

    return (
        <div>
            {/* Conditionally renders a modal to create a new group. */}
            {newGroupActive && 
                <div className="meeting-modal" 
                    style={{position:"absolute",top:"110px",left:"200px",flexDirection:"row",
                    justifyContent:"space-between",alignItems:"center"}}
                >
                <form style={{width:"100%"}}>
                    <input className="meeting-code-input" style={{marginBottom:0,width:"100%"}} value={newGroupName} 
                        onChange={(e)=>setNewGroupName(e.target.value)} placeholder="Enter new group's name here."/>
                    <button onClick={createNewGroup} type="submit" style={{visibility:"none"}}></button>
                </form>
                <VscClose style={{cursor:"pointer",marginLeft:"1rem"}} onClick={handleNewGroupCreation}/>
            </div>}
            
            <div>
                <OnLoginHeader />
                <div className="page-body flex flex-row justify-center" style={{height: "95vh",overflow: "hidden"}}>
                    <OnLoginLeftSection />
                    <OnloginMiddleSection title="Chat" Icons={[<VscListFilter/>,
                        <BsCameraVideo 
                            onClick={()=>history.push(`/meeting/room.html?room=${uuidv4()}`)} 
                            style={{cursor:"pointer"}}/>,
                        <RiEditBoxLine onClick={handleNewGroupCreation} style={{cursor:"pointer"}}/>]}
                    />
                    <OnLoginRightSection func={handleNewGroupCreation}/>
                </div>
            </div>
        </div>
    )
}

export default OnLoginPage
