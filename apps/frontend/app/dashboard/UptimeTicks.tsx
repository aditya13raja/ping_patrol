"use client"
import React from 'react';
import { StatusIndicator } from './StatusIndicator';

interface UptimeTicksProps {
  uptimeData: boolean[];
}

export const UptimeTicks: React.FC<UptimeTicksProps> = ({ uptimeData }) => {
  return (
    <div className="flex items-center space-x-1">
      {uptimeData.map((isUp, index) => (
        <div
          key={index}
          className="flex flex-col items-center"
          title={`${isUp ? 'Up' : 'Down'} - ${30 - index * 3} minutes ago`}
        >
          <StatusIndicator 
            status={isUp ? 'up' : 'down'} 
            size="sm"
          />
        </div>
      ))}
    </div>
  );
};
