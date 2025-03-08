import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Building2, CreditCard, TrendingUp, Home, BarChart3 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsData, TimeFilter } from '@/types/stats';
import StatsService from '@/services/statsService';
import TimeFilterSelector from '@/components/stats/TimeFilterSelector';
import StatCard from '@/components/stats/StatCard';
import TransactionTable from '@/components/stats/TransactionTable';
import PerformanceDashboard from '@/components/dashboard/PerformanceDashboard';

const COLORS = ['#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#3B82F6'];

const Stats = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('year');
  
  const { data: stats, isLoading, refetch } = useQuery({
    queryKey: ['stats', timeFilter],
    queryFn: () => StatsService.getStats(timeFilter),
  });
  
  useEffect(() => {
    refetch();
  }, [timeFilter, refetch]);
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  const formatTooltipValue = (value: number, name: string) => {
    if (name.includes('Commission')) {
      return formatCurrency(value);
    }
    return value;
  };

  if (isLoading || !stats) {
    return (
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-noovimo-500 font-bold text-xl">
            Chargement des statistiques...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Statistiques de performance</h1>
          <p className="text-muted-foreground mt-1">
            Suivez vos performances commerciales et vos commissions
          </p>
        </div>
        <TimeFilterSelector activeFilter={timeFilter} onChange={setTimeFilter} />
      </div>
      
      {/* Performance Dashboard Component */}
      <PerformanceDashboard />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Ventes réalisées"
          value={stats.totalSales}
          icon={<Home size={24} className="text-noovimo-500" />}
        />
        <StatCard
          title="Compromis signés"
          value={stats.totalCompromis}
          icon={<Building2 size={24} className="text-noovimo-500" />}
        />
        <StatCard
          title="Volume de transactions"
          value={formatCurrency(stats.totalVolume)}
          icon={<BarChart3 size={24} className="text-noovimo-500" />}
        />
        <StatCard
          title="Commissions totales"
          value={formatCurrency(stats.totalCommission)}
          icon={<CreditCard size={24} className="text-noovimo-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 glass-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Évolution des transactions</h3>
          <Tabs defaultValue="bar">
            <TabsList className="mb-4">
              <TabsTrigger value="bar">Barres</TabsTrigger>
              <TabsTrigger value="line">Courbe</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bar" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Bar name="Ventes" dataKey="value" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="line" className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.monthlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={formatTooltipValue} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    name="Ventes" 
                    dataKey="value" 
                    stroke="#8B5CF6" 
                    activeDot={{ r: 8 }}
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="glass-card rounded-xl p-4">
          <h3 className="text-lg font-semibold mb-4">Répartition des commissions</h3>
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.commissionsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {stats.commissionsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-4 mb-8">
        <h3 className="text-lg font-semibold mb-4">Évolution des commissions</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.monthlyCommissions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Bar name="Commissions" dataKey="value" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Transactions récentes</h3>
        </div>
        <TransactionTable transactions={stats.transactions.slice(0, 5)} />
      </div>
    </div>
  );
};

export default Stats;
