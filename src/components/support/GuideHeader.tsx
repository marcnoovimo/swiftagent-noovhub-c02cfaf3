
import React from 'react';

interface GuideHeaderProps {
  title: string;
  tags: string[];
}

const GuideHeader: React.FC<GuideHeaderProps> = ({ title, tags }) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GuideHeader;
