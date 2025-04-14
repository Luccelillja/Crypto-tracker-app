import { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import { fetchCoinData } from "../utils/api";
import styles from "../styles/Watchlist.module.css";

function Watchlist() {
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
    <div className={styles.container}>
      {coins.length > 0 ? (
        coins.map((coin) => (
          <CoinCard key={coin.id} coin={coin} onRemove={handleRemove} />
        ))
      ) : (
        <p className={styles.empty}>Your watchlist is empty.</p>
      )}
    </div>
  );
}

export default Watchlist;
