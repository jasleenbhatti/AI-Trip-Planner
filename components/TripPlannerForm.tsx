
import React, { useState } from 'react';
import type { TripPlanRequest } from '../types';

interface TripPlannerFormProps {
  onPlanTrip: (request: TripPlanRequest) => void;
}

export const TripPlannerForm: React.FC<TripPlannerFormProps> = ({ onPlanTrip }) => {
  const [city, setCity] = useState<string>('Paris, France');
  const [duration, setDuration] = useState<number>(3);
  const [interests, setInterests] = useState<string>('museums, local food, history');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city && duration > 0 && interests) {
      onPlanTrip({
        city,
        duration_days: duration,
        interests,
      });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-2xl animate-fade-in-down">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Destination City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Paris, France"
            required
          />
        </div>
        
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Duration (in days)
          </label>
          <input
            type="number"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10) || 1)}
            min="1"
            max="14"
            className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Interests
          </label>
          <input
            type="text"
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., museums, local food, history"
            required
          />
           <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Comma-separated list of your interests.</p>
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          Plan My Trip
        </button>
      </form>
    </div>
  );
};
