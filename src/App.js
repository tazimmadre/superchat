import React, { useRef, useState } from 'react';
import './App.css';

import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';

import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyCbQ8iRO-ydbUBATcq7Ej5L4TDEptqjgAU",
  authDomain: "superchat-22eaa.firebaseapp.com",
  databaseURL: "https://superchat-22eaa-default-rtdb.firebaseio.com",
  projectId: "superchat-22eaa",
  storageBucket: "superchat-22eaa.appspot.com",
  messagingSenderId: "619162059122",
  appId: "1:619162059122:web:5280d9512f56bc16089deb",
  measurementId: "G-6XKVE61VN3",
});


const auth = firebase.auth();
const firestore= firebase.firestore();
function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1><img src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png" width="100" height="100"/>Superchat</h1>
        <SignOut />
      </header>
      <section>{user ? <Chatroom /> : <Signin />}</section>
    </div>
  );
}
function Signin(){
  const signInWithGoogle=()=>{
    const provider= new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);

  }
  return (
    <>
    <button className="sign-in" onClick={signInWithGoogle}>
      SignIn
    </button>
    <br/>
    <p className="para">The app is in development!! 
          <br/>
        Be the first to test it.
    </p>
    </>
  );
}
function SignOut(){
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

function Chatroom(){

  const dummy= useRef();

  const messagesRef= firestore.collection('messages');
  const query= messagesRef.orderBy('createdAt').limit(25);
  const [messages]= useCollectionData(query,{idField:'id'});

  const [formValue, setFormValue]= useState('');

  const sendMessage= async(e)=>{
    e.preventDefault();
    
    const {uid,photoURL}= auth.currentUser;
      await messagesRef.add({
        text:formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
      photoURL
    });
  setFormValue('');
  dummy.current.scrollIntoView({behavior:'smooth'});
}
  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={dummy}></div>
      </main>

      <form className="form" onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
        />
        <button disabled={!formValue} type="submit">
        <img src="https://cdn-icons.flaticon.com/png/512/3682/premium/3682321.png?token=exp=1637130988~hmac=b8475d311f20bef8a8905ea3631598a2" width="70" height="100"/>
        </button>
      </form>
    </>
  );
}
function ChatMessage(props){
  const {text,uid,photoURL}= props.message;
  const messageClass= uid===auth.currentUser.uid?'sent':'recieved';

    return (
      <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL}/>
        <p>{text}</p>
      </div>
    </>
    )
    
  }
  
export default App;

