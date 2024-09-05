import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const recentActivity = [
    {
      id: '1',
      type: 'review',
      restaurantName: 'Italian Delight',
      rating: 4,
      date: '2024-03-15',
      comment: 'Amazing food and great service!'
    },
    {
      id: '2',
      type: 'visit',
      restaurantName: 'Sushi Master',
      date: '2024-03-14',
      location: '123 Main St'
    }
  ];

  const savedRestaurants = [
    {
      id: '1',
      name: 'Thai Spice',
      rating: 4.5,
      cuisine: ['Thai', 'Asian'],
      address: '456 Oak St'
    },
    {
      id: '2',
      name: 'Burger House',
      rating: 4.2,
      cuisine: ['American', 'Burgers'],
      address: '789 Pine St'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-2">Track your food journey and discover new places to eat.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="border-b pb-4 last:border-0">
                  {activity.type === 'review' ? (
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-gray-900">
                          Reviewed {activity.restaurantName}
                        </h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm">{activity.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-1">{activity.comment}</p>
                      <span className="text-xs text-gray-500 mt-2 block">{activity.date}</span>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Visited {activity.restaurantName}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{activity.location}</span>
                      </div>
                      <span className="text-xs text-gray-500 mt-2 block">{activity.date}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Saved Restaurants */}
        <div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Saved Restaurants</h2>
            <div className="space-y-4">
              {savedRestaurants.map(restaurant => (
                <div 
                  key={restaurant.id}
                  className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
                  onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-gray-900">{restaurant.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm">{restaurant.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};