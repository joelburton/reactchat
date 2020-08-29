import { useEffect, useRef, useState } from "react";

/** Handle backend communication:
 *
 * - creates websocket & sends join message on new room
 * - sends leaving message on room departure
 * - receives messages from backend and sends to parent
 * - returns deliver function that parent can use to send to backend
 */

const BASE_URL = process.env.REACT_APP_BASE_URL || "ws://localhost:3333";

function useSocket(room, name, addMessage) {
  // a ref is like state, except it doesn't trigger a re-render when changed.
  // we'll hold onto the handler for the persistent websocket connection.
  const socket = useRef();
  const [connected, setConnected] = useState(false);

  /** newSocket: attaches listeners to socket. */
  useEffect(function newSocket() {
    if (socket.current) return;

    socket.current = new WebSocket(`${BASE_URL}/chat/`);
    socket.current.onopen = evt => setConnected(true);
    socket.current.onmessage = evt => addMessage(JSON.parse(evt.data));
  }, [addMessage]);

  /** joinRoom: join room, leave room on cleanup */
  useEffect(function joinRoom() {
    if (!room || !connected) return;

    socket.current.send(JSON.stringify({ type: "join", name, room }));

    return function leaveRoom() {
      socket.current.send(JSON.stringify({ type: "leave" }));
    };
  }, [connected, room, name]);

  /** Deliver message to backend. */
  function deliver(text, type = "chat") {
    socket.current.send(JSON.stringify({ type, text }));
  }

  // Returns a function which ChatApp will call to send a message via backend.
  return deliver;
}


export default useSocket;