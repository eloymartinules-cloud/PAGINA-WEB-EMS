import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function estimatePropertyValue(details: string) {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `You are a real estate expert. Based on the following property details, provide an estimated market value in Euros (€) and a brief analysis of why you chose that value.
    
    Property Details: ${details}
    
    Respond in JSON format with the following structure:
    {
      "estimatedValue": number,
      "aiAnalysis": "string"
    }`,
    config: {
      responseMimeType: "application/json",
    },
  });

  const response = await model;
  const text = response.text;
  if (!text) throw new Error("No response from AI");
  return JSON.parse(text);
}
