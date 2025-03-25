import React, { useState } from 'react';
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
    low: "bg-blue-600/40 border-blue-400/40 hover:bg-blue-600/60",
    medium: "bg-purple-600/40 border-purple-400/40 hover:bg-purple-600/60",
    high: "bg-red-600/40 border-red-400/40 hover:bg-red-600/60"
  };

  const priorityIcons = {
    low: "🌑", // Moon
    medium: "🪐", // Planet
    high: "☄️", // Comet
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
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
          className="p-3 bg-indigo-600/50 text-white rounded-lg hover:bg-indigo-600/70 transition-all"
        >
          {expanded ? '−' : '+'}
        </button>
        <button
          type="submit"
          className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all"
        >
          Add Task
        </button>
      </div>
      
      {expanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-purple-200 mb-2 text-sm">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-purple-200 mb-2 text-sm">Priority</label>
            <div className="flex space-x-2">
              {(['low', 'medium', 'high'] as const).map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`px-3 py-2 rounded-lg border flex-1 ${priorityStyles[p]} ${priority === p ? 'ring-2 ring-white' : ''}`}
                >
                  <span className="mr-1">{priorityIcons[p]}</span>
                  <span className="capitalize">{p}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-purple-200 mb-2 text-sm">Due Date</label>
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