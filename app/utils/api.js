import axios from "axios";

export const fetchCryptoData = async () => {
  try {
    const response = await axios.get("/api/crypto");
    return response.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};

export const fetchChartData = async (coinId = "bitcoin") => {
  try {
    const response = await axios.get(`/api/chart?coinId=${coinId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return [];
  }
};
