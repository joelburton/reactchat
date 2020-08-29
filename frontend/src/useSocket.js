import { useEffect, useRef, useState, useCallback } from "react";

/** Handle backend communication:
 *
 * - creates websocket
 * - receives messages from backend and sends to parent
 * - returns dispatch function that parent can use to send to backend
 *
 * Props:
 * - notify(msg): call in parent to notify them of a message.
 */

const BASE_URL = process.env.REACT_APP_BASE_URL || "ws://localhost:3333";

function useSocket(notify) {
  // a ref is like state, except it doesn't trigger a re-render when changed.
  // we'll hold onto the handler for the persistent websocket connection.
  const socket = useRef();
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState(null);

  /** newSocket: attaches listeners to socket. */
  useEffect(function newSocket() {
    if (socket.current) return;

    socket.current = new WebSocket(`${BASE_URL}/chat/`);
    socket.current.onopen = () => setConnected(true);
    socket.current.onmessage = evt => notify(JSON.parse(evt.data));
    socket.current.onerror = evt => setError(`WS Fail: ${evt.target.url}`);
  }, [notify]);

  /** Deliver message to backend. */
  function dispatch(msg) {
    socket.current.send(JSON.stringify(msg));
  }

  // Returns a function which ChatApp will call to send a message via backend.
  return [connected, error, useCallback(dispatch, [socket])];
}


export default useSocket;