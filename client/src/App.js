import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//Component imports
import SignIn from './components/AuthenticationPages/SignIn';
import SignUp from './components/AuthenticationPages/SignUp';
import BeforeLoginPage from './components/BeforeLoginPage';
import OnLoginActivityPage from './components/OnLoginActivityPage'
import OnLoginChatPage from './components/OnLoginChatPage'
import OnLoginCalendarPage from './components/OnLoginCalendarPage'
import OnLoginFilesPage from './components/OnLoginFilesPage';
import MeetPage from './components/MeetPage'
import SignOut from './components/OnLoginComponents/SignOut';

//StateContext import 
import { useStateValue } from './StateProvider';

function App() {
  //Keeps check of the user's authentication state and renders components accordingly
  const [{user}]= useStateValue(); 
  return (
    <div>
    <Router>
       <Switch>
       {
          !user? ( 
            <>
            <Route exact path="/" component={BeforeLoginPage}/>
            <Route exact path="/SignIn" component={SignIn}/>
            <Route exact path="/SignUp" component={SignUp}/>
            <Route path="/SignUp/:id" component={SignOut}/>
            </>
          ) : (
            <>
            <Route exact path="/" component={BeforeLoginPage}/>
            <Route exact path="/SignIn" component={SignIn}/>
            <Route exact path="/SignUp" component={SignUp}/>
            <Route exact path="/SignUp/activity/:id" component={OnLoginActivityPage}/>
            <Route exact path="/SignUp/chat/:id" component={OnLoginChatPage}/>
            <Route exact path="/SignUp/calendar/:id" component={OnLoginCalendarPage}/>
            <Route exact path="/SignUp/files/:id" component={OnLoginFilesPage} />
            <Route exact path="/meeting/:id" component={MeetPage} />
            </>
          )
       }
	    </Switch>
    </Router>
    </div>
  );
}

export default App;
