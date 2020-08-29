/** Functionality related to chatting. */

// Room is an abstraction of a chat channel
const Room = require("./room");

/** ChatUser is a individual connection from client -> server to chat. */

class ChatUser {
  /** Make chat user: store connection-device, room.
   *
   * @param send {function} callback to send message to this user
   * */

  constructor(send) {
    this._send = send; // "send" function for this user
    this.room = null; // room user will be in
    this.name = null; // becomes the username of the visitor
  }

  /** Send msgs to this client using underlying connection-send-function.
   *
   * @param data {string} message to send
   * */

  send(data) {
    try {
      this._send(data);
    } catch {
      // If trying to send to a user fails, ignore it
    }
  }

  /** Handle leave: announce join. */

  handleLeave() {
    this.room.broadcast({
      type: "note",
      name: this.name,
      text: `left "${this.room.name}".`,
    });
    this.room.leave(this);
  }

  /** Handle joining: add to room members, announce join.
   *
   * @param name {string} name to use in room
   * @param room {string} room user is joining
   * */

  handleJoin(name, room) {
    this.name = name;
    this.room = Room.get(room);
    this.room.join(this);
    this.room.broadcast({
      type: "note",
      name: this.name,
      text: `joined "${this.room.name}".`,
    });
  }

  /** Handle a chat: broadcast to room.
   *
   * @param text {string} message to send
   * */

  handleChat(text) {
    this.room.broadcast({
      name: this.name,
      type: "chat",
      text: text,
    });
  }

  /** Handle messages from client:
   *
   * @param jsonData {string} raw message data
   *
   * @example<code>
   * - {type: "join", name: username} : join
   * - {type: "chat", text: msg }     : chat
   * </code>
   */

  handleMessage(jsonData) {
    let msg = JSON.parse(jsonData);

    if (msg.type === "join") this.handleJoin(msg.name, msg.room);
    else if (msg.type === "leave") this.handleLeave();
    else if (msg.type === "chat") this.handleChat(msg.text);
    else throw new Error(`bad message: ${msg.type}`);
  }

  /** Connection was closed: leave room, announce exit to others. */

  handleClose() {
    if (this.room) {
      this.room.leave(this);
      this.room.broadcast({
        type: "note",
        text: `${this.name} left ${this.room.name}.`,
      });
    }
  }
}

module.exports = ChatUser;
