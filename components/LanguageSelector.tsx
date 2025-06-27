import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { X, Globe } from 'lucide-react-native';
import { useI18n } from '@/hooks/useI18n';
import { languageOptions } from '@/locales';
import { SupportedLanguage } from '@/types/i18n';

interface LanguageSelectorProps {
  showIcon?: boolean;
  showText?: boolean;
}

export function LanguageSelector({ showIcon = true, showText = true }: LanguageSelectorProps) {
  const { language, setLanguage, t } = useI18n();
  const [modalVisible, setModalVisible] = useState(false);

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode: SupportedLanguage) => {
    setLanguage(langCode);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selector}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        {showIcon && <Globe size={20} color="#64748B" />}
        {showText && (
          <Text style={styles.selectorText}>
            {currentLanguage?.flag} {currentLanguage?.nativeName}
          </Text>
        )}
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{t.settings.language}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <X size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.languageList}>
            {languageOptions.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageItem,
                  language === lang.code && styles.languageItemSelected
                ]}
                onPress={() => handleLanguageSelect(lang.code)}
              >
                <View style={styles.languageInfo}>
                  <Text style={styles.languageFlag}>{lang.flag}</Text>
                  <View style={styles.languageText}>
                    <Text style={styles.languageName}>{lang.nativeName}</Text>
                    <Text style={styles.languageNameEn}>{lang.name}</Text>
                  </View>
                </View>
                {language === lang.code && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  selectorText: {
    fontSize: 14,
    color: '#1E293B',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
  },
  closeButton: {
    padding: 4,
  },
  languageList: {
    flex: 1,
    padding: 20,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  languageItemSelected: {
    borderWidth: 2,
    borderColor: '#2563EB',
  },
  languageInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageFlag: {
    fontSize: 24,
  },
  languageText: {
    gap: 2,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
  },
  languageNameEn: {
    fontSize: 12,
    color: '#64748B',
  },
  selectedIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },
});