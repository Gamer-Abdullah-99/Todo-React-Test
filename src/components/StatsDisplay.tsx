import React from 'react';
import { FiPieChart, FiCheck, FiClock, FiActivity } from 'react-icons/fi';

interface StatsProps {
  stats: {
    total: number;
    completed: number;
    active: number;
    byCategory: Array<{
      name: string;
      count: number;
      color: string;
    }>;
  };
}

const StatsDisplay: React.FC<StatsProps> = ({ stats }) => {
  const completionPercentage = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;

  return (
    <div className="bg-slate-800/30 rounded-lg p-4 border border-purple-500/20">
      <h3 className="text-lg font-medium text-purple-200 mb-3 flex items-center">
        <span className="mr-2">📊</span>
        Cosmic Stats
      </h3>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm text-purple-200 mb-1">
            <span className="flex items-center">
              <FiActivity className="mr-1" />
              Task Completion
            </span>
            <span>{completionPercentage}%</span>
          </div>
          <div className="w-full bg-slate-700/50 rounded-full h-2.5">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-500 h-2.5 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-indigo-900/30 rounded-lg p-3 border border-indigo-500/20">
            <div className="flex items-center text-xs text-indigo-400 mb-1">
              <FiClock className="mr-1" />
              Active Tasks
            </div>
            <div className="text-3xl text-indigo-300 font-bold">{stats.active}</div>
          </div>
          
          <div className="bg-purple-900/30 rounded-lg p-3 border border-purple-500/20">
            <div className="flex items-center text-xs text-purple-400 mb-1">
              <FiCheck className="mr-1" />
              Completed
            </div>
            <div className="text-3xl text-purple-300 font-bold">{stats.completed}</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-purple-300 mb-2 flex items-center">
            <FiPieChart className="mr-1" />
            By Category
          </h4>
          {stats.byCategory.map((cat, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between text-xs text-purple-200 mb-1">
                <span>{cat.name}</span>
                <span>{cat.count}</span>
              </div>
              <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                <div 
                  className={`${cat.color} h-1.5 rounded-full`}
                  style={{ width: `${stats.total > 0 ? (cat.count / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center pt-2">
          <div className="inline-block animate-spin-slow">
            <span className="text-xl">🌠</span>
          </div>
          <div className="text-xs text-purple-300/60 mt-1">
            {stats.total} cosmic tasks tracked
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;