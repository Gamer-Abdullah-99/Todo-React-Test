import React from 'react';
import TodoApp from './components/TodoApp';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-black">
      <TodoApp />
    </div>
  );
};

export default App;