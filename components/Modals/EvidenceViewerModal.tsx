import React from 'react';
import { Package } from '../../types';

interface EvidenceViewerModalProps {
  pkg: Package;
  onClose: () => void;
}

const EvidenceViewerModal: React.FC<EvidenceViewerModalProps> = ({ pkg, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur animate-fadeIn p-4 md:p-8">
      <div className="w-full max-w-6xl h-[80vh] flex flex-col bg-interface-line border-2 border-neon-red rounded-lg overflow-hidden shadow-[0_0_60px_rgba(233,69,96,0.3)]">
        <div className="flex justify-between items-center p-4 bg-void/50 border-b border-gray-700">
          <h2 className="font-hud text-xl text-neon-gold">RECON DOSSIER: {pkg.codename}</h2>
          <button 
            onClick={onClose}
            className="border border-neon-red text-neon-red px-4 py-1 font-mono text-xs hover:bg-neon-red hover:text-white transition-colors"
          >
            CLOSE [X]
          </button>
        </div>

        <div className="flex-1 flex flex-col md:flex-row p-4 gap-4 overflow-hidden">
          {/* Main Viewer */}
          <div className="flex-1 bg-black rounded border border-gray-800 flex items-center justify-center overflow-hidden relative">
            <img src={pkg.media[0]?.src} alt={pkg.codename} className="max-w-full max-h-full object-contain" />
            
            {/* Overlay UI elements */}
            <div className="absolute top-4 left-4 font-mono text-xs text-green-500 bg-black/50 px-2">IMG_001.RAW</div>
          </div>

          {/* Sidebar / Thumbnails */}
          <div className="w-full md:w-64 flex flex-row md:flex-col gap-2 overflow-auto shrink-0">
             {pkg.media.map((m, i) => (
               <div 
                 key={i} 
                 className={`h-24 md:h-32 border-2 rounded cursor-pointer overflow-hidden transition-all ${i === 0 ? 'border-neon-gold opacity-100' : 'border-transparent opacity-60 hover:opacity-100'}`}
               >
                 <img src={m.src} alt="thumb" className="w-full h-full object-cover" />
               </div>
             ))}
             <div className="p-4 bg-void/30 rounded border border-gray-800 mt-auto hidden md:block">
               <div className="text-xs text-gray-500 font-mono mb-2">METADATA</div>
               <div className="text-xs text-cream/80 font-mono">
                 LOC: {pkg.codename.split('_')[1]}<br/>
                 CLASS: {pkg.threat}<br/>
                 EST: {pkg.price}
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvidenceViewerModal;