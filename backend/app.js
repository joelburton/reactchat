/** app for group chat */

const express = require("express");
const app = express();

// serve stuff in static/ folder

app.use(express.static("static/"));

/** Handle websocket chat */

// allow for app.ws routes for websocket routes
require("express-ws")(app);

const ChatUser = require("./chatuser");

/** Handle a persistent connection to /chat/[roomName]
 *
 * Note that this is only called *once* per client --- not every time
 * a particular websocket chat is sent.
 *
 * `ws` becomes the socket for the client; it is specific to that visitor.
 * The `ws.send` method is how we'll send messages back to that socket.
 */

app.ws("/chat", function (ws, req) {
  try {
    const user = new ChatUser(ws.send.bind(ws));

    // register handlers for message-received, connection-closed

    ws.on("message", function (data) {
      try {
        user.handleMessage(data);
      } catch (err) {
        console.error(err);
      }
    });

    ws.on("close", function () {
      try {
        user.handleClose();
      } catch (err) {
        console.error(err);
      }
    });
  } catch (err) {
    console.error(err);
  }
});


module.exports = app;
