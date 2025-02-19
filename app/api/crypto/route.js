export async function GET() {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=10&page=1&sparkline=false"
      );
  
      if (!response.ok) throw new Error("Failed to fetch crypto data");
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch crypto data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  