
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface PerformanceCardProps {
  title: string;
  value: string;
  change?: string;
  positive?: boolean;
  icon?: React.ReactNode;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  value,
  change,
  positive = true,
  icon,
}) => {
  return (
    <div className="glass-card rounded-xl p-2 sm:p-4 transition-all duration-300 hover:shadow-medium">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground">{title}</p>
          <h3 className="text-xl sm:text-2xl font-semibold mt-1 sm:mt-2">{value}</h3>
          
          {change && (
            <div className="flex items-center mt-1">
              <span className={`text-xs font-medium flex items-center ${positive ? 'text-green-600' : 'text-red-600'}`}>
                <ArrowUpRight size={12} className={`mr-0.5 ${!positive && 'rotate-180'}`} />
                {change}
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="bg-noovimo-50 p-1.5 sm:p-2 rounded-lg">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceCard;
