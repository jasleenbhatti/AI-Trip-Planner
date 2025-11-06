import React, { useState, useMemo } from 'react';
import type { Itinerary, Activity } from '../types';
import { FoodIcon } from './icons/FoodIcon';
import { MuseumIcon } from './icons/MuseumIcon';
import { LandmarkIcon } from './icons/LandmarkIcon';
import { WalkIcon } from './icons/WalkIcon';
import { GlobeAltIcon } from './icons/GlobeAltIcon';

interface ItineraryDisplayProps {
  itinerary: Itinerary;
}

const ActivityIcon: React.FC<{ type: Activity['type'] }> = ({ type }) => {
  const iconClass = "w-6 h-6 mr-4 text-blue-500 dark:text-teal-400 flex-shrink-0";
  switch (type) {
    case 'food':
      return <FoodIcon className={iconClass} />;
    case 'museum':
      return <MuseumIcon className={iconClass} />;
    case 'landmark':
      return <LandmarkIcon className={iconClass} />;
    case 'walk':
      return <WalkIcon className={iconClass} />;
    default:
      return <GlobeAltIcon className={iconClass} />;
  }
};

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ itinerary }) => {
  const [activeDay, setActiveDay] = useState(1);
  const activePlan = useMemo(() => {
      return itinerary.itinerary_plan.find(plan => plan.day === activeDay);
  }, [activeDay, itinerary.itinerary_plan]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Your Trip to {itinerary.city}</h2>
        <p className="mt-1 text-md text-gray-600 dark:text-gray-400">A {itinerary.duration_days}-day adventure powered by AI.</p>
      </div>
      
      <div className="border-b border-gray-200 dark:border-gray-700 px-4">
        <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
          {itinerary.itinerary_plan.map(plan => (
            <button
              key={plan.day}
              onClick={() => setActiveDay(plan.day)}
              className={`whitespace-nowrap py-4 px-2 border-b-2 font-medium text-sm transition-colors
                ${activeDay === plan.day
                  ? 'border-blue-500 text-blue-600 dark:border-teal-400 dark:text-teal-300'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:border-gray-500'
                }`}
            >
              Day {plan.day}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6 min-h-[250px]">
        {activePlan && (
           <div className="animate-fade-in">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{activePlan.title}</h3>
              <div className="space-y-4">
                {activePlan.activities.map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <ActivityIcon type={activity.type} />
                      <div className="flex-1">
                        <p className="font-bold text-gray-800 dark:text-gray-200">{activity.time} - {activity.description}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.location}</p>
                      </div>
                    </div>
                ))}
              </div>
          </div>
        )}
      </div>
      
      {itinerary.sources && itinerary.sources.length > 0 && (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <h4 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Information Sources
            </h4>
            <ul className="space-y-1 text-sm">
                {itinerary.sources.map((source, index) => (
                    <li key={index} className="truncate">
                        <a 
                            href={source.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline dark:text-teal-400"
                            title={source.title}
                        >
                            {source.title || new URL(source.uri).hostname}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};
