
import React from 'react';
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
  return (
    <div className="mb-4 sm:mb-6 hidden sm:block">
      <h2 className="text-lg sm:text-xl font-semibold mb-2">Évolution annuelle</h2>
      <div className="glass-card rounded-xl p-2 sm:p-4">
        <Tabs defaultValue="combined" className="w-full">
          <TabsList className="mb-2 sm:mb-4 w-full flex flex-wrap justify-center md:justify-start">
            <TabsTrigger value="combined" className="text-xs sm:text-sm flex-1 md:flex-none">Combiné</TabsTrigger>
            <TabsTrigger value="transactions" className="text-xs sm:text-sm flex-1 md:flex-none">Transactions</TabsTrigger>
            <TabsTrigger value="commissions" className="text-xs sm:text-sm flex-1 md:flex-none">Commissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="combined" className="h-[250px] min-h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={monthlyData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{fontSize: 10}}
                  tickFormatter={(value) => value.substring(0, 3)} // Show only first 3 chars on small screens
                />
                <YAxis 
                  yAxisId="left" 
                  tick={{fontSize: 10}} 
                  width={25}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right" 
                  tickFormatter={(value) => `${(value / 1000)}k€`} 
                  tick={{fontSize: 10}}
                  width={35}
                />
                <Tooltip 
                  formatter={(value, name) => {
                    if (name === 'commissions') return formatCurrency(Number(value));
                    return value;
                  }}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="ventes" 
                  name="Ventes" 
                  stroke="#8884d8" 
                  activeDot={{ r: 6 }} 
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
          
          <TabsContent value="transactions" className="h-[250px] min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={monthlyData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{fontSize: 10}}
                  tickFormatter={(value) => value.substring(0, 3)} // Show only first 3 chars on small screens
                />
                <YAxis tick={{fontSize: 10}} width={25} />
                <Tooltip
                  contentStyle={{ fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="ventes" name="Ventes" fill="#8884d8" />
                <Bar dataKey="compromis" name="Compromis" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="commissions" className="h-[250px] min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={monthlyData}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tick={{fontSize: 10}}
                  tickFormatter={(value) => value.substring(0, 3)} // Show only first 3 chars on small screens
                />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000)}k€`} 
                  tick={{fontSize: 10}}
                  width={35}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar dataKey="commissions" name="Commissions" fill="#ff7300" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PerformanceCharts;
