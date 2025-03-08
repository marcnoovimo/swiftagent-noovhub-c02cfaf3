
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  positive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, positive = true }) => {
  return (
    <div className="glass-card rounded-xl p-3 sm:p-4 transition-all hover:shadow-medium">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground">{title}</p>
          <h3 className="text-lg sm:text-2xl font-semibold mt-1 sm:mt-2">
            {typeof value === 'number' && value >= 1000 
              ? value.toLocaleString('fr-FR')
              : value}
          </h3>
          
          {change && (
            <div className="flex items-center mt-1">
              <span className={`text-xs font-medium ${positive ? 'text-green-600' : 'text-red-600'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        
        <div className="bg-noovimo-50 p-1.5 sm:p-2 rounded-lg">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
