import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Star, MapPin, TrendingUp, Users, DollarSign } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

// Modify the interface to match the new restaurant structure
interface Restaurant {
  id: string;
  name: string;
  description: string;
  cuisine: string[];
  priceRange: 'low' | 'medium' | 'high';
  rating: number;
  reviews: Review[];
  address: Address;
  photos: string[];
  hours: BusinessHours;
  ownerId: string;
  dietary: string[];
}

interface Review {
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string | null;
  lat: number;
  lng: number;
}

interface BusinessHours {
  [key: string]: string;
}

export const BusinessDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // State for restaurant data
  const [loading, setLoading] = useState(true); // State for loading spinner

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (user?.name) {
        try {
          setLoading(true);
          const response = await fetch(`http://localhost:8080/owner/my-restaurants/${user?.name}`);
          if (!response.ok) {
            throw new Error('Failed to fetch restaurants');
          }
          const data: any[] = await response.json(); // Fetching data from API

          // Map API response to Restaurant interface
          const mappedRestaurants: Restaurant[] = data.map(restaurant => ({
            ...restaurant,
            id: restaurant.restaurantId, // Rename restaurantId to id
          }));

          setRestaurants(mappedRestaurants); // Update state with fetched restaurants
        } catch (error) {
          console.error('Error fetching restaurants:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRestaurants();
  }, [user?.name]); // Re-fetch when user name changes

  // Calculate total stats
  const totalStats = restaurants.reduce((acc, restaurant) => ({
    reviews: acc.reviews + restaurant.reviews.length,
    avgRating: acc.avgRating + restaurant.rating,
    totalPhotos: acc.totalPhotos + restaurant.photos.length
  }), { reviews: 0, avgRating: 0, totalPhotos: 0 });

  const averageRating = restaurants.length > 0 
    ? (totalStats.avgRating / restaurants.length).toFixed(1)
    : '0.0';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Business Dashboard</h1>
          <p className="text-gray-600">Manage your restaurant listings and track performance</p>
        </div>
        <button
          onClick={() => navigate('/add-restaurant')}
          className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Restaurant
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Restaurants</p>
              <p className="text-2xl font-bold text-gray-900">{restaurants.length}</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <MapPin className="h-6 w-6 text-primary-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-gray-900">{averageRating}</p>
                <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
              </div>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.reviews}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Photos</p>
              <p className="text-2xl font-bold text-gray-900">{totalStats.totalPhotos}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Your Restaurants</h2>
          <div className="space-y-6">
            {restaurants.map(restaurant => (
              <div key={restaurant.id} className="border-b pb-6 last:border-0">
                <div className="flex">
                  <img
                    src={restaurant.photos[0] || 'https://via.placeholder.com/40'} // Use the first photo
                    alt={restaurant.name}
                    className="h-24 w-24 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{restaurant.rating}</span>
                          <span className="mx-2">•</span>
                          <span className="text-sm text-gray-500">
                            {restaurant.reviews.length} reviews
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                      <button
  onClick={() => navigate(`/edit/${restaurant.id}/${user?.name}`)}
  className="px-3 py-1 text-primary-600 hover:bg-primary-50 rounded"
>
  Edit
</button>

                        <button
                          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                          className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700"
                        >
                          View
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">{restaurant.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {restaurant.cuisine.map((type, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {restaurants.length === 0 && (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Restaurants Yet</h3>
                <p className="text-gray-600 mb-4">Start by adding your first restaurant listing</p>
                <button
                  onClick={() => navigate('/add-restaurant')}
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Restaurant
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
