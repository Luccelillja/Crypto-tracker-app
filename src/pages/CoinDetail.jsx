import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "../styles/CoinDetail.module.css";

function CoinDetail() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => res.json())
      .then(setCoin);
  }, [id]);

  if (!coin) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.detail}>
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
    </div>
  );
}

export default CoinDetail;
