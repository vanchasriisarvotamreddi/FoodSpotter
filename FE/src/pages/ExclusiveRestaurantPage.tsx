import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, DollarSign, AlertCircle, Loader2, Edit, ChevronLeft } from 'lucide-react';
import { RestaurantMap } from '../components/maps/RestaurantMap';
import { ReviewForm } from '../components/reviews/ReviewForm';  // Add ReviewForm
import { ReviewList } from '../components/reviews/ReviewList';
import { useAuthStore } from '../store/authStore';
import { Restaurant } from '../types';

export const ExclusiveRestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'info' | 'reviews'>('info');
  const [showReviewForm, setShowReviewForm] = useState(false);

  // Fetch restaurant details from the backend using the id
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8080/restaurants/getid?restaurantId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant');
        }
        const data = await response.json();
        // Directly assign the data since it's an object
        if (data) {
          setRestaurant(data);
        } else {
          throw new Error('Restaurant not found');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
          <p className="text-gray-600">Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-400 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-400 mr-3" />
            <p className="text-red-700">Restaurant not found</p>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user?.role === 'business' && restaurant.ownerId === user.id;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <div className="absolute inset-0">
          <img
            src={restaurant.photos[0]}
            alt={restaurant.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="absolute top-4 left-4">
          <button
            onClick={() => navigate(isOwner ? '/dashboard' : '/')}
            className="flex items-center px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to {isOwner ? 'Dashboard' : 'Home'}
          </button>
        </div>
        {isOwner && (
          <div className="absolute top-4 right-4">
            <button
              onClick={() => navigate(`/edit-restaurant/${restaurant.id}`)}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Edit className="h-5 w-5 mr-2" />
              Edit Restaurant
            </button>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1">{restaurant.rating}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                <MapPin className="h-5 w-5" />
                <span className="ml-1">{restaurant.address.street}</span>
              </div>
              <span>•</span>
              <div className="flex items-center">
                {Array(restaurant.priceRange === 'high' ? 3 : restaurant.priceRange === 'medium' ? 2 : 1)
                  .fill(0)
                  .map((_, i) => (
                    <DollarSign key={i} className="h-5 w-5" />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setActiveTab('info')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'info'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Information
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-4 py-2 rounded-lg ${
                  activeTab === 'reviews'
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Reviews
              </button>
            </div>

            {/* Content */}
            {activeTab === 'info' ? (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">About</h3>
                    <p className="text-gray-600">{restaurant.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Cuisine</h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.cuisine.map((type, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Dietary Options</h3>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.dietary.map((option, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
                        >
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Photos</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {restaurant.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`${restaurant.name} - Photo ${index + 1}`}
                          className="rounded-lg w-full h-32 object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                {/* Review Section - Always show ReviewForm */}
                <ReviewForm
                  restaurantId={id || ''}
                  onClose={() => {}}
                />

                {/* List of Reviews */}
                <ReviewList restaurantId={id || ''} reviews={restaurant.reviews} />
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Business Hours</h3>
              <div className="space-y-2">
                {Object.entries(restaurant.hours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="capitalize">{day}</span>
                    <span className="text-gray-600">{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-[300px]">
              <RestaurantMap
                restaurants={[restaurant]}
                center={{ lat: restaurant.address.lat, lng: restaurant.address.lng }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
