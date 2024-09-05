import React from 'react';
import { RestaurantMap } from '../maps/RestaurantMap';
import { RestaurantCard } from '../restaurants/RestaurantCard';
import { useNearbyPlaces } from '../../hooks/useNearbyPlaces';
import { AlertCircle, Loader2 } from 'lucide-react';

interface NearbyRestaurantsProps {
  location: { lat: number; lng: number };
  filters: {
    cuisine: string[];
    dietary: string[];
    priceRange: string[];
  };
}

export const NearbyRestaurants: React.FC<NearbyRestaurantsProps> = ({ location, filters }) => {
  const [viewType, setViewType] = React.useState<'list' | 'map'>('list');
  const { restaurants, loading, error, hasMore, loadMore, isLoadingMore } = useNearbyPlaces({
    location,
    radius: 5000 // 5km radius
  });

  // Filter restaurants
  const filteredRestaurants = React.useMemo(() => {
    let filtered = [...restaurants];

    if (filters.cuisine.length > 0) {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisine.some(cuisine => 
          filters.cuisine.some(filter => 
            cuisine.toLowerCase().includes(filter.toLowerCase())
          )
        )
      );
    }

    if (filters.priceRange.length > 0) {
      filtered = filtered.filter(restaurant =>
        filters.priceRange.includes(restaurant.priceRange)
      );
    }

    return filtered;
  }, [restaurants, filters]);

  if (loading && restaurants.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          <p className="text-gray-600">Finding restaurants near you...</p>
        </div>
      </div>
    );
  }

  if (error && restaurants.length === 0) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {viewType === 'list' ? 'Nearby Restaurants' : 'Map View'}
          {filteredRestaurants.length > 0 && (
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredRestaurants.length} found)
            </span>
          )}
        </h2>

        <div className="inline-flex rounded-lg shadow-sm">
          <button
            onClick={() => setViewType('list')}
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              viewType === 'list'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:text-primary-500'
            } border border-gray-200`}
          >
            List View
          </button>
          <button
            onClick={() => setViewType('map')}
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              viewType === 'map'
                ? 'bg-primary-500 text-white'
                : 'bg-white text-gray-700 hover:text-primary-500'
            } border border-l-0 border-gray-200`}
          >
            Map View
          </button>
        </div>
      </div>

      {viewType === 'map' ? (
        <div className="h-[calc(100vh-12rem)] bg-white rounded-lg shadow-md overflow-hidden">
          <RestaurantMap
            restaurants={filteredRestaurants}
            center={location}
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>

          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMore}
                disabled={isLoadingMore}
                className="px-6 py-3 bg-white text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50"
              >
                {isLoadingMore ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading more...</span>
                  </div>
                ) : (
                  'Load More Restaurants'
                )}
              </button>
            </div>
          )}

          {filteredRestaurants.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No restaurants found matching your filters.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};