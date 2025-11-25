import React, { useState, useEffect } from 'react';
import { ClearanceLevel } from '../../types';

interface HeaderProps {
    clearance: ClearanceLevel;
}

const Header: React.FC<HeaderProps> = ({ clearance }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-IN', { hour12: false }) + `:${now.getMilliseconds().toString().padStart(3,'0')}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 100); // Faster refresh for ms
    return () => clearInterval(timer);
  }, []);

  // Mock Ticker Data
  const tickerItems = [
      "OPERATIVE_44 JUST SECURED: GOA_BLITZ",
      "INTEL UPDATE: KERALA SECTOR PRICES DROPPING...",
      "AGENT_KAI REQUESTED: SPITI_ODYSSEY CLEARANCE",
      "SYSTEM ALERT: RAJASTHAN SLOTS @ 85% CAPACITY",
      "NEW ASSET DETECTED: MEGHALAYA_MONSOON",
      "OPERATIVE_JANE UNLOCKED: SECRET_RAVE_INTEL"
  ];

  return (
    <header className="flex-none flex flex-col z-50 sticky top-0">
      {/* Main Header */}
      <div className="bg-void/90 border-b border-gray-800 px-4 md:px-6 h-16 md:h-20 flex justify-between items-center backdrop-blur-md">
        <div className="flex items-center gap-4">
            <div className={`w-8 h-8 md:w-10 md:h-10 border-2 ${clearance === 'AGENT' ? 'border-neon-gold bg-neon-gold/20' : 'border-gray-600 bg-gray-900'} flex items-center justify-center shrink-0 transition-colors duration-500`}>
                <div className={`w-3 h-3 rounded-full animate-pulse ${clearance === 'AGENT' ? 'bg-neon-gold' : 'bg-gray-500'}`}></div>
            </div>
            <div className="overflow-hidden">
                <h1 className="font-display font-bold text-lg md:text-2xl text-white tracking-tighter leading-none whitespace-nowrap">
                VALUE <span className="text-neon-gold">WANDERWEAVERS</span>
                </h1>
                <p className="font-mono text-[9px] md:text-[10px] text-gray-500 tracking-[0.2em] uppercase hidden sm:block mt-1">
                    An Exclusive Palate Pilgrim Offering
                </p>
            </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:flex flex-col items-end">
                <span className="text-gray-600 uppercase tracking-widest text-[9px]">Clearance</span>
                <div className={`flex items-center gap-2 font-mono text-xs font-bold ${clearance === 'AGENT' ? 'text-neon-gold shadow-glow' : 'text-gray-400'}`}>
                    {clearance === 'AGENT' ? 'FIELD_AGENT' : 'RECRUIT'}
                </div>
            </div>
            
            <div className="flex flex-col items-end border-l border-gray-800 pl-4">
                <span className="text-gray-600 uppercase tracking-widest text-[9px] hidden md:block">Time [IST]</span>
                <span className="text-white font-mono text-sm md:text-xl w-24 text-right">{time}</span>
            </div>
        </div>
      </div>

      {/* Live Ticker */}
      <div className="ticker-wrap h-6 flex items-center">
          <div className="ticker-move">
              {tickerItems.map((item, i) => (
                  <div key={i} className="ticker-item">{item} +++ </div>
              ))}
              {/* Duplicate for loop */}
              {tickerItems.map((item, i) => (
                  <div key={`dup-${i}`} className="ticker-item">{item} +++ </div>
              ))}
          </div>
      </div>
    </header>
  );
};

export default Header;