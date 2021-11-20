import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
const auth = firebase.auth();
const SignOut = () => {
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
  };

export default SignOut;
