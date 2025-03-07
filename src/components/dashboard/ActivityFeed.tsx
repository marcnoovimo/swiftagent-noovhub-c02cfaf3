
import React from 'react';
import { Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'document' | 'message' | 'notification' | 'alert';
}

interface ActivityFeedProps {
  activities: ActivityItem[];
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'document':
        return <div className="w-2 h-2 rounded-full bg-blue-500" />;
      case 'message':
        return <div className="w-2 h-2 rounded-full bg-green-500" />;
      case 'notification':
        return <div className="w-2 h-2 rounded-full bg-yellow-500" />;
      case 'alert':
        return <div className="w-2 h-2 rounded-full bg-red-500" />;
      default:
        return <div className="w-2 h-2 rounded-full bg-gray-500" />;
    }
  };

  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Activité récente</h3>
      </div>
      
      <div className="space-y-3">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-start p-3 rounded-lg transition-all duration-200 hover:bg-secondary/50"
          >
            <div className="mr-3 mt-1">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1">
              <p className="font-medium text-sm">{activity.title}</p>
              <p className="text-muted-foreground text-xs mt-1">{activity.description}</p>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground ml-2">
              <Clock size={12} className="mr-1" />
              {activity.time}
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full text-center text-sm text-noovimo-500 hover:text-noovimo-600 mt-4 py-2">
        Voir toutes les activités
      </button>
    </div>
  );
};

export default ActivityFeed;
