import React from 'react';
import { SECTORS } from '../../constants';
import { ViewType, SectorKey } from '../../types';

interface SidebarProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
  onToggleConsole: () => void;
  onStartJourney: () => void;
  onHover: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, onToggleConsole, onStartJourney, onHover }) => {
  return (
    <nav className="hidden md:flex w-72 bg-panel border-r border-gray-800 flex-col shrink-0 z-40 relative h-full">
      <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-neon-cyan/30 to-transparent"></div>
      
      <div className="p-8 border-b border-gray-800 bg-void/50 shrink-0">
         <h2 className="font-hud text-neon-gold text-sm tracking-[0.3em] uppercase opacity-80">Tactical Nav</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar">
        <button 
          onMouseEnter={onHover}
          onClick={onStartJourney}
          className="w-full text-left px-6 py-4 mb-8 bg-neon-gold/10 border-2 border-neon-gold text-neon-gold font-hud font-bold tracking-widest hover:bg-neon-gold hover:text-black transition-all uppercase text-xs clip-corner-br group relative overflow-hidden shadow-[0_0_15px_rgba(255,215,0,0.1)] hover:shadow-[0_0_25px_rgba(255,215,0,0.4)]"
        >
          <span className="relative z-10 flex items-center justify-between">
             <span>DEAL FINDER</span>
             <span className="text-xl">»</span>
          </span>
          <div className="absolute inset-0 bg-neon-gold translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-200 z-0"></div>
        </button>

        <div className="font-mono text-[9px] text-gray-600 uppercase tracking-widest px-2 mb-2">Core Modules</div>

        <button 
          onMouseEnter={onHover}
          onClick={() => onNavigate('map')}
          className={`w-full text-left px-4 py-3 text-xs font-hud tracking-wide transition-all border-l-2 clip-corner-br ${activeView === 'map' ? 'border-neon-cyan text-white bg-neon-cyan/10 pl-6' : 'border-gray-800 text-gray-500 hover:text-white hover:bg-white/5 hover:border-gray-600'}`}
        >
          SECTOR MAP
        </button>

        <button 
          onMouseEnter={onHover}
          onClick={() => onNavigate('ethos')}
          className={`w-full text-left px-4 py-3 text-xs font-hud tracking-wide transition-all border-l-2 clip-corner-br ${activeView === 'ethos' ? 'border-neon-cyan text-white bg-neon-cyan/10 pl-6' : 'border-gray-800 text-gray-500 hover:text-white hover:bg-white/5 hover:border-gray-600'}`}
        >
          ETHOS PROTOCOLS
        </button>

        <div className="font-mono text-[9px] text-gray-600 uppercase tracking-widest px-2 mt-8 mb-2">Deployment Zones</div>
        
        {SECTORS.map(sector => (
          <button
            key={sector}
            onMouseEnter={onHover}
            onClick={() => onNavigate(sector)}
            className={`w-full text-left px-4 py-3 text-xs font-hud uppercase tracking-wider transition-all border-r-2 clip-corner-br ${activeView === sector ? 'border-neon-gold text-neon-gold bg-neon-gold/5 pr-6' : 'border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600'}`}
          >
            {sector}
          </button>
        ))}
      </div>

      <div className="p-6 border-t border-gray-800 bg-void/50 shrink-0">
        <button 
          onMouseEnter={onHover}
          onClick={onToggleConsole}
          className="w-full py-3 text-[10px] font-mono text-gray-500 hover:text-neon-cyan text-center border border-dashed border-gray-800 hover:border-neon-cyan transition-colors"
        >
          TOGGLE_SYS_LOGS()
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;