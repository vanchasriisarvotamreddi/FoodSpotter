import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Settings, LogOut, Plus, BarChart3 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useRestaurantStore } from '../../store/restaurantStore';

export const BusinessProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { getRestaurantsByOwner } = useRestaurantStore();
  const restaurants = getRestaurantsByOwner(user?.id || '');

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
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={`https://ui-avatars.com/api/?name=${user?.name}&background=random`}
              alt={user?.name}
              className="h-20 w-20 rounded-full"
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <div className="mt-2 flex items-center text-sm text-gray-500">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Restaurant Owner</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => navigate('/add-restaurant')}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Restaurant
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Restaurant List */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Your Restaurants</h2>
            <div className="space-y-6">
              {restaurants.map(restaurant => (
                <div key={restaurant.id} className="border-b pb-6 last:border-0">
                  <div className="flex">
                    <img
                      src={restaurant.photos[0]}
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
                            onClick={() => navigate(`/edit-restaurant/${restaurant.id}`)}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Business Overview</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Restaurants</span>
                <span className="font-medium">{restaurants.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Reviews</span>
                <span className="font-medium">{totalStats.reviews}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Average Rating</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  <span className="font-medium">{averageRating}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Photos</span>
                <span className="font-medium">{totalStats.totalPhotos}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <BarChart3 className="h-5 w-5 mr-3" />
                Dashboard
              </button>
              <button
                onClick={() => navigate('/business/settings')}
                className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="h-5 w-5 mr-3" />
                Settings
              </button>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};