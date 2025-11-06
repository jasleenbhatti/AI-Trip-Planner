from typing import Optional
from pydantic import BaseModel

class TripPlanRequest(BaseModel):
    city: str
    duration_days: int
    interests: str

class Activity(BaseModel):
    time: str
    description: str
    location: str
    type: str  # 'food' | 'museum' | 'landmark' | 'walk' | 'event' | 'other'

class DailyPlan(BaseModel):
    day: int
    title: str
    activities: list[Activity]

class Source(BaseModel):
    uri: str
    title: str

class Itinerary(BaseModel):
    itinerary_plan: list[DailyPlan]
    city: str
    duration_days: int
    sources: list[Source]