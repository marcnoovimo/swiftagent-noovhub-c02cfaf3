
// Extended agent interface for our application
export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  city: string;
  department: string;
  joinDate: string;
  latitude: number;
  longitude: number;
  bio?: string;
  specialties?: string[];
  
  // Additional properties needed for profile page
  role?: string;
  location?: string;
  address?: string;
  licensedSince?: string;
  avatar?: string;
}

// Commission pack interface
export interface CommissionPack {
  id: string;
  name: string;
  description: string;
  baseRate: number;
  tiers: CommissionTier[];
}

// Commission tier interface
export interface CommissionTier {
  threshold: number;
  rate: number;
}
