import React from 'react'
import {Link} from 'react-router-dom'
import './header.css'
import Logo from '../../images/logo.png'
import {FaBars,FaUserPlus} from 'react-icons/fa'
import {IconContext} from "react-icons"

function Header() {
    return (
        <header className="header flex items-center justify-between py-4 lg:mx-20">
            {/* This div is visible only on small screens. */}
           <div className="menu-btn flex">
                <div className="mx-4">
                    <a href="https://www.microsoft.com/en-in/microsoft-teams/group-chat-software"><FaBars /></a>
                </div>
           </div>
           <div className="nav-content">
                <div>
                    <a href="https://www.microsoft.com/en-in/">
                    <img src={Logo} alt="Microsoft's Logo" />
                    </a>
                </div>
                <ul className="ml-3">
                    <li className="teams-link text-lg">
                        <Link to="/">Streams</Link>
                    </li>
                    <li><a href="https://www.microsoft.com/en-in/microsoft-teams/group-chat-software">Products</a></li>
                    <li><a href="https://www.microsoft.com/en-in/microsoft-teams/group-chat-software">Solutions</a></li>
                    <li><a href="https://www.microsoft.com/en-in/microsoft-teams/group-chat-software">Resources</a></li>
                    <li><a href="https://www.microsoft.com/en-in/microsoft-teams/compare-microsoft-teams-options">Pricing</a></li>
                    <li><a href="https://www.microsoft.com/en-in/microsoft-365">More Microsoft 365</a></li>
                </ul>
           </div>
           {/* This div is visible only on small screens. */}
           <div className="cart-icon flex mx-4">
                <IconContext.Provider value={{size: 22}}>
                <Link to='/SignIn'><FaUserPlus /></Link>
                </IconContext.Provider>
           </div>
           <div className="nav-end-content">
               <ul>
                <li>
                    <a href="https://www.microsoft.com/en-in/microsoft-teams/download-app" style={{color : "#4b53bc"}}> 
                        Download Teams
                    </a>
                </li>
                <li>
                <Link to="/SignUp">
                    <button className="hero-sign-up-btn text-center text-sm font-semibold text-white p-1 px-2 hover:bg-indigo-800 ">
                        Sign up for free
                    </button>
                </Link>
                </li>
                <li><Link to='/SignIn'>Sign in</Link></li>
                <li>
                    <Link to='/SignIn'>
                        <div className="flex mx-4">
                            <IconContext.Provider value={{size: 22}}>
                                <FaUserPlus />
                            </IconContext.Provider>
                        </div>
                    </Link>
                </li>
               </ul>
           </div>
        </header>
    )
}

export default Header
