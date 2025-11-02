import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon } from './icons';

interface AccordionItemProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="border border-gray-700/80 bg-gray-800/30 rounded-lg">
            <button
                className="w-full flex justify-between items-center text-left p-5 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 flex items-center justify-center">
                       {icon}
                    </span>
                    <span className="font-semibold text-white text-lg">{title}</span>
                </div>
                <ChevronDownIcon className={`w-6 h-6 text-gray-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                ref={contentRef}
                style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
                className="overflow-hidden transition-max-height duration-500 ease-in-out"
            >
                <div className="px-5 pb-5 pt-2 text-gray-400">
                    {children}
                </div>
            </div>
        </div>
    );
};
