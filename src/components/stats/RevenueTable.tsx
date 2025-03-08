
import React from 'react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Home, Key, Building } from 'lucide-react';
import { RevenueRecord } from '@/types/commission';

interface RevenueTableProps {
  revenues: RevenueRecord[];
}

const RevenueTable: React.FC<RevenueTableProps> = ({ revenues }) => {
  if (revenues.length === 0) {
    return (
      <div className="text-center p-4">
        <p className="text-muted-foreground">Aucun revenu enregistré pour la période</p>
      </div>
    );
  }
  
  // Fonction pour formater la devise
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Fonction pour afficher l'icône selon le type de source
  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'sale':
        return <Home className="h-4 w-4 text-primary" />;
      case 'rental':
        return <Key className="h-4 w-4 text-amber-500" />;
      case 'propertyManagement':
        return <Building className="h-4 w-4 text-indigo-500" />;
      default:
        return null;
    }
  };
  
  // Fonction pour traduire la source
  const getSourceName = (source: string) => {
    switch (source) {
      case 'sale':
        return 'Vente';
      case 'rental':
        return 'Location';
      case 'propertyManagement':
        return 'Gestion locative';
      default:
        return 'Autre';
    }
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Client</TableHead>
            <TableHead className="text-right">Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {revenues.map((revenue) => (
            <TableRow key={revenue.id}>
              <TableCell>
                {revenue.date ? format(parseISO(revenue.date), 'dd MMM yyyy', { locale: fr }) : 'N/A'}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {getSourceIcon(revenue.source)}
                  <span>{getSourceName(revenue.source)}</span>
                </div>
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {revenue.propertyAddress || 'N/A'}
              </TableCell>
              <TableCell>
                {revenue.clientName || 'N/A'}
              </TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(revenue.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RevenueTable;
