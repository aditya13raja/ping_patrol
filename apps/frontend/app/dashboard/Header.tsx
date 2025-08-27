import React from 'react';
import { useState } from 'react';
import { Activity, Settings, Plus } from 'lucide-react';
import { AddMonitorModal } from './AddMonitorModal';

interface HeaderProps {
  onAddMonitor: (url: string, name?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddMonitor }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddMonitor = (url: string, name?: string) => {
    onAddMonitor(url, name);
    setIsModalOpen(false);
  };

  return (
    <>
      <header className="bg-gray-900 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">UptimeWatch</h1>
              <p className="text-sm text-gray-400">Monitor your services</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Monitor</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-200 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <AddMonitorModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddMonitor}
      />
    </>
  );
};
