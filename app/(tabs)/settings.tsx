import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView,
  Switch
} from 'react-native';
import { router } from 'expo-router';
import { User, Shield, Bell, CircleHelp as HelpCircle, ChevronRight, Crown, Globe, LogOut } from 'lucide-react-native';
import { useAuth } from '@/components/AuthProvider';
import { useApp } from '@/components/AppProvider';
import { useI18n } from '@/hooks/useI18n';
import { LanguageSelector } from '@/components/LanguageSelector';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { clinicalMode, setClinicalMode, userAccessLevel } = useApp();
  const { t } = useI18n();

  const handleClinicalModeToggle = (value: boolean) => {
    if (value && userAccessLevel === 'professional_free') {
      router.push('/paywall');
    } else if (userAccessLevel === 'professional_subscribed') {
      setClinicalMode(value);
    }
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  const settingsGroups = [
    {
      title: t.settings.account,
      items: [
        {
          icon: User,
          title: t.settings.profile,
          subtitle: user?.email || t.settings.profileSubtitle,
          onPress: () => {},
        },
        {
          icon: Shield,
          title: t.settings.privacy,
          subtitle: t.settings.privacySubtitle,
          onPress: () => {},
        },
      ]
    },
    // Only show clinical features for professionals
    ...(user?.userType === 'professional' ? [{
      title: t.settings.clinicalFeatures,
      items: [
        {
          icon: Crown,
          title: t.settings.clinicalMode,
          subtitle: userAccessLevel === 'professional_subscribed' 
            ? t.settings.clinicalModeEnabled 
            : t.settings.clinicalModeDisabled,
          isToggle: true,
          toggleValue: clinicalMode && userAccessLevel === 'professional_subscribed',
          onToggle: handleClinicalModeToggle,
          isPremium: true,
          disabled: userAccessLevel === 'professional_free',
        },
      ]
    }] : []),
    {
      title: t.settings.preferences,
      items: [
        {
          icon: Bell,
          title: t.settings.notifications,
          subtitle: t.settings.notificationsSubtitle,
          onPress: () => {},
        },
        {
          icon: Globe,
          title: t.settings.language,
          subtitle: t.settings.languageSubtitle,
          isCustom: true,
          customComponent: <LanguageSelector showIcon={false} />,
        },
      ]
    },
    {
      title: t.settings.support,
      items: [
        {
          icon: HelpCircle,
          title: t.settings.help,
          subtitle: t.settings.helpSubtitle,
          onPress: () => {},
        },
        {
          icon: LogOut,
          title: 'Sign Out',
          subtitle: 'Sign out of your account',
          onPress: handleLogout,
          isDestructive: true,
        },
      ]
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{t.settings.title}</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Info Card */}
        {user && (
          <View style={styles.userCard}>
            <View style={styles.userInfo}>
              <View style={[
                styles.userAvatar,
                user.userType === 'professional' && styles.userAvatarProfessional
              ]}>
                <Text style={styles.userAvatarText}>
                  {user.name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
                <View style={[
                  styles.userTypeBadge,
                  user.userType === 'professional' && styles.userTypeBadgeProfessional
                ]}>
                  <Text style={styles.userTypeBadgeText}>
                    {user.userType === 'professional' ? 'Health Professional' : 'Patient'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Subscription Status */}
        {userAccessLevel === 'professional_subscribed' && (
          <View style={styles.subscriptionBanner}>
            <Crown size={24} color="#F59E0B" />
            <View style={styles.subscriptionInfo}>
              <Text style={styles.subscriptionTitle}>{t.settings.subscriptionActive}</Text>
              <Text style={styles.subscriptionSubtitle}>
                {t.settings.subscriptionSubtitle}
              </Text>
            </View>
          </View>
        )}

        {/* Professional Upgrade Banner */}
        {userAccessLevel === 'professional_free' && (
          <TouchableOpacity 
            style={styles.upgradeBanner}
            onPress={() => router.push('/paywall')}
          >
            <Crown size={24} color="#F59E0B" />
            <View style={styles.upgradeInfo}>
              <Text style={styles.upgradeTitle}>Upgrade to Clinical Mode</Text>
              <Text style={styles.upgradeSubtitle}>
                Unlock professional features and advanced tools
              </Text>
            </View>
            <ChevronRight size={20} color="#F59E0B" />
          </TouchableOpacity>
        )}

        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.settingsGroup}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupItems}>
              {group.items.map((item, itemIndex) => {
                const IconComponent = item.icon;
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    style={[
                      styles.settingsItem,
                      itemIndex === group.items.length - 1 && styles.settingsItemLast,
                      item.disabled && styles.settingsItemDisabled
                    ]}
                    onPress={item.onPress}
                    disabled={item.isToggle || item.isCustom || item.disabled}
                  >
                    <View style={styles.settingsItemLeft}>
                      <View style={[
                        styles.iconContainer,
                        item.isPremium && styles.premiumIconContainer,
                        item.isDestructive && styles.destructiveIconContainer
                      ]}>
                        <IconComponent 
                          size={20} 
                          color={
                            item.isDestructive ? '#EF4444' :
                            item.isPremium ? '#F59E0B' : '#64748B'
                          } 
                        />
                      </View>
                      <View style={styles.settingsItemText}>
                        <Text style={[
                          styles.settingsItemTitle,
                          item.isDestructive && styles.settingsItemTitleDestructive
                        ]}>
                          {item.title}
                        </Text>
                        <Text style={styles.settingsItemSubtitle}>{item.subtitle}</Text>
                      </View>
                    </View>
                    
                    {item.isToggle ? (
                      <Switch
                        value={item.toggleValue}
                        onValueChange={item.onToggle}
                        trackColor={{ false: '#E2E8F0', true: '#2563EB' }}
                        thumbColor={item.toggleValue ? '#FFFFFF' : '#FFFFFF'}
                        disabled={item.disabled}
                      />
                    ) : item.isCustom ? (
                      item.customComponent
                    ) : !item.isDestructive ? (
                      <ChevronRight size={20} color="#CBD5E1" />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.appInfo}>
          <Text style={styles.appName}>{t.settings.appName}</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appDescription}>
            {t.settings.appDescription}
          </Text>
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
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1E293B',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  userCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarProfessional: {
    backgroundColor: '#059669',
  },
  userAvatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 8,
  },
  userTypeBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  userTypeBadgeProfessional: {
    backgroundColor: '#ECFDF5',
  },
  userTypeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563EB',
  },
  subscriptionBanner: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  subscriptionInfo: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 2,
  },
  subscriptionSubtitle: {
    fontSize: 12,
    color: '#92400E',
  },
  upgradeBanner: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  upgradeInfo: {
    flex: 1,
  },
  upgradeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 2,
  },
  upgradeSubtitle: {
    fontSize: 12,
    color: '#92400E',
  },
  settingsGroup: {
    marginBottom: 32,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  groupItems: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingsItemLast: {
    borderBottomWidth: 0,
  },
  settingsItemDisabled: {
    opacity: 0.5,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  premiumIconContainer: {
    backgroundColor: '#FEF3C7',
  },
  destructiveIconContainer: {
    backgroundColor: '#FEF2F2',
  },
  settingsItemText: {
    flex: 1,
  },
  settingsItemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1E293B',
    marginBottom: 2,
  },
  settingsItemTitleDestructive: {
    color: '#EF4444',
  },
  settingsItemSubtitle: {
    fontSize: 12,
    color: '#64748B',
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  appName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  appVersion: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 8,
  },
  appDescription: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
});