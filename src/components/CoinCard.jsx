// import { LineChart, Line } from "recharts";
// import styles from "../styles/CoinCard.module.css";
// import { Link } from "react-router-dom";

// function CoinCard({ coin, onRemove }) {
//   const trendColor =
//     coin.price_change_percentage_7d_in_currency > 0 ? "#0f0" : "#f00";

//   return (
//     <Link to={`/coin/${coin.id}`} className={styles.link}>
//       <div className={styles.card}>
//         <div className={styles.cardContent}>
//           <div className={styles.header}>
//             <div className={styles.left}>
//               <img src={coin.image} alt={coin.name} className={styles.icon} />
//               <div>
//                 <h2>{coin.name}</h2>
//                 <p>{coin.symbol.toUpperCase()}</p>
//               </div>
//             </div>
//             <button
//               className={styles.remove}
//               onClick={(e) => {
//                 e.preventDefault(); // stop link
//                 e.stopPropagation(); // stop bubbling
//                 onRemove(coin.id);
//               }}
//             >
//               ✕
//             </button>
//           </div>

//           <div className={styles.price}>
//             <p>${coin.current_price.toLocaleString()}</p>
//             <p
//               style={{
//                 color: coin.price_change_percentage_24h > 0 ? "#0f0" : "#f00",
//               }}
//             >
//               {coin.price_change_percentage_24h.toFixed(2)}%
//             </p>
//           </div>

//           {coin.sparkline_in_7d?.price && (
//             <div className={styles.sparkline}>
//               <LineChart
//                 width={100}
//                 height={40}
//                 data={coin.sparkline_in_7d.price.map((value, index) => ({
//                   index,
//                   value,
//                 }))}
//               >
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke={
//                     coin.price_change_percentage_7d_in_currency > 0
//                       ? "#0f0"
//                       : "#f00"
//                   }
//                   strokeWidth={2}
//                   dot={false}
//                 />
//               </LineChart>
//             </div>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default CoinCard;
// import { LineChart, Line } from "recharts";
// import styles from "../styles/CoinCard.module.css";
// import { Link } from "react-router-dom";

// function CoinCard({ coin, onRemove }) {
//   const trendColor =
//     coin.price_change_percentage_7d_in_currency > 0 ? "#0f0" : "#f00";

//   return (
//     <Link to={`/coin/${coin.id}`} className={styles.link}>
//       <div className={styles.card}>
//         <div className={styles.cardContent}>
//           <div className={styles.header}>
//             <div className={styles.left}>
//               <img src={coin.image} alt={coin.name} className={styles.icon} />
//               <div>
//                 <h2>{coin.name}</h2>
//                 <p>{coin.symbol.toUpperCase()}</p>
//               </div>
//             </div>
//             <button
//               className={styles.remove}
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 onRemove(coin.id);
//               }}
//             >
//               ✕
//             </button>
//           </div>

//           <div className={styles.price}>
//             <p>${coin.current_price.toLocaleString()}</p>
//             <p
//               className={
//                 coin.price_change_percentage_7d_in_currency > 0
//                   ? styles.positive
//                   : styles.negative
//               }
//             >
//               {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
//               <span className={styles.label}> (7d)</span>
//             </p>
//           </div>

//           {coin.sparkline_in_7d?.price && (
//             <div className={styles.sparkline}>
//               <LineChart
//                 width={100}
//                 height={40}
//                 data={coin.sparkline_in_7d.price.map((value, index) => ({
//                   index,
//                   value,
//                 }))}
//               >
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke={trendColor}
//                   strokeWidth={2}
//                   dot={false}
//                 />
//               </LineChart>
//               <p className={styles.chartLabel}>7d price trend</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default CoinCard;

import { LineChart, Line } from "recharts";
import styles from "../styles/CoinCard.module.css";
import { Link } from "react-router-dom";

function CoinCard({ coin, onRemove }) {
  const trendColor =
    coin.price_change_percentage_7d_in_currency > 0 ? "#0f0" : "#f00";

  return (
    <Link to={`/coin/${coin.id}`} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <div className={styles.header}>
            <div className={styles.left}>
              <img src={coin.image} alt={coin.name} className={styles.icon} />
              <div>
                <h2>{coin.name}</h2>
                <p>{coin.symbol.toUpperCase()}</p>
              </div>
            </div>
            <button
              className={styles.remove}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove(coin.id);
              }}
            >
              ✕
            </button>
          </div>

          <div className={styles.price}>
            <p>${coin.current_price.toLocaleString()}</p>
            <p
              className={
                coin.price_change_percentage_24h > 0
                  ? styles.positive
                  : styles.negative
              }
            >
              {coin.price_change_percentage_24h?.toFixed(2)}%
              <span className={styles.label}> (24h)</span>
            </p>
          </div>

          {coin.sparkline_in_7d?.price && (
            <div className={styles.sparkline}>
              <LineChart
                width={200}
                height={80}
                data={coin.sparkline_in_7d.price.map((value, index) => ({
                  index,
                  value,
                }))}
              >
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={trendColor}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
              <p className={styles.chartLabel}>7d price trend</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default CoinCard;
