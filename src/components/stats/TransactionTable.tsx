
import React from 'react';
import { Transaction } from '@/types/stats';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { formatDate } from '@/lib/utils';

interface TransactionTableProps {
  transactions: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Bien</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead className="text-right">Montant</TableHead>
            <TableHead className="text-right">Commission</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                Aucune transaction trouvée pour cette période
              </TableCell>
            </TableRow>
          ) : (
            transactions.map(transaction => (
              <TableRow key={transaction.id}>
                <TableCell>{formatDate(new Date(transaction.date))}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    transaction.type === 'vente' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {transaction.type === 'vente' ? 'Vente' : 'Compromis'}
                  </span>
                </TableCell>
                <TableCell>{transaction.property}</TableCell>
                <TableCell className="max-w-[200px] truncate">{transaction.address}</TableCell>
                <TableCell className="text-right">
                  {transaction.amount.toLocaleString('fr-FR')} €
                </TableCell>
                <TableCell className="text-right">
                  {transaction.commission.toLocaleString('fr-FR')} €
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
