import React from 'react';
import { AccordionItem } from './Accordion';
import { LightbulbIcon, LockIcon, ChartBarIcon, BookOpenIcon } from './icons';

export const AccordionSection: React.FC = () => {
    return (
        <section className="mt-20 md:mt-32 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                Master Your AI Interactions
            </h2>
            <p className="text-lg text-gray-400 text-center mb-12">
                Discover how our prompt enhancer empowers you to communicate more effectively with any AI.
            </p>
            <div className="space-y-4">
                <AccordionItem title="How The Enhancer Works" icon={<LightbulbIcon className="w-5 h-5"/>}>
                    <p>Simply enter your basic idea or question. Our system analyzes your input and enriches it with context, detail, and structure, transforming it into a high-quality prompt designed for clarity and optimal AI performance.</p>
                </AccordionItem>
                <AccordionItem title="Why Better Prompts Matter" icon={<LockIcon className="w-5 h-5"/>}>
                    <p>The quality of the output you get from an AI is directly proportional to the quality of the prompt you provide. A well-crafted prompt reduces ambiguity, provides necessary context, and guides the AI to generate more accurate, relevant, and creative responses, saving you time and iterations.</p>
                </AccordionItem>
                <AccordionItem title="The Enhancement Process" icon={<ChartBarIcon className="w-5 h-5"/>}>
                    <p>Our enhancement process involves several stages, including keyword extraction, context expansion, and structural reformatting. We add specific instructions, constraints, and formatting cues that AIs understand best, leading to superior results across a wide range of tasks.</p>
                </AccordionItem>
                <AccordionItem title="Quick Tips for Great Prompts" icon={<BookOpenIcon className="w-5 h-5"/>}>
                    <p>
                        - Be specific and clear about your goal.<br />
                        - Provide context, like the target audience or desired format.<br />
                        - Use examples to guide the AI's response.<br />
                        - Define what you *don't* want to see in the output.
                    </p>
                </AccordionItem>
            </div>
        </section>
    );
}