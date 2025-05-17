
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 text-white p-2 rounded-xl">
            <Sparkles size={24} className="animate-float" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
            DreamScape
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Button variant="ghost" className="text-gray-700 hover:text-primary">Home</Button>
          <Button variant="ghost" className="text-gray-700 hover:text-primary">Saved Plans</Button>
          <Button variant="ghost" className="text-gray-700 hover:text-primary">About</Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </Button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 md:hidden animate-fade-in shadow-lg">
            <div className="flex flex-col p-4 space-y-3">
              <Button variant="ghost" className="text-gray-700 hover:text-primary justify-start">Home</Button>
              <Button variant="ghost" className="text-gray-700 hover:text-primary justify-start">Saved Plans</Button>
              <Button variant="ghost" className="text-gray-700 hover:text-primary justify-start">About</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
