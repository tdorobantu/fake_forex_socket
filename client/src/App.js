import "./App.css";
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:8001";

function App() {
  // Modify server.js for other currency pairs
  const allFX = [
    "EUR/RON",
    "RON/EUR",
    "EUR/USD",
    "USD/EUR",
    "GBP/EUR",
    "EUR/GBP",
  ];

  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    // Change event to get other currency data
    socket.on("RON/EUR", (data) => {
      setResponse(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div className="App">
      <p>{JSON.stringify(response)}</p>
    </div>
  );
}

export default App;
