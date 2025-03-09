
import React from 'react';

interface GuideBodyProps {
  content: string;
  searchQuery: string;
}

const GuideBody: React.FC<GuideBodyProps> = ({ content, searchQuery }) => {
  // Highlight search terms in content
  const highlightContent = (content: string, query: string) => {
    if (!query.trim()) return content;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return content.split(regex).map((part, i) => {
      if (part.toLowerCase() === query.toLowerCase()) {
        return <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark>;
      }
      return part;
    });
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      {searchQuery.trim() 
        ? <div>{highlightContent(content, searchQuery)}</div>
        : <div dangerouslySetInnerHTML={{ __html: content }} />
      }
    </div>
  );
};

export default GuideBody;
