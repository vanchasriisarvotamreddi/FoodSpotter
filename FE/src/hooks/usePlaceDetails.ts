import { useState, useEffect } from 'react';
import { Restaurant } from '../types';

export const usePlaceDetails = (placeId: string | undefined) => {
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!placeId) {
      setError('Invalid restaurant ID');
      setLoading(false);
      return;
    }

    const fetchPlaceDetails = async () => {
      try {
        const service = new google.maps.places.PlacesService(
          new google.maps.Map(document.createElement('div'))
        );

        service.getDetails(
          {
            placeId,
            fields: [
              'name',
              'formatted_address',
              'geometry',
              'rating',
              'reviews',
              'photos',
              'opening_hours',
              'price_level',
              'types',
              'website',
              'formatted_phone_number',
              'vicinity'
            ]
          },
          (place, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && place) {
              const restaurantData: Restaurant = {
                id: placeId,
                name: place.name || 'Unknown Restaurant',
                description: place.vicinity || place.formatted_address || '',
                cuisine: (place.types || [])
                  .filter(type => !['restaurant', 'establishment', 'food', 'point_of_interest'].includes(type))
                  .map(type => type.replace(/_/g, ' ')),
                priceRange: place.price_level === 4 ? 'high' : place.price_level === 3 ? 'medium' : 'low',
                rating: place.rating || 0,
                reviews: place.reviews?.map(review => ({
                  id: review.time?.toString() || Math.random().toString(),
                  // userId: review.author_name || 'Anonymous',
                  userName: review.author_name || 'Anonymous',
                  rating: review.rating || 0,
                  comment: review.text || '',
                  date: new Date(review.time! * 1000).toISOString()
                })) || [],
                address: {
                  street: place.formatted_address || '',
                  city: '',
                  state: '',
                  zipCode: '',
                  lat: place.geometry?.location?.lat() || 0,
                  lng: place.geometry?.location?.lng() || 0
                },
                photos: place.photos ? 
                  place.photos.map(photo => photo.getUrl({ maxWidth: 1200, maxHeight: 800 })) :
                  ['https://via.placeholder.com/1200x800?text=No+Image'],
                hours: {
                  monday: place.opening_hours?.weekday_text?.[0] || 'Not available',
                  tuesday: place.opening_hours?.weekday_text?.[1] || 'Not available',
                  wednesday: place.opening_hours?.weekday_text?.[2] || 'Not available',
                  thursday: place.opening_hours?.weekday_text?.[3] || 'Not available',
                  friday: place.opening_hours?.weekday_text?.[4] || 'Not available',
                  saturday: place.opening_hours?.weekday_text?.[5] || 'Not available',
                  sunday: place.opening_hours?.weekday_text?.[6] || 'Not available'
                },
                ownerId: '',
                dietary: []
              };

              setRestaurant(restaurantData);
              setLoading(false);
            } else {
              setError('Failed to fetch restaurant details');
              setLoading(false);
            }
          }
        );
      } catch (err) {
        setError('Failed to fetch restaurant details');
        setLoading(false);
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  return { restaurant, loading, error };
};