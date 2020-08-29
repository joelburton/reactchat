import React, { useState } from "react";
import MessageForm from "./MessageForm";
import MessagesList from "./MessagesList";
import RoomPicker from "./RoomPicker";
import useSocket from "./useSocket";

/** App: manage messages & room; show UI. */

function ChatApp({ username, rooms = ["Main", "Gossip", "Scandal"] }) {
  const [room, setRoom] = useState(rooms[0]);
  const [messages, setMessages] = useState([]);
  const deliver = useSocket(room, username, addMessage);

  /** Add a message from backend. */
  function addMessage(message) {
    setMessages(messages => [...messages, message]);
  }

  /** Process new message user just entered in form. */
  function userEnteredMessage({ message }) {
    deliver(message);
  }

  return (
      <main className="vh-100 d-flex flex-column">

        <section>
          <RoomPicker handleSave={setRoom} rooms={rooms} room={room} />
        </section>

        <section className="flex-grow-1">
          <MessagesList messages={messages} />
        </section>

        <section>
          <MessageForm handleSave={userEnteredMessage} />
        </section>

      </main>
  );
}


export default ChatApp;