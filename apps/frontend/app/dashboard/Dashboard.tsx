"use client"
import React from 'react';
import { WebsiteCard } from './WebsiteCard';
import { useWebsites } from '../../hooks/useWebsites';
import { 
  aggregateUptimeData, 
  calculateUptime, 
  getAverageResponseTime, 
  getCurrentStatus, 
  getLastCheckTime 
} from '../../utils/aggregateUptimeData';

function getWebsiteName(url: string): string {
  try {
    const domain = new URL(url).hostname;
    return domain.replace('www.', '').split('.')[0];
  } catch {
    return url;
  }
}

export const Dashboard: React.FC = () => {
  const websites = useWebsites();
  
  // Transform raw website data into the format expected by WebsiteCard
  const processedWebsites = websites.map(website => ({
    id: website.id,
    name: getWebsiteName(website.url),
    url: website.url,
    status: getCurrentStatus(website.ticks),
    uptime: calculateUptime(website.ticks),
    responseTime: getAverageResponseTime(website.ticks),
    lastCheck: getLastCheckTime(website.ticks),
    uptimeHistory: aggregateUptimeData(website.ticks, 3)
  }));

  const upSites = processedWebsites.filter(site => site.status === 'up').length;
  const totalSites = processedWebsites.length;
  const overallUptime = totalSites > 0 
    ? processedWebsites.reduce((sum, site) => sum + site.uptime, 0) / totalSites 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Overview Stats */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Total Services</h3>
            <p className="text-3xl font-bold text-white">{totalSites}</p>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Operational</h3>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold text-green-600">{upSites}</p>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Issues</h3>
            <div className="flex items-center space-x-2">
              <p className="text-3xl font-bold text-red-600">{totalSites - upSites}</p>
              {totalSites - upSites > 0 && (
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Average Uptime</h3>
            <p className="text-3xl font-bold text-white">{overallUptime.toFixed(1)}%</p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Monitored Services</h2>
          <p className="text-sm text-gray-400">
            {upSites} of {totalSites} services operational
          </p>
        </div>
        
        <div className="space-y-4">
          {processedWebsites.map((website) => (
            <WebsiteCard key={website.id} website={website} />
          ))}
          {processedWebsites.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No websites being monitored</p>
              <p className="text-gray-500 text-sm mt-2">Add your first website to start monitoring</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
