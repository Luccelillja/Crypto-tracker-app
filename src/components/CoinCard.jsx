import { Link } from "react-router-dom";
import styles from "../styles/CoinCard.module.css";

function CoinCard({ coin, onRemove }) {
  return (
    <div className={styles.card}>
      <Link to={`/coin/${coin.id}`} className={styles.info}>
        <img src={coin.image} alt={coin.name} />
        <div>
          <h3>
            {coin.name} ({coin.symbol.toUpperCase()})
          </h3>
          <p>${coin.current_price.toLocaleString()}</p>
          <p
            className={
              coin.price_change_percentage_24h > 0 ? styles.green : styles.red
            }
          >
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
        </div>
      </Link>
      <button onClick={() => onRemove(coin.id)}>✖</button>
    </div>
  );
}

export default CoinCard;

// import styles from "../styles/CoinCard.module.css";

// function CoinCard({ coin, onRemove }) {
//   return (
//     <div className={styles.card}>
//       <img src={coin.image} alt={coin.name} />
//       <div>
//         <h3>
//           {coin.name} ({coin.symbol.toUpperCase()})
//         </h3>
//         <p>${coin.current_price.toLocaleString()}</p>
//         <p
//           className={
//             coin.price_change_percentage_24h > 0 ? styles.green : styles.red
//           }
//         >
//           {coin.price_change_percentage_24h.toFixed(2)}%
//         </p>
//       </div>
//       <button onClick={() => onRemove(coin.id)}>✖</button>
//     </div>
//   );
// }

// export default CoinCard;
