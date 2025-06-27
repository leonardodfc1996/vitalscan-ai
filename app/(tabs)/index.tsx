import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Animated,
  Dimensions,
  Image
} from 'react-native';
import { router } from 'expo-router';
import { Heart, Eye, Sheet as Teeth, Baby, Ear, Stethoscope, Crown, CircleAlert as AlertCircle, LogIn, Sparkles, Shield, TrendingUp, Users } from 'lucide-react-native';
import { useI18n } from '@/hooks/useI18n';
import { useAuth } from '@/components/AuthProvider';
import { useApp } from '@/components/AppProvider';
import { DappierAd } from '@/components/DappierAd';
import { LocationWelcome } from '@/components/LocationWelcome';

const { width, height } = Dimensions.get('window');

const specialtyIcons = {
  skin: Heart,
  dental: Teeth,
  eyes: Eye,
  pediatric: Baby,
  ent: Ear,
  general: Stethoscope,
};

const specialtyColors = {
  skin: '#EF4444',
  dental: '#F59E0B',
  eyes: '#10B981',
  pediatric: '#8B5CF6',
  ent: '#F97316',
  general: '#2563EB',
};

export default function HomePage() {
  const { t } = useI18n();
  const { user, guestMode } = useAuth();
  const { userAccessLevel, showAds } = useApp();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const sparkleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation sequence
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();

    // Continuous sparkle animation
    const sparkleLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(sparkleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(sparkleAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );
    sparkleLoop.start();

    return () => sparkleLoop.stop();
  }, []);

  const specialties = [
    { key: 'skin', name: t.home.specialties.skin },
    { key: 'dental', name: t.home.specialties.dental },
    { key: 'eyes', name: t.home.specialties.eyes },
    { key: 'pediatric', name: t.home.specialties.pediatric },
    { key: 'ent', name: t.home.specialties.ent },
    { key: 'general', name: t.home.specialties.general },
  ];

  const handleSpecialtyPress = (specialty: string) => {
    router.push({
      pathname: '/analysis',
      params: { specialty }
    });
  };

  const handleUpgradePress = () => {
    router.push('/paywall');
  };

  const handleLoginPress = () => {
    router.push('/login');
  };

  const getWelcomeContent = () => {
    if (guestMode) {
      return {
        title: 'VitalScan AI',
        subtitle: 'Get your health checkup instantly.',
        description: 'AI-powered health assessments available right now – no account required. Start your journey to better health.',
        ctaText: 'Start Health Assessment',
        bgGradient: ['#EFF6FF', '#DBEAFE'],
        accentColor: '#2563EB',
        icon: Heart,
      };
    }

    if (user?.userType === 'professional') {
      if (userAccessLevel === 'professional_subscribed') {
        return {
          title: 'VitalScan AI',
          subtitle: 'Clinical Mode Active – Your professional dashboard awaits.',
          description: 'Access patient analytics, multi-patient history, and advanced diagnostic tools designed for healthcare professionals.',
          ctaText: 'View Patient Analytics',
          bgGradient: ['#ECFDF5', '#D1FAE5'],
          accentColor: '#059669',
          icon: Stethoscope,
        };
      } else {
        return {
          title: 'VitalScan AI',
          subtitle: 'Join Clinical Mode and access pro tools.',
          description: 'Unlock advanced features including patient analytics, multi-patient management, and professional documentation tools.',
          ctaText: 'Upgrade to Clinical Mode',
          bgGradient: ['#FEF3C7', '#FDE68A'],
          accentColor: '#F59E0B',
          icon: Crown,
        };
      }
    }

    // Regular patient
    return {
      title: 'VitalScan AI',
      subtitle: 'Your health journey continues here.',
      description: 'Access your personalized AI health assessments and track your wellness journey with our advanced diagnostic tools.',
      ctaText: 'Continue Assessment',
      bgGradient: ['#F0F9FF', '#E0F2FE'],
      accentColor: '#0EA5E9',
      icon: Heart,
    };
  };

  const welcomeContent = getWelcomeContent();
  const WelcomeIcon = welcomeContent.icon;

  const handleMainCTA = () => {
    if (guestMode || user?.userType === 'patient') {
      // Scroll to specialties or start first assessment
      return;
    }
    
    if (user?.userType === 'professional') {
      if (userAccessLevel === 'professional_subscribed') {
        router.push('/(tabs)/analytics');
      } else {
        handleUpgradePress();
      }
    }
  };

  const sparkleOpacity = sparkleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0.3, 1, 0.3],
  });

  const sparkleRotation = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <Animated.View 
          style={[
            styles.heroSection,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          {/* Background Image */}
          <View style={styles.heroBackground}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800' }}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
            <View style={[styles.gradientOverlay, { backgroundColor: welcomeContent.bgGradient[0] + 'E6' }]} />
          </View>

          {/* Content */}
          <View style={styles.heroContent}>
            {/* Animated Sparkles */}
            <Animated.View 
              style={[
                styles.sparkleContainer,
                {
                  opacity: sparkleOpacity,
                  transform: [{ rotate: sparkleRotation }]
                }
              ]}
            >
              <Sparkles size={24} color={welcomeContent.accentColor} />
            </Animated.View>

            {/* Icon */}
            <View style={[styles.heroIcon, { backgroundColor: welcomeContent.accentColor + '15' }]}>
              <WelcomeIcon size={48} color={welcomeContent.accentColor} />
            </View>

            {/* Location-based Welcome */}
            <LocationWelcome 
              userName={user?.name}
              userType={user?.userType}
              style={styles.locationWelcome}
            />

            {/* Text Content */}
            <Text style={styles.heroTitle}>{welcomeContent.title}</Text>
            <Text style={[styles.heroSubtitle, { color: welcomeContent.accentColor }]}>
              {welcomeContent.subtitle}
            </Text>
            <Text style={styles.heroDescription}>
              {welcomeContent.description}
            </Text>

            {/* CTA Button */}
            <TouchableOpacity 
              style={[styles.heroCTA, { backgroundColor: welcomeContent.accentColor }]}
              onPress={handleMainCTA}
              activeOpacity={0.8}
            >
              <Text style={styles.heroCTAText}>{welcomeContent.ctaText}</Text>
              <TrendingUp size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* User Status */}
        <Animated.View 
          style={[
            styles.statusSection,
            { opacity: fadeAnim }
          ]}
        >
          {guestMode ? (
            <TouchableOpacity style={styles.loginPrompt} onPress={handleLoginPress}>
              <LogIn size={20} color="#2563EB" />
              <Text style={styles.loginPromptText}>Sign in to save your health history</Text>
            </TouchableOpacity>
          ) : user && (
            <View style={[
              styles.userBadge,
              user.userType === 'professional' && styles.userBadgeProfessional,
              userAccessLevel === 'professional_subscribed' && styles.userBadgeSubscribed
            ]}>
              {user.userType === 'professional' ? (
                <Stethoscope size={18} color="#FFFFFF" />
              ) : (
                <Heart size={18} color="#FFFFFF" />
              )}
              <Text style={styles.userBadgeText}>
                {user.userType === 'professional' 
                  ? (userAccessLevel === 'professional_subscribed' ? 'Clinical Mode Active' : 'Health Professional')
                  : 'Patient Account'
                }
              </Text>
              {userAccessLevel === 'professional_subscribed' && (
                <Crown size={16} color="#F59E0B" />
              )}
            </View>
          )}
        </Animated.View>

        {/* Professional Features Banner */}
        {userAccessLevel === 'professional_free' && (
          <Animated.View 
            style={[
              styles.upgradeSection,
              { opacity: fadeAnim }
            ]}
          >
            <TouchableOpacity style={styles.upgradeBanner} onPress={handleUpgradePress}>
              <View style={styles.upgradeContent}>
                <Crown size={28} color="#F59E0B" />
                <View style={styles.upgradeText}>
                  <Text style={styles.upgradeTitle}>Unlock Clinical Mode</Text>
                  <Text style={styles.upgradeSubtitle}>
                    Patient analytics • Multi-patient history • Professional tools
                  </Text>
                </View>
              </View>
              <View style={styles.upgradeArrow}>
                <Text style={styles.upgradeArrowText}>→</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Clinical Mode Active Banner */}
        {userAccessLevel === 'professional_subscribed' && (
          <Animated.View 
            style={[
              styles.clinicalSection,
              { opacity: fadeAnim }
            ]}
          >
            <View style={styles.clinicalBanner}>
              <Shield size={24} color="#059669" />
              <View style={styles.clinicalContent}>
                <Text style={styles.clinicalTitle}>Clinical Mode Active</Text>
                <Text style={styles.clinicalSubtitle}>Full professional access enabled</Text>
              </View>
              <Users size={20} color="#059669" />
            </View>
          </Animated.View>
        )}

        {/* Professional Alert for Free Users */}
        {userAccessLevel === 'professional_free' && (
          <Animated.View 
            style={[
              styles.alertSection,
              { opacity: fadeAnim }
            ]}
          >
            <View style={styles.alertBanner}>
              <AlertCircle size={22} color="#F59E0B" />
              <Text style={styles.alertText}>
                Upgrade to Clinical Mode to unlock professional analytics and patient management tools
              </Text>
            </View>
          </Animated.View>
        )}

        {/* Dappier Ad - Show for patients and free professionals */}
        {showAds && (
          <Animated.View 
            style={[
              styles.adSection,
              { opacity: fadeAnim }
            ]}
          >
            <DappierAd />
          </Animated.View>
        )}

        {/* Specialties Grid */}
        <Animated.View 
          style={[
            styles.specialtiesSection,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.specialtiesTitle}>Choose Your Health Assessment</Text>
          <Text style={styles.specialtiesSubtitle}>
            Select a medical specialty for AI-powered health evaluation
          </Text>
          
          <View style={styles.specialtiesGrid}>
            {specialties.map((specialty, index) => {
              const IconComponent = specialtyIcons[specialty.key as keyof typeof specialtyIcons];
              const color = specialtyColors[specialty.key as keyof typeof specialtyColors];
              
              return (
                <Animated.View
                  key={specialty.key}
                  style={[
                    styles.specialtyCard,
                    { 
                      borderLeftColor: color,
                      transform: [{
                        scale: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [0.8, 1],
                        })
                      }]
                    }
                  ]}
                >
                  <TouchableOpacity
                    style={styles.specialtyButton}
                    onPress={() => handleSpecialtyPress(specialty.name)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.specialtyIcon, { backgroundColor: color + '15' }]}>
                      <IconComponent size={32} color={color} />
                    </View>
                    <Text style={styles.specialtyName}>{specialty.name}</Text>
                    <Text style={styles.specialtyDescription}>{t.home.aiAssessment}</Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>

        {/* Footer */}
        <Animated.View 
          style={[
            styles.footer,
            { opacity: fadeAnim }
          ]}
        >
          <Text style={styles.footerText}>
            {guestMode 
              ? 'AI health assessments available instantly – sign in to save your history and unlock more features'
              : 'Your trusted AI health companion for early detection and professional medical guidance'
            }
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
  },
  
  // Hero Section
  heroSection: {
    height: height * 0.5,
    position: 'relative',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    position: 'relative',
  },
  sparkleContainer: {
    position: 'absolute',
    top: 40,
    right: 40,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  locationWelcome: {
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 24,
  },
  heroDescription: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: 320,
  },
  heroCTA: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  heroCTAText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Status Section
  statusSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#BFDBFE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  loginPromptText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
  },
  userBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userBadgeProfessional: {
    backgroundColor: '#059669',
  },
  userBadgeSubscribed: {
    backgroundColor: '#7C3AED',
  },
  userBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  // Upgrade Section
  upgradeSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  upgradeBanner: {
    backgroundColor: '#FEF3C7',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  upgradeContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  upgradeText: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 4,
  },
  upgradeSubtitle: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  upgradeArrow: {
    marginLeft: 16,
  },
  upgradeArrowText: {
    fontSize: 24,
    color: '#F59E0B',
    fontWeight: 'bold',
  },

  // Clinical Section
  clinicalSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  clinicalBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    borderWidth: 2,
    borderColor: '#059669',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  clinicalContent: {
    flex: 1,
  },
  clinicalTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#059669',
    marginBottom: 2,
  },
  clinicalSubtitle: {
    fontSize: 12,
    color: '#047857',
  },

  // Alert Section
  alertSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  alertText: {
    flex: 1,
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },

  // Ad Section
  adSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  // Specialties Section
  specialtiesSection: {
    padding: 20,
  },
  specialtiesTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  specialtiesSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  specialtiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  specialtyCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  specialtyButton: {
    padding: 24,
    alignItems: 'center',
  },
  specialtyIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  specialtyName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'center',
  },
  specialtyDescription: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },

  // Footer
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
});