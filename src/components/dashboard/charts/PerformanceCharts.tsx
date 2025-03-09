
import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMediaQuery } from '@/hooks/use-mobile';

// Helper function to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
};

interface ChartDataPoint {
  month: string;
  ventes: number;
  compromis: number;
  commissions: number;
}

interface PerformanceChartsProps {
  monthlyData: ChartDataPoint[];
}

const PerformanceCharts: React.FC<PerformanceChartsProps> = ({ monthlyData }) => {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const [chartHeight, setChartHeight] = useState(300);
  
  // Adjust chart height based on screen size
  useEffect(() => {
    if (isMobile) {
      setChartHeight(200);
    } else if (isTablet) {
      setChartHeight(250);
    } else {
      setChartHeight(300);
    }
  }, [isMobile, isTablet]);
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-background/95 p-2 border border-border rounded-md shadow-md text-xs">
          <p className="font-medium">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {entry.name === 'Commissions' ? formatCurrency(entry.value) : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-xl p-3 sm:p-4 overflow-hidden">
      <h2 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Évolution annuelle</h2>
      <Tabs defaultValue="combined" className="w-full">
        <TabsList className="mb-2 sm:mb-4 w-full flex flex-wrap justify-center sm:justify-start">
          <TabsTrigger value="combined" className="text-xs sm:text-sm flex-1 sm:flex-none">Combiné</TabsTrigger>
          <TabsTrigger value="transactions" className="text-xs sm:text-sm flex-1 sm:flex-none">Transactions</TabsTrigger>
          <TabsTrigger value="commissions" className="text-xs sm:text-sm flex-1 sm:flex-none">Commissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="combined" className={`h-[${chartHeight}px] min-h-[200px] w-full`}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart 
              data={monthlyData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{fontSize: isMobile ? 8 : 10}}
                tickFormatter={(value) => value.substring(0, 3)} 
              />
              <YAxis 
                yAxisId="left" 
                tick={{fontSize: isMobile ? 8 : 10}} 
                width={25}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                tickFormatter={(value) => `${(value / 1000)}k€`} 
                tick={{fontSize: isMobile ? 8 : 10}}
                width={35}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: isMobile ? '8px' : '10px' }} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="ventes" 
                name="Ventes" 
                stroke="#8884d8" 
                activeDot={{ r: isMobile ? 4 : 6 }} 
                strokeWidth={2}
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="compromis" 
                name="Compromis" 
                stroke="#82ca9d" 
                strokeWidth={2}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="commissions" 
                name="Commissions" 
                stroke="#ff7300" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="transactions" className={`h-[${chartHeight}px] min-h-[200px]`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={monthlyData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{fontSize: isMobile ? 8 : 10}}
                tickFormatter={(value) => value.substring(0, 3)} 
              />
              <YAxis tick={{fontSize: isMobile ? 8 : 10}} width={25} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: isMobile ? '8px' : '10px' }} />
              <Bar dataKey="ventes" name="Ventes" fill="#8884d8" />
              <Bar dataKey="compromis" name="Compromis" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
        
        <TabsContent value="commissions" className={`h-[${chartHeight}px] min-h-[200px]`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={monthlyData}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{fontSize: isMobile ? 8 : 10}}
                tickFormatter={(value) => value.substring(0, 3)} 
              />
              <YAxis 
                tickFormatter={(value) => `${(value / 1000)}k€`} 
                tick={{fontSize: isMobile ? 8 : 10}}
                width={35}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: isMobile ? '8px' : '10px' }} />
              <Bar dataKey="commissions" name="Commissions" fill="#ff7300" />
            </BarChart>
          </ResponsiveContainer>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PerformanceCharts;
