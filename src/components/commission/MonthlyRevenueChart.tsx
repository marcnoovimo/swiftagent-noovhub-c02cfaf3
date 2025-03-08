
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Euro, TrendingUp } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { CommissionService } from '@/services/commissionService';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MonthlyRevenueChart = () => {
  const { user } = useAuth();

  const { data: monthlyRevenue, isLoading } = useQuery({
    queryKey: ['monthlyRevenue', user?.id],
    queryFn: () => CommissionService.getMonthlyRevenue(user?.id || ''),
    enabled: !!user?.id,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatTooltipValue = (value: number) => {
    return formatCurrency(value);
  };

  if (isLoading || !monthlyRevenue) {
    return (
      <Card className="w-full h-full">
        <CardHeader>
          <CardTitle>Chiffre d'affaires mensuel</CardTitle>
          <CardDescription>Chargement...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Euro className="h-5 w-5" />
          Évolution mensuelle
        </CardTitle>
        <CardDescription>
          Votre chiffre d'affaires cumulé mois par mois
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="line">
          <TabsList className="mb-4">
            <TabsTrigger value="line" className="text-xs sm:text-sm">Courbe</TabsTrigger>
            <TabsTrigger value="bar" className="text-xs sm:text-sm">Barres</TabsTrigger>
          </TabsList>
          
          <TabsContent value="line" className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyRevenue}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000)}k€`}
                  tick={{ fontSize: 10 }}
                  width={40}
                />
                <Tooltip 
                  formatter={formatTooltipValue}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  name="Honoraires"
                  stroke="#8884d8"
                  activeDot={{ r: 6 }}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="commission"
                  name="Commission"
                  stroke="#82ca9d"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="bar" className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyRevenue}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis 
                  tickFormatter={(value) => `${(value / 1000)}k€`}
                  tick={{ fontSize: 10 }}
                  width={40}
                />
                <Tooltip 
                  formatter={formatTooltipValue}
                  contentStyle={{ fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '10px' }} />
                <Bar
                  dataKey="revenue"
                  name="Honoraires"
                  fill="#8884d8"
                />
                <Bar
                  dataKey="commission"
                  name="Commission"
                  fill="#82ca9d"
                />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MonthlyRevenueChart;
