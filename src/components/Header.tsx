import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="relative inline-block">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 pb-2">
          Cosmic Tasks
        </h1>
        <div className="absolute -top-4 -right-8 animate-pulse">
          <span className="text-2xl">✨</span>
        </div>
        <div className="absolute -bottom-2 -left-6 animate-pulse delay-75">
          <span className="text-xl">⭐</span>
        </div>
      </div>
      <p className="text-purple-200 mt-2 max-w-lg mx-auto">
        Navigate your tasks through the cosmic void with AI-powered organization
      </p>
    </header>
  );
};

export default Header;