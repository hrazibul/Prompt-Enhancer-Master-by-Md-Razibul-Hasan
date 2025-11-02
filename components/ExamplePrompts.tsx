import React, { useState } from 'react';
import { SparklesIcon, CodeIcon, BoltIcon, BookOpenIcon } from './icons';

type PromptCategory = 'basic' | 'mid' | 'high';

const promptExamples = {
  basic: [
    "explain quantum computing to me",
    "write a short story about a friendly robot",
    "what are the health benefits of meditation?",
    "summarize the plot of 'Dune'",
  ],
  mid: [
    "create a logo for a coffee shop called 'The Daily Grind'",
    "write a python script to scrape headlines from a news website",
    "generate a meal plan for a week for a vegetarian diet",
    "draft a professional email asking for a raise",
  ],
  high: [
    "design a react component for a customizable dashboard widget",
    "explain the architecture of a microservices-based application for an e-commerce platform",
    "write a smart contract in Solidity for a simple NFT minting process",
    "create a detailed marketing strategy for a new tech startup",
  ],
};

const tabs: { id: PromptCategory, name: string, icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }[] = [
    { id: 'basic', name: 'Basic', icon: SparklesIcon },
    { id: 'mid', name: 'Mid Tier', icon: CodeIcon },
    { id: 'high', name: 'High Tier', icon: BoltIcon },
];

interface ExamplePromptsProps {
    onExampleClick: (prompt: string) => void;
}

export const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onExampleClick }) => {
    const [activeTab, setActiveTab] = useState<PromptCategory>('basic');

    return (
        <section className="mt-20 md:mt-24 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center gap-3">
                    <BookOpenIcon className="w-8 h-8 text-emerald-400" />
                    Prompt Library
                </h2>
                <p className="text-lg text-gray-400 mt-4">
                    Not sure where to start? Try one of these examples.
                </p>
            </div>

            <div className="bg-gray-900/50 border border-gray-700/50 rounded-2xl p-2 sm:p-4 backdrop-blur-sm">
                <div className="flex justify-center sm:justify-start border-b border-gray-700 mb-4">
                    {tabs.map(tab => (
                        <button 
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-3 sm:px-4 py-3 text-sm sm:text-base font-semibold transition-colors ${
                                activeTab === tab.id 
                                ? 'text-emerald-400 border-b-2 border-emerald-400'
                                : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.name}
                        </button>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 p-2">
                    {promptExamples[activeTab].map((prompt, index) => (
                        <button
                            key={index}
                            onClick={() => onExampleClick(prompt)}
                            className="text-left p-4 bg-gray-800/60 hover:bg-gray-700/80 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                        >
                            <p className="text-gray-300 text-sm">{prompt}</p>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};