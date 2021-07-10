import {React} from 'react'
import OnLoginHeader from './OnLoginComponents/OnLoginHeader'
import OnLoginLeftSection from './OnLoginComponents/OnLoginLeftSection'

function OnLoginPage(){
    return (
        <div>
            <div>
                <OnLoginHeader />
                <div className="page-body flex flex-row justify-center"
                    style={{height: "95vh",overflow: "hidden",backgroundColor:"#f3f2f1"}}>
                    <OnLoginLeftSection />
                    {/* If you are the admin of the app, you can embed your own outlook calendar by changing the source.
                    The events entered by the admin will hence be visible to all the users of the app. */}
                    <iframe title="calendar" 
                        src="https://outlook.live.com/owa/calendar/00000000-0000-0000-0000-000000000000/fc4c8c3b-780a-448d-88ed-a6cca380bbf8/cid-50531461E2F10729/index.html" 
                        style={{width:"100%", height:"100%",padding:"1rem"}} >
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default OnLoginPage
