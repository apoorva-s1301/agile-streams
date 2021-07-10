import React from 'react'
import {Link} from 'react-router-dom'
import heroimg from '../../images/heroimg.jpeg'
import './heroandbanner.css'

function hero() {
    return (
        <section className="hero flex flex-col items-center lg:flex-row bg-gray-100">
            <div className="lg:w-2/4">
                <div className="text-center lg:text-left p-1 py-10">
                    <h1 className="hero-title font-semibold md:font-black text-4xl md:text-5xl py-1 px-24">Agile Streams</h1>
                    <p className="font-normal text-2xl md:text-4xl py-1 px-24">Meet, chat, call, and collaborate in just one place.</p>
                    <div className="px-24">
                        <div className="inline-block py-3 sm:mr-6">
                                <Link to='/SignUp'>
                                    <button className="hero-sign-up-btn text-center text-base font-semibold text-white p-2 px-11 mt-3 hover:bg-indigo-800">
                                        Sign up for free
                                    </button>
                                </Link>
                        </div>
                        <div className="inline-block py-3">
                            <Link to='/SignIn'>
                                <button className="hero-sign-in-btn text-center text-base font-semibold p-2 px-20 mt-3">
                                    Sign in
                                </button>
                            </Link>
                        </div>
                        <div className="py-4">
                            <a className="hero-pricing-txt font-semibold md:font-black text-base" 
                                href="https://www.microsoft.com/en-in/microsoft-teams/compare-microsoft-teams-options">
                                {"See plans and pricing >"}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="lg:w-2/4">
                <img className="hero-img" src={heroimg} alt="hero"/>
            </div>
        </section>
    )
}

export default hero
