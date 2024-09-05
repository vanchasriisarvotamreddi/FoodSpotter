import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, DollarSign, AlertCircle, Loader2, Edit, ChevronLeft } from 'lucide-react';
import { RestaurantMap } from '../components/maps/RestaurantMap';
import { ReviewForm } from '../components/reviews/ReviewForm';
import { ReviewList } from '../components/reviews/ReviewList';
import { usePlaceDetails } from '../hooks/usePlaceDetails';
import { useAuthStore } from '../store/authStore';
import { useRestaurantStore } from '../store/restaurantStore';

export const RestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getRestaurantById } = useRestaurantStore();
  const [activeTab, setActiveTab] = React.useState<'info' | 'reviews'>('info');
  const [showReviewForm, setShowReviewForm] = React.useState(false);
  
  // First try to get restaurant from local store (for owner's restaurants)
  const localRestaurant = getRestaurantById(id!);
  
  // If not found in local store, try to get from Google Places API
  const { restaurant: googleRestaurant, loading, error } = usePlaceDetails(
    localRestaurant ? undefined : id
  );

  const restaurant = localRestaurant || googleRestaurant;
  const isOwner = user?.role === 'business' && localRestaurant?.ownerId === user.id;

  // Calculate review statistics
  const reviewStats = React.useMemo(() => {
    if (!restaurant) return null;
    
    const total = restaurant.reviews.length;
    const avgRating = restaurant.rating;
    const ratingCounts = {
      5: restaurant.reviews.filter(r => r.rating === 5).length,
      4: restaurant.reviews.filter(r => r.rating === 4).length,
      3: restaurant.reviews.filter(r => r.rating === 3).length,
      2: restaurant.reviews.filter(r => r.rating === 2).length,
      1: restaurant.reviews.filter(r => r.rating === 1).length,
    };

    return { total, avgRating, ratingCounts };
  }, [restaurant]);

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
                <span className="ml-1">{restaurant.rating.toFixed(1)}</span>
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
                {/* Review Statistics for Owners */}
                {isOwner && reviewStats && (
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">Review Overview</h3>
                    <div className="flex items-center mb-6">
                      <div className="text-4xl font-bold text-gray-900 mr-4">
                        {reviewStats.avgRating.toFixed(1)}
                      </div>
                      <div>
                        <div className="flex items-center">
                          {Array(5).fill(0).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.round(reviewStats.avgRating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Based on {reviewStats.total} reviews
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center">
                          <span className="w-12 text-sm text-gray-600">
                            {rating} stars
                          </span>
                          <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-yellow-400"
                              style={{
                                width: `${(reviewStats.ratingCounts[rating as keyof typeof reviewStats.ratingCounts] / reviewStats.total) * 100}%`
                              }}
                            />
                          </div>
                          <span className="w-12 text-sm text-gray-600 text-right">
                            {reviewStats.ratingCounts[rating as keyof typeof reviewStats.ratingCounts]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular Review Section */}
                {!isOwner && (
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Reviews</h2>
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                    >
                      Write a Review
                    </button>
                  </div>
                )}
                
                {showReviewForm && !isOwner && (
                  <ReviewForm
                    restaurantId={restaurant.id}
                    onClose={() => setShowReviewForm(false)}
                  />
                )}
                
                <ReviewList restaurantId={restaurant.id} reviews={restaurant.reviews} />
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
                    <span className="text-gray-600">{hours.replace(day + ': ', '')}</span>
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