export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const coinId = searchParams.get("coinId");
  
    if (!coinId) {
      return new Response(JSON.stringify({ error: "coinId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7`
      );
      if (!response.ok) throw new Error("Failed to fetch chart data");
  
      const data = await response.json();
      return new Response(JSON.stringify(data.prices), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch chart data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  