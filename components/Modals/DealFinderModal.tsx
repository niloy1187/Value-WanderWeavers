import React, { useState, useEffect } from 'react';
import { SECTORS } from '../../constants';

interface DealFinderModalProps {
  onClose: () => void;
  onSearch: (sector: string, budget: string) => void;
  onUnlock: () => void;
}

const DealFinderModal: React.FC<DealFinderModalProps> = ({ onClose, onSearch, onUnlock }) => {
  const [step, setStep] = useState(1);
  const [sector, setSector] = useState('');
  const [vibe, setVibe] = useState('');
  const [budget, setBudget] = useState('B');
  const [analyzing, setAnalyzing] = useState(false);
  const [email, setEmail] = useState('');

  // Auto-advance step when analyzing is done
  useEffect(() => {
    if (analyzing) {
      const timer = setTimeout(() => {
        setAnalyzing(false);
        setStep(3);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [analyzing]);

  const handleNext = () => {
    if (step === 1 && sector && vibe) setStep(2);
    else if (step === 2) setAnalyzing(true);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUnlock(); // Grants Agent status
    onSearch(sector, budget);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-panel border-2 border-neon-gold relative overflow-hidden shadow-[0_0_80px_rgba(255,215,0,0.15)]">
        
        {/* Progress Bar */}
        <div className="h-1 bg-gray-800 w-full flex">
            <div className={`h-full bg-neon-gold transition-all duration-500 ${step >= 1 ? 'w-1/3' : 'w-0'}`}></div>
            <div className={`h-full bg-neon-gold transition-all duration-500 ${step >= 2 ? 'w-1/3' : 'w-0'}`}></div>
            <div className={`h-full bg-neon-gold transition-all duration-500 ${step >= 3 ? 'w-1/3' : 'w-0'}`}></div>
        </div>

        <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-hud text-xl md:text-2xl text-neon-gold">
                    {step === 1 && "PHASE 1: TARGET ACQUISITION"}
                    {step === 2 && "PHASE 2: RESOURCE ALLOCATION"}
                    {step === 3 && "PHASE 3: DECRYPT INTEL"}
                </h2>
                <div className="font-mono text-neon-cyan text-xs">STEP 0{step}/03</div>
            </div>

            {/* STEP 1: DESTINATION & VIBE */}
            {step === 1 && (
                <div className="space-y-6 animate-fade-in-up">
                    <div>
                        <label className="block font-mono text-gray-400 text-xs mb-2">SELECT DEPLOYMENT ZONE</label>
                        <select 
                        value={sector} 
                        onChange={(e) => setSector(e.target.value)} 
                        className="w-full bg-void border border-gray-600 text-cream p-3 focus:border-neon-gold focus:outline-none font-body"
                        >
                            <option value="">-- CLASSIFIED --</option>
                            {SECTORS.map(s => (
                                <option key={s} value={s}>{s.toUpperCase()}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block font-mono text-gray-400 text-xs mb-2">OPERATIONAL MODE (VIBE)</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['ADRENALINE', 'STEALTH/CHILL', 'CULTURAL', 'PARTY'].map(v => (
                                <button
                                    key={v}
                                    onClick={() => setVibe(v)}
                                    className={`p-3 border font-mono text-xs text-left hover:bg-white/5 transition-all ${vibe === v ? 'border-neon-cyan text-neon-cyan bg-neon-cyan/10' : 'border-gray-700 text-gray-500'}`}
                                >
                                    {v}
                                </button>
                            ))}
                        </div>
                    </div>
                    <button 
                        onClick={handleNext}
                        disabled={!sector || !vibe}
                        className="w-full py-4 mt-4 bg-neon-gold text-black font-bold font-hud tracking-widest hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        CONFIRM PROTOCOLS »
                    </button>
                </div>
            )}

            {/* STEP 2: BUDGET */}
            {step === 2 && !analyzing && (
                <div className="space-y-6 animate-fade-in-up">
                    <div>
                        <label className="block font-mono text-gray-400 text-xs mb-2">BUDGETARY PARAMETERS</label>
                        <div className="space-y-3">
                            {[
                                {val: 'C', label: 'GAMMA CLASS [< ₹7,500]', sub: 'Max Savings. Hostel Ops.'},
                                {val: 'B', label: 'BETA CLASS [₹7,500 - ₹15,000]', sub: 'Optimal VFM. Tactical Comfort.'},
                                {val: 'A', label: 'ALPHA CLASS [> ₹15,000]', sub: 'Luxe-Lite. High Command Status.'}
                            ].map((opt) => (
                                <div 
                                    key={opt.val}
                                    onClick={() => setBudget(opt.val)}
                                    className={`p-4 border cursor-pointer flex justify-between items-center transition-all ${budget === opt.val ? 'border-neon-gold bg-neon-gold/10' : 'border-gray-700 hover:border-gray-500'}`}
                                >
                                    <div>
                                        <div className={`font-hud text-sm ${budget === opt.val ? 'text-neon-gold' : 'text-white'}`}>{opt.label}</div>
                                        <div className="font-mono text-[10px] text-gray-500">{opt.sub}</div>
                                    </div>
                                    <div className={`w-4 h-4 rounded-full border border-gray-500 ${budget === opt.val ? 'bg-neon-gold border-neon-gold' : ''}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setStep(1)} className="px-6 py-4 border border-gray-600 text-gray-400 font-mono text-xs">« BACK</button>
                        <button 
                            onClick={handleNext}
                            className="flex-1 py-4 bg-neon-cyan text-black font-bold font-hud tracking-widest hover:bg-white"
                        >
                            INITIATE SCAN »
                        </button>
                    </div>
                </div>
            )}

            {/* ANALYZING STATE */}
            {analyzing && (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <div className="w-16 h-16 border-4 border-neon-cyan border-t-transparent rounded-full animate-spin"></div>
                    <div className="font-mono text-neon-cyan animate-pulse">RUNNING ALGORITHMS...</div>
                    <div className="font-mono text-xs text-gray-500">CROSS-REFERENCING 14,000 DATA POINTS</div>
                </div>
            )}

            {/* STEP 3: LEAD CAPTURE */}
            {step === 3 && (
                <div className="space-y-6 animate-fade-in-up">
                    <div className="bg-black/40 p-4 border-l-2 border-neon-red">
                        <div className="font-hud text-neon-red mb-2 text-sm">⚠ DECRYPTION KEY REQUIRED</div>
                        <p className="font-mono text-xs text-gray-400">
                            We found 3 high-probability matches for Sector {sector.toUpperCase()}. 
                            To view the full unredacted intel, input your secure uplink.
                        </p>
                    </div>
                    
                    <form onSubmit={handleFinalSubmit} className="space-y-4">
                        <input 
                            type="email" 
                            required
                            placeholder="ENTER UPLINK (EMAIL)"
                            className="w-full bg-void border border-gray-600 text-cream p-4 focus:border-neon-cyan focus:outline-none font-mono text-center tracking-widest"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="w-full py-4 bg-neon-red text-white font-bold font-hud tracking-[0.2em] hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,0,0,0.5)] transition-all"
                        >
                            DECRYPT RESULTS
                        </button>
                    </form>
                    <div className="text-[10px] text-gray-600 text-center font-mono">
                        * Granting Agent Clearance Level
                    </div>
                </div>
            )}

        </div>
        
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-white font-mono">[X]</button>
      </div>
    </div>
  );
};

export default DealFinderModal;