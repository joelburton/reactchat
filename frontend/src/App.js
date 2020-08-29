import React, { useState } from "react";
import './App.css';
import ChatApp from "./ChatApp.js";
import "bootstrap/dist/css/bootstrap.css";
import NameForm from "./NameForm";

/** Overall page: gathers a name then renders chat app. */

function App() {
  const [name, setName] = useState("");

  function acceptName({ name }) {
    setName(name);
  }

  return (
    <div className="App container">
      { !name
      ? <NameForm handleSave={acceptName} />
      : <ChatApp name={name} />}

    </div>
  );
}

export default App;
