import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";
const SYSTEM_PROMPT = `
You are MobiWise, an expert AI Mobile Shopping Assistant. Your goal is to help users discover, compare, and buy mobile phones.

CORE CAPABILITIES:
1. DISCOVERY: Help users find the best phones based on specific needs (budget, camera, gaming, battery).
2. COMPARISON: Provide clear, objective side-by-side comparisons of models.
3. TRADE-OFFS: Always explain the pros and cons of recommended devices to help the user make an informed decision.
4. ADVERSARIAL RESILIENCE: Stay on topic (mobile phones). Politely redirect irrelevant queries.

RESPONSE GUIDELINES:
1. REAL-TIME DATA: Use your training data to provide info on current market models.
2. FORMATTING: Use Markdown for the "text" field. Bold key specs. Use lists for pros/cons.
3. BUDGET: Default to INR (₹) unless asked otherwise. Use 1k = 1000 shorthand.
4. "WHY THIS?": Every recommendation MUST have a justification.
5. "TRADE-OFFS": Explicitly mention what a user might be sacrificing (e.g., "Great performance, but plastic build").

RESPONSE FORMAT (Valid JSON):
{
  "type": "message" | "recommendation" | "comparison" | "refusal",
  "text": "Markdown string. Include 'Why this?' and explicit trade-offs/pros-cons.",
  "phones": [
    {
      "id": "string",
      "brand": "string",
      "model": "string",
      "price": number,
      "os": "string",
      "size": "compact" | "medium" | "large",
      "display": "string",
      "camera": { "main": "string", "ois": boolean },
      "battery": "string",
      "charging": "string",
      "tags": ["string"]
    }
  ],
  "comparison_summary": "Optional markdown string summarizing the winner or key differences for comparisons."
}
`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  console.log("--- New Chat Request ---");
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    message,
    history = [],
    model: selectedModel = "gemini-flash-latest",
  } = req.body;
  console.log("Message:", message);
  console.log("Selected Model:", selectedModel);
  console.log("API Key exists:", !!process.env.GEMINI_API_KEY);

  if (!process.env.GEMINI_API_KEY) {
    console.error("CRITICAL: GEMINI_API_KEY is missing");
    return res.status(500).json({
      type: "refusal",
      text: "Developer Config Error: GEMINI_API_KEY is missing in .env",
    });
  }

  try {
    console.log(`Initializing Gemini with model: ${selectedModel}...`);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: selectedModel,
      generationConfig: {
        responseMimeType: "application/json",
      },
      systemInstruction: {
        role: "system",
        parts: [{ text: SYSTEM_PROMPT }],
      },
    });

    console.log("Starting Chat Session...");

    // Filter and map history
    const processedHistory = history
      .filter(
        (h: { role: string; content: string }) =>
          !h.content.includes("API error") &&
          !h.content.includes("Internal Server Error"),
      )
      .map((h: { role: string; content: string }) => ({
        role: h.role === "assistant" ? "model" : h.role,
        parts: [{ text: h.content }],
      }));

    // Gemini requires the first message in history to be from the 'user'
    while (
      processedHistory.length > 0 &&
      processedHistory[0].role === "model"
    ) {
      console.log(
        "Removing leading 'model' message from history to satisfy Gemini API requirements.",
      );
      processedHistory.shift();
    }

    const chat = model.startChat({
      history: processedHistory,
    });

    console.log("Sending Message to AI...");
    const result = await chat.sendMessage(message);
    const responseText = result.response.text();
    console.log("AI Response Received");

    try {
      const parsedResponse = JSON.parse(responseText);
      return res.status(200).json(parsedResponse);
    } catch {
      console.warn("AI Response was not valid JSON, returning as text");
      return res.status(200).json({
        type: "message",
        text: responseText,
      });
    }
  } catch (error: unknown) {
    console.error("FULL ERROR DETAILS:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({
      type: "refusal",
      text: `Gemini API Error: ${errorMessage}`,
    });
  }
}
