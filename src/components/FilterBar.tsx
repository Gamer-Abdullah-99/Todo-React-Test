import React from 'react';
import { FiFilter, FiCheckCircle, FiCircle, FiList, FiStar } from 'react-icons/fi';

interface FilterBarProps {
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  showAI: boolean;
  setShowAI: (show: boolean) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filter, setFilter, showAI, setShowAI }) => {
  return (
    <div className="mb-6 bg-slate-800/30 rounded-lg p-2 border border-purple-500/20">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center space-x-1">
          <div className="text-purple-200 px-3 py-2 flex items-center">
            <FiFilter className="mr-2" />
            <span className="hidden sm:inline">Status:</span>
          </div>
          
          <button 
            onClick={() => setFilter('all')} 
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/50'}`}
          >
            <FiList />
            <span>All</span>
          </button>
          
          <button 
            onClick={() => setFilter('active')} 
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/50'}`}
          >
            <FiCircle />
            <span>Active</span>
          </button>
          
          <button 
            onClick={() => setFilter('completed')} 
            className={`px-4 py-2 rounded-lg transition-all flex items-center space-x-2 ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/50'}`}
          >
            <FiCheckCircle />
            <span>Done</span>
          </button>
        </div>
        
        <button
          onClick={() => setShowAI(!showAI)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${showAI ? 'bg-purple-600 text-white' : 'bg-purple-600/60 hover:bg-purple-600/80 text-white'}`}
        >
          <FiStar className={showAI ? 'animate-pulse' : ''} />
          <span>AI Assistant</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;