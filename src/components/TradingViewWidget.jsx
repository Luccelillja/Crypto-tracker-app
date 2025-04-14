import { useEffect, useRef } from "react";

function TradingViewWidget({ symbol = "BTCUSDT", width = 1000, height = 700 }) {
  const containerRef = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          container_id: containerRef.current.id,
          symbol: symbol,
          interval: "60",
          width,
          height,
          theme: "dark",
          style: "1",
          locale: "en",
          autosize: false, // 🔒 Do not use autosize — we’re managing it
          hide_top_toolbar: false,
          hide_side_toolbar: false,
          allow_symbol_change: true,
        });
      }
    };

    containerRef.current.innerHTML = "";
    containerRef.current.appendChild(script);
  }, [symbol, width, height]);

  return (
    <div
      id={`tv_chart_${symbol}`}
      ref={containerRef}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}

export default TradingViewWidget;
