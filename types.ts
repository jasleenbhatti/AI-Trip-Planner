export interface TripPlanRequest {
  city: string;
  duration_days: number;
  interests: string;
}

export interface Activity {
  time: string;
  description: string;
  location: string;
  type: 'food' | 'museum' | 'landmark' | 'walk' | 'event' | 'other';
}

export interface DailyPlan {
  day: number;
  title: string;
  activities: Activity[];
}

export interface Source {
  uri: string;
  title: string;
}

export interface Itinerary {
  itinerary_plan: DailyPlan[];
  city: string;
  duration_days: number;
  sources: Source[];
}
