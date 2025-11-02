import React from 'react';

const FacebookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="currentColor" className="text-gray-400 hover:text-white transition-colors">
        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"></path>
    </svg>
);


export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/20 border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg text-white mb-2">Enhanced Prompt</h3>
            <p className="text-gray-400 text-sm">
             By Md Razibul Hasan. Instantly transform basic ideas into powerful, precise instructions for any AI.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#"><FacebookIcon /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Enhanced Prompt By Md Razibul Hasan. All rights reserved. Made with ❤️ for the AI community.</p>
        </div>
      </div>
    </footer>
  );
};