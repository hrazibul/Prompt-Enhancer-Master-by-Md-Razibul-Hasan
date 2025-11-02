import React, { useState, useEffect } from 'react';
import { XIcon, MailIcon, LockIcon } from './icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="bg-[#181818] rounded-2xl p-8 max-w-md w-full relative border border-gray-700/50 shadow-2xl shadow-black/30"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <XIcon className="w-6 h-6" />
        </button>

        <h2 id="auth-modal-title" className="text-2xl font-bold text-white mb-2 text-center sm:text-left">
          Access High Tier Enhancement
        </h2>
        <p className="text-gray-400 mb-6 text-center sm:text-left">
          Sign in or create an account to access advanced prompt enhancement with 10 requests per day.
        </p>

        <div className="flex bg-gray-800/60 p-1 rounded-lg mb-6">
          <button
            onClick={() => setActiveTab('signin')}
            className={`flex-1 py-2 text-center rounded-md transition-colors text-sm font-semibold ${
              activeTab === 'signin' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 text-center rounded-md transition-colors text-sm font-semibold ${
              activeTab === 'signup' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
            <div className="relative">
              <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="password"className="text-sm font-medium text-gray-300 mb-2 block">Password</label>
            <div className="relative">
              <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-gray-800/60 border border-gray-700 rounded-lg py-3 pl-11 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-8 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {activeTab === 'signin' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};
