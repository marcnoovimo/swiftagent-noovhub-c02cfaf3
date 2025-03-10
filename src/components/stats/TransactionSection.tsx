
import React from 'react';
import TransactionTable from '@/components/stats/TransactionTable';
import { Transaction } from '@/types/stats';

interface TransactionSectionProps {
  transactions: Transaction[];
}

const TransactionSection: React.FC<TransactionSectionProps> = ({ transactions }) => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="glass-card rounded-xl p-2 sm:p-4 overflow-x-auto">
        <div className="flex items-center justify-between mb-2 sm:mb-4">
          <h3 className="text-base sm:text-lg font-semibold">Transactions récentes</h3>
        </div>
        <div className="overflow-x-auto w-full">
          <TransactionTable transactions={transactions.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};

export default TransactionSection;
