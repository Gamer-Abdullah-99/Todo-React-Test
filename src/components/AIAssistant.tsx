import React, { useState } from 'react';

interface AIAssistantProps {
  suggestion: string;
  onProcess: (input: string) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ suggestion, onProcess }) => {
  const [aiInput, setAiInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aiInput.trim()) {
      setIsProcessing(true);
      onProcess(aiInput);
      
      // Simulate processing time
      setTimeout(() => {
        setIsProcessing(false);
      }, 1000);
    }
  };

  return (
    <div className="mb-6 bg-indigo-900/30 rounded-lg p-4 border border-indigo-500/30">
      <div className="flex items-center mb-3">
        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-2">
          <span className="text-sm">🤖</span>
        </div>
        <h3 className="text-lg font-medium text-purple-200">Cosmic AI Assistant</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <input
          type="text"
          value={aiInput}
          onChange={(e) => setAiInput(e.target.value)}
          placeholder="Ask AI to analyze or suggest..."
          className="flex-grow px-3 py-2 bg-slate-800/70 border border-indigo-500/40 rounded-lg text-white placeholder-indigo-300/60 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        />
        <button
          type="submit"
          disabled={isProcessing}
          className={`px-4 py-2 rounded-lg transition-all ${
            isProcessing 
              ? 'bg-indigo-700/50 text-indigo-200/70' 
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          {isProcessing ? 'Processing...' : 'Process'}
        </button>
      </form>
      
      {suggestion && (
        <div className="mt-3 p-3 bg-indigo-900/50 rounded-lg border border-indigo-500/30">
          <div className="flex items-start">
            <div className="text-indigo-300 text-lg mr-2">💡</div>
            <p className="text-indigo-200">{suggestion}</p>
          </div>
        </div>
      )}
      
      <div className="mt-3 text-xs text-indigo-300/70 flex items-center">
        <span className="mr-1">✨</span>
        <span>AI can help analyze tasks, suggest priorities, and organize your cosmic workflow</span>
      </div>
    </div>
  );
};

export default AIAssistant;