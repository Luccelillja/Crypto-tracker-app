import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCoinData = async (ids = "") => {
  const response = await axios.get(`${BASE_URL}/coins/markets`, {
    params: {
      vs_currency: "usd",
      ids,
      order: "market_cap_desc",
      sparkline: false,
    },
  });
  return response.data;
};

export const searchCoins = async (query) => {
  const response = await axios.get(`${BASE_URL}/search`, {
    params: { query },
  });
  return response.data.coins;
};
