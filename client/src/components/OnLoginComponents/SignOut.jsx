import React from 'react'
import { Link } from 'react-router-dom'
import '../AuthenticationPages/authenticationpage.css'
import microsoft_logo from '../../images/microsoft_logo.png'

function SignOut() {

    return (
        <div className="auth-main-div">
            <section className="sign-in-main">
                <section className="sign-in-main-container">
                    <img src={microsoft_logo} alt="microsoft-logo" />
                    <h1 className="text-2xl font-semibold">You've been successfully signed out.</h1>
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

export default SignOut
