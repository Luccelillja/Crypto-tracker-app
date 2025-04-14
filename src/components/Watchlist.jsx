import { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import { fetchCoinData } from "../utils/api";
import styles from "../styles/Watchlist.module.css";
import SearchBar from "./SearchBar";

function Watchlist() {
  const [message, setMessage] = useState("");

  const [watchlist, setWatchlist] = useState(() => {
    // Get saved list from localStorage or default
    return (
      JSON.parse(localStorage.getItem("watchlist")) || ["bitcoin", "ethereum"]
    );
  });

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (watchlist.length === 0) {
      setCoins([]);
      return;
    }

    fetchCoinData(watchlist.join(",")).then(setCoins);
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  const handleRemove = (id) => {
    setWatchlist((prev) => prev.filter((coinId) => coinId !== id));
  };

  return (
    <>
      <SearchBar
        onAdd={(id) => {
          if (watchlist.includes(id)) {
            setMessage("⚠️ Coin is already in your watchlist!");
            setTimeout(() => setMessage(""), 2000);
          } else {
            setWatchlist((prev) => [...prev, id]);
          }
        }}
      />
      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.container}>
        {coins.length > 0 ? (
          coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} onRemove={handleRemove} />
          ))
        ) : (
          <p className={styles.empty}>Your watchlist is empty.</p>
        )}
      </div>
    </>
  );
}

export default Watchlist;
