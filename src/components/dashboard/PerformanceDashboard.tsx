
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
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
import { Building2, CreditCard, TrendingUp, BarChart3, Calendar, Euro, PiggyBank, Briefcase } from 'lucide-react';
import PerformanceCard from './PerformanceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsService from '@/services/statsService';
import { useAuth } from '@/context/AuthContext';

// Helper function to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
};

const PerformanceDashboard: React.FC = () => {
  const { user } = useAuth();
  const [cumulativeData, setCumulativeData] = useState({
    sales: 0,
    compromis: 0,
    volume: 0,
    commission: 0
  });

  // Fetch current month stats for the agent
  const { data: monthlyStats, isLoading: isLoadingMonthly } = useQuery({
    queryKey: ['agentStats', user?.id],
    queryFn: () => StatsService.getAgentStats(user?.id || ''),
    enabled: !!user?.id,
  });
  
  // Fetch yearly stats for comparison
  const { data: yearlyStats, isLoading: isLoadingYearly } = useQuery({
    queryKey: ['yearlyStats'],
    queryFn: () => StatsService.getStats('year'),
  });

  // Calculate cumulative values
  useEffect(() => {
    if (yearlyStats) {
      setCumulativeData({
        sales: yearlyStats.totalSales,
        compromis: yearlyStats.totalCompromis,
        volume: yearlyStats.totalVolume,
        commission: yearlyStats.totalCommission
      });
    }
  }, [yearlyStats]);

  // Generate monthly data for charts
  const getMonthlyData = () => {
    if (!yearlyStats) return [];
    return yearlyStats.monthlySales.map((item, index) => ({
      month: item.month,
      ventes: item.value,
      compromis: yearlyStats.monthlyCompromis[index]?.value || 0,
      commissions: yearlyStats.monthlyCommissions[index]?.value || 0
    }));
  };

  // Calculate progress compared to last month
  const getPercentChange = (current: number, previous: number): string => {
    if (previous === 0) return "+100%"; // Avoid division by zero
    const change = ((current - previous) / previous) * 100;
    return `${change > 0 ? '+' : ''}${change.toFixed(0)}%`;
  };

  if (isLoadingMonthly || isLoadingYearly) {
    return <div className="p-4 text-center">Chargement des statistiques...</div>;
  }

  const monthlyData = getMonthlyData();
  const currentMonth = monthlyStats || { sales: 0, compromis: 0, volume: 0, commission: 0, conversionRate: 0 };
  const previousMonthData = yearlyStats?.monthlySales[yearlyStats.monthlySales.length - 2];
  const previousMonthSales = previousMonthData?.value || 0;

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Activité du mois</h2>
        <div className="card-grid">
          <PerformanceCard
            title="Ventes"
            value={currentMonth.sales.toString()}
            change={getPercentChange(currentMonth.sales, previousMonthSales)}
            positive={currentMonth.sales >= previousMonthSales}
            icon={<Building2 size={18} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Compromis"
            value={currentMonth.compromis.toString()}
            icon={<Calendar size={18} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Honoraires"
            value={formatCurrency(currentMonth.commission)}
            icon={<Euro size={18} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Taux de transformation"
            value={`${(currentMonth.conversionRate * 100).toFixed(0)}%`}
            icon={<TrendingUp size={18} className="text-noovimo-500" />}
          />
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold mb-2">Cumul annuel</h2>
        <div className="card-grid">
          <PerformanceCard
            title="Ventes réalisées"
            value={cumulativeData.sales.toString()}
            icon={<Building2 size={18} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Compromis signés"
            value={cumulativeData.compromis.toString()}
            icon={<Briefcase size={18} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Volume de transactions"
            value={formatCurrency(cumulativeData.volume)}
            icon={<BarChart3 size={18} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Commissions totales"
            value={formatCurrency(cumulativeData.commission)}
            icon={<PiggyBank size={18} className="text-noovimo-500" />}
          />
        </div>
      </div>

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
    </div>
  );
};

export default PerformanceDashboard;
