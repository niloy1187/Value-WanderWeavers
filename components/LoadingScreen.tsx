import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onStart: () => void;
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStart, onComplete }) => {
  const [step, setStep] = useState<'idle' | 'booting' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isClicked, setIsClicked] = useState(false);
  
  const bootLogs = [
    "INITIALIZING VWW KERNEL...",
    "ESTABLISHING SECURE UPLINK...",
    "DECRYPTING MISSION DATA...",
    "LOADING MAP ASSETS...",
    "CALIBRATING AUDIO...",
    "ACCESS GRANTED."
  ];

  const handleInitialize = () => {
    if (isClicked) return;
    setIsClicked(true);
    onStart(); // Trigger audio immediately
    setTimeout(() => setStep('booting'), 600);
  };

  useEffect(() => {
    if (step === 'booting') {
      const timer = setInterval(() => {
        setProgress(old => (old >= 100 ? 100 : old + (Math.random() * 12)));
      }, 100);
      const logTimer = setInterval(() => {
        setLogIndex(old => (old < bootLogs.length - 1 ? old + 1 : old));
      }, 300);
      return () => { clearInterval(timer); clearInterval(logTimer); };
    }
  }, [step]);

  useEffect(() => {
    if (progress >= 100 && step === 'booting') {
        setTimeout(() => {
            setStep('complete');
            onComplete();
        }, 800);
    }
  }, [progress, step, onComplete]);

  if (step === 'idle') {
    return (
      <div className="fixed inset-0 bg-void z-[9999] flex flex-col items-center justify-center select-none overflow-hidden">
         <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
         
         <div className="relative z-10 flex flex-col items-center justify-center gap-12 w-full px-4">
            {/* Enhanced Button */}
            <button 
                onClick={handleInitialize}
                className={`
                    group relative w-[clamp(240px,60vw,320px)] h-[clamp(240px,60vw,320px)] 
                    rounded-full flex items-center justify-center transition-all duration-300
                    ${isClicked ? 'scale-90 opacity-0' : 'scale-100 hover:scale-105'}
                `}
            >
                {/* Rings */}
                <div className="absolute inset-0 border-2 border-gray-800 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 border border-neon-gold/30 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 border-4 border-neon-gold rounded-full shadow-[0_0_30px_rgba(255,215,0,0.3)] group-hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] transition-shadow"></div>
                
                {/* Core */}
                <div className="absolute inset-2 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-neon-gold/5 group-hover:bg-neon-gold/10 transition-colors"></div>
                    <div className="flex flex-col items-center z-10">
                        <h1 className="font-display font-black text-5xl md:text-6xl text-white tracking-tighter group-hover:text-neon-gold transition-colors drop-shadow-lg">
                            START
                        </h1>
                        <span className="mt-2 text-[10px] font-mono text-neon-cyan uppercase tracking-widest opacity-80 group-hover:opacity-100">Click to Initialize</span>
                    </div>
                </div>
            </button>
            
            <div className={`text-center space-y-2 transition-opacity duration-500 ${isClicked ? 'opacity-0' : 'opacity-100'}`}>
                <div className="font-hud text-neon-cyan text-sm md:text-base tracking-[0.3em] animate-pulse">
                    SYSTEM READY
                </div>
            </div>
         </div>
      </div>
    );
  }

  // BOOTING STATE
  return (
    <div className="fixed inset-0 bg-void z-[9999] flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl space-y-8 relative z-20">
            <h1 className="font-display font-black text-[clamp(2.5rem,8vw,5rem)] text-white leading-none cyber-glitch" data-text="WANDERWEAVER">
                WANDER<span className="text-neon-gold">WEAVER</span>
            </h1>
            
            <div className="space-y-2">
                <div className="flex justify-between font-mono text-xs text-neon-gold">
                    <span>LOADING_ASSETS...</span>
                    <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-gray-900 w-full overflow-hidden">
                    <div 
                        className="h-full bg-neon-gold shadow-[0_0_20px_#FFD700]"
                        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
                    ></div>
                </div>
            </div>

            <div className="h-32 font-mono text-xs text-green-500 overflow-hidden border-l-2 border-gray-800 pl-4 flex flex-col justify-end">
                {bootLogs.slice(0, logIndex + 1).map((log, i) => (
                    <div key={i} className="mb-1 opacity-80">> {log}</div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default LoadingScreen;