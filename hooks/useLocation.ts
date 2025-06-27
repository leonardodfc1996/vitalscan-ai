import { useState, useEffect } from 'react';

interface LocationData {
  city: string;
  country: string;
  countryCode: string;
  region: string;
  timezone: string;
  flag: string;
}

interface LocationState {
  location: LocationData | null;
  isLoading: boolean;
  error: string | null;
}

export function useLocation() {
  const [state, setState] = useState<LocationState>({
    location: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchLocation = async () => {
      try {
        // Use ipapi.co for reliable IP geolocation
        const response = await fetch('https://ipapi.co/json/', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch location');
        }

        const data = await response.json();

        if (isMounted && data.city && data.country_name) {
          const locationData: LocationData = {
            city: data.city,
            country: data.country_name,
            countryCode: data.country_code,
            region: data.region,
            timezone: data.timezone,
            flag: getCountryFlag(data.country_code),
          };

          setState({
            location: locationData,
            isLoading: false,
            error: null,
          });
        } else if (isMounted) {
          setState({
            location: null,
            isLoading: false,
            error: 'Location data unavailable',
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            location: null,
            isLoading: false,
            error: error instanceof Error ? error.message : 'Failed to detect location',
          });
        }
      }
    };

    // Add a small delay to prevent too many rapid requests
    const timer = setTimeout(fetchLocation, 500);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return state;
}

// Helper function to get country flag emoji
function getCountryFlag(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌍';
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  
  return String.fromCodePoint(...codePoints);
}

// Helper function to get time-based greeting
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

// Helper function to format location string
export function formatLocationString(location: LocationData): string {
  return `${location.city}, ${location.country}`;
}