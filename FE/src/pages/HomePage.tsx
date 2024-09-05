import React, { useState, useEffect } from 'react';
import { Hero } from '../components/home/Hero';
import { Restaurant } from '../types'; // Ensure the Restaurant interface is imported correctly
import { NearbyRestaurants } from '../components/home/NearbyRestaurants';
import { Filters } from '../components/home/Filters';
import { ExclusiveRestaurantCard } from '../components/restaurants/ExclusiveRestaurantCard'; // Assuming you have a RestaurantCard component
import { useNavigate } from 'react-router-dom'; // For navigation

// Default location (San Jose, CA)
const DEFAULT_LOCATION = {
  lat: 37.3382,
  lng: -121.8863
};

export const HomePage = () => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [filters, setFilters] = useState({
    cuisine: [] as string[],
    dietary: [] as string[],
    priceRange: [] as string[],
  });
  const [exclusiveRestaurants, setExclusiveRestaurants] = useState<Restaurant[]>([]); // Explicitly type the state
  const [loading, setLoading] = useState(true); // Loading state for exclusive restaurants
  const navigate = useNavigate(); // React Router hook for navigation

  // Fetch exclusive restaurants
  useEffect(() => {
    const fetchExclusiveRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8080/restaurants/getActive'); // Replace with the actual endpoint for exclusive restaurants
        if (!response.ok) {
          throw new Error('Failed to fetch exclusive restaurants');
        }
        const data: any[] = await response.json();

        // Map the data to the correct structure (replace restaurantId with id)
        const mappedData = data.map((restaurant) => ({
          id: restaurant.restaurantId, // Replacing restaurantId with id
          name: restaurant.name,
          dietary: restaurant.dietary || [],
          cuisine: restaurant.cuisine || [],
          priceRange: restaurant.priceRange,
          photos: restaurant.photos || [],
          description: restaurant.description,
          averageRating: restaurant.averageRating || 0,
          rating: restaurant.averageRating || 0, // Using averageRating for rating
          hours: restaurant.hours || {},
          address: {
            id: restaurant.restaurantId, // Use restaurantId for address id if needed
            street: restaurant.address.street,
            city: restaurant.address.city,
            state: restaurant.address.state,
            zipCode: restaurant.address.zip || null, // Mapping zip to zipCode
            lat: restaurant.address.lat,
            lng: restaurant.address.lng,
          },
          reviews: restaurant.reviews || [],
          ownerId: restaurant.ownerId,
          closed: restaurant.closed,
        }));

        setExclusiveRestaurants(mappedData); // Update state with exclusive restaurants
      } catch (error) {
        console.error('Error fetching exclusive restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExclusiveRestaurants();
  }, []);

  const handleFilterChange = (newFilters: {
    cuisine: string[];
    dietary: string[];
    priceRange: string[];
  }) => {
    setFilters(newFilters);
  };

  // Handle card click to navigate to restaurant details page
  const handleCardClick = (restaurantId: string) => {
    navigate(`/exclusive-restaurant/${restaurantId}/${rating}`);
  };

  return (
    <div>
      <Hero onLocationChange={setLocation} />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Filters onFilterChange={handleFilterChange} />

        <NearbyRestaurants location={location} filters={filters} />

        {/* Exclusive Restaurants Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Exclusive Restaurants</h2>
          {loading ? (
            <div className="text-center py-8">
              <p>Loading exclusive restaurants...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exclusiveRestaurants.map((restaurant) => (
                <div key={restaurant.id} onClick={() => handleCardClick(restaurant.id)} className="cursor-pointer">
                  <ExclusiveRestaurantCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nearby Restaurants Section */}
        
      </div>
    </div>
  );
};
