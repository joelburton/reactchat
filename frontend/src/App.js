import React, { useState } from "react";
import './App.css';
import ChatApp from "./ChatApp.js";
import "bootstrap/dist/css/bootstrap.css";
import UsernameForm from "./UsernameForm";

function App() {
  const [username, setUsername] = useState("");

  function acceptUsername({ username }) {
    setUsername(username);
  }

  return (
    <div className="App container">
      { !username
      ? <UsernameForm handleSave={acceptUsername} />
      : <ChatApp username={username} />}

    </div>
  );
}

export default App;
