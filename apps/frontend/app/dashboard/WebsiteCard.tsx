"use client"
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Globe, Clock, TrendingUp } from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';
import { UptimeTicks } from './UptimeTicks';

interface WebsiteData {
  id: string;
  name: string;
  url: string;
  status: 'up' | 'down';
  uptime: number;
  responseTime: number;
  lastCheck: string;
  uptimeHistory: boolean[];
}

interface WebsiteCardProps {
  website: WebsiteData;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({ website }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 hover:shadow-xl hover:shadow-gray-900/20 transition-all duration-200">
      <div 
        className="p-6 cursor-pointer select-none"
        onClick={toggleExpanded}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                website.status === 'up' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                <StatusIndicator 
                  status={website.status} 
                  size="lg" 
                  pulse={website.status === 'up'}
                />
              </div>
              {website.status === 'up' && (
                <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-green-500 animate-ping opacity-20"></div>
              )}
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                <span>{website.name}</span>
                <Globe className="w-4 h-4 text-gray-500" />
              </h3>
              <p className="text-sm text-gray-400">{website.url}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`text-sm font-medium ${
                  website.status === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {website.uptime}% uptime
                </span>
                <span className="text-sm text-gray-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{website.responseTime}ms</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Last check</p>
              <p className="text-sm font-medium text-white">{website.lastCheck}</p>
            </div>
            <div className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
              {isExpanded ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="border-t border-gray-700 p-6 bg-gray-900">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                <TrendingUp className="w-4 h-4" />
                <span>Uptime History (Last 30 minutes)</span>
              </h4>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <UptimeTicks uptimeData={website.uptimeHistory} />
                <div className="flex justify-between text-xs text-gray-400 mt-2">
                  <span>30 min ago</span>
                  <span>Now</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h5 className="text-sm font-medium text-gray-300 mb-2">Response Time</h5>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-white">{website.responseTime}</span>
                  <span className="text-sm text-gray-400">ms</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Average response time</p>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <h5 className="text-sm font-medium text-gray-300 mb-2">Status</h5>
                <div className="flex items-center space-x-2">
                  <StatusIndicator status={website.status} size="sm" />
                  <span className={`text-sm font-medium ${
                    website.status === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {website.status === 'up' ? 'Operational' : 'Down'}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Current status</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
