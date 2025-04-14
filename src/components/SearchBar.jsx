// import { useEffect, useState } from "react";
// import { searchCoins } from "../utils/api";
// import styles from "../styles/SearchBar.module.css";
// import { useNavigate } from "react-router-dom";

// function SearchBar({ onAdd }) {
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const navigate = useNavigate();
//   const [timeoutId, setTimeoutId] = useState(null);

//   // Debounced search
//   useEffect(() => {
//     if (query.trim() === "") {
//       setResults([]);
//       return;
//     }

//     if (timeoutId) clearTimeout(timeoutId);

//     const newTimeout = setTimeout(() => {
//       searchCoins(query)
//         .then(setResults)
//         .catch(() => setResults([]));
//     }, 300);

//     setTimeoutId(newTimeout);
//   }, [query]);

//   // When user selects a coin
//   const handleSelect = (coin) => {
//     setQuery("");
//     setResults([]);

//     // If parent passed onAdd, use it (e.g. from watchlist page)
//     if (onAdd) {
//       onAdd(coin.id);
//     } else {
//       // Otherwise just navigate to detail page
//       navigate(`/coin/${coin.id}`);
//     }
//   };

//   return (
//     <div className={styles.searchbar}>
//       <input
//         type="text"
//         placeholder="Search a coin..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       {results.length > 0 && (
//         <ul className={styles.results}>
//           {results.slice(0, 5).map((coin) => (
//             <li key={coin.id} onClick={() => handleSelect(coin)}>
//               <img src={coin.thumb} alt={coin.name} className={styles.icon} />
//               <div className={styles.info}>
//                 <span className={styles.name}>
//                   {coin.name}{" "}
//                   <span className={styles.symbol}>
//                     ({coin.symbol.toUpperCase()})
//                   </span>
//                 </span>
//                 <span className={styles.meta}>
//                   Rank #{coin.market_cap_rank || "–"}
//                 </span>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default SearchBar;
import { useEffect, useState } from "react";
import { searchCoins } from "../utils/api";
import styles from "../styles/SearchBar.module.css";
import { useNavigate } from "react-router-dom";

function SearchBar({ onAdd }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    if (timeoutId) clearTimeout(timeoutId);

    const newTimeout = setTimeout(() => {
      searchCoins(query)
        .then(setResults)
        .catch(() => setResults([]));
    }, 300);

    setTimeoutId(newTimeout);
  }, [query]);

  const handleSelect = (coin) => {
    setQuery("");
    setResults([]);

    if (onAdd) {
      onAdd(coin.id);
    } else {
      navigate(`/coin/${coin.id}`);
    }
  };

  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        placeholder="Search a coin..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {results.length > 0 && (
        <ul className={styles.results}>
          {results.slice(0, 5).map((coin) => (
            <li key={coin.id} onClick={() => handleSelect(coin)}>
              <img src={coin.thumb} alt={coin.name} className={styles.icon} />
              <div className={styles.info}>
                <span className={styles.name}>
                  {coin.name}
                  <span className={styles.symbol}>
                    {" "}
                    ({coin.symbol.toUpperCase()})
                  </span>
                </span>
                <span className={styles.meta}>
                  Rank #{coin.market_cap_rank || "—"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
