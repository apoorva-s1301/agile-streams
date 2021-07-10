import {React} from 'react'
//Component imports
import OnLoginHeader from './OnLoginComponents/OnLoginHeader'
import OnLoginLeftSection from './OnLoginComponents/OnLoginLeftSection'
import OnloginMiddleSection from './OnLoginComponents/OnLoginMiddleSection'
import OnLoginRightSection from './OnLoginComponents/OnLoginRightSection'


function OnLoginFilesPage() {
    return (
        <div>
            <div>
                <OnLoginHeader />
                <div className="page-body flex flex-row justify-center" style={{height: "95vh",overflow: "hidden"}}>
                    <OnLoginLeftSection />
                    <OnloginMiddleSection title="Files" Icons={[]}/>
                    <OnLoginRightSection />
                </div>
            </div>
        </div>
    )
}

export default OnLoginFilesPage
