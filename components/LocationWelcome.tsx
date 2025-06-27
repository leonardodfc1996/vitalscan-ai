import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MapPin, Globe } from 'lucide-react-native';
import { useLocation, getTimeBasedGreeting, formatLocationString } from '@/hooks/useLocation';

interface LocationWelcomeProps {
  userName?: string;
  userType?: 'patient' | 'professional';
  style?: any;
}

export function LocationWelcome({ userName, userType, style }: LocationWelcomeProps) {
  const { location, isLoading, error } = useLocation();

  const getPersonalizedGreeting = () => {
    const timeGreeting = getTimeBasedGreeting();
    
    if (userName) {
      const title = userType === 'professional' ? 'Dr. ' : '';
      return `${timeGreeting}, ${title}${userName}`;
    }
    
    return timeGreeting;
  };

  const getLocationMessage = () => {
    if (isLoading) {
      return 'Detecting your location...';
    }
    
    if (error || !location) {
      return 'Welcome to VitalScan AI';
    }
    
    return `Welcome from ${formatLocationString(location)}!`;
  };

  return (
    <View style={[styles.container, style]}>
      {/* Personalized Greeting */}
      <View style={styles.greetingContainer}>
        <Text style={styles.greetingText}>{getPersonalizedGreeting()}</Text>
      </View>

      {/* Location-based Welcome */}
      <View style={styles.locationContainer}>
        {isLoading ? (
          <View style={styles.locationRow}>
            <Globe size={16} color="#64748B" />
            <Text style={styles.locationText}>{getLocationMessage()}</Text>
          </View>
        ) : location ? (
          <View style={styles.locationRow}>
            <Text style={styles.flagEmoji}>{location.flag}</Text>
            <MapPin size={16} color="#64748B" />
            <Text style={styles.locationText}>{getLocationMessage()}</Text>
          </View>
        ) : (
          <View style={styles.locationRow}>
            <Globe size={16} color="#64748B" />
            <Text style={styles.locationText}>{getLocationMessage()}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 16,
  },
  greetingContainer: {
    marginBottom: 8,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    textAlign: 'center',
  },
  locationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  flagEmoji: {
    fontSize: 16,
  },
  locationText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
});