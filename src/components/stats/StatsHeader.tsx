
import React from 'react';
import { Helmet } from 'react-helmet';

interface StatsHeaderProps {
  title: string;
  subtitle: string;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ title, subtitle }) => {
  return (
    <>
      <Helmet>
        <title>Statistiques | Intranet Noovimo</title>
      </Helmet>
      
      <div className="flex flex-col md:flex-row justify-between items-start mb-4 sm:mb-6 gap-2 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-xs sm:text-sm mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </>
  );
};

export default StatsHeader;
