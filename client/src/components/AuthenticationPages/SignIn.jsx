import React,{useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
//Component imports
import './authenticationpage.css'
import microsoft_logo from '../../images/microsoft_logo.png'
import key from '../../images/key.png'
import {auth, googleProvider, githubProvider, twitterProvider} from '../../firebase'
import {useStateValue} from '../../StateProvider'
import {actionTypes} from '../../reducer'
//Icon imports
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import {FaTwitter} from 'react-icons/fa'
import {MdKeyboardBackspace} from 'react-icons/md'

function SignIn() {
    const [state,dispatch] = useStateValue();
    const [error,setError] = useState(false)    //Checks for error while signing in
    const [errorMessage,setErrorMessage] = useState('') //Sets error message in case of sign in failure
    const [optionsActive,setOptionsActive] = useState(false);   //Checks if other sign in options card is open
    const [continueBtnVisible,setContinueBtnVisible] = useState(false)  //Sets the visibility of continue to website button on successful sign in
    const [signInSuccess,setSignInSuccess] = useState(false)    //Renders post-login components on sign in success

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();

    //Normal user authentication with email and password
    const signInWithEmail = (e) => {
        e.preventDefault();
        //Set error and errorMessage state to default incase of multiple attempts of sign in
        setError(false)
        setErrorMessage('');
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // console.log(userCredential);
                dispatch(
                    {
                        type: actionTypes.SET_USER,
                        user: userCredential.user //Sets user globally for the app on sign in
                    }
                )
                setSignInSuccess(true); //Continue to post login component pages
        })
        .catch((error) => {
            console.log(error.message);
            setError(true)
            setErrorMessage('An error was encountered signing you in. Try again?')
        });
        //Set email and password field to blank on submit
        setEmail('');
        setPassword('');   
    }

    //Authentication using providers such as Google,Github,etc.
    const signIn = (provider) => {
        //Set error and errorMessage state to default incase of multiple attempts of sign in
        setError(false)
        setErrorMessage('');
        auth.signInWithPopup(provider)
            .then(result=> {
                // console.log(result);
                dispatch(
                    {
                        type: actionTypes.SET_USER,
                        user: result.user   //Sets user globally for the app on sign in
                    }
                )
                setContinueBtnVisible(true) //Make continue button visible on successful sign in
            })
            .catch((error) => {
                console.log(error.message);
                setError(true)
                setErrorMessage('An error was encountered signing you in. Try again?')
            }); 
    };

    return (
        <div>
            <section className="sign-in-main">
                <section className="sign-in-main-container">
                {   
                    //Conditionally render other options card 
                    optionsActive ? 
                    <div className="sign-in-options">
                        <MdKeyboardBackspace  style={{fontSize:"1.5rem",cursor:"pointer"}} 
                            onClick={()=> {setOptionsActive(!optionsActive);setError(false)}}/>
                        <button className="option-btn" onClick={() => signIn(googleProvider)}>
                            <div className="option-btn-icon"><FcGoogle /></div>
                            <div className="option-btn-text">Sign in with Google</div>
                        </button>
                        <button className="option-btn" onClick={() => signIn(githubProvider)}>
                            <div className="option-btn-icon"><FaGithub /></div>
                            <div className="option-btn-text">Sign in with Github</div>
                        </button>
                        <button className="option-btn" onClick={() => signIn(twitterProvider)}>
                            <div className="option-btn-icon"><FaTwitter style={{color:"rgb(29, 161, 242)"}} /></div>
                            <div className="option-btn-text">Sign in with Twitter</div>
                        </button>
                        {continueBtnVisible && 
                         <div className="main-container-button">
                            <Link to="/SignUp/activity/:id"><button className="continue-btn">Continue</button></Link>
                        </div>}
                        {error && <div className="error-msg">{errorMessage}</div>}
                    </div>
                    :
                    <div>
                    <form>
                    <img src={microsoft_logo} alt="microsoft-logo" />
                        <h1 className="text-2xl font-semibold">Sign in</h1>
                        <input 
                            type="email" 
                            placeholder="Enter your email." 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <div style={{height:"10px"}}></div>
                        <input 
                            type="password" 
                            placeholder="Enter your password." 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <p className="text-sm font-normal">No account? <Link to="/SignUp">Create one!</Link></p>
                         <div className="main-container-button">
                            <button 
                                className="continue-btn" 
                                type="submit" 
                                onClick={signInWithEmail}
                            >
                            Continue
                            </button>
                            { signInSuccess && history.push(`/SignUp/activity/:id`)}
                        </div>
                        {error && <div className="error-msg">{errorMessage}</div>} 
                    </form>
                    </div>
                }  
                </section>
                <section className="options-section" onClick={()=> {setOptionsActive(!optionsActive);setError(false)}}>
                    <img src={key} alt="key" />
                    <p className="text-base font-normal">Sign-in options</p>
                </section>
            </section>
            <footer className="sign-in-footer text-xs font-normal">
                <Link to="/">Terms of use</Link>
                <Link to="/">Privacy & cookies</Link>
                <Link className="footer-a" to="/">...</Link>
            </footer>
        </div>
    )
}

export default SignIn
