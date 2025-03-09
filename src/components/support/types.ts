
import { LucideIcon } from 'lucide-react';

export interface Guide {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  excerpt?: string;
  lastUpdated: string;
  views?: number;
  likes?: number;
  relatedGuides?: {
    id: string;
    title: string;
  }[];
}

export interface GuideCategory {
  id: string;
  name: string;
  icon?: LucideIcon;
  guides: Guide[];
}
