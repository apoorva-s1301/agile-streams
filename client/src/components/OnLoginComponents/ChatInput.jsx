import React,{useState} from 'react';
import './chatsection.css'
import db from '../../firebase';
import {IoMdSend} from 'react-icons/io'
import {useStateValue} from '../../StateProvider';
import firebase from 'firebase';

function ChatInput({groupName,groupId}) {
    const [input,setInput] = useState('');
    const [{user}] = useStateValue();

    //Loops through the messages collection on firestore and stores the messages in their respective fields as per the groupId
    const sendMessage = (e) => {
        e.preventDefault();
        if(groupId && input){
            db.collection('Groups').doc(groupId).collection('messages').add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL
            });
        }
        //Sets input clear on submit
        setInput("");
    }

    return (
        <div className="chat-section-footer">
            <form className="flex mx-10 my-10">
                <input className="chat-section-input mx-4" 
                    placeholder="Type a new message" 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                />
                <button className="chat-section-submit-btn text-2xl" 
                    type="submit" 
                    onClick={sendMessage}
                >
                <IoMdSend />
                </button>
            </form>
        </div>
    )
}

export default ChatInput
