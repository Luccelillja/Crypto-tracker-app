const BASE_URL = "https://api.coingecko.com/api/v3";

/**
 * Fetch market data for multiple coins (with sparkline and 7d change).
 * @param {string} ids - Comma-separated coin IDs (e.g. 'bitcoin,ethereum')
 */
export async function fetchCoinData(ids) {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=usd&ids=${ids}&sparkline=true&price_change_percentage=7d`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch coin data");
    }

    return await response.json();
  } catch (error) {
    console.error("[fetchCoinData error]", error);
    return [];
  }
}

/**
 * Fetch full detail for a single coin by ID.
 * Used on the /coin/:id page.
 */
export async function fetchCoinDetail(id) {
  try {
    const response = await fetch(`${BASE_URL}/coins/${id}`);
    if (!response.ok) throw new Error("Failed to fetch coin detail");
    return await response.json();
  } catch (error) {
    console.error("[fetchCoinDetail error]", error);
    return null;
  }
}

/**
 * Search coins by name/symbol using CoinGecko's search endpoint.
 * Used for SearchBar autocomplete.
 */
export async function searchCoins(query) {
  try {
    const response = await fetch(`${BASE_URL}/search?query=${query}`);
    if (!response.ok) throw new Error("Search failed");
    const data = await response.json();
    return data.coins || [];
  } catch (error) {
    console.error("[searchCoins error]", error);
    return [];
  }
}
