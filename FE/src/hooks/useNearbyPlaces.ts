import { useState, useEffect } from 'react';
import { Restaurant } from '../types';

interface UseNearbyPlacesProps {
  location: { lat: number; lng: number };
  radius?: number; // in meters
}

export const useNearbyPlaces = ({ location, radius = 5000 }: UseNearbyPlacesProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<google.maps.places.PlaceSearchPagination | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchPlaces = async () => {
    if (!location.lat || !location.lng || location.lat === 0 || location.lng === 0) {
      setError('Invalid location');
      setLoading(false);
      return;
    }

    try {
      const mapDiv = document.createElement('div');
      const map = new google.maps.Map(mapDiv, {
        center: { lat: location.lat, lng: location.lng },
        zoom: 15,
      });

      const service = new google.maps.places.PlacesService(map);

      const request = {
        location: new google.maps.LatLng(location.lat, location.lng),
        radius,
        type: 'restaurant'
      } as google.maps.places.PlaceSearchRequest;

      service.nearbySearch(
        request,
        async (results, status, paginationResult) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const detailedRestaurants = await Promise.all(
              results.map(async (place) => {
                return new Promise<Restaurant>((resolve) => {
                  if (!place.place_id) {
                    resolve({
                      id: Math.random().toString(),
                      name: place.name || 'Unknown Restaurant',
                      description: place.vicinity || '',
                      cuisine: [],
                      priceRange: 'medium',
                      rating: place.rating || 0,
                      reviews: [],
                      address: {
                        street: place.vicinity || '',
                        city: '',
                        state: '',
                        zipCode: '',
                        lat: place.geometry?.location?.lat() || location.lat,
                        lng: place.geometry?.location?.lng() || location.lng
                      },
                      photos: ['https://via.placeholder.com/800x600?text=No+Image'],
                      hours: {
                        monday: 'Not available',
                        tuesday: 'Not available',
                        wednesday: 'Not available',
                        thursday: 'Not available',
                        friday: 'Not available',
                        saturday: 'Not available',
                        sunday: 'Not available'
                      },
                      ownerId: '',
                      dietary: []
                    });
                    return;
                  }

                  service.getDetails(
                    {
                      placeId: place.place_id,
                      fields: ['opening_hours', 'price_level', 'rating', 'reviews', 'photos', 'formatted_phone_number', 'types']
                    },
                    (details, detailStatus) => {
                      const restaurant: Restaurant = {
                        id: place.place_id!,
                        name: place.name!,
                        description: place.vicinity || '',
                        cuisine: (place.types || [])
                          .filter(type => !['restaurant', 'establishment', 'food', 'point_of_interest'].includes(type))
                          .map(type => type.replace(/_/g, ' ')),
                        priceRange: details?.price_level === 4 ? 'high' : details?.price_level === 3 ? 'medium' : 'low',
                        rating: place.rating || 0,
                        reviews: details?.reviews?.map(review => ({
                          id: review.time?.toString() || Math.random().toString(),
                          // userId: review.author_name || 'Anonymous',
                          userName: review.author_name || 'Anonymous',
                          rating: review.rating || 0,
                          comment: review.text || '',
                          date: new Date(review.time! * 1000).toISOString()
                        })) || [],
                        address: {
                          street: place.vicinity || '',
                          city: '',
                          state: '',
                          zipCode: '',
                          lat: place.geometry!.location!.lat(),
                          lng: place.geometry!.location!.lng()
                        },
                        photos: details?.photos ? 
                          details.photos.slice(0, 3).map(photo => photo.getUrl({ maxWidth: 800, maxHeight: 600 })) :
                          place.photos ? 
                            [place.photos[0].getUrl({ maxWidth: 800, maxHeight: 600 })] :
                            ['https://via.placeholder.com/800x600?text=No+Image'],
                        hours: {
                          monday: details?.opening_hours?.weekday_text?.[0] || 'Not available',
                          tuesday: details?.opening_hours?.weekday_text?.[1] || 'Not available',
                          wednesday: details?.opening_hours?.weekday_text?.[2] || 'Not available',
                          thursday: details?.opening_hours?.weekday_text?.[3] || 'Not available',
                          friday: details?.opening_hours?.weekday_text?.[4] || 'Not available',
                          saturday: details?.opening_hours?.weekday_text?.[5] || 'Not available',
                          sunday: details?.opening_hours?.weekday_text?.[6] || 'Not available'
                        },
                        ownerId: '',
                        dietary: []
                      };
                      resolve(restaurant);
                    }
                  );
                });
              })
            );

            setRestaurants(prev => [...prev, ...detailedRestaurants]);
            setPagination(paginationResult || null);
            setLoading(false);
            setIsLoadingMore(false);
          } else {
            setError(status === google.maps.places.PlacesServiceStatus.ZERO_RESULTS ? 
              'No restaurants found in this area' : 
              'Failed to fetch nearby restaurants');
            setLoading(false);
            setIsLoadingMore(false);
          }
        }
      );
    } catch (err) {
      setError('Failed to fetch nearby restaurants');
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    setRestaurants([]);
    setPagination(null);
    setLoading(true);
    fetchPlaces();
  }, [location.lat, location.lng, radius]);

  const loadMore = async () => {
    if (pagination?.hasNextPage && !isLoadingMore) {
      setIsLoadingMore(true);
      pagination.nextPage();
    }
  };

  return { 
    restaurants, 
    loading, 
    error, 
    hasMore: !!pagination?.hasNextPage, 
    loadMore, 
    isLoadingMore 
  };
};