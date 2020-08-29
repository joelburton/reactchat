import React from 'react';

/** Show a message. */

function Message({type, text, name}) {
  function renderMessage() {
    switch (type) {
      case "chat": return <span><b>{name}</b>: {text}</span>
      case "note": return <i>{text}</i>
      default: return text
    }
  }

  return <div>{ renderMessage() }</div>;
}

export default Message;