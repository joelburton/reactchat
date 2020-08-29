import { useEffect, useRef } from "react";

/** Handle backend communication:
 *
 * - creates websocket & sends join message on new room
 * - sends leaving message on room departure
 * - receives messages from backend and sends to parent
 * - returns deliver function that parent can use to send to backend
 */

const BASE_URL = process.env.REACT_APP_BASE_URL || "ws://localhost:3333";

function useSocket(room, name, addMessage) {
  const socket = useRef();
  // const [connected, setConnected] = useState(false)

  console.log("room=", room);

  /** joinRoom: creates new websocket, sends leave message on cleanup */
  useEffect(function joinRoom() {
    console.log("joinroom", room,  socket.current)
    console.log(room)
      socket.current = new WebSocket(`${BASE_URL}/chat/${room}`);

    return function leaveRoom() {
      socket.current.send(JSON.stringify({ type: "leave"  }));
      socket.current.close();
    };
  }, [room]);

  /** newSocket: attaches listeners to socket. */
  useEffect(function newSocket() {
    if (!socket.current) return;

    // handles socket opening by sending message to join room
    socket.current.onopen = function () {
      socket.current.send(JSON.stringify({type: "join", name }))
    };

    // handles reception of a message from the backend
    socket.current.onmessage = function (evt) {
      let newMessageFromBackend = JSON.parse(evt.data);
      console.info("new message", newMessageFromBackend);
      addMessage(newMessageFromBackend);
    };
  }, [socket, addMessage, name, room])

  /** Deliver message to backend. */
  function deliver(text, type="chat") {
    socket.current.send(JSON.stringify({ type, text }));
  }

  return deliver;
}


export default useSocket;