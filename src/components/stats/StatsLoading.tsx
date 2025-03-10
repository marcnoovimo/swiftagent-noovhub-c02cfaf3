
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Helmet } from 'react-helmet';

const StatsLoading: React.FC = () => {
  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <Helmet>
        <title>Statistiques | Intranet Noovimo</title>
      </Helmet>
      <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-4">
        <Skeleton className="h-12 w-64" />
      </div>
      <div className="space-y-6">
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[200px] rounded-xl" />
      </div>
    </div>
  );
};

export default StatsLoading;
