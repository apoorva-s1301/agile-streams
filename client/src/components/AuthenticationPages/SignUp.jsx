import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import './authenticationpage.css'
import microsoft_logo from '../../images/microsoft_logo.png'
import {auth} from '../../firebase'

function SignUp() {
    const [error,setError] = useState(false)    //Checks for error while signing up
    const [signUpSuccess,setSignUpSuccess] = useState(false)    //Projects Sign up success message
    const [errorMessage,setErrorMessage] = useState('') //Sets error message in case of sign up failure

    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = (e) => {
        e.preventDefault();
        //Set error and errorMessage state to default incase of multiple attempts of sign up
        setError(false);
        setErrorMessage('');
        auth.createUserWithEmailAndPassword(email,password)
        .then((authUser) => {
            setSignUpSuccess(true);
            return authUser.user.updateProfile({
                displayName : userName //Update username incase of any changes.
            })
        })
        .catch((error) => {
            console.log(error.message);
            setError(true)
            setErrorMessage('An error was encountered signing you up. Try again?')
        });
        //Set username, email and password field to blank on submit
        setUserName('');
        setEmail('');
        setPassword('');
    }


    return (
        <div className="auth-main-div">
            <section className="sign-in-main">
                <section className="sign-in-main-container">
                    <form>
                    <img src={microsoft_logo} alt="microsoft-logo" />
                        <h1 className="text-2xl font-semibold">Sign up</h1>
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={userName} 
                            onChange={(e)=>setUserName(e.target.value)}
                        />
                        <div style={{height:"8px"}}></div>
                        <input 
                            type="email" 
                            placeholder="example@sample.microsoft.com" 
                            value={email} 
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <div style={{height:"8px"}}></div>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <div style={{height:"8px"}}></div>
                        <div className="main-container-button">
                        <button 
                            className="continue-btn" 
                            type="submit" 
                            onClick={handleSignUp}
                        >
                        Sign Up
                        </button>
                        {error && <div className="error-msg">{errorMessage}</div>}
                        </div>
                    </form>
                    {signUpSuccess && 
                        <div className="error-msg">
                        You've been successfully signed up. Head over to the Sign In page.
                        </div>}
                    <p className="text-sm font-normal">
                        Already have an account? <Link to="/SignIn">Sign In</Link>
                    </p>
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

export default SignUp
