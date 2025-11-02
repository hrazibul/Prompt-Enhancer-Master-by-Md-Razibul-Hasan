import React, { useState, useEffect, useRef } from 'react';
import { enhancePrompt } from '../services/promptService';
import { SparklesIcon, ChevronDownIcon, ClipboardIcon, CheckIcon, CodeIcon, BoltIcon } from './icons';

const MAX_PROMPT_LENGTH = 2000;

const EngagingLoadingIndicator: React.FC<{loadingText: string}> = ({ loadingText }) => (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400 p-4 transition-opacity duration-300">
        <div className="relative mb-4">
            <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping opacity-75"></div>
            <SparklesIcon className="w-12 h-12 text-emerald-400 animate-pulse" />
        </div>
        <p className="text-lg font-semibold text-white mt-2">{loadingText}</p>
        <p className="text-sm">Our AI is working its magic...</p>
    </div>
);

const ResultDisplay: React.FC<{ text: string }> = ({ text }) => {
    return (
        <div className="relative h-full">
            <pre className="whitespace-pre-wrap break-words font-sans text-gray-300 h-full overflow-y-auto p-4">
                {text}
            </pre>
        </div>
    );
};

type EnhancementMode = {
  id: 'basic' | 'mid' | 'high';
  name: string;
  description: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  locked?: boolean;
};

const enhancementModes: EnhancementMode[] = [
  { id: 'basic', name: 'Basic', description: 'Simple enhancements', icon: SparklesIcon },
  { id: 'mid', name: 'Mid', description: 'Code & image tasks', icon: CodeIcon },
  { id: 'high', name: 'High', description: 'Ultimate coding', icon: BoltIcon, locked: true },
];

interface PromptEnhancerProps {
  prompt: string;
  onPromptChange: (newPrompt: string) => void;
  onLockClick: () => void;
}

export const PromptEnhancer: React.FC<PromptEnhancerProps> = ({ prompt, onPromptChange, onLockClick }) => {
  const [enhancedPrompt, setEnhancedPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingText, setLoadingText] = useState('Enhancing...');
  const [copied, setCopied] = useState(false);

  const [selectedMode, setSelectedMode] = useState<EnhancementMode>(enhancementModes[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const loadingMessages = [
    "Analyzing your prompt...",
    "Adding crucial context...",
    "Optimizing for clarity...",
    "Structuring for the AI...",
    "Finalizing enhancements..."
  ];

  useEffect(() => {
    let intervalId: number | undefined;
    if (isLoading) {
      let messageIndex = 0;
      setLoadingText(loadingMessages[messageIndex]);
      intervalId = window.setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingText(loadingMessages[messageIndex]);
      }, 1500);
    }
    
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isLoading]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setEnhancedPrompt('');
    setCopied(false);

    try {
      const result = await enhancePrompt(prompt, selectedMode.id);
      setEnhancedPrompt(result.enhancedPrompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCopy = () => {
    if (!enhancedPrompt) return;
    navigator.clipboard.writeText(enhancedPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
};


  return (
    <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
        <div className="relative mb-6" ref={dropdownRef}>
            <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between border border-gray-700 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-800/60"
                aria-haspopup="listbox"
                aria-expanded={isDropdownOpen}
            >
                <div className="flex items-center gap-3">
                    <selectedMode.icon className="w-5 h-5 text-emerald-400" />
                    <div>
                        <p className="font-semibold text-white">{selectedMode.name}</p>
                        <p className="text-sm text-gray-400">{selectedMode.description}</p>
                    </div>
                </div>
                <ChevronDownIcon className={`w-5 h-5 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}/>
            </button>

            {isDropdownOpen && (
                <div className="absolute top-full mt-2 w-full bg-[#1c1c1c] border border-gray-700 rounded-lg shadow-xl z-20 p-2">
                    <ul role="listbox">
                        {enhancementModes.map((mode) => (
                            <li key={mode.id} role="option" aria-selected={selectedMode.id === mode.id}>
                                <button
                                    onClick={() => {
                                        if (mode.locked) {
                                            onLockClick();
                                            setIsDropdownOpen(false);
                                        } else {
                                            setSelectedMode(mode);
                                            setIsDropdownOpen(false);
                                        }
                                    }}
                                    className={`w-full flex items-center justify-between text-left p-3 rounded-md transition-colors ${
                                        selectedMode.id === mode.id ? 'bg-emerald-900/50' : 'hover:bg-gray-700/50'
                                    } ${mode.locked ? 'opacity-60' : ''}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 flex-shrink-0 flex items-center">
                                            {selectedMode.id === mode.id && <CheckIcon className="w-5 h-5 text-emerald-400" />}
                                        </div>
                                        <mode.icon className={`w-5 h-5 ${selectedMode.id === mode.id ? 'text-emerald-400' : 'text-gray-400'}`} />
                                        <div>
                                            <p className="font-semibold text-white">{mode.name}</p>
                                            <p className="text-sm text-gray-400">{mode.description}</p>
                                        </div>
                                    </div>
                                    {mode.locked && (
                                        <span className="text-xs font-semibold bg-gray-600 text-gray-200 px-2 py-1 rounded-md">
                                            Sign up
                                        </span>
                                    )}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-1 relative">
                <textarea
                    value={prompt}
                    onChange={(e) => onPromptChange(e.target.value)}
                    maxLength={MAX_PROMPT_LENGTH}
                    placeholder="Enter your prompt here or try an example below..."
                    className="w-full h-64 md:h-80 bg-transparent text-gray-300 placeholder-gray-500 focus:outline-none resize-none p-4"
                />
                <div className="absolute bottom-3 right-4 text-xs text-gray-500">
                    {prompt.length}/{MAX_PROMPT_LENGTH}
                </div>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg relative h-64 md:h-80">
                {isLoading ? (
                    <EngagingLoadingIndicator loadingText={loadingText} />
                ) : error ? (
                    <div className="p-4 text-red-400">{error}</div>
                ) : enhancedPrompt ? (
                   <ResultDisplay text={enhancedPrompt} />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 text-center p-4">
                        Your enhanced prompt will appear here...
                    </div>
                )}
            </div>
        </div>

        {enhancedPrompt && !isLoading && !error && (
            <div className="mt-4">
                 <button
                    onClick={handleCopy}
                    className={`w-full flex items-center justify-center gap-3 font-semibold py-3 px-6 rounded-lg transition-colors text-base ${
                        copied
                            ? 'bg-emerald-500 text-white'
                            : 'bg-gray-700 hover:bg-gray-600 text-white'
                    }`}
                >
                    {copied ? <CheckIcon className="w-5 h-5"/> : <ClipboardIcon className="w-5 h-5"/>}
                    {copied ? 'Copied!' : 'Copy Enhanced Prompt'}
                </button>
            </div>
        )}

        <div className="mt-6">
            <button
                onClick={handleSubmit}
                disabled={isLoading || !prompt.trim()}
                className="w-full flex items-center justify-center gap-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-semibold py-3 md:py-4 px-6 rounded-lg transition-colors"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {loadingText}
                    </>
                ) : (
                    <>
                        <SparklesIcon className="w-5 h-5"/>
                        Enhance Prompt
                    </>
                )}
            </button>
        </div>
    </div>
  );
};