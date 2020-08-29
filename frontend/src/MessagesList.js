import React from "react";
import Message from "./Message";

function MessagesList({ messages }) {
  return (
      messages.map(({ type, text, name }, idx) =>
          <Message key={idx} name={name} type={type} text={text} />)
  );
}

export default MessagesList;