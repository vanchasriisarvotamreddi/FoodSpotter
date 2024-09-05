import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRestaurantStore } from '../../store/restaurantStore';
import { useAuthStore } from '../../store/authStore';
import { Camera, Clock, MapPin, DollarSign, AlertCircle, Plus, X } from 'lucide-react';

export const EditRestaurantPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getRestaurantById, updateRestaurant } = useRestaurantStore();
  const restaurant = getRestaurantById(id!);

  const [formData, setFormData] = useState(restaurant || {
    name: '',
    description: '',
    cuisine: [] as string[],
    priceRange: 'medium' as 'low' | 'medium' | 'high',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      lat: 0,
      lng: 0
    },
    dietary: [] as string[],
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: ''
    },
    photos: [] as string[]
  });

  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  useEffect(() => {
    if (!restaurant || restaurant.ownerId !== user?.id) {
      navigate('/dashboard');
    }
  }, [restaurant, user, navigate]);

  const cuisineOptions = [
    'American',
    'Chinese',
    'French',
    'Indian',
    'Italian',
    'Japanese',
    'Korean',
    'Mexican',
    'Thai',
    'Vietnamese',
    'Mediterranean',
    'Middle Eastern',
    'Seafood',
    'Steakhouse',
    'Pizza',
    'Sushi',
    'Vegetarian',
    'Vegan',
    'Fast food',
    'Cafe'
  ];

  const dietaryOptions = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Halal',
    'Kosher',
    'Dairy-Free',
    'Nut-Free',
    'Low-Carb'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateRestaurant(id!, {
      ...formData,
      ownerId: user!.id,
      rating: restaurant?.rating || 0,
      reviews: restaurant?.reviews || []
    });
    navigate('/dashboard');
  };

  const handleAddPhoto = () => {
    if (newPhotoUrl && !formData.photos.includes(newPhotoUrl)) {
      setFormData({
        ...formData,
        photos: [...formData.photos, newPhotoUrl]
      });
      setNewPhotoUrl('');
    }
  };

  const handleRemovePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index)
    });
  };

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center text-red-600">
          <AlertCircle className="h-6 w-6 mr-2" />
          Restaurant not found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Restaurant</h1>
        
        <form onSubmit={handleSubmit} className="space-y-8 bg-white shadow rounded-lg p-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Restaurant Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cuisine Types</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {cuisineOptions.map((cuisine) => (
                  <label key={cuisine} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.cuisine.includes(cuisine)}
                      onChange={(e) => {
                        const newCuisine = e.target.checked
                          ? [...formData.cuisine, cuisine]
                          : formData.cuisine.filter((c) => c !== cuisine);
                        setFormData({ ...formData, cuisine: newCuisine });
                      }}
                      className="form-checkbox h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2">{cuisine}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Dietary Options</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {dietaryOptions.map((option) => (
                  <label key={option} className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.dietary.includes(option)}
                      onChange={(e) => {
                        const newDietary = e.target.checked
                          ? [...formData.dietary, option]
                          : formData.dietary.filter((d) => d !== option);
                        setFormData({ ...formData, dietary: newDietary });
                      }}
                      className="form-checkbox h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price Range</label>
              <div className="mt-2 space-x-4">
                {['low', 'medium', 'high'].map((range) => (
                  <label key={range} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="priceRange"
                      value={range}
                      checked={formData.priceRange === range}
                      onChange={(e) => setFormData({ ...formData, priceRange: e.target.value as 'low' | 'medium' | 'high' })}
                      className="form-radio h-4 w-4 text-primary-600"
                    />
                    <span className="ml-2 capitalize">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Address</h2>
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  id="street"
                  value={formData.address.street}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, street: e.target.value }
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, city: e.target.value }
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  id="state"
                  value={formData.address.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, state: e.target.value }
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zipCode"
                  value={formData.address.zipCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    address: { ...formData.address, zipCode: e.target.value }
                  })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  required
                />
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Business Hours</h2>
            
            {Object.keys(formData.hours).map((day) => (
              <div key={day}>
                <label htmlFor={day} className="block text-sm font-medium text-gray-700 capitalize">
                  {day}
                </label>
                <input
                  type="text"
                  id={day}
                  value={formData.hours[day as keyof typeof formData.hours]}
                  onChange={(e) => setFormData({
                    ...formData,
                    hours: { ...formData.hours, [day]: e.target.value }
                  })}
                  placeholder="e.g., 9:00 AM - 10:00 PM"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            ))}
          </div>

          {/* Photos */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
            
            <div>
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                Add Photo URLs
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="url"
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  placeholder="Enter photo URL"
                  className="flex-1 border border-gray-300 rounded-md shadow-sm p-2"
                />
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Restaurant photo ${index + 1}`}
                      className="h-40 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};