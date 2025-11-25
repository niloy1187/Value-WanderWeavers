import React from 'react';
import { ViewType } from '../../types';

interface MobileNavProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
  onHome: () => void;
  onDeals: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeView, onNavigate, onHome, onDeals }) => {
  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 h-16 bg-panel/95 border border-neon-cyan/50 flex z-50 shadow-[0_0_20px_rgba(0,0,0,0.8)] rounded-lg backdrop-blur-md overflow-hidden">
        {/* Nav Items */}
        <button 
          onClick={onHome}
          className={`flex-1 flex flex-col items-center justify-center border-r border-gray-800 transition-colors ${activeView === 'map' ? 'text-neon-cyan bg-neon-cyan/10' : 'text-gray-500 active:text-white'}`}
        >
            <span className="text-xl mb-1">⦿</span>
            <span className="text-[10px] font-hud tracking-widest">MAP</span>
        </button>

        <button 
          onClick={onDeals}
          className="flex-1 flex flex-col items-center justify-center border-r border-gray-800 text-neon-gold hover:text-white active:bg-neon-gold/20 transition-colors"
        >
            <span className="text-xl mb-1">⚡</span>
            <span className="text-[10px] font-hud tracking-widest">DEALS</span>
        </button>

        <button 
          onClick={() => onNavigate('ethos')}
          className={`flex-1 flex flex-col items-center justify-center transition-colors ${activeView === 'ethos' ? 'text-white bg-white/10' : 'text-gray-500 active:text-white'}`}
        >
            <span className="text-xl mb-1">Ξ</span>
            <span className="text-[10px] font-hud tracking-widest">ETHOS</span>
        </button>
    </div>
  );
};

export default MobileNav;