import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { Calendar, Filter, FileText, CreditCard as Edit3, Search } from 'lucide-react-native';
import { useApp } from '@/components/AppProvider';
import { useAuth } from '@/components/AuthProvider';
import { useI18n } from '@/hooks/useI18n';

export default function HistoryScreen() {
  const { diagnoses, updateDiagnosisNotes, userAccessLevel } = useApp();
  const { user } = useAuth();
  const { t } = useI18n();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  const specialties = [
    'All',
    t.home.specialties.skin,
    t.home.specialties.dental,
    t.home.specialties.eyes,
    t.home.specialties.pediatric,
    t.home.specialties.ent,
    t.home.specialties.general
  ];

  const filteredDiagnoses = diagnoses.filter(diagnosis => {
    const matchesFilter = selectedFilter === 'All' || diagnosis.specialty === selectedFilter;
    const matchesSearch = diagnosis.symptoms.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         diagnosis.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEditNotes = (diagnosisId: string, currentNotes: string = '') => {
    setEditingNotes(diagnosisId);
    setTempNotes(currentNotes);
  };

  const handleSaveNotes = (diagnosisId: string) => {
    updateDiagnosisNotes(diagnosisId, tempNotes);
    setEditingNotes(null);
    setTempNotes('');
  };

  const handleCancelEdit = () => {
    setEditingNotes(null);
    setTempNotes('');
  };

  const canEditNotes = userAccessLevel === 'professional_subscribed';
  const canFilter = userAccessLevel === 'professional_subscribed';

  if (diagnoses.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{t.history.title}</Text>
          {user?.userType === 'professional' && (
            <Text style={[
              styles.modeBadge,
              userAccessLevel === 'professional_subscribed' && styles.modeBadgeActive
            ]}>
              {userAccessLevel === 'professional_subscribed' ? t.history.clinicalMode : 'Professional'}
            </Text>
          )}
        </View>
        <View style={styles.emptyContainer}>
          <FileText size={64} color="#CBD5E1" />
          <Text style={styles.emptyTitle}>{t.history.noAssessments}</Text>
          <Text style={styles.emptySubtitle}>
            {t.history.noAssessmentsSubtitle}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.history.title}</Text>
        {user?.userType === 'professional' && (
          <Text style={[
            styles.modeBadge,
            userAccessLevel === 'professional_subscribed' && styles.modeBadgeActive
          ]}>
            {userAccessLevel === 'professional_subscribed' ? t.history.clinicalMode : 'Professional'}
          </Text>
        )}
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#64748B" />
          <TextInput
            style={styles.searchInput}
            placeholder={t.history.searchPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#94A3B8"
          />
        </View>
      </View>

      {/* Filter - Only show for subscribed professionals */}
      {canFilter && (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
          contentContainerStyle={styles.filterContent}
        >
          {specialties.map((specialty) => (
            <TouchableOpacity
              key={specialty}
              style={[
                styles.filterChip,
                selectedFilter === specialty && styles.filterChipActive
              ]}
              onPress={() => setSelectedFilter(specialty)}
            >
              <Text style={[
                styles.filterChipText,
                selectedFilter === specialty && styles.filterChipTextActive
              ]}>
                {specialty}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredDiagnoses.map((diagnosis) => (
          <View key={diagnosis.id} style={styles.diagnosisCard}>
            <View style={styles.diagnosisHeader}>
              <View style={styles.diagnosisInfo}>
                <Text style={styles.diagnosisSpecialty}>{diagnosis.specialty}</Text>
                <View style={styles.diagnosisDate}>
                  <Calendar size={14} color="#64748B" />
                  <Text style={styles.diagnosisDateText}>
                    {formatDate(diagnosis.timestamp)}
                  </Text>
                </View>
              </View>
            </View>

            <Text style={styles.diagnosisSymptoms}>{diagnosis.symptoms}</Text>

            <View style={styles.resultsContainer}>
              <Text style={styles.resultsTitle}>{t.history.aiResults}</Text>
              {diagnosis.results.map((result, index) => (
                <Text key={index} style={styles.resultItem}>• {result}</Text>
              ))}
            </View>

            {/* Clinical Mode Features - Only for subscribed professionals */}
            {canEditNotes && (
              <View style={styles.clinicalSection}>
                <View style={styles.notesHeader}>
                  <Text style={styles.notesTitle}>{t.history.doctorNotes}</Text>
                  {editingNotes !== diagnosis.id && (
                    <TouchableOpacity
                      onPress={() => handleEditNotes(diagnosis.id, diagnosis.doctorNotes)}
                    >
                      <Edit3 size={16} color="#2563EB" />
                    </TouchableOpacity>
                  )}
                </View>

                {editingNotes === diagnosis.id ? (
                  <View style={styles.editingContainer}>
                    <TextInput
                      style={styles.notesInput}
                      multiline
                      numberOfLines={3}
                      placeholder={t.history.addNotesPlaceholder}
                      value={tempNotes}
                      onChangeText={setTempNotes}
                      placeholderTextColor="#94A3B8"
                    />
                    <View style={styles.editingButtons}>
                      <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={handleCancelEdit}
                      >
                        <Text style={styles.cancelButtonText}>{t.common.cancel}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.saveNotesButton}
                        onPress={() => handleSaveNotes(diagnosis.id)}
                      >
                        <Text style={styles.saveNotesButtonText}>{t.common.save}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <Text style={styles.notesText}>
                    {diagnosis.doctorNotes || t.history.noNotesYet}
                  </Text>
                )}
              </View>
            )}
          </View>
        ))}
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
  modeBadge: {
    backgroundColor: '#F1F5F9',
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  modeBadgeActive: {
    backgroundColor: '#0D9488',
    color: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },
  filterContainer: {
    paddingBottom: 16,
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
  },
  diagnosisCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  diagnosisHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  diagnosisInfo: {
    flex: 1,
  },
  diagnosisSpecialty: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  diagnosisDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  diagnosisDateText: {
    fontSize: 12,
    color: '#64748B',
  },
  diagnosisSymptoms: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 16,
    lineHeight: 20,
  },
  resultsContainer: {
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  resultItem: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 4,
    lineHeight: 18,
  },
  clinicalSection: {
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingTop: 16,
  },
  notesHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  notesText: {
    fontSize: 13,
    color: '#64748B',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  editingContainer: {
    gap: 12,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#1E293B',
    backgroundColor: '#F8FAFC',
    textAlignVertical: 'top',
  },
  editingButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  saveNotesButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  saveNotesButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});