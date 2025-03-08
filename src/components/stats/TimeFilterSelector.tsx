
import React from 'react';
import { Button } from '@/components/ui/button';
import { TimeFilter } from '@/types/stats';

interface TimeFilterSelectorProps {
  activeFilter: TimeFilter;
  onChange: (filter: TimeFilter) => void;
}

const TimeFilterSelector: React.FC<TimeFilterSelectorProps> = ({ activeFilter, onChange }) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={activeFilter === 'month' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('month')}
      >
        Mois
      </Button>
      <Button
        variant={activeFilter === 'quarter' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('quarter')}
      >
        Trimestre
      </Button>
      <Button
        variant={activeFilter === 'year' ? 'default' : 'outline'}
        size="sm"
        onClick={() => onChange('year')}
      >
        Année
      </Button>
    </div>
  );
};

export default TimeFilterSelector;
