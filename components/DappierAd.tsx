import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ExternalLink } from 'lucide-react-native';

export function DappierAd() {
  const handleAdPress = () => {
    // In a real app, this would open the ad link
    console.log('Ad clicked');
  };

  return (
    <View style={styles.container}>
      <View style={styles.adLabel}>
        <Text style={styles.adLabelText}>Sponsored</Text>
      </View>
      
      <TouchableOpacity style={styles.adContent} onPress={handleAdPress} activeOpacity={0.8}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=400' }}
          style={styles.adImage}
          resizeMode="cover"
        />
        
        <View style={styles.adText}>
          <Text style={styles.adTitle}>Advanced Health Monitoring</Text>
          <Text style={styles.adDescription}>
            Discover cutting-edge health tracking devices for better wellness management
          </Text>
          <View style={styles.adCta}>
            <Text style={styles.adCtaText}>Learn More</Text>
            <ExternalLink size={14} color="#2563EB" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  adLabel: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
  },
  adLabelText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  adContent: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  adImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  adText: {
    flex: 1,
  },
  adTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  adDescription: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 8,
  },
  adCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  adCtaText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
  },
});