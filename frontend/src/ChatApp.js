import React, { useEffect, useState } from "react";
import MessageForm from "./MessageForm";
import MessagesList from "./MessagesList";
import RoomPicker from "./RoomPicker";
import useSocket from "./useSocket";

/** App: manage messages & room; show UI. */

function ChatApp({ name, rooms = ["Main", "Gossip", "Scandal"] }) {
  const [room, setRoom] = useState(rooms[0]);
  const [messages, setMessages] = useState([]);
  const [connected, error, dispatch] = useSocket(addMessage);

  /** Add a message from backend. */
  function addMessage(message) {
    setMessages(messages => [...messages, message]);
  }

  /** Process new message user just entered in form. */
  function userEnteredMessage({ message }) {
    dispatch({type: "chat", text: message});
  }

  /** joinRoom: join room, leave room on cleanup */
  useEffect(function joinRoom() {
    if (!connected) return;

    dispatch({type: "join", name, room });

    return function leaveRoom() {
      dispatch({type: "leave"})
    };
  }, [connected, room, name, dispatch]);

  if (error) return <b>Error: { error }</b>;

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