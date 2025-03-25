import React, { useState } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { FiEdit2, FiTrash2, FiCalendar, FiTag, FiFlag, FiSave, FiX } from 'react-icons/fi';
import { Todo, Category } from './TodoApp';

interface TodoListProps {
  todos: Todo[];
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string, category: string, priority: 'low' | 'medium' | 'high', dueDate: string | null) => void;
  categories: Category[];
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo, editTodo, categories }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editPriority, setEditPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [editDueDate, setEditDueDate] = useState<string>('');
  
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditCategory(todo.category);
    setEditPriority(todo.priority);
    setEditDueDate(todo.dueDate || '');
    setShowCategoryDropdown(false);
    setShowPriorityDropdown(false);
  };

  const saveEdit = () => {
    if (editingId && editText.trim()) {
      editTodo(editingId, editText, editCategory, editPriority, editDueDate || null);
      setEditingId(null);
    }
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.icon : '🔍';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.color : 'bg-gray-500';
  };

  const getPriorityIcon = (priority: 'low' | 'medium' | 'high') => {
    const icons = {
      low: "🌑", // Moon
      medium: "🪐", // Planet
      high: "☄️", // Comet
    };
    return icons[priority];
  };
  
  const priorityLabels = {
    low: "Low",
    medium: "Medium",
    high: "High"
  };
  
  const priorityStyles = {
    low: "bg-blue-600/40 border-blue-400/40",
    medium: "bg-purple-600/40 border-purple-400/40",
    high: "bg-red-600/40 border-red-400/40"
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  if (todos.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-purple-300 text-lg">The cosmic void is empty. Add some tasks!</p>
        <div className="mt-4 text-4xl animate-pulse">🌌</div>
      </div>
    );
  }

  return (
    <Droppable droppableId="todos">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-3"
        >
          {todos.map((todo, index) => (
            <Draggable key={todo.id} draggableId={todo.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`group p-4 rounded-lg transition-all border ${todo.completed ? 'bg-slate-800/30 border-slate-700/50' : 'bg-slate-800/50 border-purple-500/30'} ${snapshot.isDragging ? 'shadow-lg ring-2 ring-purple-500/50' : ''}`}
                >
                  {editingId === todo.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none"
                        autoFocus
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="relative">
                          <label className="block text-purple-200 mb-1 text-sm flex items-center">
                            <FiTag className="mr-1" />
                            Category
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setShowCategoryDropdown(!showCategoryDropdown);
                              setShowPriorityDropdown(false);
                            }}
                            className="w-full px-2 py-1 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white text-sm flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <span className="mr-1">{getCategoryIcon(editCategory)}</span>
                              <span>{getCategoryName(editCategory)}</span>
                            </div>
                            <FiChevronDown className={showCategoryDropdown ? 'rotate-180' : ''} />
                          </button>
                          
                          {showCategoryDropdown && (
                            <div className="absolute z-20 mt-1 w-full bg-slate-800 border border-purple-500/30 rounded-lg shadow-lg py-1 max-h-32 overflow-y-auto">
                              {categories.map(cat => (
                                <button
                                  key={cat.id}
                                  type="button"
                                  onClick={() => {
                                    setEditCategory(cat.id);
                                    setShowCategoryDropdown(false);
                                  }}
                                  className={`w-full text-left px-2 py-1 hover:bg-slate-700 flex items-center ${editCategory === cat.id ? 'bg-purple-600/30' : ''}`}
                                >
                                  <span className="mr-1">{cat.icon}</span>
                                  {cat.name}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div className="relative">
                          <label className="block text-purple-200 mb-1 text-sm flex items-center">
                            <FiFlag className="mr-1" />
                            Priority
                          </label>
                          <button
                            type="button"
                            onClick={() => {
                              setShowPriorityDropdown(!showPriorityDropdown);
                              setShowCategoryDropdown(false);
                            }}
                            className={`w-full px-2 py-1 ${priorityStyles[editPriority]} border rounded-lg text-white text-sm flex items-center justify-between`}
                          >
                            <div className="flex items-center">
                              <span className="mr-1">{getPriorityIcon(editPriority)}</span>
                              <span>{priorityLabels[editPriority]}</span>
                            </div>
                            <FiChevronDown className={showPriorityDropdown ? 'rotate-180' : ''} />
                          </button>
                          
                          {showPriorityDropdown && (
                            <div className="absolute z-20 mt-1 w-full bg-slate-800 border border-purple-500/30 rounded-lg shadow-lg py-1">
                              {(['low', 'medium', 'high'] as const).map(p => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => {
                                    setEditPriority(p);
                                    setShowPriorityDropdown(false);
                                  }}
                                  className={`w-full text-left px-2 py-1 hover:bg-slate-700 flex items-center ${editPriority === p ? 'bg-purple-600/30' : ''}`}
                                >
                                  <span className="mr-1">{getPriorityIcon(p)}</span>
                                  {priorityLabels[p]}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-purple-200 mb-1 text-sm flex items-center">
                            <FiCalendar className="mr-1" />
                            Due Date
                          </label>
                          <input
                            type="date"
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="w-full px-2 py-1 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white text-sm"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-1 bg-slate-600 text-white rounded-lg text-sm flex items-center"
                        >
                          <FiX className="mr-1" />
                          Cancel
                        </button>
                        <button
                          onClick={saveEdit}
                          className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm flex items-center"
                        >
                          <FiSave className="mr-1" />
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={todo.completed}
                          onChange={() => toggleTodo(todo.id)}
                          className="w-5 h-5 rounded-md border-2 border-purple-400 bg-transparent checked:bg-purple-600 focus:ring-purple-500 focus:ring-offset-0"
                        />
                        
                        <div>
                          <div className="flex items-center space-x-2">
                            <span 
                              className={`inline-block px-2 py-1 rounded-full text-xs ${getCategoryColor(todo.category)} bg-opacity-30 text-white`}
                              title={getCategoryName(todo.category)}
                            >
                              {getCategoryIcon(todo.category)}
                            </span>
                            
                            <span 
                              className={`${todo.completed ? 'text-gray-400 line-through' : 'text-white'}`}
                            >
                              {todo.text}
                            </span>
                            
                            <span
                              className="text-sm"
                              title={`${priorityLabels[todo.priority]} Priority`}
                            >
                              {getPriorityIcon(todo.priority)}
                            </span>
                          </div>
                          
                          {todo.dueDate && (
                            <div className="mt-1 flex items-center text-xs text-purple-300">
                              <FiCalendar className="mr-1" />
                              {formatDate(todo.dueDate)}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => startEditing(todo)}
                          className="p-1 text-purple-300 hover:text-purple-100"
                          title="Edit task"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          className="p-1 text-red-300 hover:text-red-100"
                          title="Delete task"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default TodoList;