"use client"
import React from 'react';

interface StatusIndicatorProps {
  status: 'up' | 'down';
  size?: 'sm' | 'md' | 'lg';
  pulse?: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  size = 'md', 
  pulse = false 
}) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };

  const baseClasses = `rounded-full ${sizeClasses[size]}`;
  const statusClasses = status === 'up' 
    ? 'bg-green-500' 
    : 'bg-red-500';
  const pulseClasses = pulse && status === 'up' 
    ? 'animate-pulse' 
    : '';

  return (
    <div className={`${baseClasses} ${statusClasses} ${pulseClasses}`} />
  );
};
