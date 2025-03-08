
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
import { TimeFilter } from '@/types/stats';
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

  // Custom label for pie chart that works on mobile screens
  const renderPieChartLabel = ({ name, percent }: { name: string; percent: number }) => {
    // On small screens, only show the percentage
    const screenWidth = window.innerWidth;
    if (screenWidth < 400) {
      return `${(percent * 100).toFixed(0)}%`;
    }
    // On larger screens, show name and percentage
    return `${name}: ${(percent * 100).toFixed(0)}%`;
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
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-4 sm:mb-6 gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Statistiques de performance</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            Suivez vos performances commerciales et vos commissions
          </p>
        </div>
        <TimeFilterSelector activeFilter={timeFilter} onChange={setTimeFilter} />
      </div>
      
      {/* Performance Dashboard Component with min-width to ensure correct display */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="min-w-[320px]">
          <PerformanceDashboard />
        </div>
      </div>
      
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
        <StatCard
          title="Ventes réalisées"
          value={stats.totalSales}
          icon={<Home size={20} className="text-noovimo-500" />}
        />
        <StatCard
          title="Compromis signés"
          value={stats.totalCompromis}
          icon={<Building2 size={20} className="text-noovimo-500" />}
        />
        <StatCard
          title="Volume de transactions"
          value={formatCurrency(stats.totalVolume)}
          icon={<BarChart3 size={20} className="text-noovimo-500" />}
        />
        <StatCard
          title="Commissions totales"
          value={formatCurrency(stats.totalCommission)}
          icon={<CreditCard size={20} className="text-noovimo-500" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-8">
        <div className="lg:col-span-2 glass-card rounded-xl p-2 sm:p-4 overflow-hidden">
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Évolution des transactions</h3>
          <Tabs defaultValue="bar" className="w-full">
            <TabsList className="mb-2 sm:mb-4 flex flex-wrap w-full xs:w-auto">
              <TabsTrigger value="bar" className="flex-1 xs:flex-none text-xs sm:text-sm">Barres</TabsTrigger>
              <TabsTrigger value="line" className="flex-1 xs:flex-none text-xs sm:text-sm">Courbe</TabsTrigger>
            </TabsList>
            
            <TabsContent value="bar" className="h-[200px] xs:h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={stats.monthlySales}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    tick={{fontSize: 9}}
                    tickFormatter={(value) => value.substring(0, 3)} 
                  />
                  <YAxis tick={{fontSize: 9}} width={25} />
                  <Tooltip 
                    formatter={formatTooltipValue}
                    contentStyle={{ fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px' }} />
                  <Bar name="Ventes" dataKey="value" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            
            <TabsContent value="line" className="h-[200px] xs:h-[250px] sm:h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart 
                  data={stats.monthlySales}
                  margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="month" 
                    tick={{fontSize: 9}}
                    tickFormatter={(value) => value.substring(0, 3)} 
                  />
                  <YAxis tick={{fontSize: 9}} width={25} />
                  <Tooltip 
                    formatter={formatTooltipValue}
                    contentStyle={{ fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '9px' }} />
                  <Line 
                    type="monotone" 
                    name="Ventes" 
                    dataKey="value" 
                    stroke="#8B5CF6" 
                    activeDot={{ r: 4 }}
                    strokeWidth={2} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="glass-card rounded-xl p-2 sm:p-4 overflow-hidden">
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Répartition des commissions</h3>
          <div className="h-[200px] xs:h-[250px] sm:h-[300px] flex items-center justify-center w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <Pie
                  data={stats.commissionsByType}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={65}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={renderPieChartLabel}
                >
                  {stats.commissionsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value as number)}
                  contentStyle={{ fontSize: '10px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-2 sm:p-4 mb-4 sm:mb-8 overflow-hidden">
        <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">Évolution des commissions</h3>
        <div className="h-[200px] xs:h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={stats.monthlyCommissions}
              margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{fontSize: 9}}
                tickFormatter={(value) => value.substring(0, 3)} 
              />
              <YAxis 
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k€`} 
                tick={{fontSize: 9}}
                width={30}
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value as number)}
                contentStyle={{ fontSize: '10px' }}
              />
              <Legend wrapperStyle={{ fontSize: '9px' }} />
              <Bar name="Commissions" dataKey="value" fill="#EC4899" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-2 sm:p-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold">Transactions récentes</h3>
        </div>
        <div className="overflow-x-auto w-full">
          <div className="min-w-[300px]">
            <TransactionTable transactions={stats.transactions.slice(0, 5)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
