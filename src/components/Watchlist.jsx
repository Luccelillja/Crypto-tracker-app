import { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import SearchBar from "./SearchBar";
import { fetchCoinData } from "../utils/api";
import styles from "../styles/Watchlist.module.css";

function Watchlist() {
  const [watchlist, setWatchlist] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("watchlist")) || ["bitcoin", "ethereum"]
    );
  });

  const [coins, setCoins] = useState([]);
  const [message, setMessage] = useState("");

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

  const handleAdd = (coinId) => {
    if (watchlist.includes(coinId)) {
      setMessage("⚠️ Already in watchlist");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setWatchlist((prev) => [...prev, coinId]);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1>Crypto Watchlist</h1>
        <p>Track your favorite coins in style</p>
      </div>

      <div className={styles.searchWrapper}>
        <SearchBar onAdd={handleAdd} />
      </div>

      {message && <p className={styles.message}>{message}</p>}

      <div className={styles.coins}>
        {coins.length > 0 ? (
          coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} onRemove={handleRemove} />
          ))
        ) : (
          <p className={styles.empty}>Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
