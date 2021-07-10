import React,{useEffect, useState, useRef} from 'react'
import {useHistory} from 'react-router-dom';
//Component Imports
import Message from './Message';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import './onloginrightsection.css'
//Others
import {IoTimeOutline} from 'react-icons/io5'
import {FaFile} from 'react-icons/fa'
import uuidv4 from "../../utils/uuidv4";
import {useParams} from 'react-router-dom'
import db from '../../firebase'

function OnLoginRightSection(props) {
    let history = useHistory();
    const {id} = useParams(); //Recognizes the group id from the URL

    //States related to Chat groups
    const [groupDetails, setGroupDetails] = useState(null);
    const [groupMessages, setGroupMessages] = useState([]);

    const dummy = useRef();

    useEffect(()=>{
        //Keeps tracks of realtime changes in the chat group 
        if(id){
            db.collection('Groups')
                .doc(id)
                .onSnapshot((snapshot)=> setGroupDetails(snapshot.data()))
        }

        //Sets the groupMessages array 
        db.collection('Groups').doc(id)
            .collection('messages')
            .orderBy('timestamp','asc')
            .onSnapshot((snapshot)=>
                setGroupMessages(
                    snapshot.docs.map(doc => doc.data())
                )
            )
    },[id])

    useEffect(() => {
        //Keeps track of the dummy div's view on overflow
        if (dummy?.current) dummy.current.scrollIntoView({ behavior: "smooth" });
    }, [groupMessages]);

    //States related to Files
    const [files, setFiles] = useState([])

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    //Sets the Files array and keeps tracks of realtime changes in the files collection of firestore
    useEffect(() => {
        db.collection('myFiles').orderBy('timestamp','desc').onSnapshot(snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id: doc.id,
                item: doc.data()
            })))
        })
    }, [id])

    //Converts the file size in bytes to a better readable size unit.
    const getReadableFileSizeString = (fileSizeInBytes) => {
        let i = -1;
        const byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    };


    return (
        <div className="on-login-right-section">
        {/* Conditionally render the welcome to teams page or the group content */}
        { id ===':id' ? 
            <div>
                <div className="on-login-right-section-header">
                    <h1 className="text-2xl font-bold">Welcome to Streams!</h1>
                    <p className="text-sm">Here are some things to get going...</p>
                </div>
                <div className="right-section-cards">
                    <div className="right-section-card">
                            <div className="right-section-card-img">
                                <img src={require('../../images/chattingimg.svg').default} alt='mySvgImage' />
                            </div>
                            <div className="right-section-card-content px-10">
                                <h2 className="font-bold py-3">Get chatting</h2>
                                <p className="text-xs">Get in touch with friends and family, even if they're not on Streams.</p>
                                <button className="my-6 right-section-btn" onClick={props.func}>
                                    Start a chat
                                </button>
                            </div>
                    </div>
                    <div className="right-section-card">
                            <div className="right-section-card-img">
                                <img src={require('../../images/meetnow.svg').default} alt='mySvgImage' />
                            </div>
                            <div className="right-section-card-content px-10">
                                <h2 className="font-bold py-3">Meet now</h2>
                                <p className="text-xs">Create an instant meeting and connect with anyone with just one click.</p>
                                <button className="my-6 right-section-btn" 
                                    onClick={()=>history.push(`/meeting/room.html?room=${uuidv4()}`)}>
                                    Meet now
                                </button>
                            </div>
                    </div>
                </div>
            </div> 
            //Checks if the URL wildcard is equal to "file" and displays the right setion content of the files page.
            : id === 'file' ? 
            <div>
                <div className="right-section-recent-files-header">
                    <div className="clock-div"><IoTimeOutline /></div>
                    <div className="mx-4">Recent</div>
                </div>
                <div className="right-section-recent-files-menu">
                    <div className="flex items-center">
                        <div className="file-item ml-10">Name</div>
                        <div className="file-item">Modified</div>
                        <div className="file-item">File Size</div>
                    </div>
                </div>
                {
                    //Maps through the files array and displays all related content
                    files.map(({ id, item }) => (
                    <div className="right-section-recent-files-menu">
                        <div className="flex items-center">
                            <span><FaFile className="mx-3" style={{color:"#616161"}}/></span>
                            <div className="file-item flex items-center">
                                <a href={item.fileUrl} target="_blank" rel="noreferrer" download>
                                    {item.caption}
                                </a>
                            </div>
                            <div className="file-item">
                            {`${item.timestamp?.toDate().getDate()} 
                                ${monthNames[item.timestamp?.toDate().getMonth()]} 
                                    ${item.timestamp?.toDate().getFullYear()}`}
                            </div>
                            <div className="file-item">{getReadableFileSizeString(item.size)}</div>
                        </div>
                    </div>
                    ))
                }
            </div> 
            : 
            // Else displays the chats
            <div className="right-chat-section">
                <div className="right-chat-section-header">
                    {/* The following div fixes the chat header to the top */}
                    <div style={{position:"absolute",width:"72%",backgroundColor:"#f5f5f5"}}> 
                        <ChatHeader groupName={groupDetails?.GroupName}></ChatHeader>
                    </div>
                </div>
                {/* Loops through the groupMessages array to display group content */}
                <div className="right-chat-section-msgs">
                    {groupMessages.map(({message,timestamp,user,userImage}) => (
                        <Message 
                        message={message}
                        timestamp={timestamp}
                        user={user}
                        userImage={userImage} 
                        />
                    ))}
                </div>
                {/* Dummy div to bring bring the scroller to bottom on overflow */}
                <div ref={dummy}></div>
                <div className="footer-input">
                    <ChatInput groupName={groupDetails?.GroupName} groupId={id}></ChatInput>
                </div>
            </div>
        }
           
        </div>
    )
}

export default OnLoginRightSection

