import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/CoinDetail.module.css";
import TradingViewWidget from "../components/TradingViewWidget";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchCoinDetail } from "../utils/api";

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [chartSize, setChartSize] = useState({ width: 1000, height: 700 });
  const [watchlist, setWatchlist] = useState(() => {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
  });

  const isInWatchlist = watchlist.includes(id);

  const handleAddToWatchlist = () => {
    if (!isInWatchlist) {
      const updated = [...watchlist, id];
      setWatchlist(updated);
      localStorage.setItem("watchlist", JSON.stringify(updated));
    }
  };
  useEffect(() => {
    fetchCoinDetail(id).then(setCoin);
  }, [id]);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => res.json())
      .then(setCoin);
  }, [id]);

  useEffect(() => {
    const updateChartSize = () => {
      if (window.innerWidth < 768) {
        setChartSize({ width: 360, height: 400 });
      } else if (window.innerWidth < 1024) {
        setChartSize({ width: 600, height: 500 });
      } else {
        setChartSize({ width: 1000, height: 700 });
      }
    };

    updateChartSize();
    window.addEventListener("resize", updateChartSize);
    return () => window.removeEventListener("resize", updateChartSize);
  }, []);

  if (!coin) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← Back to Watchlist
      </Link>

      <motion.div
        className={styles.detail}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>
          {coin.name} ({coin.symbol.toUpperCase()})
        </h2>
        <img src={coin.image.large} alt={coin.name} />
        <p
          dangerouslySetInnerHTML={{
            __html: coin.description.en.split(". ")[0] + ".",
          }}
        />
        <p>
          Current price: ${coin.market_data.current_price.usd.toLocaleString()}
        </p>

        <div className={styles.chartWrapper}>
          <TradingViewWidget
            symbol={`${coin.symbol.toUpperCase()}USDT`}
            width={chartSize.width}
            height={chartSize.height}
          />
        </div>

        {!isInWatchlist && (
          <button className={styles.watchButton} onClick={handleAddToWatchlist}>
            + Add to Watchlist
          </button>
        )}

        {isInWatchlist && (
          <p className={styles.inWatchlist}>✅ Already in your watchlist</p>
        )}
      </motion.div>
    </div>
  );
}

export default CoinDetail;
