import {React} from 'react'
//Component imports
import OnLoginHeader from './OnLoginComponents/OnLoginHeader'
import OnLoginLeftSection from './OnLoginComponents/OnLoginLeftSection'
import OnloginMiddleSection from './OnLoginComponents/OnLoginMiddleSection'
import OnLoginRightSection from './OnLoginComponents/OnLoginRightSection'
//Icon imports
import {VscListFilter} from 'react-icons/vsc'
import {IoSettingsOutline} from 'react-icons/io5'

function OnLoginPage(){
    return (
        <div>
            <div>
                <OnLoginHeader />
                <div className="page-body flex flex-row justify-center" style={{height: "95vh",overflow: "hidden"}}>
                    <OnLoginLeftSection />
                    <OnloginMiddleSection title="Feed" Icons={[<VscListFilter/>,<IoSettingsOutline />]}/>
                    <OnLoginRightSection />
                </div>
            </div>
        </div>
    )
}

export default OnLoginPage
