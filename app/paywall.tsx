import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { router } from 'expo-router';
import { ArrowLeft, Crown, Check, Zap, Shield, FileText, Filter, ChartBar as BarChart3, Users, Phone } from 'lucide-react-native';
import { useApp } from '@/components/AppProvider';
import { useI18n } from '@/hooks/useI18n';

export default function PaywallScreen() {
  const { setIsSubscribed, setClinicalMode } = useApp();
  const { t } = useI18n();

  const handleStartTrial = () => {
    // Activate subscription and clinical mode for doctors
    setIsSubscribed(true);
    setClinicalMode(true);
    
    // Navigate back to home/tabs instead of result screen
    router.replace('/(tabs)');
    
    // Show success message
    Alert.alert(
      'Clinical Mode Activated!',
      'You now have access to all professional features including patient analytics, advanced filtering, and clinical documentation tools.',
      [{ text: 'Get Started', style: 'default' }]
    );
  };

  const handleBack = () => {
    router.back();
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Patient Analytics Dashboard',
      description: 'Comprehensive analytics with patient statistics and trends'
    },
    {
      icon: Users,
      title: 'Multi-Patient History',
      description: 'Access and manage assessments across multiple patients'
    },
    {
      icon: FileText,
      title: 'Doctor Notes & Documentation',
      description: 'Add professional notes and observations to each diagnosis'
    },
    {
      icon: Filter,
      title: 'Advanced Filtering & Search',
      description: 'Filter assessments by specialty, date, and custom criteria'
    },
    {
      icon: Shield,
      title: 'Export Capabilities',
      description: 'Export assessment reports as PDF for medical records'
    },
    {
      icon: Phone,
      title: 'Patient Contact Tools',
      description: 'Direct patient communication and follow-up features'
    },
    {
      icon: Zap,
      title: 'Ad-Free Experience',
      description: 'Remove all advertisements for distraction-free workflow'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <ArrowLeft size={24} color="#64748B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Clinical Mode</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <View style={styles.crownContainer}>
            <Crown size={48} color="#F59E0B" />
          </View>
          <Text style={styles.heroTitle}>Unlock Clinical Mode</Text>
          <Text style={styles.heroSubtitle}>
            Professional tools designed for healthcare providers with advanced patient management and analytics
          </Text>
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Professional Features</Text>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureIcon}>
                  <IconComponent size={20} color="#2563EB" />
                </View>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                </View>
                <View style={styles.featureCheck}>
                  <Check size={16} color="#10B981" />
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.pricingSection}>
          <View style={styles.pricingCard}>
            <View style={styles.pricingHeader}>
              <Text style={styles.pricingTitle}>Clinical Mode</Text>
              <View style={styles.pricingBadge}>
                <Text style={styles.pricingBadgeText}>Most Popular</Text>
              </View>
            </View>
            
            <View style={styles.pricingPrice}>
              <Text style={styles.priceAmount}>$29.99</Text>
              <Text style={styles.pricePeriod}>/month</Text>
            </View>
            
            <Text style={styles.pricingDescription}>
              Full access to all clinical features, patient analytics, and priority support
            </Text>

            <View style={styles.trialInfo}>
              <Text style={styles.trialText}>✨ Start with a 7-day free trial</Text>
              <Text style={styles.trialSubtext}>Cancel anytime, no commitment required</Text>
            </View>
          </View>
        </View>

        <View style={styles.revenueCatInfo}>
          <Text style={styles.revenueCatTitle}>💡 Implementation Note</Text>
          <Text style={styles.revenueCatText}>
            This demo simulates subscription functionality. For production, integrate RevenueCat for:
          </Text>
          <Text style={styles.revenueCatList}>
            • Apple App Store & Google Play billing{'\n'}
            • Receipt validation & fraud protection{'\n'}
            • Subscription analytics & insights{'\n'}
            • Cross-platform user management
          </Text>
        </View>

        {/* Built with Bolt.new Badge */}
        <View style={styles.boltBadgeContainer}>
          <Image
            source={{ uri: 'https://bolt.new/Badge.svg' }}
            style={styles.boltBadge}
            resizeMode="contain"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.trialButton} onPress={handleStartTrial}>
          <Text style={styles.trialButtonText}>Start Free Trial</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.backToPatientButton} onPress={handleBack}>
          <Text style={styles.backToPatientButtonText}>Continue with Basic Features</Text>
        </TouchableOpacity>
        
        <Text style={styles.disclaimerText}>
          By starting your trial, you agree to our Terms of Service and Privacy Policy. 
          Your subscription will automatically renew unless cancelled before the trial ends.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  crownContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    gap: 12,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#64748B',
    lineHeight: 20,
  },
  featureCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pricingSection: {
    marginBottom: 32,
  },
  pricingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  pricingTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  pricingBadge: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pricingBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  pricingPrice: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 12,
  },
  priceAmount: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1E293B',
  },
  pricePeriod: {
    fontSize: 18,
    color: '#64748B',
    marginLeft: 4,
  },
  pricingDescription: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 20,
    lineHeight: 20,
  },
  trialInfo: {
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#10B981',
  },
  trialText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#047857',
    marginBottom: 2,
  },
  trialSubtext: {
    fontSize: 12,
    color: '#047857',
  },
  revenueCatInfo: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
  },
  revenueCatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  revenueCatText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
    lineHeight: 20,
  },
  revenueCatList: {
    fontSize: 12,
    color: '#475569',
    lineHeight: 18,
  },
  boltBadgeContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  boltBadge: {
    width: 120,
    height: 40,
  },
  footer: {
    padding: 20,
    paddingBottom: 40,
    gap: 12,
  },
  trialButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  trialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  backToPatientButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  backToPatientButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748B',
  },
  disclaimerText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 8,
  },
});