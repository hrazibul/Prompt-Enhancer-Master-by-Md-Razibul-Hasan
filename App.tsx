import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { PromptEnhancer } from './components/PromptEnhancer';
import { AccordionSection } from './components/AccordionSection';
import { AuthModal } from './components/AuthModal';
import { ExamplePrompts } from './components/ExamplePrompts';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [prompt, setPrompt] = useState('');

  const handleExampleClick = (exampleText: string) => {
    setPrompt(exampleText);
    const enhancerElement = document.getElementById('enhancer');
    if (enhancerElement) {
      enhancerElement.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="min-h-screen bg-[#0d0d0d] text-gray-300 font-sans antialiased">
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 0, #10B981 0%, transparent 40%)',
        }}
      />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header onSignInClick={() => setIsAuthModalOpen(true)} />
        <main className="flex-grow container mx-auto px-4 py-12 md:py-20">
          <section className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
              Enhance Your AI Prompts
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
              Transform your prompts into powerful, detailed instructions that get better results from AI models. Choose your enhancement mode and see the difference.
            </p>
            <a
              href="#enhancer"
              className="mt-8 inline-block bg-emerald-500 text-white font-semibold py-3 px-6 md:px-8 rounded-lg shadow-lg shadow-emerald-500/20 hover:bg-emerald-600 transition-all duration-300 transform hover:scale-105 text-base md:text-lg"
            >
              Try The Enhancer
            </a>
          </section>
          
          <div id="enhancer">
            <PromptEnhancer 
              prompt={prompt}
              onPromptChange={setPrompt}
              onLockClick={() => setIsAuthModalOpen(true)} 
            />
          </div>

          <ExamplePrompts onExampleClick={handleExampleClick} />

          <AccordionSection />
        </main>
        <Footer />
      </div>
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
}

export default App;