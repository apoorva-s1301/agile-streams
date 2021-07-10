import React, {useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
//Component and stylesheet imports
import Messenger from './MeetPageComponents/Messenger'
import './MeetPageComponents/callingbar.css'
import './meetpage.css'
import TextField from "@material-ui/core/TextField"
//Icon imports
import {FaVideo} from 'react-icons/fa'
import {FaVideoSlash} from 'react-icons/fa'
import {IoMdMic} from 'react-icons/io'
import {IoMdMicOff} from 'react-icons/io'
import {IoShareOutline} from 'react-icons/io5'
import {BsChatDots} from 'react-icons/bs'
import {HiUsers} from 'react-icons/hi'
import {ImPhoneHangUp} from 'react-icons/im'
import {VscClose} from 'react-icons/vsc'
import {IoShareSocialOutline} from 'react-icons/io5'
//Other imports
import {CopyToClipboard} from "react-copy-to-clipboard"
import Peer from "simple-peer"
import io from "socket.io-client"
import useTimer from '../hooks/useTimer';
import {formatTime} from '../utils/formatTime';

let socket;

function MeetPage() {
	let history = useHistory();

    const [ me, setMe ] = useState("")
	const [ stream, setStream ] = useState()
	const [ receivingCall, setReceivingCall ] = useState(false)
	const [ caller, setCaller ] = useState("")
	const [ callerSignal, setCallerSignal ] = useState()
	const [ callAccepted, setCallAccepted ] = useState(false)
	const [ idToCall, setIdToCall ] = useState("")
	const [ callEnded, setCallEnded] = useState(false)
	const [ name, setName ] = useState("")
	const [ callerName, setCallerName ] = useState("")
	const [ otherUser, setOtherUser ] = useState("");
	const [ msgRcv, setMsgRcv ] = useState("")
	const [ sendMsg, setSendMsg ] = useState("")
	const [ chat, setChat ] = useState([])

	const myVideo = useRef()
	const userVideo = useRef()
	const connectionRef= useRef() //Reference to the temporary connection.

	const [ isMute, setIsMute ] = useState(false)
	const [ isVideoOff, setIsVideoOff ] = useState(false)
	const [ myVdoStatus, setMyVdoStatus ] = useState(true);
  	const [ userVdoStatus, setUserVdoStatus ] = useState();
  	const [ myMicStatus, setMyMicStatus ] = useState(true);
  	const [ userMicStatus, setUserMicStatus ] = useState();
	const [ inviteModal,setInviteModal ] = useState(true)
	const [ inviteBtnText,setInviteBtnText ] = useState('Send invite')
	const [ messengerOpen, setMessengerOpen] = useState(false)
	const [ meetCodeText, setMeetCodeText ] = useState('Get your meeting ID to share')
	const { timer, handleStart, handleReset } = useTimer(0)
	
	//The following code establishes a socket connection of the user with the server once the page meetpage loads.
	useEffect(() => {
		// Connects to the backend server in production
		socket = io.connect('https://engage-ms-teams-clone.herokuapp.com/') 

		// Connects to the backend server locally
		// socket = io.connect('http://localhost:5000') 
		navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
			setStream(stream)
				myVideo.current.srcObject = stream
		})

	    socket.on("me", (id) => {
			handleStart() //Starts the meeting timer
			setMe(id) //Grabs the socket id for the user to share.
			console.log(id)
		})

		socket.on("callUser", (data) => {
			setReceivingCall(true)
			setCaller(data.from)
			setCallerName(data.name)
			setCallerSignal(data.signal)
		})

		//Keeps track of the user's video and audio status
		socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
			if (currentMediaStatus !== null || currentMediaStatus !== []) {
			  switch (type) {
				case "video":
				  setUserVdoStatus(currentMediaStatus);
				  break;
				case "mic":
				  setUserMicStatus(currentMediaStatus);
				  break;
				default:
				  setUserMicStatus(currentMediaStatus[0]);
				  setUserVdoStatus(currentMediaStatus[1]);
				  break;
			  }
			}
		  });

		  socket.on("msgRcv", ({ name , msg: value, sender }) => {
			setMsgRcv({ value, sender });
			setTimeout(() => {
			  setMsgRcv({});
			}, 2000);
		  });

	}, [])

	//Chatting functionality which sets the chat array everytime on receiving a new message.
	useEffect(()=>{
		socket.on("msgRcv", ({ name, msg: value, sender }) => {
			let msg = {};
			msg.msg = value;
			msg.type = "rcv";
			msg.sender = sender;
			msg.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
			setChat([...chat, msg]);
		});	
	},[chat])

	const callUser = (id) => {
		setOtherUser(id);
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
			socket.emit("updateMyMedia", {
				type: "both",
				currentMediaStatus: [myMicStatus, myVdoStatus],
			});
		})
		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		setOtherUser(caller);
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { 
				signal: data, 
				to: caller, 
				type: "both",
				myMediaStatus: [myMicStatus, myVdoStatus],
			})
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const updateVideo = () => {
		setMyVdoStatus((currentStatus) => {
		  socket.emit("updateMyMedia", {
			type: "video",
			currentMediaStatus: !currentStatus,
		  });
		  stream.getVideoTracks()[0].enabled = !currentStatus;
		  return !currentStatus; //Helps to toggle video
		});
	};

	const updateMic = () => {
		setMyMicStatus((currentStatus) => {
			socket.emit("updateMyMedia", {
			type: "mic",
			currentMediaStatus: !currentStatus,
			});
			stream.getAudioTracks()[0].enabled = !currentStatus;
			return !currentStatus; //Helps to toggle audio
		});
	};	

	//Chatting functionality which sets the chat array everytime on sending a new message.
	const sendMsgFunc = (value) => {
		socket.emit("msgUser", { name, to: otherUser, msg: value, sender: name });
		let msg = {};
		msg.msg = value;
		msg.type = "sent";
		msg.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });
		msg.sender = name;
		setChat([...chat, msg]);
	};

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
		handleReset()
	}

	//The following handles form submit while sending messages and checks for non-empty input field.
	const onEnter = (value) => {
		if (value && value.length) sendMsgFunc(value);
		setSendMsg("");
	};

	//The following set of functions handle state changes of various components present on the meetpage.
	function handleInviteModalClose() {
		setInviteModal(!inviteModal);
		setInviteBtnText('Send invite')
		setMeetCodeText('Get your meeting ID to share')
	}

	function handleInviteBtnClick() {
		setInviteBtnText('Invite sent')
	}

	function handleMessengerOpen() {
		setMessengerOpen(!messengerOpen)
	}

	function handleMeetCodeChange() {
		setMeetCodeText('Meeting code copied to clipboard')
	}

	function handleIsMute() {
		setIsMute(!isMute)
		updateMic();
	}
	 
	function handleIsVideoOff() {
		setIsVideoOff(!isVideoOff)
		updateVideo();
	}

	const dummy = useRef();

	//Helper function with scroll to bottom functionality
    useEffect(() => {
		//Keeps track of the dummy div's view on overflow. The dummy div is present at the end of chat section.
        if (dummy?.current) dummy.current.scrollIntoView({ behavior: "smooth" });
    }, [chat]);


    return (
        <div className="meet-page-main">
            <div className="video-cont">
				{/* Displays your video */}
                <div className="first-video-container"> 
                    {stream && <video className="first-user-vid" playsInline muted ref={myVideo} autoPlay 
						style={{
                			opacity: `${myVdoStatus ? "1" : "0"}`,
                			transform: "scaleX(-1)",
						}}			
					/>} 
                </div>
				{/* Displays user's video if the call is accepted and not yet ended */}
				{callAccepted && !callEnded ? 
                <div className="second-video-container">
                    <video className="second-user-vid" playsInline ref={userVideo} autoPlay 
						style={{
                			opacity: `${userVdoStatus ? "1" : "0"}`,
              			}}			  
					/>   
                </div>: null} 
            </div>	
			{/* Conditionally render the invite modal. */}
			{inviteModal && 	
				<div className="invite-modal">
					<div className="invite-modal-header">
						<p className="invite-heading">Invite someone to join you</p>
						<VscClose style={{cursor:"pointer"}} onClick={handleInviteModalClose}/>
					</div>
					<TextField
						// id="filled-secondary"
						label="Your name"
						variant="filled"
						spellCheck='false'
						value={name}
						onChange={(e) => setName(e.target.value)}
						style={{backgroundColor:"white",borderRadius:"5px",marginBottom:"10px"}}
					/>
					<TextField
						id="filled-secondary"
						label="ID to be invited"
						variant="filled"
						spellCheck='false'
						value={idToCall}
						style={{backgroundColor:"white",borderRadius:"5px"}}
						onChange={(e) => setIdToCall(e.target.value)}
					/>
					<button className="invite-btn" 
						onClick={() => {callUser(idToCall);handleInviteBtnClick()}}>
						{inviteBtnText}
					</button>
					<div className="or-div">OR</div>
					<CopyToClipboard text={me}>
						<button className="share-id-btn" onClick={handleMeetCodeChange}>
							{meetCodeText}
						</button>
					</CopyToClipboard>
				</div>
			}
			{/* Conditionally render incoming call modal */}
			{receivingCall && !callAccepted ? (
				<div className="caller">
					<h1 >{callerName|| 'Someone'} is calling...</h1>
					<button className="invite-btn" onClick={answerCall}>
						Let in
					</button>
				</div>
			) : null}
			{/* Calling bar */}
			<div className="calling-bar">
				<div className="timer">{formatTime(timer)}</div>
				{isVideoOff ? 
					<button className="calling-bar-icon" onClick={handleIsVideoOff}><FaVideoSlash /></button> 
				: 	<button className="calling-bar-icon" onClick={handleIsVideoOff}><FaVideo /></button>
				}
				{isMute ?
					<button className="calling-bar-icon" onClick={handleIsMute}><IoMdMicOff /></button>
				:	<button className="calling-bar-icon" onClick={handleIsMute}><IoMdMic /></button>
				}
				<button className="calling-bar-icon" ><IoShareOutline /></button>
				<button className="calling-bar-icon" onClick={handleInviteModalClose}><IoShareSocialOutline /></button>
				<button className="calling-bar-icon bar-section-two" onClick={handleMessengerOpen}>
					<BsChatDots />
					<span className="new-message-dot"></span>
				</button>
				<div className="calling-bar-icon bar-section-two"><HiUsers /></div>
				{/* The following code conditionally determines the function of the endcall button.
				If the call is going on, the button would stop the peer connection.
				Else the button stops the media tracks and closes the meetpage component. */}
				{callAccepted && !callEnded ? 
				(<button className="calling-bar-icon bar-section-three" onClick={leaveCall}>
					<ImPhoneHangUp />
				</button>) 
				:(
						<button className="calling-bar-icon bar-section-three" 
							onClick={()=>{stream.getTracks().forEach((track) => track.stop());history.goBack()}}>
							<ImPhoneHangUp />
						</button>
				)}
			</div>
			{ messengerOpen && 
				<Messenger 
					func={handleMessengerOpen} 
					chat={chat} 
					onEnter={onEnter} 
					setSendMsg={setSendMsg} 
					sendMsg={sendMsg}
					dummy={dummy}
				/>
			}
        </div>
    )
}

export default MeetPage
