
export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo?: string;
  city: string;
  department: string;
  joinDate: string;
  latitude: number;
  longitude: number;
  bio?: string;
  specialties?: string[];
  status: 'active' | 'inactive';
}
