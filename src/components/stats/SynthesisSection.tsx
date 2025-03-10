
import React from 'react';
import StatCard from '@/components/stats/StatCard';
import { formatCurrency } from '@/lib/utils';

interface SynthesisCardData {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

interface SynthesisSectionProps {
  cardData: SynthesisCardData[];
}

const SynthesisSection: React.FC<SynthesisSectionProps> = ({ cardData }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg sm:text-xl font-semibold mb-4">Synthèse</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-4">
        {cardData.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            icon={card.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SynthesisSection;
