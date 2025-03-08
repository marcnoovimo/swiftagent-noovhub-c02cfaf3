
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PerformanceCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  className?: string;
  description?: string;
  change?: string;
  positive?: boolean;
}

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  title,
  value,
  icon,
  className,
  description,
  change,
  positive
}) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">{value}</div>
        {change ? (
          <div className="flex items-center text-xs mt-1">
            {positive !== undefined ? (
              positive ? (
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              )
            ) : null}
            <span className={positive ? "text-green-500" : "text-red-500"}>
              {change}
            </span>
          </div>
        ) : null}
        {description && !change && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PerformanceCard;
