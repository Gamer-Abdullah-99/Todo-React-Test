import React, { useState, useEffect } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Header from './Header';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import CategorySelector from './CategorySelector';
import AIAssistant from './AIAssistant';
import StatsDisplay from './StatsDisplay';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  createdAt: Date;
};

export type Category = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('cosmicTodos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [aiSuggestion, setAiSuggestion] = useState<string>('');
  const [showAI, setShowAI] = useState<boolean>(false);

  const categories: Category[] = [
    { id: 'personal', name: 'Personal', icon: '🪐', color: 'bg-purple-500' },
    { id: 'work', name: 'Work', icon: '🌎', color: 'bg-blue-500' },
    { id: 'health', name: 'Health', icon: '✨', color: 'bg-green-500' },
    { id: 'learning', name: 'Learning', icon: '🚀', color: 'bg-yellow-500' },
  ];

  useEffect(() => {
    localStorage.setItem('cosmicTodos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, category: string, priority: 'low' | 'medium' | 'high', dueDate: string | null) => {
    if (text.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text,
        completed: false,
        category,
        priority,
        dueDate,
        createdAt: new Date(),
      };
      setTodos([...todos, newTodo]);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: string, newText: string, category: string, priority: 'low' | 'medium' | 'high', dueDate: string | null) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, text: newText, category, priority, dueDate } : todo
    ));
  };

  const handleDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    const newTodos = [...todos];
    const [movedTodo] = newTodos.splice(source.index, 1);
    newTodos.splice(destination.index, 0, movedTodo);
    
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter(todo => {
    // Apply status filter
    if (filter === 'active' && todo.completed) return false;
    if (filter === 'completed' && !todo.completed) return false;
    
    // Apply category filter
    if (activeCategory !== 'all' && todo.category !== activeCategory) return false;
    
    return true;
  });

  const processWithAI = (input: string) => {
    // Simulate AI processing
    setTimeout(() => {
      const suggestions = [
        "I suggest breaking this task into smaller steps",
        "This appears to be a high priority task",
        "Would you like to set a reminder for this?",
        "This task seems similar to ones in your 'Work' category"
      ];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setAiSuggestion(randomSuggestion);
    }, 500);
  };

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
    byCategory: categories.map(cat => ({
      name: cat.name,
      count: todos.filter(todo => todo.category === cat.id).length,
      color: cat.color
    }))
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/40 backdrop-blur-sm shadow-2xl border border-purple-500/20 p-6">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-blue-400 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <Header />
          
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            <div className="w-full md:w-3/4">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setFilter('all')} 
                    className={`px-4 py-2 rounded-lg transition-all ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/50'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setFilter('active')} 
                    className={`px-4 py-2 rounded-lg transition-all ${filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/50'}`}
                  >
                    Active
                  </button>
                  <button 
                    onClick={() => setFilter('completed')} 
                    className={`px-4 py-2 rounded-lg transition-all ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-indigo-600/30 text-indigo-200 hover:bg-indigo-600/50'}`}
                  >
                    Completed
                  </button>
                </div>
                <button
                  onClick={() => setShowAI(!showAI)}
                  className="flex items-center space-x-1 bg-purple-600/60 hover:bg-purple-600/80 text-white px-3 py-2 rounded-lg transition-all"
                >
                  <span>AI</span>
                  <span className="text-lg">🤖</span>
                </button>
              </div>
              
              {showAI && <AIAssistant 
                suggestion={aiSuggestion} 
                onProcess={processWithAI} 
              />}
              
              <TodoForm 
                addTodo={addTodo} 
                categories={categories} 
                processWithAI={processWithAI}
              />
              
              <DragDropContext onDragEnd={handleDragEnd}>
                <TodoList 
                  todos={filteredTodos} 
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  categories={categories}
                />
              </DragDropContext>
            </div>
            
            <div className="w-full md:w-1/4">
              <CategorySelector 
                categories={categories} 
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
              
              <div className="mt-6">
                <StatsDisplay stats={stats} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;