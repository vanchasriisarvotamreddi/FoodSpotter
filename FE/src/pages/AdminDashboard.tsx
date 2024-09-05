import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Search } from 'lucide-react';

// Modify the interface to match the new restaurant structure
interface Restaurant {
  restaurantId: string;
  name: string;
  description: string;
  cuisine: string[];
  priceRange: string;
  photos: string[];
  hours: {
    [key: string]: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string | null;
    lat: number;
    lng: number;
  };
  ownerId: {
    username: string;
    role: string;
    name: string;
  };
  closed: boolean;  // New field to check if restaurant is closed
}

export const AdminDashboard = () => {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]); // State for restaurant data
  const [duplicates, setDuplicates] = useState<Restaurant[]>([]); // State for duplicate restaurants
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); // State for loading spinner

  // Fetch all restaurants
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://springawsserver-lb-512553929.us-east-2.elb.amazonaws.com:8080/restaurants/get');
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants');
        }
        const data: Restaurant[] = await response.json();
        console.log(data);
        setRestaurants(data); // Update state with fetched restaurants
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch duplicates
    const fetchDuplicates = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/duplicates');
        if (!response.ok) {
          throw new Error('Failed to fetch duplicate restaurants');
        }
        const data: Restaurant[] = await response.json();
        setDuplicates(data); // Update state with duplicate restaurants
      } catch (error) {
        console.error('Error fetching duplicate restaurants:', error);
      }
    };

    fetchRestaurants();
    fetchDuplicates();
  }, []);

  // Delete restaurant
  const deleteRestaurant = async (restaurantId: string) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/deleteRestaurant?restaurantId=${restaurantId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorText = await response.text(); // Read error message from response
        throw new Error(errorText || 'Failed to delete restaurant');
      }

      // Update the state to remove the deleted restaurant
      setRestaurants((prev) => prev.filter((restaurant) => restaurant.restaurantId !== restaurantId));
      setDuplicates((prev) => prev.filter((restaurant) => restaurant.restaurantId !== restaurantId)); // Remove from duplicates too
      alert('Restaurant deleted successfully');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert(`Error deleting restaurant`);
    }
  };

  // Filter restaurants by search term
  const filteredRestaurants = restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
            <p className="text-gray-600">Manage all restaurant listings and check for duplicates</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                  type="text"
                  placeholder="Search restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Loading Spinner */}
          {loading ? (
              <div className="text-center py-8">
                <p>Loading restaurants...</p>
              </div>
          ) : (
              <div className="bg-white rounded-lg shadow">
                <div className="px-4 py-5 sm:p-6">
                  <div className="overflow-x-auto">
                    <h2 className="text-xl font-bold mb-4">Restaurants</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Restaurant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cuisine
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                      {filteredRestaurants.map((restaurant) => (
                          <tr
                              key={restaurant.restaurantId}
                              className={`hover:bg-gray-50 ${restaurant.closed ? 'bg-red-100' : ''}`} // Apply red background to closed restaurants
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                    src={restaurant.photos[0] || 'https://via.placeholder.com/40'}
                                    alt={restaurant.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-wrap gap-1">
                                {restaurant.cuisine.map((type, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                                    >
                                {type}
                              </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${
                                  restaurant.closed ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                              }`}
                          >
                            {restaurant.closed ? 'Closed' : 'Open'}
                          </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                  onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this restaurant?')) {
                                      deleteRestaurant(restaurant.restaurantId);
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                    {filteredRestaurants.length === 0 && (
                        <div className="text-center py-4">No restaurants found</div>
                    )}

                    {/* Duplicate Restaurants Table */}
                    <h2 className="text-xl font-bold mb-4 mt-8">Duplicate Restaurants</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Restaurant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Location
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cuisine
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                      {duplicates.map((restaurant) => (
                          <tr
                              key={restaurant.restaurantId}
                              className={`hover:bg-gray-50 ${restaurant.closed ? 'bg-red-100' : ''}`} // Apply red background to closed restaurants
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <img
                                    src={restaurant.photos[0] || 'https://via.placeholder.com/40'}
                                    alt={restaurant.name}
                                    className="h-10 w-10 rounded-full object-cover"
                                />
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">{restaurant.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{restaurant.address.street}, {restaurant.address.city}, {restaurant.address.state}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex flex-wrap gap-1">
                                {restaurant.cuisine.map((type, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                                    >
                                {type}
                              </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                  onClick={() => {
                                    if (window.confirm('Are you sure you want to delete this duplicate restaurant?')) {
                                      deleteRestaurant(restaurant.restaurantId);
                                    }
                                  }}
                                  className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                    {duplicates.length === 0 && (
                        <div className="text-center py-4">No duplicate restaurants found</div>
                    )}
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
};