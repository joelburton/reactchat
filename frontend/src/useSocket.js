import { useEffect, useState } from "react";

/** Handle backend communication:
 *
 * - creates websocket & sends join message on new room
 * - sends leaving message on room departure
 * - receives messages from backend and sends to parent
 * - returns deliver function that parent can use to send to backend
 */

const BASE_URL = process.env.REACT_APP_BASE_URL || "ws://localhost:3333";

function useSocket(room, name, addMessage) {
  const [socket, setSocket] = useState(null);
  const [connecting, setConnecting] = useState(true)

  /** joinRoom: creates new websocket, sends leave message on cleanup */
  useEffect(function joinRoom() {
    if (!room || !connecting) return;

    setSocket(new WebSocket(`${BASE_URL}/chat/${room}`));
    setConnecting(false);

    return function leaveRoom() {
      if (!socket || socket.readyState === 0) return;
      console.log(room, socket);
      socket.send(JSON.stringify({type: "note", text: `left ${room}`}));
    };
  }, [room, connecting, socket]);

  /** newSocket: attaches listeners to socket. */
  useEffect(function newSocket() {
    if (!socket) return;

    // handles socket opening by sending message to join room
    socket.onopen = function () {
      socket.send(JSON.stringify({type: "join", name }))
    };

    // handles reception of a message from the backend
    socket.onmessage = function (evt) {
      let newMessageFromBackend = JSON.parse(evt.data);
      console.info("new message", newMessageFromBackend);
      addMessage(newMessageFromBackend);
    };
  }, [socket, addMessage, name])

  /** Deliver message to backend. */
  function deliver(text, type="chat") {
    socket.send(JSON.stringify({ type, text }));
  }

  return deliver;
}


export default useSocket;