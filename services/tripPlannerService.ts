import { GoogleGenAI } from "@google/genai";
import type { TripPlanRequest, Itinerary, Source } from '../types';

export const planTrip = async (request: TripPlanRequest): Promise<Itinerary> => {
  // FIX: Correctly initialize the GoogleGenAI client using `process.env.API_KEY` as per the guidelines. This resolves the error related to `import.meta.env`.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const { city, duration_days, interests } = request;

  const systemInstruction = `You are an expert trip planner. Your task is to create a detailed, day-by-day travel itinerary. Use your access to Google Search to find real-time information about the destination, including weather, local events, popular attractions, and restaurant recommendations. The itinerary should be logical, enjoyable, and tailored to the user's specified interests.

Your entire response must be a single, valid JSON object. Do not include any markdown formatting like \`\`\`json or any other text outside of the JSON.

The JSON structure should be:
- A root object with keys: "itinerary_plan", "city", "duration_days".
- "itinerary_plan" should be an array of objects, each representing a day.
- Each day object should have keys: "day" (number), "title" (string), and "activities" (an array).
- Each activity object in the "activities" array should have keys: "time" (string), "description" (string), "location" (string), and "type" (one of 'food', 'museum', 'landmark', 'walk', 'event', 'other').`;
  
  const userPrompt = `
    Please generate a trip plan based on the following details. Use Google Search to make the plan relevant, up-to-date, and engaging.

    **Destination:** ${city}
    **Duration:** ${duration_days} days
    **Interests:** ${interests}

    Create a unique and exciting itinerary based on this information.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        tools: [{googleSearch: {}}],
      }
    });

    let responseText = response.text.trim();
    
    // The model sometimes returns the JSON wrapped in markdown code fences.
    // This regex extracts the JSON content.
    const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      responseText = jsonMatch[1];
    }

    const generatedPlan = JSON.parse(responseText);
    
    // Simple validation to ensure the response is not empty
    if (!generatedPlan || !generatedPlan.itinerary_plan || generatedPlan.itinerary_plan.length === 0) {
      throw new Error("AI returned an empty or invalid itinerary.");
    }
    
    const sources: Source[] = [];
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    for (const chunk of groundingChunks) {
        if (chunk.web) {
            sources.push({
                uri: chunk.web.uri,
                title: chunk.web.title,
            });
        }
    }

    const finalItinerary: Itinerary = {
      ...generatedPlan,
      sources: sources,
    };
    
    console.log("Successfully generated itinerary:", finalItinerary);
    return finalItinerary;

  } catch (error) {
    console.error("Error generating trip plan with Gemini API:", error);
    throw new Error("Failed to generate AI-powered itinerary. The model may be busy or an error occurred.");
  }
};