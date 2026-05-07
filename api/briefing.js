export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).end();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "ANTHROPIC_API_KEY non configurata." });

  const today = new Date().toLocaleDateString("it-IT", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const prompt = `Sei un analista finanziario senior. Produci un briefing di mercato per oggi ${today}, conciso e diretto, senza disclaimer, senza frasi introduttive.

Struttura OBBLIGATORIA con questi esatti titoli:

## AZIONARIO MONDIALE
Indici principali (S&P 500, Nasdaq, Dow, FTSE MIB, DAX, Nikkei, MSCI EM): livello, variazione %, direzione. Max 8 righe.

## TASSI & OBBLIGAZIONARIO
Fed Funds rate, BCE tasso depositi, BTP 10Y yield, Bund 10Y yield, Spread BTP/Bund, Treasury 10Y, Euribor 3M. Max 8 righe.

## FOREX & COMMODITIES
EUR/USD, EUR/GBP, oro, Brent/WTI, Bitcoin. Max 5 righe.

## MARKET MOVERS
3-5 eventi che muovono i mercati OGGI. Solo fatti, niente commenti. Fonti: Bloomberg, Reuters, FT, WSJ, ECB, Fed.

## MACRO IN AGENDA
Dati macro attesi oggi o nei prossimi 2 giorni rilevanti per i mercati.

## SEGNALE DELLA SETTIMANA
1 osservazione sintetica su cosa tenere d'occhio nei prossimi 5 giorni. Max 3 righe.

Usa solo dati verificati con ricerca web. Linguaggio tecnico-finanziario.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: data.error?.message || "Errore API" });

    const text = data.content.filter(b => b.type === "text").map(b => b.text).join("\n");
    res.status(200).json({ text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
