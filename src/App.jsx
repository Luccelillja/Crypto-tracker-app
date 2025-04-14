import { useState } from "react";
import "./App.css";
import Watchlist from "./components/Watchlist";

function App() {
  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "white" }}>
      <h1 style={{ textAlign: "center", paddingTop: "2rem" }}>
        🪙 Crypto Watchlist
      </h1>
      <Watchlist />
    </div>
  );
}

export default App;
