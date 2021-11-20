import React from "react";
import firebase from "firebase/app";

const auth = firebase.auth();
const ChatMessage=(props)=>{
  const { text, uid, photoURL } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "right floated" : "";
  const labelmsgclass = uid === auth.currentUser.uid ? "right" : "left";
  // <div className={`message ${messageClass}`}></div>
  return (
    <>
      <div className="item">
        <img className={`ui avatar image ${messageClass}`} src={photoURL} alt={uid}/>
        <div className={`content ${messageClass}`}>
          <div
            className={`header ui ${labelmsgclass} pointing blue basic label`}
            style={{ display: "flex", alignItems: "center" }}
          >
            <p style={{ position: "relative" }}>{text}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChatMessage;