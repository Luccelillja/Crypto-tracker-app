import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Watchlist from "./components/Watchlist";
import CoinDetail from "./pages/CoinDetail";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <>
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          position: "fixed",
          top: "1rem",
          right: "1rem",
          zIndex: 999,
          background: "none",
          border: "1px solid #0ff",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          color: "var(--text)",
          cursor: "pointer",
          fontSize: "0.9rem",
          transition: "all 0.3s ease",
        }}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      <main className="main">
        <Routes>
          <Route path="/" element={<Watchlist />} />
          <Route path="/coin/:id" element={<CoinDetail />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

// import { Routes, Route } from "react-router-dom";
// import Watchlist from "./components/Watchlist";
// import CoinDetail from "./pages/CoinDetail";
// import "./App.css";

// function App() {
//   return (
//     <main className="main">
//       <Routes>
//         <Route path="/" element={<Watchlist />} />
//         <Route path="/coin/:id" element={<CoinDetail />} />
//       </Routes>
//     </main>
//   );
// }

// export default App;
