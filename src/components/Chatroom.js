import React,{useRef,useEffect,useState} from "react";
import ChatMessage from "./Chatmessage";

import firebase from "firebase/app";
import "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";

const auth = firebase.auth();     
const Chatroom = () => {
      const firestore = firebase.firestore();
      const messagesEndRef = useRef(null);

    const messagesRef = firestore.collection("messages");
    const query = messagesRef.orderBy("createdAt").limit(25);
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

        <form className="ui fluid action input" onSubmit={sendMessage}>
          <input
            placeholder="Start Typing..."
            value={formValue}
            onChange={(e) => {
              setFormValue(e.target.value);
            }}
          />
          <button disabled={!formValue} type="submit">
            <img src="https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-send-user-interface-kmg-design-flat-kmg-design.png" alt="send"/>
          </button>
        </form>
      </>
    );
  
};

export default Chatroom;
