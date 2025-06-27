import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { MapPin, Calendar, Stethoscope, Video, X, Star, Clock, Globe, Award, CircleCheck as CheckCircle, Phone } from 'lucide-react-native';
import { useNearbyDoctors, normalizeSpecialty, Doctor } from '@/hooks/useNearbyDoctors';

interface NearbyDoctorsProps {
  specialty?: string;
  style?: any;
}

export function NearbyDoctors({ specialty, style }: NearbyDoctorsProps) {
  const normalizedSpecialty = specialty ? normalizeSpecialty(specialty) : undefined;
  const { doctors, isLoading, location, hasNearbySpecialist, virtualDoctor } = useNearbyDoctors(normalizedSpecialty);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleBookAppointment = (doctor: Doctor) => {
    if (Platform.OS === 'web') {
      // Open in new tab on web
      if (typeof window !== 'undefined') {
        window.open(doctor.calendlyUrl, '_blank', 'noopener,noreferrer');
      }
    } else {
      // Open in WebView modal on mobile
      setSelectedDoctor(doctor);
      setShowCalendly(true);
    }
  };

  const handleCloseCalendly = () => {
    setShowCalendly(false);
    setSelectedDoctor(null);
  };

  if (isLoading) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.loadingText}>Finding doctors near you...</Text>
        </View>
      </View>
    );
  }

  const displayDoctors = doctors.length > 0 ? doctors : [virtualDoctor];
  const showNoSpecialistMessage = specialty && !hasNearbySpecialist;

  return (
    <View style={[styles.container, style]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <Stethoscope size={24} color="#2563EB" />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>
            {specialty ? `${specialty} Specialists` : 'Health Professionals'}
          </Text>
          {location && (
            <View style={styles.locationRow}>
              <Text style={styles.locationFlag}>{location.flag}</Text>
              <MapPin size={14} color="#64748B" />
              <Text style={styles.subtitle}>
                Near {location.city}, {location.country}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* No Specialist Banner */}
      {showNoSpecialistMessage && (
        <View style={styles.noSpecialistBanner}>
          <MapPin size={16} color="#F59E0B" />
          <Text style={styles.noSpecialistText}>
            No {specialty?.toLowerCase()} specialist found nearby. Try virtual consultation below.
          </Text>
        </View>
      )}

      {/* Doctor Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.doctorsContainer}
        style={styles.doctorsScroll}
      >
        {displayDoctors.map((doctor) => (
          <View key={doctor.id} style={styles.doctorCard}>
            {/* Doctor Image with Badge */}
            <View style={styles.doctorImageContainer}>
              <Image
                source={{ uri: doctor.avatar }}
                style={styles.doctorImage}
                resizeMode="cover"
              />
              {doctor.isVirtual && (
                <View style={styles.virtualBadge}>
                  <Video size={12} color="#FFFFFF" />
                </View>
              )}
              <View style={styles.verifiedBadge}>
                <CheckCircle size={12} color="#10B981" />
              </View>
            </View>

            {/* Doctor Information */}
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              
              {/* Location */}
              <View style={styles.locationContainer}>
                {doctor.isVirtual ? (
                  <Globe size={12} color="#64748B" />
                ) : (
                  <MapPin size={12} color="#64748B" />
                )}
                <Text style={styles.doctorLocation}>{doctor.location}</Text>
              </View>

              {/* Rating and Reviews */}
              <View style={styles.ratingContainer}>
                <View style={styles.ratingRow}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.rating}>4.8</Text>
                  <Text style={styles.reviews}>(127 reviews)</Text>
                </View>
                <View style={styles.experienceRow}>
                  <Award size={12} color="#8B5CF6" />
                  <Text style={styles.experience}>8+ years</Text>
                </View>
              </View>

              {/* Availability */}
              <View style={styles.availabilityContainer}>
                <Clock size={12} color="#10B981" />
                <Text style={styles.availability}>Available today</Text>
                <View style={styles.availabilityDot} />
              </View>

              {/* Consultation Types */}
              <View style={styles.consultationTypes}>
                {doctor.isVirtual ? (
                  <View style={styles.consultationType}>
                    <Video size={10} color="#2563EB" />
                    <Text style={styles.consultationTypeText}>Virtual</Text>
                  </View>
                ) : (
                  <>
                    <View style={styles.consultationType}>
                      <MapPin size={10} color="#059669" />
                      <Text style={styles.consultationTypeText}>In-person</Text>
                    </View>
                    <View style={styles.consultationType}>
                      <Phone size={10} color="#2563EB" />
                      <Text style={styles.consultationTypeText}>Phone</Text>
                    </View>
                  </>
                )}
              </View>
            </View>

            {/* Book Now Button */}
            <TouchableOpacity
              style={[
                styles.bookButton,
                doctor.isVirtual && styles.bookButtonVirtual
              ]}
              onPress={() => handleBookAppointment(doctor)}
              activeOpacity={0.8}
            >
              <Calendar size={16} color="#FFFFFF" />
              <Text style={styles.bookButtonText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Calendly Modal - Only for mobile platforms */}
      {Platform.OS !== 'web' && (
        <Modal
          visible={showCalendly}
          animationType="slide"
          presentationStyle="pageSheet"
          onRequestClose={handleCloseCalendly}
        >
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>
                  Book with {selectedDoctor?.name}
                </Text>
                <Text style={styles.modalSubtitle}>
                  {selectedDoctor?.specialty} • {selectedDoctor?.location}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseCalendly}
              >
                <X size={24} color="#64748B" />
              </TouchableOpacity>
            </View>
            
            {selectedDoctor && (
              <WebView
                source={{ uri: selectedDoctor.calendlyUrl }}
                style={styles.webview}
                startInLoadingState={true}
                renderLoading={() => (
                  <View style={styles.webviewLoading}>
                    <ActivityIndicator size="large" color="#2563EB" />
                    <Text style={styles.webviewLoadingText}>
                      Loading appointment scheduler...
                    </Text>
                  </View>
                )}
                onNavigationStateChange={(navState) => {
                  // Close modal if appointment is successfully booked
                  if (navState.url.includes('calendly.com/scheduled_events')) {
                    setTimeout(() => {
                      setShowCalendly(false);
                    }, 2000);
                  }
                }}
              />
            )}
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 12,
  },
  loadingText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  
  // Header Styles
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
    gap: 16,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationFlag: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },

  // No Specialist Banner
  noSpecialistBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  noSpecialistText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
    fontWeight: '500',
  },

  // Doctor Cards
  doctorsScroll: {
    paddingLeft: 20,
  },
  doctorsContainer: {
    paddingRight: 20,
    gap: 20,
  },
  doctorCard: {
    width: 300,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  
  // Doctor Image
  doctorImageContainer: {
    position: 'relative',
    alignSelf: 'center',
    marginBottom: 20,
  },
  doctorImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  virtualBadge: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  verifiedBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  // Doctor Info
  doctorInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  doctorName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  doctorSpecialty: {
    fontSize: 16,
    color: '#2563EB',
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  
  // Location
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  doctorLocation: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },

  // Rating
  ratingContainer: {
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B',
  },
  reviews: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  experienceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  experience: {
    fontSize: 12,
    color: '#8B5CF6',
    fontWeight: '600',
  },

  // Availability
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  availability: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '600',
  },
  availabilityDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginLeft: 4,
  },

  // Consultation Types
  consultationTypes: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  consultationType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  consultationTypeText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Book Button
  bookButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  bookButtonVirtual: {
    backgroundColor: '#059669',
    shadowColor: '#059669',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },

  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  modalTitleContainer: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  closeButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  webview: {
    flex: 1,
  },
  webviewLoading: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  webviewLoadingText: {
    fontSize: 16,
    color: '#64748B',
    marginTop: 16,
    fontWeight: '500',
  },
});