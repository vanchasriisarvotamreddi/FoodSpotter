import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, History, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const UserProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  // Mock data for demonstration
  const recentReviews = [
    {
      id: '1',
      restaurantName: 'Italian Delight',
      rating: 4,
      date: '2024-03-15',
      comment: 'Amazing food and great service!'
    },
    {
      id: '2',
      restaurantName: 'Sushi Master',
      rating: 5,
      date: '2024-03-10',
      comment: 'Best sushi in town!'
    }
  ];

  const recentVisits = [
    {
      id: '1',
      name: 'Thai Spice',
      date: '2024-03-18',
      address: '456 Oak St'
    },
    {
      id: '2',
      name: 'Burger House',
      date: '2024-03-16',
      address: '789 Pine St'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
                <span>Food Explorer</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Recent Reviews */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
              <div className="space-y-6">
                {recentReviews.map(review => (
                  <div key={review.id} className="border-b pb-4 last:border-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">
                        {review.restaurantName}
                      </h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                    <span className="text-xs text-gray-500">{review.date}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Visits */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-8">
              <h2 className="text-xl font-semibold mb-4">Recent Visits</h2>
              <div className="space-y-4">
                {recentVisits.map(visit => (
                  <div key={visit.id} className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{visit.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{visit.address}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{visit.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Your Activity</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-medium">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Photos</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Restaurants Visited</span>
                  <span className="font-medium">45</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Account</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </button>
                <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <History className="h-5 w-5 mr-3" />
                  Activity Log
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
    </div>
  );
};