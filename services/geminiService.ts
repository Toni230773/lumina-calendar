import { GoogleGenAI } from "@google/genai";
import { getSeasonalPrompt } from "../utils/calendarUtils";

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateMonthImage = async (monthIndex: number, theme: string): Promise<string | null> => {
  try {
    const prompt = getSeasonalPrompt(monthIndex, theme);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image', // Using standard model for reliability and speed
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          // imageSize: "2K" // Note: imageSize is only for gemini-3-pro-image-preview
        }
      }
    });

    // Extract image
    // The response structure for generateContent with image model can be mixed.
    // Usually it returns candidates with inlineData or sometimes text if it refused.
    
    const parts = response.candidates?.[0]?.content?.parts;
    if (!parts) throw new Error("No content generated");

    for (const part of parts) {
      if (part.inlineData && part.inlineData.data) {
         return `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`;
      }
    }
    
    console.warn("No image part found in response", response);
    return null;

  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};
