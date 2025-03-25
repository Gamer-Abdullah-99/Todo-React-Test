import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiTag, FiFlag, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Category } from './TodoApp';

interface TodoFormProps {
  addTodo: (text: string, category: string, priority: 'low' | 'medium' | 'high', dueDate: string | null) => void;
  categories: Category[];
  processWithAI: (input: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo, categories, processWithAI }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState(categories[0]?.id || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState<string>('');
  const [expanded, setExpanded] = useState(false);
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text, category, priority, dueDate || null);
      setText('');
      setDueDate('');
      if (text.length > 10) {
        processWithAI(text);
      }
    }
  };

  const priorityStyles = {
    low: "bg-blue-600/40 border-blue-400/40",
    medium: "bg-purple-600/40 border-purple-400/40",
    high: "bg-red-600/40 border-red-400/40"
  };

  const priorityIcons = {
    low: "🌑", // Moon
    medium: "🪐", // Planet
    high: "☄️", // Comet
  };
  
  const priorityLabels = {
    low: "Low Priority",
    medium: "Medium Priority",
    high: "High Priority"
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-slate-800/30 rounded-lg p-4 border border-purple-500/20">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new cosmic task..."
          className="flex-grow px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
        />
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="p-3 bg-indigo-600/50 text-white rounded-lg hover:bg-indigo-600/70 transition-all flex items-center justify-center"
          aria-label={expanded ? "Hide options" : "Show options"}
        >
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>
        <button
          type="submit"
          className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center justify-center"
        >
          <FiPlus />
          <span className="hidden sm:inline ml-1">Add Task</span>
        </button>
      </div>
      
      {expanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <label className="block text-purple-200 mb-2 text-sm flex items-center">
              <FiTag className="mr-1" />
              Category
            </label>
            <button
              type="button"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center justify-between"
            >
              <div className="flex items-center">
                <span className="mr-2">
                  {categories.find(cat => cat.id === category)?.icon || '🔍'}
                </span>
                <span>
                  {categories.find(cat => cat.id === category)?.name || 'Select Category'}
                </span>
              </div>
              <FiChevronDown className={`transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showCategoryDropdown && (
              <div className="absolute z-20 mt-1 w-full bg-slate-800 border border-purple-500/30 rounded-lg shadow-lg py-1 max-h-48 overflow-y-auto">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => {
                      setCategory(cat.id);
                      setShowCategoryDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-700 flex items-center ${category === cat.id ? 'bg-purple-600/30' : ''}`}
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div className="relative">
            <label className="block text-purple-200 mb-2 text-sm flex items-center">
              <FiFlag className="mr-1" />
              Priority
            </label>
            <button
              type="button"
              onClick={() => setShowPriorityDropdown(!showPriorityDropdown)}
              className={`w-full px-3 py-2 ${priorityStyles[priority]} border rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 flex items-center justify-between`}
            >
              <div className="flex items-center">
                <span className="mr-2">{priorityIcons[priority]}</span>
                <span>{priorityLabels[priority]}</span>
              </div>
              <FiChevronDown className={`transition-transform ${showPriorityDropdown ? 'rotate-180' : ''}`} />
            </button>
            
            {showPriorityDropdown && (
              <div className="absolute z-20 mt-1 w-full bg-slate-800 border border-purple-500/30 rounded-lg shadow-lg py-1">
                {(['low', 'medium', 'high'] as const).map(p => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setPriority(p);
                      setShowPriorityDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-slate-700 flex items-center ${priority === p ? 'bg-purple-600/30' : ''}`}
                  >
                    <span className="mr-2">{priorityIcons[p]}</span>
                    {priorityLabels[p]}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-purple-200 mb-2 text-sm flex items-center">
              <FiCalendar className="mr-1" />
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            />
          </div>
        </div>
      )}
    </form>
  );
};

export default TodoForm;