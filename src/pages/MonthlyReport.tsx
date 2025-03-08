
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format, subMonths } from 'date-fns';
import { CalendarIcon, Download, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from 'sonner';
import PerformanceReport from '@/components/stats/PerformanceReport';
import { generateAgentReport } from '@/services/reportingService';
import { ReportData } from '@/components/documents/types';

const MonthlyReport = () => {
  // In a real app, this would come from user context
  const currentUserId = '1';
  const currentUserName = 'Jean Dupont';
  
  // State for selected period
  const [selectedPeriod, setSelectedPeriod] = useState(format(new Date(), 'yyyy-MM'));
  
  // Generate period options (last 12 months)
  const periodOptions = Array.from({ length: 12 }, (_, i) => {
    const date = subMonths(new Date(), i);
    const value = format(date, 'yyyy-MM');
    const label = format(date, 'MMMM yyyy');
    return { value, label };
  });
  
  // Query for fetching report data
  const { data: report, isLoading, refetch } = useQuery({
    queryKey: ['report', selectedPeriod, currentUserId],
    queryFn: () => generateAgentReport(currentUserId, selectedPeriod, currentUserName),
  });
  
  // Handle period change
  const handlePeriodChange = (newPeriod: string) => {
    setSelectedPeriod(newPeriod);
  };
  
  // Handle report download
  const handleDownload = () => {
    toast.success("Téléchargement du rapport au format PDF", {
      description: "Cette fonctionnalité sera disponible prochainement."
    });
  };
  
  // Handle report sharing
  const handleShare = () => {
    toast.success("Partage du rapport par email", {
      description: "Cette fonctionnalité sera disponible prochainement."
    });
  };
  
  useEffect(() => {
    refetch();
  }, [selectedPeriod, refetch]);
  
  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Rapport de performance mensuel</h1>
          <p className="text-muted-foreground mt-1">
            Analysez vos performances commerciales et vos commissions
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="w-full sm:w-auto">
            <Select
              value={selectedPeriod}
              onValueChange={handlePeriodChange}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Sélectionnez une période" />
              </SelectTrigger>
              <SelectContent>
                {periodOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              className="flex items-center gap-2 w-1/2 sm:w-auto"
              onClick={handleDownload}
            >
              <Download size={16} />
              <span className="hidden sm:inline">Télécharger</span>
            </Button>
            
            <Button
              variant="default"
              className="flex items-center gap-2 w-1/2 sm:w-auto bg-noovimo-500 hover:bg-noovimo-600"
              onClick={handleShare}
            >
              <Share size={16} />
              <span className="hidden sm:inline">Partager</span>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-xl p-4 sm:p-6">
        {report ? (
          <PerformanceReport report={report} isLoading={isLoading} />
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-noovimo-500 font-bold text-xl">
              Chargement du rapport...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyReport;
