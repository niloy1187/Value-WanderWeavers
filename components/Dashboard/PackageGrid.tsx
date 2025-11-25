import React, { useState } from 'react';
import { Package, SectorData, ClearanceLevel } from '../../types';

interface PackageGridProps {
  data: SectorData;
  onBook: (pkg: Package) => void;
  onViewEvidence: (pkg: Package) => void;
  onHover: () => void;
  userClearance: ClearanceLevel;
  onUnlockRequest: (pkg: Package) => void;
}

const PackageGrid: React.FC<PackageGridProps> = ({ data, onBook, onViewEvidence, onHover, userClearance, onUnlockRequest }) => {
  const displayTitle = data.title.split(':')[1] || data.title;

  return (
    <div className="pb-24 w-full">
      <div className="mb-8 border-b border-gray-800 pb-6 bg-gradient-to-r from-panel to-transparent p-6 rounded-tl-xl clip-corner-br">
        <h1 className="font-display font-bold text-white text-3xl md:text-5xl lg:text-6xl tracking-tight mb-2 cyber-glitch" data-text={displayTitle}>
            {displayTitle}
        </h1>
        <p className="font-hud text-gray-300 text-xs md:text-sm tracking-widest uppercase mb-4 max-w-2xl leading-relaxed">
            {data.subtitle}
        </p>
        <div className="inline-flex flex-wrap items-center gap-2 font-mono text-[10px] md:text-xs text-neon-cyan border border-neon-cyan/30 px-3 py-1 bg-black/50">
            <span>COORDS: {data.coords[0].toFixed(2)}, {data.coords[1].toFixed(2)}</span>
            <span className="text-gray-600 hidden md:inline">|</span>
            <span className="w-full md:w-auto mt-1 md:mt-0">AVAILABILITY: {data.missions.length} UNITS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.missions.map((pkg, idx) => (
          <PackageCard 
            key={pkg.codename} 
            pkg={pkg} 
            index={idx}
            onBook={onBook} 
            onViewEvidence={onViewEvidence}
            onHover={onHover}
            userClearance={userClearance}
            onUnlockRequest={onUnlockRequest}
          />
        ))}
      </div>
    </div>
  );
};

const PackageCard: React.FC<{ 
  pkg: Package; 
  index: number; 
  onBook: (p: Package) => void; 
  onViewEvidence: (p: Package) => void;
  onHover: () => void;
  userClearance: ClearanceLevel;
  onUnlockRequest: (p: Package) => void;
}> = ({ pkg, index, onBook, onViewEvidence, onHover, userClearance, onUnlockRequest }) => {
  const [showDossier, setShowDossier] = useState(false);

  return (
    <div 
      className="bg-panel border border-gray-800 hover:border-neon-gold transition-all duration-300 flex flex-col animate-fade-in-up w-full group relative"
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={onHover}
    >
      <div 
        className="h-48 md:h-56 relative overflow-hidden cursor-pointer"
        onClick={() => onViewEvidence(pkg)}
      >
        <img 
          src={pkg.media[0]?.src} 
          alt={pkg.codename} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95 contrast-110" 
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 border border-gray-700 text-[10px] font-hud text-white uppercase z-10 shadow-md">
             {pkg.threat} THREAT
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm">
            <span className="text-neon-cyan font-mono text-xs border border-neon-cyan px-3 py-1 uppercase tracking-widest bg-black shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                [ VIEW INTEL ]
            </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-hud font-bold text-lg md:text-xl text-white mb-2 leading-tight break-words">
            {pkg.codename.replace(/_/g, ' ')}
        </h3>
        <div className="font-mono text-2xl text-neon-gold font-bold mb-4 tracking-tight">{pkg.price}</div>

        <div className="grid grid-cols-2 gap-2 mb-4 text-center">
           <div className="bg-void border border-gray-700 p-2">
             <div className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">VFM Index</div>
             <div className="text-green-400 font-mono text-sm font-bold">{pkg.vfm}</div>
           </div>
           <div className="bg-void border border-gray-700 p-2">
             <div className="text-[9px] text-gray-400 font-mono uppercase tracking-wider">Duration</div>
             <div className="text-white font-mono text-sm font-bold">{pkg.duration}</div>
           </div>
        </div>

        <p className="text-sm text-gray-300 font-mono mb-6 leading-relaxed border-l-2 border-gray-700 pl-3">
            {pkg.brief}
        </p>

        <div className="mt-auto space-y-3">
            <button 
                onClick={() => onBook(pkg)}
                className="w-full py-3 bg-neon-gold text-black font-hud font-bold text-sm tracking-widest hover:bg-white transition-colors uppercase shadow-[0_0_15px_rgba(255,215,0,0.2)] clip-corner-br"
            >
                BOOK MISSION
            </button>
            <button 
                onClick={() => setShowDossier(!showDossier)}
                className="w-full py-2 text-[10px] md:text-xs font-mono text-gray-400 hover:text-neon-cyan uppercase tracking-widest transition-colors"
            >
                {showDossier ? '[- HIDE CLASSIFIED INTEL]' : '[+ EXPAND DOSSIER]'}
            </button>
        </div>

        {showDossier && (
           <div className="mt-4 pt-4 border-t border-gray-800 animate-fade-in-up">
              <ul className="space-y-2">
                {/* Public Inclusions */}
                {pkg.inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-gray-300 font-mono">
                        <span className="text-neon-gold">»</span> 
                        <span className="leading-snug">{inc}</span>
                    </li>
                ))}
                
                {/* LOCKED LEAD MAGNETS */}
                {pkg.lockedInclusions?.map((inc, i) => (
                    <li 
                        key={`locked-${i}`} 
                        className={`flex items-start gap-2 text-xs md:text-sm font-mono relative overflow-hidden transition-all ${userClearance === 'RECRUIT' ? 'cursor-pointer group/lock p-1' : 'text-neon-cyan'}`}
                        onClick={() => userClearance === 'RECRUIT' && onUnlockRequest(pkg)}
                    >
                        <span className={userClearance === 'AGENT' ? "text-neon-cyan" : "text-neon-red"}>
                            {userClearance === 'AGENT' ? '🔓' : '🔒'}
                        </span>
                        
                        {userClearance === 'AGENT' ? (
                            <span className="leading-snug shadow-glow">{inc}</span>
                        ) : (
                            <div className="relative w-full">
                                <span className="leading-snug blur-text opacity-50">{inc}</span>
                                <div className="absolute inset-0 flex items-center bg-black/80 locked-glitch border border-neon-red/30"></div>
                            </div>
                        )}
                    </li>
                ))}
              </ul>
              
              {userClearance === 'RECRUIT' && (
                  <div className="text-[9px] text-neon-red font-mono text-center mt-2 animate-pulse">
                      * AUTH REQUIRED TO VIEW CLASSIFIED ASSETS
                  </div>
              )}
           </div>
        )}
      </div>
    </div>
  );
};

export default PackageGrid;