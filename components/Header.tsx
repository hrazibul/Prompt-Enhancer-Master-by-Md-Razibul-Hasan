import React from 'react';
import { UserIcon, SparklesIcon } from './icons';

interface HeaderProps {
  onSignInClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSignInClick }) => {
  return (
    <header className="py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SparklesIcon className="w-6 h-6 text-emerald-400" />
           <span className="text-lg sm:text-xl font-bold text-white whitespace-nowrap">
             <span className="sm:hidden">Enhanced Prompt</span>
             <span className="hidden sm:inline">By Md Razibul Hasan</span>
           </span>
        </div>
        <button 
          onClick={onSignInClick}
          className="flex items-center gap-2 text-sm font-medium border border-gray-700 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-700/50 px-3 sm:px-4 py-2 rounded-lg transition-colors">
          <UserIcon className="w-4 h-4" />
          Sign In
        </button>
      </div>
    </header>
  );
};
