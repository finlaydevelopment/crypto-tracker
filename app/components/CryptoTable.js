"use client";
import { useEffect, useState } from "react";
import { fetchCryptoData } from "../utils/api";
import CryptoChart from "./CryptoChart"; 

export default function CryptoTable() {
  const [cryptoData, setCryptoData] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCoin, setSelectedCoin] = useState("bitcoin"); // Default to Bitcoin

  useEffect(() => {
    const getData = async () => {
      const data = await fetchCryptoData();
      setCryptoData(data);
    };

    getData();
    const interval = setInterval(getData, 60000); // Fetch every 60s (prevent spam)
    return () => clearInterval(interval);
  }, []);

  const filteredData = cryptoData.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🚀 Live Crypto Tracker</h1>

      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="min-w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">Logo</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price (£)</th>
            <th className="p-2">% Change</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((coin) => (
            <tr
              key={coin.id}
              className="border-b cursor-pointer hover:bg-gray-200"
              onClick={() => setSelectedCoin(coin.id)} // Set selected coin for chart
            >
              <td className="p-2">
                <img src={coin.image} alt={coin.name} width="30" />
              </td>
              <td className="p-2">{coin.name} ({coin.symbol.toUpperCase()})</td>
              <td className="p-2">£{coin.current_price.toFixed(2)}</td>
              <td className={`p-2 ${coin.price_change_percentage_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Chart Only if a Coin is Selected */}
      {selectedCoin && <CryptoChart coinId={selectedCoin} />}
    </div>
  );
}
