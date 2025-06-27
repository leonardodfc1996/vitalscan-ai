import { useMemo } from 'react';
import { useLocation } from './useLocation';

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  location: string;
  isVirtual?: boolean;
  calendlyUrl: string;
  avatar: string;
  rating?: number;
  reviewCount?: number;
  experience?: string;
  languages?: string[];
  consultationTypes?: ('virtual' | 'in-person' | 'phone')[];
}

interface DoctorsByLocation {
  [key: string]: Doctor[];
}

// Enhanced doctor database with more realistic data
const doctorDatabase: DoctorsByLocation = {
  'VE': [ // Venezuela
    {
      id: 'fabiola-l',
      name: 'Dr. Fabiola López',
      specialty: 'Pediatrics',
      location: 'Caracas, Venezuela',
      calendlyUrl: 'https://calendly.com/leonardofernandez-uny/medical-consultation',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.9,
      reviewCount: 156,
      experience: '12 years',
      languages: ['Spanish', 'English'],
      consultationTypes: ['in-person', 'phone']
    },
    {
      id: 'frederick-r',
      name: 'Dr. Frederick Rodríguez',
      specialty: 'Dental',
      location: 'Valencia, Venezuela',
      calendlyUrl: 'https://calendly.com/leonardofernandez-uny/medical-consultation',
      avatar: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      reviewCount: 203,
      experience: '8 years',
      languages: ['Spanish'],
      consultationTypes: ['in-person']
    }
  ],
  'MX': [ // Mexico
    {
      id: 'carlos-p',
      name: 'Dr. Carlos Pérez',
      specialty: 'Skin',
      location: 'Mexico City, Mexico',
      calendlyUrl: 'https://calendly.com/leonardofernandez-uny/medical-consultation',
      avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.7,
      reviewCount: 189,
      experience: '15 years',
      languages: ['Spanish', 'English'],
      consultationTypes: ['in-person', 'virtual']
    },
    {
      id: 'lucia-h',
      name: 'Dra. Lucía Hernández',
      specialty: 'ENT',
      location: 'Guadalajara, Mexico',
      calendlyUrl: 'https://calendly.com/leonardofernandez-uny/medical-consultation',
      avatar: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.9,
      reviewCount: 142,
      experience: '10 years',
      languages: ['Spanish', 'English'],
      consultationTypes: ['in-person', 'phone']
    }
  ],
  'CO': [ // Colombia
    {
      id: 'andrea-g',
      name: 'Dra. Andrea García',
      specialty: 'Eyes',
      location: 'Bogotá, Colombia',
      calendlyUrl: 'https://calendly.com/leonardofernandez-uny/medical-consultation',
      avatar: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.8,
      reviewCount: 167,
      experience: '11 years',
      languages: ['Spanish', 'English'],
      consultationTypes: ['in-person', 'virtual']
    },
    {
      id: 'felipe-r',
      name: 'Dr. Felipe Ramírez',
      specialty: 'General',
      location: 'Medellín, Colombia',
      calendlyUrl: 'https://calendly.com/leonardofernandez-uny/medical-consultation',
      avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=300',
      rating: 4.6,
      reviewCount: 234,
      experience: '9 years',
      languages: ['Spanish'],
      consultationTypes: ['in-person', 'phone']
    }
  ]
};

// Enhanced virtual fallback doctor
const virtualDoctor: Doctor = {
  id: 'ana-m',
  name: 'Dr. Ana Martínez',
  specialty: 'General Medicine',
  location: 'Virtual Consultation',
  isVirtual: true,
  calendlyUrl: 'https://calendly.com/leonardofernandez-uny/medical-consultation',
  avatar: 'https://images.pexels.com/photos/5327580/pexels-photo-5327580.jpeg?auto=compress&cs=tinysrgb&w=300',
  rating: 4.9,
  reviewCount: 312,
  experience: '14 years',
  languages: ['Spanish', 'English', 'Portuguese'],
  consultationTypes: ['virtual', 'phone']
};

export function useNearbyDoctors(requestedSpecialty?: string) {
  const { location, isLoading } = useLocation();

  const nearbyDoctors = useMemo(() => {
    if (isLoading || !location) {
      return [];
    }

    const countryDoctors = doctorDatabase[location.countryCode] || [];
    
    // If a specific specialty is requested, try to find a matching doctor
    if (requestedSpecialty) {
      const specialtyDoctor = countryDoctors.find(doctor => 
        normalizeSpecialty(doctor.specialty).toLowerCase() === requestedSpecialty.toLowerCase()
      );
      
      if (specialtyDoctor) {
        return [specialtyDoctor];
      } else {
        // No specialist found nearby, return virtual consultation
        return [];
      }
    }

    // Return all doctors in the country (limit to 2 for better UX)
    return countryDoctors.slice(0, 2);
  }, [location, isLoading, requestedSpecialty]);

  const hasNearbySpecialist = useMemo(() => {
    if (!requestedSpecialty || isLoading || !location) {
      return true;
    }

    const countryDoctors = doctorDatabase[location.countryCode] || [];
    return countryDoctors.some(doctor => 
      normalizeSpecialty(doctor.specialty).toLowerCase() === requestedSpecialty.toLowerCase()
    );
  }, [location, isLoading, requestedSpecialty]);

  return {
    doctors: nearbyDoctors,
    isLoading,
    location,
    hasNearbySpecialist,
    virtualDoctor
  };
}

// Helper function to map specialty names to standardized keys
export function normalizeSpecialty(specialty: string): string {
  const specialtyMap: Record<string, string> = {
    // English
    'Skin': 'Skin',
    'Dermatology': 'Skin',
    'Dental': 'Dental',
    'Dentistry': 'Dental',
    'Eyes': 'Eyes',
    'Ophthalmology': 'Eyes',
    'Pediatric': 'Pediatrics',
    'Pediatrics': 'Pediatrics',
    'ENT': 'ENT',
    'Otolaryngology': 'ENT',
    'General': 'General',
    'General Medicine': 'General',
    
    // Spanish
    'Piel': 'Skin',
    'Dermatología': 'Skin',
    'Ojos': 'Eyes',
    'Oftalmología': 'Eyes',
    'Pediátrica': 'Pediatrics',
    'Pediatría': 'Pediatrics',
    'ORL': 'ENT',
    'Otorrinolaringología': 'ENT',
    
    // Portuguese
    'Pele': 'Skin',
    'Olhos': 'Eyes',
    'Pediátrica': 'Pediatrics',
    'Pediatria': 'Pediatrics',
    'Geral': 'General',
    
    // French
    'Peau': 'Skin',
    'Yeux': 'Eyes',
    'Pédiatrique': 'Pediatrics',
    'Général': 'General',
  };
  
  return specialtyMap[specialty] || specialty;
}