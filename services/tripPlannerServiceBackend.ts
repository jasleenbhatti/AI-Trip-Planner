import type { TripPlanRequest, Itinerary } from '../types';

const API_BASE_URL = process.env.VITE_API_URL || 'http://localhost:8080';

export const planTrip = async (request: TripPlanRequest): Promise<Itinerary> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/plan-trip`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data as Itinerary;

  } catch (error) {
    console.error("Error generating trip plan:", error);
    throw new Error("Failed to generate AI-powered itinerary. The service may be busy or an error occurred.");
  }
};