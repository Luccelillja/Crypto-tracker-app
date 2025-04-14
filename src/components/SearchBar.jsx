import { useEffect, useState } from "react";
import { searchCoins } from "../utils/api";
import styles from "../styles/SearchBar.module.css";

function SearchBar({ onAdd }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

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
    onAdd(coin.id);
    setQuery("");
    setResults([]);
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
              <img src={coin.thumb} alt={coin.name} />
              {coin.name} ({coin.symbol.toUpperCase()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
