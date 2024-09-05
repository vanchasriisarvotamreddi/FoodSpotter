import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Star, Edit, Trash2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useRestaurantStore } from '../store/restaurantStore';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getRestaurantsByOwner } = useRestaurantStore();

  if (!user || user.role !== 'business') {
    navigate('/');
    return null;
  }

  const restaurants = getRestaurantsByOwner(user.id);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Restaurant Dashboard</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome back, {user.name}! Manage your restaurant listings and view reviews
            </p>
          </div>
          <button
            onClick={() => navigate('/add-restaurant')}
            className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Restaurant
          </button>
        </div>

        {restaurants.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-medium text-gray-900 mb-4">No Restaurants Yet</h2>
            <p className="text-gray-600 mb-6">Start by adding your first restaurant listing</p>
            <button
              onClick={() => navigate('/add-restaurant')}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Restaurant
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img
                    src={restaurant.photos[0]}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">{restaurant.name}</h2>
                      <div className="flex items-center mt-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{restaurant.rating}</span>
                        <span className="ml-2 text-sm text-gray-500">
                          ({restaurant.reviews.length} reviews)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.cuisine.map((type, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-50 text-primary-700 rounded-full text-xs"
                      >
                        {type}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => navigate(`/edit-restaurant/${restaurant.id}`)}
                      className="flex items-center text-primary-600 hover:text-primary-700"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};