import React from 'react';
import { FiFolder, FiGlobe } from 'react-icons/fi';
import { Category } from './TodoApp';

interface CategorySelectorProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (categoryId: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  categories, 
  activeCategory, 
  setActiveCategory 
}) => {
  return (
    <div className="bg-slate-800/30 rounded-lg p-4 border border-purple-500/20">
      <h3 className="text-lg font-medium text-purple-200 mb-3 flex items-center">
        <span className="mr-2">🌌</span>
        Cosmic Realms
      </h3>
      
      <div className="space-y-2">
        <button
          onClick={() => setActiveCategory('all')}
          className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
            activeCategory === 'all' 
              ? 'bg-indigo-600/60 text-white' 
              : 'hover:bg-slate-700/50 text-purple-200'
          }`}
        >
          <div className="flex items-center">
            <FiGlobe className="mr-2" />
            <span>All Tasks</span>
          </div>
          <div className="bg-slate-900/50 px-2 py-0.5 rounded-full text-xs">
            All
          </div>
        </button>
        
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center justify-between ${
              activeCategory === category.id 
                ? 'bg-indigo-600/60 text-white' 
                : 'hover:bg-slate-700/50 text-purple-200'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-2">{category.icon}</span>
              <span>{category.name}</span>
            </div>
            <div className={`${category.color} bg-opacity-30 px-2 py-0.5 rounded-full text-xs`}>
              <FiFolder className="inline-block" />
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-purple-500/20">
        <div className="text-center">
          <div className="inline-block relative">
            <img 
              src="https://picsum.photos/seed/cosmic/80/80" 
              alt="Galaxy" 
              className="w-16 h-16 rounded-full mx-auto object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center text-xs animate-pulse">
              ⭐
            </div>
          </div>
          <h4 className="mt-2 text-purple-200 font-medium">Cosmic Explorer</h4>
          <p className="text-xs text-purple-300/60">Navigating the task universe</p>
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;