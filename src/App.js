import React, { useRef, useEffect, useState } from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

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
const firestore = firebase.firestore();
function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="ui clearing segment">
      <div
        className="ui left floated"
        style={{
          marginTop: "10px",
          marginLeft: "10px",
          position: "fixed",
          zIndex: "100",
          background: "white",
          borderRadius: "10px",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/1041/1041916.png"
          width="55px"
          height="55px"
        />
        <p style={{ fontSize: "30px", fontWeight: "900" }}>Superchat</p>
        <div className="ui right floated">
        <SignOut />
        </div>
      </div>
      <div className="ui container">{user ? <Chatroom /> : <Signin />}</div>
    </div>
  );
}
function Signin() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <>
    <div style={{width:'200px',height:'200px'}}>

    </div>
      <div className="ui placeholder segment">
        <div className="ui centered header">
          The app is in development!!
          <br />
          Be the first to test it.
        </div>
        <button className="ui google plus button " onClick={signInWithGoogle}>
          <i class="google icon"></i>
          SignIn
        </button>
      </div>
    </>
  );
}
function SignOut() {
  return (
    auth.currentUser && (
        <button
          style={{ marginBottom: "2px" }}
          className="ui google plus button "
          onClick={() => auth.signOut()}
        >
          <i class="sign-out icon"></i>SignOut
        </button>
    )
  );
}

function Chatroom() {
  const messagesEndRef = useRef(null);

  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });
    setFormValue("");
  };
  return (
    <>
      <main className="ui list">
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={messagesEndRef} />
      </main>

      <form className="ui fluid action input" style={{height:'65px'}} onSubmit={sendMessage}>
        <input
          className="ui input"
          placeholder="Start Typing..."
          value={formValue}
          onChange={(e) => {
            setFormValue(e.target.value);
          }}
        />
        <button className="ui button" disabled={!formValue} type="submit">
          <img
            src="https://cdn.pixabay.com/photo/2018/02/04/01/54/paper-planes-3128885_1280.png"
            width="50px"
            height="50px"
            style={{borderRadius:'0'}}
          />
        </button>
      </form>
    </>
  );
}
function ChatMessage(props) {
  const { text, uid, photoURL,createdAt } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "right floated" : "";
  const labelmsgclass = uid === auth.currentUser.uid ? "right" : "left";
  // <div className={`message ${messageClass}`}></div>

function getTimeFromDate(timestamp) {
  var s = new Date(timestamp*1000).toLocaleTimeString("en-US");
  return s;
}
  return (
    <>
      <div className="item">
        <img className={`ui avatar image ${messageClass}`} src={photoURL} />
        <div className={`content ${messageClass}`}>
          <div
            className={`header ui ${labelmsgclass} pointing blue basic label`}
          >
            <p style={{ position: "relative" }}>{text}</p>
          </div>
          <div className={`ui description ${messageClass}`}>
            <p style={{color:'grey',opacity:'0.5',fontSize:'12px'}}>{createdAt?getTimeFromDate(JSON.stringify(createdAt.seconds)):''}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
