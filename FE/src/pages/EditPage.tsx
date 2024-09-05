import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const EditPage = () => {
  const { id,username } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [formData, setFormData] = useState({
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
      lng: 0,
    },
    dietary: [] as string[],
    hours: {
      monday: '',
      tuesday: '',
      wednesday: '',
      thursday: '',
      friday: '',
      saturday: '',
      sunday: '',
    },
    photos: [] as string[],
    closed: false, // Added closed field
  });

  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  const cuisineOptions = [
    'American', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mexican',
    'Thai', 'Vietnamese', 'Mediterranean', 'Middle Eastern', 'Seafood', 'Steakhouse', 'Pizza',
    'Sushi', 'Vegetarian', 'Vegan', 'Fast food', 'Cafe'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'Dairy-Free', 'Nut-Free', 'Low-Carb'
  ];

  // Fetch restaurant data by ID
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(`http://localhost:8080/restaurants/getid?restaurantId=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant');
        }
        const data = await response.json();

        // Pre-fill formData with fetched restaurant data
        setFormData({
          name: data.name,
          description: data.description,
          cuisine: data.cuisine,
          priceRange: data.priceRange,
          address: data.address,
          dietary: data.dietary,
          hours: data.hours,
          photos: data.photos,
          closed: data.closed,
        });
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };

    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const payload = {
      ...formData,
      ownerId: username, // Make sure this value is valid
    };
  
    try {
      const res = await fetch(`http://localhost:8080/owner/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error('Failed to update restaurant');
      }
  
      alert('Restaurant updated successfully!');
      navigate('/dashboard'); // Redirect to dashboard after success
    } catch (error) {
      console.error('Error updating restaurant:', error);
      alert('Failed to update restaurant. Please try again.');
    }
  };

  const handleAddPhoto = () => {
    if (newPhotoUrl && !formData.photos.includes(newPhotoUrl)) {
      setFormData({
        ...formData,
        photos: [...formData.photos, newPhotoUrl],
      });
      setNewPhotoUrl('');
    }
  };

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
                Add Photo URL
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
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Close Business Option */}
          <div className="space-y-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={formData.closed}
                onChange={(e) => setFormData({
                  ...formData,
                  closed: e.target.checked // This will set closed to true if checked, false if unchecked
                })}
                className="form-checkbox h-4 w-4 text-primary-600"
              />
              <span className="ml-2">Close Business</span>
            </label>
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
