# Agile Streams : Microsoft Teams Clone

### Agile Streams is a cloned collaborative web application having subset features of Microsoft Teams. It has been built as the solution to Microsoft Engage Challenge 2021.

<img width="1432" alt="Screenshot 2021-07-09 at 7 26 00 PM" src="https://user-images.githubusercontent.com/75029142/125091312-eb086900-e0ed-11eb-9b7b-3f05d7152a36.png">

### 🚩 CAUTION 
Make sure that your system doesn’t have a VPN or Firewall enabled before making a video call because the project uses only STUN servers as of now and not TURN servers. STUN and TURN are WebRTC signaling servers used to create peer-to-peer (P2P) connection when we are building a real-time communication application.


### 📌 Table of Contents
* [Features](#features)
* [Tech Stack Used/ Dependencies](#tech-stack)
* [Getting Started/ Setup](#getting-started)
* [Usage Guide/ Application flow](#usage)
* [Hosting](#hosting)
* [Challenges faced and learnings](#challenges)
* [Future Scope/ What's next?](#scope)
* [Resources](#resources)
* [Bug Reporting](#bug)
* [Feature Requests](#feature-request)
* [License](#license)


<a id="features"></a>
## 🚀 Features
- Actionable and simple UI (Almost similar to the original Microsoft Teams UI). 
- Signing Up using basic email/password method.
- Signing In using email/password method alongside other authentication options such as Google, Github and Twitter.
- Ability to create realtime public chat groups similar to the ones on Slack and Discord.
- Indulging in one-on-one chatting or joining the public chat groups mentioned above.
- Have peer to peer video conversations by simply sharing a unique meeting code.
- Mute/Unmute audio.
- Disable/Enable video.
- Chatting before, during and after video conversations independently.
- Embed outlook calendar as the admin and display events to all users of the application.
- Upload and download files from cloud storage.
- [Add more features](#feature-request)...


<a id="tech-stack"></a>
## 💻 Tech Stack Used/ Dependencies

<img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/><img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/><img alt="Firebase" src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase"/><img alt="Material UI" src="https://img.shields.io/badge/materialui-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white"/><img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/><img alt="Visual Studio Code" src="https://img.shields.io/badge/VisualStudioCode-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white"/><img alt="Git" src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white"/>

***React*** : Front-end JavaScript library for building user interfaces or UI components.

***React Router Dom*** : Responsibile for rendering UI components according to the URL paths.

***Express*** : Back end web application framework for Node.js (a JavaScript runtime environment).

***Firebase*** : Google-backed application development software. Specifically used here for user authentication and storage(Firestore Database+Storage) of chats, files, etc. 

***Simple Peer*** : Node.js style API for WebRTC, used for developing video and data channels.

***Socket.IO*** : JavaScript library to enable realtime, bi-directional communication between web client and server. 

***Material UI*** : Design language developed by Google which lets developers incorporate pre-built react components. Specifically used here only for designing the video chat and "Add files" modal.

***Tailwind CSS*** : A utility-first CSS framework for rapidly building custom user interfaces. Used by adding the required styles as classes.

***CORS*** : A HTTP-header based mechanism that allows a server to indicate any other origins (domain, scheme, or port) than its own from which a browser should permit loading of resources. Used here for communicating between server and client side hosted on Heroku and Netlify respectively.

***Others*** : React icons and react-copy-to-clipboard.


<a id="getting-started"></a>
## 📦 Getting Started/ Setup

1. Clone this repository.

```javascript
  git clone https://github.com/apoorva-s1301/agile-streams.git
```  

2. Head over to client directory and install dependencies by running the following in terminal.

```javascript
  cd client
  npm install
```

3. Head over to server directory and install dependencies by running the following in terminal.

```javascript
  cd server
  npm install
```

4. Follow the directory flow client --> src --> firebase.js and add your own Firebase configuration object (after taking necessary project setup steps on Firebase).
  
  ```javascript
    //Configure firebase here
    const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };
  ```
  
5. Follow the directory flow client --> src --> components --> MeetPage.jsx
   - Comment the line : 
    ```javascript
      socket = io.connect('https://engage-ms-teams-clone.herokuapp.com/')
    ```
   - Uncomment the line(To connect to local backend server) : 
   ```javascript
      socket = io.connect('http://localhost:5000')
   ``` 

6. OPTIONAL : Follow the directory flow client --> src --> components --> OnLoginCalendarPage.jsx. Embed your own Outlook calendar by replacing the iframe source.

  ```javascript
    <iframe title="calendar" 
         src="Add your calendar's source here" 
         style={{width:"100%", height:"100%",padding:"1rem"}} >
    </iframe>
  ```
      
7. In both the directories (client and server), run the following to run server and client sides separately in your browser.

```javascript
  npm start
```

8. Client-side will run on `http://localhost:3000` and the server-side will run on `http://localhost:5000`

<a id="usage"></a>
## 📖 Usage guide/ Application flow

Visit the hosted web application at https://engage-ms-teams-clone.netlify.app/

Test email: `test@sample.microsoft.com`

Test password: `1234testsample#`

### Landing Page 
Continue Signing Up/In by clicking the highlighted buttons.

All links except those of Sign In and Sign Up lead to the original Microsoft Teams website (these have been added just for information purposes, no copyright infringement is intended).

<img width="1432" alt="Screenshot 2021-07-09 at 7 26 00 PM 2 2" src="https://user-images.githubusercontent.com/75029142/125098738-ec895f80-e0f4-11eb-82e3-8a659a3aa4d3.png">

### Sign Up Component
Enter all the required fields for successful sign up. Make sure the password strength is strong.

<img width="1436" alt="Screenshot 2021-07-09 at 8 38 56 PM" src="https://user-images.githubusercontent.com/75029142/125100202-74239e00-e0f6-11eb-87f8-59cba940f842.png">

The following message gets displayed on successful sign up. You can directly head over to the sign in page from here or go back to the landing page to find the sign in button.

<img width="442" alt="Screenshot 2021-07-09 at 8 40 00 PM" src="https://user-images.githubusercontent.com/75029142/125100936-45f28e00-e0f7-11eb-969d-ec0adf8cddf3.png">

In case of an error, the following message would show up.

<img width="443" alt="Screenshot 2021-07-09 at 8 40 59 PM" src="https://user-images.githubusercontent.com/75029142/125100941-4723bb00-e0f7-11eb-8475-1353dc435811.png">

### Sign In Component
You can either sign in using the email/password you used to sign yourself up previously or you can click the other options bar to authenticate yourself using Google/Github/Twitter.

<img width="1440" alt="Screenshot 2021-07-09 at 8 51 38 PM" src="https://user-images.githubusercontent.com/75029142/125102151-9f0ef180-e0f8-11eb-9f07-184d575bfb45.png">

<img width="1440" alt="Screenshot 2021-07-09 at 8 52 17 PM" src="https://user-images.githubusercontent.com/75029142/125102157-a0401e80-e0f8-11eb-94ca-7b051c35f282.png">

After entering your email/password, pressing continue and a successfull sign in, you will be directed to the Streams app.
Else an error can through up, similar to the sign up error show earlier.

In case you use other sign in options, you will have a pop up/redirect window to sign in using whichever method you chose.
If successful, you will see a continue button as below, click on it to be directed to the Streams app.

<img width="439" alt="Screenshot 2021-07-09 at 8 52 32 PM" src="https://user-images.githubusercontent.com/75029142/125102871-5efc3e80-e0f9-11eb-8807-74d838a13f77.png">

### Post-SignIn Dashboard
The default dashboard appears as follows.

<img width="1440" alt="Screenshot 2021-07-09 at 9 13 30 PM" src="https://user-images.githubusercontent.com/75029142/125107106-0b402400-e0fe-11eb-8ae9-60ed3b078314.png">

Avatar Drop-Down 

Your avatar/Profile picture, user name, email and availability status are visible here. You can also sign out of the dashboard from here.

<img width="373" alt="Screenshot 2021-07-09 at 9 13 55 PM" src="https://user-images.githubusercontent.com/75029142/125107335-565a3700-e0fe-11eb-8ac8-12363a1babee.png">

### Chatting Tab

<img width="1440" alt="Screenshot 2021-07-09 at 10 52 53 PM" src="https://user-images.githubusercontent.com/75029142/125115477-ffa62a80-e108-11eb-8091-82333e0cd942.png">

Chats display as follows :

<img width="1440" alt="Screenshot 2021-07-09 at 9 18 59 PM" src="https://user-images.githubusercontent.com/75029142/125111067-0e89de80-e103-11eb-9171-53f5b742bafe.png">

Video call component :

<img width="1440" alt="Screenshot 2021-07-09 at 11 15 12 PM" src="https://user-images.githubusercontent.com/75029142/125119436-bd7fe780-e10e-11eb-8191-e4389f1a4503.png">

### Calendar Tab

The admin's calendar is displayed here. The admin can add events to this calendar using their Outlook account and these events will be visible to all the application users.

<img width="1440" alt="Screenshot 2021-07-09 at 9 19 41 PM" src="https://user-images.githubusercontent.com/75029142/125116571-890a2c80-e10a-11eb-98a7-9cbe5105c340.png">

### Files Tab

Upload files by clicking on the "Add files" button. The files would be displayed is the recent section. Clicking on a file in the recent section opens a new tab from where you can download the same file.

<img width="1440" alt="Screenshot 2021-07-10 at 4 19 43 AM" src="https://user-images.githubusercontent.com/75029142/125160509-eea5f980-e19a-11eb-8a52-6b0215be07e3.png">

### Sign Out Component

Signing out using the avatar dropdown will redirect you to the following component.

<img width="1440" alt="Screenshot 2021-07-09 at 9 20 05 PM" src="https://user-images.githubusercontent.com/75029142/125115778-6d525680-e109-11eb-8efa-6692b6674a25.png">

<a id="hosting"></a>
## ✅ Hosting 

- Frontend is hosted at https://engage-ms-teams-clone.netlify.app/
- Backend server is hosted at https://engage-ms-teams-clone.herokuapp.com/

To host the server on Heroku :

1. Sign up/Log in to Heroku.
2. Create a new app from the dashboard.
3. Install the Heroku CLI if you don't have it already and log into your account using the CLI.
4. Create a local git repository of this project and make a remote repository for Heroku.
5. Commit your code to the repo if not already done.(Make sure a Procfile of the server's entry point is present)
6. Push changes to the Heroku remote repository.
7. Server will be successfully deployed to Heroku.

To host the react app's frontend on Netlify :

1. Create an optimised production build by running the following command in terminal.
```javascript
  cd client
  npm run build
```
2. Sign up/Log in to Netlify.
3. Go to the sites section.
4. Drag and drop the build folder here.
5. Go to site settings and make necessary changes.
6. Frontend will be successfully deployed to Netlify.

For more information refer to the [guides](#resources).

<a id="challenges"></a>
## 💡 Challenges faced and learnings

- Had very basic knowledge of React before the Microsoft Engage Program's qualification announcement. Spent about 168hrs learning the new concepts attached to React and then began the design-build process of this project.
- For my love of frontend styling, I took up the challenge of cloning the original Team's UI delicately. Improved my CSS skills vastly by practising them here.
- Never implemented user authentication before. Understood how to register apps on Github and Twitter and make use of their API's for user authentication.
- Got my Twitter application (used for authentication) suspended twice, due to it mistakenly being caught up in automated abusive API disabling spam groups. Had to raise support tickets to get the app re-enabled, despite no API violations from my end.
- Never incorporated a realtime database storage like Firebase to my projects before. Comprehensively read through the cloud firestore documentation and grasped the concepts within a day's time.
- Came across a memory-leak bug while building a socket connection from client side to server side. Couldn't get my doubt resolved even from Stack Overflow. Took me about one week to resolve it by thorough researching of the hints provided by my mentor. Saved my project from getting disqualified because this bug was a barrier in implementing the minimum requirement feature of the Engage'21 Challenge.
- Deployed a full stack app with frontend, backend and database for the first time. Struggled through it but documentations and tutorials came to the rescue as always. 
- Learnt about Cross-Origin Resource Sharing (CORS) and proxies.


<a id="scope"></a>
## 🚧 Future Scope/ What's next?

- [ ] Dark theme toggler.
- [ ] Password resetting and email verification on sign up.
- [ ] Voice calling feature.
- [ ] Group video chat facility.
- [ ] Call recording feature.
- [ ] Speech to text captioning during video calls.
- [ ] Collaborative text editing and whiteboard.
- [ ] Custom, user maintained and inbuilt calendar instead of the iframe.
- [ ] Multiple and simultaneous login from different accounts of the same user.

<a id="resources"></a>
## 📚 Resources

- [Microsoft Teams Developer Documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/)
- [React Router Dom Guide](https://reactrouter.com/web/guides/quick-start)
- [Tailwind CSS Cheat Sheet](https://nerdcave.com/tailwind-cheat-sheet)
- [React Icons Documentation/Guide](https://react-icons.github.io/react-icons/)
- [Cloud Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Simple-Peer Documentation](https://github.com/feross/simple-peer)
- [Socket.io Tutorial](https://www.youtube.com/watch?v=ZKEqqIO7n-k)
- [Heroku Documentation](https://devcenter.heroku.com/categories/reference)
- [Netlify Docs](https://docs.netlify.com/)

<a id="bug"></a>
## 🐛 Bug Reporting
Feel free to [open an issue](https://github.com/apoorva-s1301/agile-streams/issues) on GitHub if you find bugs.

<a id="feature-request"></a>
## ⭐ Feature Request
- Feel free to [open an issue](https://github.com/apoorva-s1301/agile-streams/issues) on GitHub to add any additional features you feel could enhance this project.  
- You can also discuss and provide suggestions to me on [LinkedIn](https://www.linkedin.com/in/apoorva-singh-130/).

<a id="license"></a>
## 📜 License
This software is open source, licensed under the [MIT License]().
