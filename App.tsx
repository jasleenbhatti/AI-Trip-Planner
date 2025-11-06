
import React, { useState, useCallback } from 'react';
import { TripPlannerForm } from './components/TripPlannerForm';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { planTrip } from './services/tripPlannerService';
import type { TripPlanRequest, Itinerary } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(true);

  const handlePlanTrip = useCallback(async (request: TripPlanRequest) => {
    setIsLoading(true);
    setError(null);
    setItinerary(null);
    setShowForm(false);

    try {
      const result = await planTrip(request);
      setItinerary(result);
    } catch (err) {
      setError('Failed to generate itinerary. Please try again later.');
      console.error(err);
      setShowForm(true); // Show form again on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setItinerary(null);
    setError(null);
    setShowForm(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')", opacity: 0.1}}
      ></div>
      <main className="relative z-10 container mx-auto px-4 py-8 md:py-16 flex flex-col items-center">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
            Intelligent Trip Planner
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Craft your perfect journey with the power of AI
          </p>
        </header>

        <div className="w-full max-w-2xl">
          {showForm && <TripPlannerForm onPlanTrip={handlePlanTrip} />}

          {isLoading && (
            <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
              <LoadingSpinner />
              <p className="mt-4 text-lg font-semibold animate-pulse">Crafting your personalized itinerary...</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">This might take a moment.</p>
            </div>
          )}

          {error && <ErrorMessage message={error} onRetry={() => setShowForm(true)} />}

          {itinerary && (
            <div className="animate-fade-in">
              <ItineraryDisplay itinerary={itinerary} />
              <div className="mt-8 text-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-transform transform hover:scale-105"
                >
                  Plan Another Trip
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="relative z-10 container mx-auto px-4 py-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">Made by Jasleen Bhatti</p>
      </footer>
    </div>
  );
};

export default App;
