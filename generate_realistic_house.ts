import { GoogleGenAI } from "@google/genai";

async function generateRealisticHouse() {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          text: 'A realistic 3D character of a small modern house. The house has a friendly expressive face with big blue eyes and a wide goofy smile with teeth. It has mechanical robotic arms on the sides. The upper part is made of vertical wooden planks, and the lower part has large glass windows with plants visible inside. A small chimney on top with a wisp of smoke. Pixar-style high-quality 3D render, cinematic lighting, isolated on a clean white background, very detailed textures.',
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

generateRealisticHouse();
