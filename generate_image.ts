import { GoogleGenAI } from "@google/genai";

async function generateAssistantImage() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A cute, realistic 3D character of a small house with a friendly face (big expressive eyes and a smile) and tiny branch-like hands. The house has a vibrant blue roof and clean white/silver walls. Pixar-style rendering, high detail, cinematic lighting, cheerful and funny personality, isolated on a simple background.',
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      console.log("IMAGE_DATA:" + part.inlineData.data);
      return;
    }
  }
}

generateAssistantImage();
