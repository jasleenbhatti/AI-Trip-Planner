import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import google.generativeai as genai
from google.cloud import secretmanager
import uvicorn
from models import TripPlanRequest, Itinerary

app = FastAPI(title="AI Trip Planner API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_secret(secret_id: str) -> str:
    """Retrieve secret from Google Secret Manager."""
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{os.getenv('GOOGLE_CLOUD_PROJECT')}/secrets/{secret_id}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

# Initialize Gemini API with secret
try:
    GEMINI_API_KEY = get_secret("gemini-api-key")
    genai.configure(api_key=GEMINI_API_KEY)
except Exception as e:
    # Fallback to environment variable if not running on Cloud Run
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    if GEMINI_API_KEY:
        genai.configure(api_key=GEMINI_API_KEY)
    else:
        raise Exception("No API key available")

@app.get("/")
async def root():
    return {"status": "healthy", "service": "AI Trip Planner API"}

@app.post("/api/plan-trip", response_model=Itinerary)
async def plan_trip(request: TripPlanRequest):
    try:
        model = genai.GenerativeModel('gemini-pro')
        
        system_instruction = """You are an expert trip planner. Your task is to create a detailed, day-by-day travel itinerary. 
        Use your access to Google Search to find real-time information about the destination, including weather, local events, 
        popular attractions, and restaurant recommendations. The itinerary should be logical, enjoyable, and tailored to the 
        user's specified interests."""

        user_prompt = f"""
        Please generate a trip plan based on the following details:

        Destination: {request.city}
        Duration: {request.duration_days} days
        Interests: {request.interests}

        Create a unique and exciting itinerary based on this information.
        Return the response in this exact JSON format:
        {{
            "itinerary_plan": [
                {{
                    "day": 1,
                    "title": "Day 1 Title",
                    "activities": [
                        {{
                            "time": "9:00 AM",
                            "description": "Activity description",
                            "location": "Location name",
                            "type": "museum"  // One of: food, museum, landmark, walk, event, other
                        }}
                    ]
                }}
            ],
            "city": "City Name",
            "duration_days": 3,
            "sources": []
        }}
        """

        response = await model.generate_content(
            contents=[
                {"role": "user", "parts": [system_instruction]},
                {"role": "user", "parts": [user_prompt]}
            ],
            generation_config={
                "temperature": 0.7,
                "top_p": 0.8,
                "top_k": 40
            }
        )

        # Extract and parse JSON response
        import json
        response_text = response.text
        # Clean up any markdown formatting
        if "```json" in response_text:
            response_text = response_text.split("```json")[1].split("```")[0]
        
        itinerary_data = json.loads(response_text)
        
        # Add empty sources list if not present
        if "sources" not in itinerary_data:
            itinerary_data["sources"] = []
            
        return itinerary_data

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate itinerary: {str(e)}"
        )

if __name__ == "__main__":
    port = int(os.getenv("PORT", "8080"))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)