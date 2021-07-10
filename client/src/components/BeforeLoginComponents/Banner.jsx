import React from 'react'
import './heroandbanner.css'

function Banner() {
    return (
        <div className="banner flex flex-col items-center justify-center py-3 px-9 lg:flex-row">
            <div className="inline-block text-center mx-3">
                <p>Now use Agile Streams with family and friends to call, chat, and make plans.</p>
            </div>
            <div className="inline-block mx-3 font-normal">
                <a href="https://www.microsoft.com/en-in/microsoft-teams/teams-for-home?utm_campaign=Collab&utm_source=WebBanner&utm_term=TFL&ocid=OO_TEAMS_CONS_MLGTM_FM_TeamsWebBanners_teams-banners">
                    {"Learn More >"}
                </a>
            </div>
        </div>
    )
}

export default Banner
