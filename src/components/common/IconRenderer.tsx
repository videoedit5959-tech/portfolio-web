import React from 'react';
import * as Icons from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, className = 'w-5 h-5', size }) => {
  // Try to find matching icon in Lucide
  const IconComponent = (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[name] ||
    (Icons as unknown as Record<string, React.ComponentType<{ className?: string; size?: number }>>)[
      name.charAt(0).toUpperCase() + name.slice(1)
    ] ||
    Icons.Code; // Default fallback

  return <IconComponent className={className} size={size} />;
};
