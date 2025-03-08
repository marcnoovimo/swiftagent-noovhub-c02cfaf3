
import React from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowUpRight, ArrowDownRight, FileText, PieChart, BarChart3, TrendingUp } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ReportData, Document } from '@/components/documents/types';
import PerformanceCard from '@/components/dashboard/PerformanceCard';
import DocumentIcon from '@/components/documents/DocumentIcon';

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(amount);
};

// Helper to calculate percentage change
const calculateChange = (current: number, previous: number): { value: string, positive: boolean } => {
  if (previous === 0) return { value: "N/A", positive: true };
  
  const change = ((current - previous) / previous) * 100;
  return {
    value: `${Math.abs(change).toFixed(1)}%`,
    positive: change >= 0
  };
};

interface PerformanceReportProps {
  report: ReportData;
  isLoading?: boolean;
}

const PerformanceReport: React.FC<PerformanceReportProps> = ({ report, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-noovimo-500 font-bold text-xl">
          Génération du rapport en cours...
        </div>
      </div>
    );
  }
  
  // Calculate changes compared to previous period
  const salesChange = report.previousPeriod 
    ? calculateChange(report.metrics.sales, report.previousPeriod.sales) 
    : { value: "N/A", positive: true };
    
  const volumeChange = report.previousPeriod 
    ? calculateChange(report.metrics.volume, report.previousPeriod.volume) 
    : { value: "N/A", positive: true };
    
  const commissionChange = report.previousPeriod 
    ? calculateChange(report.metrics.commission, report.previousPeriod.commission) 
    : { value: "N/A", positive: true };
    
  const conversionChange = report.previousPeriod 
    ? calculateChange(report.metrics.conversionRate, report.previousPeriod.conversionRate) 
    : { value: "N/A", positive: true };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold">
          Rapport de performance : {report.period.month} {report.period.year}
        </h2>
        <p className="text-muted-foreground">
          Agent : {report.agent.name}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PerformanceCard
          title="Ventes réalisées"
          value={report.metrics.sales.toString()}
          change={salesChange.value}
          positive={salesChange.positive}
          icon={<BarChart3 size={20} className="text-noovimo-600" />}
        />
        
        <PerformanceCard
          title="Volume de transactions"
          value={formatCurrency(report.metrics.volume)}
          change={volumeChange.value}
          positive={volumeChange.positive}
          icon={<PieChart size={20} className="text-noovimo-600" />}
        />
        
        <PerformanceCard
          title="Honoraires perçus"
          value={formatCurrency(report.metrics.commission)}
          change={commissionChange.value}
          positive={commissionChange.positive}
          icon={<FileText size={20} className="text-noovimo-600" />}
        />
        
        <PerformanceCard
          title="Taux de conversion"
          value={`${(report.metrics.conversionRate * 100).toFixed(1)}%`}
          change={conversionChange.value}
          positive={conversionChange.positive}
          icon={<TrendingUp size={20} className="text-noovimo-600" />}
        />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Détails de l'activité</CardTitle>
          <CardDescription>
            Récapitulatif des documents et transactions du mois
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Mandats signés</h3>
              <p className="text-2xl font-bold">{report.metrics.mandates}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Compromis signés</h3>
              <p className="text-2xl font-bold">{report.metrics.contracts}</p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Commission moyenne</h3>
              <p className="text-2xl font-bold">{report.metrics.averageCommissionRate.toFixed(1)}%</p>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <h3 className="text-lg font-semibold mb-4">Documents traités</h3>
          {report.documents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Valeur</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {report.documents.map((doc: Document) => (
                  <TableRow key={doc.id}>
                    <TableCell className="flex items-center gap-2">
                      <DocumentIcon type={doc.type} size={18} />
                      <span className="truncate max-w-[200px]">{doc.name}</span>
                    </TableCell>
                    <TableCell>{doc.category}</TableCell>
                    <TableCell>
                      {doc.createdAt ? format(parseISO(doc.createdAt), 'dd/MM/yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell className="text-right">
                      {doc.propertyValue ? formatCurrency(doc.propertyValue) : 'N/A'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-muted-foreground text-center py-4">
              Aucun document traité durant cette période
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceReport;
