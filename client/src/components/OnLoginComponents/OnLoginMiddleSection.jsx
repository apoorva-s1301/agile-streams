import React,{useState, useEffect} from 'react'
import {useHistory,useParams} from 'react-router-dom'
//Icon imports
import {HiUserGroup} from 'react-icons/hi'
import {IoMdArrowDropdown} from 'react-icons/io'
import {IoMdArrowDropright} from 'react-icons/io'
import {IoTimeOutline} from 'react-icons/io5'
import {AiOutlinePlus} from 'react-icons/ai'
//Other imports
import './onloginmiddlesection.css'
import firebase from 'firebase';
import db, {storage} from '../../firebase'
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

//The following two functions are associated with the add files modal of the files tab.
function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #6264a7',
        boxShadow: '0 3px 5px 2px #616161',
        padding: '20px 30px',
    },
}));

//The following two functions are helper functions to display the middle section's header.
function MiddleSectionIcon(props)
{
    return (
        <div className="middle-section-icon px-2 py-2 mx-1"> 
            {props.Icon}
        </div>
    )
}

function MiddleSectionHeader(props){
    const iconList = props.Icons;
    return (
        <div className="middle-section-header">
                <div className="middle-section-title text-xl font-bold ml-6">{props.title}</div>
                <div className="middle-section-icons">
                    {/* Maps through the iconList array received via props */}
                    {iconList.map((Icon) => {
                        return <MiddleSectionIcon Icon={Icon} />
                    })}
                </div>
        </div>
    )
}

function OnLoginMiddleSection(props) {

    const history = useHistory();
    const {id} = useParams();

    //States for chat tab
    const [groups, setGroups]= useState([])
    const [recentActive,setRecentActive]= useState(true)

    //Sets the groups array with all the active group names and their time of creation 
    //by going through "Groups" collection on firestore
    useEffect(() => {
        db.collection('Groups').orderBy('timestamp','desc').onSnapshot(snapshot =>(
            setGroups(snapshot.docs.map((doc) => ({
                id: doc.id,
                GroupName : doc.data().GroupName,
                timestamp : doc.data().timestamp,
            })))
        ))
    }, [])

    function handleRecentClick(){
        setRecentActive(!recentActive);
    }

    const classes = useStyles();

    //States for files tab
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null)
    const [uploading, setUploading] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Selects the uploaded file from the system.
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0])
        }
    }

    const handleUpload = () => {
        file && setUploading(true)

        //Uploads file to storage bucket in Firebase
        file && storage.ref(`files/${file.name}`).put(file).then(snapshot => {

            storage.ref('files').child(file.name).getDownloadURL().then(url => {
                //Posts file into the "myFiles" collection in firestore db to get a downloadable URL.
                db.collection('myFiles').add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    caption: file.name,
                    fileUrl: url,
                    size: snapshot._delegate.bytesTransferred,
                })

                setUploading(false)
                setOpen(false)
                setFile(null)
            })

            storage.ref('files').child(file.name).getMetadata().then(meta => {
                console.log(meta.size)
            })
        })
    }

    return (
        <div className="on-login-middle-section">
            <MiddleSectionHeader title={props.title} Icons={props.Icons}/>
            {/* Displays the below mentioned paragraphs if there are no groups/files present */}
            { 
                !groups &&
                <div className="middle-section-disp">
                <p style={{textAlign: "center"}}>You will see mentions, replies and other notifications here.</p>
                </div> 
            }
            <div className="recents ml-1 flex items-center text-xs" onClick={handleRecentClick}>
                <div>{recentActive ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}</div>
                <div>{id === "file" ? "Views": "Recent"}</div>
            </div>
            {   //Checks if the URL wildcard is equal to "file" and displays the content of the files page.
                id === "file" ? 
                <div className="flex-col">
                    <div className="middle-section-content" style={{backgroundColor:"#fff"}}>
                        <div className="flex items-center">
                            <div><IoTimeOutline style={{fontSize:'1.3rem'}} /></div>
                            <div className="px-3">Recent</div>
                        </div>
                    </div> 
                    <div className="middle-section-content-btn">
                        <div className="add-files-btn flex items-center" onClick={handleOpen}>
                            <div><AiOutlinePlus style={{fontSize:'1.3rem'}} /></div>
                            <div className="px-3">Add Files</div>
                        </div>
                    </div>
                    {/* Modal which opens on pressing add files button */}
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <p className="middle-section-content">Select files you wish to upload!</p>
                            {
                                uploading ? (
                                    <p className="middle-section-content">Uploading...</p>
                                ) : (
                                        <>
                                            <input className="middle-section-content" type="file" onChange={handleChange} />
                                            <button className="mx-5 my-5 upload-files-btn" onClick={handleUpload}>Upload</button>
                                        </>
                                    )
                            }
                        </div>
                    </Modal>                    
                </div>
                :
                //Displays all the chat groups present in groups array and opens the respective group via their group id, when clicked
                recentActive && 
                groups.map(group => (
                    <div className="middle-section-content" onClick={ () => history.push(`/SignUp/chat/${group.id}`)}>
                        <div className="flex justify-between items-center">
                            <div className="flex justify-center items-center">
                                <div className="px-1 py-1" style={{borderRadius:"50%",backgroundColor: '#616161',opacity:"70%"}}>
                                    <HiUserGroup style={{fontSize:'1.3rem',color:'#f0f0f0'}}/>
                                </div>
                                <div className="ml-2 font-normal">
                                    <p>{group.GroupName}</p>
                                </div>
                            </div>
                            <div className="font-extralight">
                                {new Date(group.timestamp?.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default OnLoginMiddleSection
