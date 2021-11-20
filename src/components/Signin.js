import React from "react";
import "firebase/auth";
import firebase from "../firebase";
const auth = firebase.auth();
const Signin = () => {
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
};

export default Signin;
