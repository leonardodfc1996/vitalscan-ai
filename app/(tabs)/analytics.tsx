import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Calendar,
  Filter,
  Download,
  Phone,
  Mail
} from 'lucide-react-native';
import { useApp } from '@/components/AppProvider';
import { useAuth } from '@/components/AuthProvider';
import { useI18n } from '@/hooks/useI18n';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const { diagnoses, patientAnalytics, userAccessLevel } = useApp();
  const { user } = useAuth();
  const { t } = useI18n();
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');

  // Only allow subscribed professionals
  if (userAccessLevel !== 'professional_subscribed') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.restrictedContainer}>
          <BarChart3 size={64} color="#CBD5E1" />
          <Text style={styles.restrictedTitle}>Analytics Unavailable</Text>
          <Text style={styles.restrictedSubtitle}>
            Upgrade to Clinical Mode to access patient analytics and statistics
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const timeframes = [
    { key: '7d', label: '7 Days' },
    { key: '30d', label: '30 Days' },
    { key: '90d', label: '90 Days' },
    { key: '1y', label: '1 Year' },
  ];

  const handleExportData = () => {
    // In a real app, this would export data as PDF/CSV
    console.log('Exporting analytics data...');
  };

  const handleContactPatient = (patientId: string) => {
    // In a real app, this would open contact options
    console.log('Contacting patient:', patientId);
  };

  const getTopSpecialties = () => {
    return Object.entries(patientAnalytics.specialtyBreakdown)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);
  };

  const getRecentPatients = () => {
    const uniquePatients = new Set();
    return diagnoses
      .filter(d => {
        if (uniquePatients.has(d.patientId)) return false;
        uniquePatients.add(d.patientId);
        return true;
      })
      .slice(0, 5);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Patient Analytics</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.exportButton} onPress={handleExportData}>
            <Download size={20} color="#2563EB" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#64748B" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Timeframe Selector */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.timeframeContainer}
          contentContainerStyle={styles.timeframeContent}
        >
          {timeframes.map((timeframe) => (
            <TouchableOpacity
              key={timeframe.key}
              style={[
                styles.timeframeChip,
                selectedTimeframe === timeframe.key && styles.timeframeChipActive
              ]}
              onPress={() => setSelectedTimeframe(timeframe.key)}
            >
              <Text style={[
                styles.timeframeChipText,
                selectedTimeframe === timeframe.key && styles.timeframeChipTextActive
              ]}>
                {timeframe.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Key Metrics */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Users size={24} color="#2563EB" />
            </View>
            <Text style={styles.metricValue}>{patientAnalytics.totalDiagnoses}</Text>
            <Text style={styles.metricLabel}>Total Assessments</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <TrendingUp size={24} color="#10B981" />
            </View>
            <Text style={styles.metricValue}>
              {Math.round(patientAnalytics.totalDiagnoses / 30 * 7)}
            </Text>
            <Text style={styles.metricLabel}>This Week</Text>
          </View>

          <View style={styles.metricCard}>
            <View style={styles.metricIcon}>
              <Calendar size={24} color="#F59E0B" />
            </View>
            <Text style={styles.metricValue}>
              {patientAnalytics.recentActivity.length}
            </Text>
            <Text style={styles.metricLabel}>Recent Activity</Text>
          </View>
        </View>

        {/* Top Specialties */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Specialties</Text>
          <View style={styles.specialtyChart}>
            {getTopSpecialties().map(([specialty, count], index) => (
              <View key={specialty} style={styles.specialtyItem}>
                <View style={styles.specialtyInfo}>
                  <Text style={styles.specialtyName}>{specialty}</Text>
                  <Text style={styles.specialtyCount}>{count} assessments</Text>
                </View>
                <View style={styles.specialtyBar}>
                  <View 
                    style={[
                      styles.specialtyBarFill,
                      { 
                        width: `${(count / Math.max(...Object.values(patientAnalytics.specialtyBreakdown))) * 100}%`,
                        backgroundColor: ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'][index]
                      }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Common Conditions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Common Conditions</Text>
          <View style={styles.conditionsList}>
            {patientAnalytics.commonConditions.map((condition, index) => (
              <View key={index} style={styles.conditionItem}>
                <Text style={styles.conditionText}>{condition}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Patients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Patients</Text>
          <View style={styles.patientsList}>
            {getRecentPatients().map((diagnosis) => (
              <View key={diagnosis.id} style={styles.patientItem}>
                <View style={styles.patientInfo}>
                  <Text style={styles.patientId}>
                    Patient #{diagnosis.patientId?.slice(-6) || 'Unknown'}
                  </Text>
                  <Text style={styles.patientSpecialty}>{diagnosis.specialty}</Text>
                  <Text style={styles.patientDate}>
                    {diagnosis.timestamp.toLocaleDateString()}
                  </Text>
                </View>
                <View style={styles.patientActions}>
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => handleContactPatient(diagnosis.patientId || '')}
                  >
                    <Phone size={16} color="#2563EB" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => handleContactPatient(diagnosis.patientId || '')}
                  >
                    <Mail size={16} color="#2563EB" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  exportButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F1F5F9',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  restrictedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  restrictedTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  restrictedSubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  timeframeContainer: {
    marginBottom: 24,
  },
  timeframeContent: {
    gap: 8,
  },
  timeframeChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  timeframeChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  timeframeChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  timeframeChipTextActive: {
    color: '#FFFFFF',
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  specialtyChart: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  specialtyItem: {
    marginBottom: 16,
  },
  specialtyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  specialtyName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  specialtyCount: {
    fontSize: 12,
    color: '#64748B',
  },
  specialtyBar: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  specialtyBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  conditionsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  conditionItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  conditionText: {
    fontSize: 14,
    color: '#475569',
  },
  patientsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  patientItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  patientInfo: {
    flex: 1,
  },
  patientId: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  patientSpecialty: {
    fontSize: 12,
    color: '#2563EB',
    marginBottom: 2,
  },
  patientDate: {
    fontSize: 12,
    color: '#64748B',
  },
  patientActions: {
    flexDirection: 'row',
    gap: 8,
  },
  contactButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
  },
});