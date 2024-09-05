import React from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { Restaurant } from '../../types';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin } from 'lucide-react';

interface RestaurantMapProps {
  restaurants: Restaurant[];
  center: { lat: number; lng: number };
}

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
  ],
};

export const RestaurantMap: React.FC<RestaurantMapProps> = ({
  restaurants,
  center,
}) => {
  const navigate = useNavigate();
  const [selectedRestaurant, setSelectedRestaurant] = React.useState<Restaurant | null>(null);
  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  // Fit bounds to show all markers
  React.useEffect(() => {
    if (map && restaurants.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      restaurants.forEach((restaurant) => {
        bounds.extend({
          lat: restaurant.address.lat,
          lng: restaurant.address.lng,
        });
      });
      map.fitBounds(bounds);

      // Don't zoom in too far
      const listener = google.maps.event.addListener(map, 'idle', () => {
        if (map.getZoom()! > 16) map.setZoom(16);
        google.maps.event.removeListener(listener);
      });
    }
  }, [map, restaurants]);

  if (loadError) {
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">Error loading maps</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14}
      options={mapOptions}
      onLoad={setMap}
    >
      {restaurants.map((restaurant) => (
        <Marker
          key={restaurant.id}
          position={{
            lat: restaurant.address.lat,
            lng: restaurant.address.lng,
          }}
          onClick={() => setSelectedRestaurant(restaurant)}
          icon={{
            url: `data:image/svg+xml;base64,${btoa(`
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="20" fill="#f97316"/>
                <circle cx="20" cy="20" r="8" fill="white"/>
              </svg>
            `)}`,
            scaledSize: new google.maps.Size(40, 40),
            anchor: new google.maps.Point(20, 20),
          }}
        />
      ))}

      {selectedRestaurant && (
        <InfoWindow
          position={{
            lat: selectedRestaurant.address.lat,
            lng: selectedRestaurant.address.lng,
          }}
          onCloseClick={() => setSelectedRestaurant(null)}
        >
          <div className="max-w-xs">
            {selectedRestaurant.photos[0] && (
              <img
                src={selectedRestaurant.photos[0]}
                alt={selectedRestaurant.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
            )}
            <h3 className="font-semibold text-gray-900 mb-1">{selectedRestaurant.name}</h3>
            <div className="flex items-center mb-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">{selectedRestaurant.rating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{selectedRestaurant.address.street}</p>
            <button
              onClick={() => navigate(`/restaurant/${selectedRestaurant.id}`)}
              className="w-full px-3 py-1.5 bg-primary-500 text-white rounded-lg text-sm hover:bg-primary-600 transition-colors"
            >
              View Details
            </button>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};