
import React, { useContext, useEffect, useState } from 'react';
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
import { AuthContext } from '@/context/AuthContext';

// Helper function to format currency
const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
};

const PerformanceDashboard: React.FC = () => {
  const { user } = useContext(AuthContext);
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
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Activité du mois</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PerformanceCard
            title="Ventes"
            value={currentMonth.sales.toString()}
            change={getPercentChange(currentMonth.sales, previousMonthSales)}
            positive={currentMonth.sales >= previousMonthSales}
            icon={<Building2 size={20} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Compromis"
            value={currentMonth.compromis.toString()}
            icon={<Calendar size={20} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Honoraires"
            value={formatCurrency(currentMonth.commission)}
            icon={<Euro size={20} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Taux de transformation"
            value={`${(currentMonth.conversionRate * 100).toFixed(0)}%`}
            icon={<TrendingUp size={20} className="text-noovimo-500" />}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Cumul annuel</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <PerformanceCard
            title="Ventes réalisées"
            value={cumulativeData.sales.toString()}
            icon={<Building2 size={20} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Compromis signés"
            value={cumulativeData.compromis.toString()}
            icon={<Briefcase size={20} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Volume de transactions"
            value={formatCurrency(cumulativeData.volume)}
            icon={<BarChart3 size={20} className="text-noovimo-500" />}
          />
          <PerformanceCard
            title="Commissions totales"
            value={formatCurrency(cumulativeData.commission)}
            icon={<PiggyBank size={20} className="text-noovimo-500" />}
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Évolution annuelle</h2>
        <div className="glass-card rounded-xl p-4">
          <Tabs defaultValue="combined">
            <TabsList className="mb-4">
              <TabsTrigger value="combined">Combiné</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="commissions">Commissions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="combined" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${(value / 1000)}k€`} />
                  <Tooltip 
                    formatter={(value, name) => {
                      if (name === 'commissions') return formatCurrency(Number(value));
                      return value;
                    }} 
                  />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="ventes" 
                    name="Ventes" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="compromis" 
                    name="Compromis" 
                    stroke="#82ca9d" 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="commissions" 
                    name="Commissions" 
                    stroke="#ff7300" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="transactions" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="ventes" name="Ventes" fill="#8884d8" />
                  <Bar dataKey="compromis" name="Compromis" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="commissions" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000)}k€`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
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
