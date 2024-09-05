import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, LogOut, Shield, AlertTriangle, Users, Database } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useRestaurantStore } from '../../store/restaurantStore';

export const AdminProfile = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { restaurants } = useRestaurantStore();

  // Calculate system stats
  const systemStats = {
    totalRestaurants: restaurants.length,
    totalReviews: restaurants.reduce((acc, r) => acc + r.reviews.length, 0),
    totalOwners: new Set(restaurants.map(r => r.ownerId)).size,
    potentialDuplicates: restaurants.filter(r => 
      restaurants.some(other => 
        other.id !== r.id && 
        (other.name.toLowerCase().includes(r.name.toLowerCase()) ||
         r.name.toLowerCase().includes(other.name.toLowerCase()))
      )
    ).length
  };

  // Mock recent activity
  const recentActivity = [
    {
      id: '1',
      action: 'Removed duplicate listing',
      target: 'Italian Restaurant',
      date: '2024-03-18 14:30'
    },
    {
      id: '2',
      action: 'Verified new business',
      target: 'Sushi Master',
      date: '2024-03-18 11:15'
    },
    {
      id: '3',
      action: 'Updated system settings',
      target: 'Review filters',
      date: '2024-03-17 16:45'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-full">
              <Shield className="h-14 w-14 text-primary-600" />
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-600">{user?.email}</p>
              <div className="mt-2 flex items-center text-sm text-primary-600 font-medium">
                <Shield className="h-4 w-4 mr-1" />
                <span>System Administrator</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* System Overview */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-xl font-semibold mb-6">System Overview</h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-primary-600">Total Restaurants</p>
                      <p className="text-2xl font-bold text-primary-700">
                        {systemStats.totalRestaurants}
                      </p>
                    </div>
                    <Database className="h-8 w-8 text-primary-500" />
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-600">Total Reviews</p>
                      <p className="text-2xl font-bold text-green-700">
                        {systemStats.totalReviews}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-600">Business Owners</p>
                      <p className="text-2xl font-bold text-blue-700">
                        {systemStats.totalOwners}
                      </p>
                    </div>
                    <Users className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-yellow-600">Potential Duplicates</p>
                      <p className="text-2xl font-bold text-yellow-700">
                        {systemStats.potentialDuplicates}
                      </p>
                    </div>
                    <AlertTriangle className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
              <div className="space-y-6">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.target}</p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Admin Actions</h2>
              <div className="space-y-3">
                <button
                  onClick={() => navigate('/admin')}
                  className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Database className="h-5 w-5 mr-3" />
                  Manage Restaurants
                </button>
                <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Users className="h-5 w-5 mr-3" />
                  Manage Users
                </button>
                <button className="w-full flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                  <Settings className="h-5 w-5 mr-3" />
                  System Settings
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

            {/* System Health */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">System Health</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Server Status</span>
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Database Load</span>
                    <span className="text-sm text-yellow-600">Moderate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">API Response</span>
                    <span className="text-sm text-green-600">Fast</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};