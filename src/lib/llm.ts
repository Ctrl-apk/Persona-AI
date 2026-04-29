import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";

// Helper for lazy initialization
let geminiClient: any = null;
let openaiClient: OpenAI | null = null;

function getGeminiClient() {
  if (!geminiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in environment variables.");
    }
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

function getOpenAIClient() {
  if (!openaiClient) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      // We don't throw here so we can fallback to Gemini if OpenAI is missing
      return null;
    }
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

interface CallLLMArgs {
  systemPrompt: string;
  userMessage: string;
  history?: { role: "user" | "model" | "assistant"; content: string }[];
  personaId: string;
  provider?: "gemini" | "openai";
}

export async function callLLM({
  systemPrompt,
  userMessage,
  history = [],
  personaId,
  provider = "gemini",
}: CallLLMArgs): Promise<string> {
  // If user has provided OpenAI key, and requested it, use it. 
  // Otherwise default to Gemini.
  const useProvider = process.env.OPENAI_API_KEY ? provider : "gemini";

  try {
    if (useProvider === "openai") {
      const client = getOpenAIClient();
      if (!client) throw new Error("OpenAI client not initialized");

      const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: systemPrompt },
          ...history.map(h => ({ 
            role: h.role === "model" ? "assistant" : h.role, 
            content: h.content 
          })),
          { role: "user", content: userMessage },
        ],
      });

      return response.choices[0].message.content || "";
    } else {
      // Gemini Implementation (Default)
      const ai = getGeminiClient();
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history.map(h => ({
            role: h.role === "model" ? "model" : "user",
            parts: [{ text: h.content }]
          })),
          { role: "user", parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        }
      });
      
      return response.text || "";
    }
  } catch (error) {
    console.error(`LLM Call failed (${useProvider}):`, error);
    throw error; // Let the server handle the persona-based fallback
  }
}
