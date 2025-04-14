import { Routes, Route } from "react-router-dom";
import Watchlist from "./components/Watchlist";
import CoinDetail from "./pages/CoinDetail";

function App() {
  return (
    <main style={{ maxWidth: "600px", margin: "0 auto", padding: "2rem 1rem" }}>
      <Routes>
        <Route path="/" element={<Watchlist />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </main>
  );
}

export default App;
// import { useState } from "react";
// import "./App.css";
// import Watchlist from "./components/Watchlist";

// function App() {
//   return (
//     <div style={{ background: "#111", minHeight: "100vh", color: "white" }}>
//       <h1 style={{ textAlign: "center", paddingTop: "2rem" }}>
//         🪙 Crypto Watchlist
//       </h1>
//       <Watchlist />
//     </div>
//   );
// }

// export default App;
