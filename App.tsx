import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { PACKAGES, SECTORS } from './constants';
import { ViewType, Package, SectorKey, LogEntry, ClearanceLevel } from './types';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import MobileNav from './components/Layout/MobileNav';
import IndiaMap from './components/Map/IndiaMap';
import PackageGrid from './components/Dashboard/PackageGrid';
import EthosView from './components/Dashboard/EthosView';
import ConsoleLog from './components/Dashboard/ConsoleLog';
import DealFinderModal from './components/Modals/DealFinderModal';
import LeadCaptureModal from './components/Modals/LeadCaptureModal';
import EvidenceViewerModal from './components/Modals/EvidenceViewerModal';

// --- ADVANCED GENERATIVE AUDIO CORE ---
class AudioCore {
  ctx: AudioContext | null = null;
  masterBus: GainNode | null = null;
  bgmBus: GainNode | null = null;
  sfxBus: GainNode | null = null;
  reverb: ConvolverNode | null = null;
  isPlaying: boolean = false;
  
  // Generative State
  nextChordTime: number = 0;
  progressionIndex: number = 0;
  
  // Cinematic Chord Progressions
  progressions = [
    [ [55, 164.81, 196.00, 246.94, 329.63], [43.65, 174.61, 220.00, 261.63, 349.23] ],
    [ [65.41, 155.56, 196.00, 246.94, 311.13], [49.00, 146.83, 196.00, 246.94, 329.63] ],
    [ [73.42, 174.61, 207.65, 261.63, 349.23], [41.20, 164.81, 207.65, 246.94, 415.30] ]
  ];

  currentSection = 0;

  constructor() {}

  async init() {
    if (this.ctx) return;
    const CtxClass = (window.AudioContext || (window as any).webkitAudioContext);
    this.ctx = new CtxClass();
    
    if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
    }

    // --- Signal Chain ---
    this.masterBus = this.ctx.createGain();
    this.masterBus.gain.value = 0.9; 
    
    const compressor = this.ctx.createDynamicsCompressor();
    compressor.threshold.value = -20;
    compressor.ratio.value = 8;
    this.masterBus.connect(compressor);
    compressor.connect(this.ctx.destination);

    // Reverb Bus
    this.reverb = this.ctx.createConvolver();
    this.reverb.buffer = await this.createReverbImpulse(3.0, 2.0);
    const reverbGain = this.ctx.createGain();
    reverbGain.gain.value = 0.4;
    this.reverb.connect(reverbGain);
    reverbGain.connect(this.masterBus);

    // BGM Bus
    this.bgmBus = this.ctx.createGain();
    this.bgmBus.gain.value = 0.2; // Softer BGM
    this.bgmBus.connect(this.masterBus);
    this.bgmBus.connect(this.reverb);

    // SFX Bus
    this.sfxBus = this.ctx.createGain();
    this.sfxBus.gain.value = 0.8; // Boosted SFX
    this.sfxBus.connect(this.masterBus);
    
    const sfxReverbSend = this.ctx.createGain();
    sfxReverbSend.gain.value = 0.15;
    this.sfxBus.connect(sfxReverbSend);
    sfxReverbSend.connect(this.reverb);
  }

  async createReverbImpulse(duration: number, decay: number): Promise<AudioBuffer> {
      if (!this.ctx) throw new Error("No Context");
      const rate = this.ctx.sampleRate;
      const length = rate * duration;
      const impulse = this.ctx.createBuffer(2, length, rate);
      for (let i = 0; i < 2; i++) {
          const ch = impulse.getChannelData(i);
          for (let n = 0; n < length; n++) {
              const white = (Math.random() * 2 - 1);
              ch[n] = white * Math.pow(1 - n / length, decay);
          }
      }
      return impulse;
  }

  startBGM() {
    if (this.isPlaying || !this.ctx) return;
    this.isPlaying = true;
    this.nextChordTime = this.ctx.currentTime + 0.5;
    this.scheduleLoop();
  }

  scheduleLoop() {
    if (!this.ctx || !this.isPlaying) return;
    while (this.nextChordTime < this.ctx.currentTime + 15) {
        this.playGenerativeChord(this.nextChordTime);
        this.nextChordTime += 12 + (Math.random() * 4);
    }
    setTimeout(() => this.scheduleLoop(), 1000);
  }

  playGenerativeChord(time: number) {
      if (!this.ctx || !this.bgmBus) return;
      const section = this.progressions[this.currentSection];
      const chord = section[this.progressionIndex % section.length];
      this.progressionIndex++;
      if (this.progressionIndex % (section.length * 2) === 0) {
          this.currentSection = (this.currentSection + 1) % this.progressions.length;
      }

      // Bass
      const bass = this.ctx.createOscillator();
      bass.type = 'triangle';
      bass.frequency.value = chord[0];
      const bassGain = this.ctx.createGain();
      bassGain.gain.setValueAtTime(0, time);
      bassGain.gain.linearRampToValueAtTime(0.15, time + 2);
      bassGain.gain.exponentialRampToValueAtTime(0.001, time + 10);
      bass.connect(bassGain);
      bassGain.connect(this.bgmBus);
      bass.start(time);
      bass.stop(time + 11);

      // Pads
      chord.slice(1).forEach((freq, i) => {
          if (Math.random() > 0.7) return; 
          const osc = this.ctx!.createOscillator();
          osc.type = 'sawtooth';
          osc.frequency.value = freq;
          osc.detune.value = (Math.random() * 8) - 4;
          const gain = this.ctx!.createGain();
          gain.gain.setValueAtTime(0, time);
          gain.gain.linearRampToValueAtTime(0.03, time + 3 + i);
          gain.gain.linearRampToValueAtTime(0, time + 10);
          osc.connect(gain);
          gain.connect(this.bgmBus!);
          osc.start(time);
          osc.stop(time + 11);
      });
  }

  playSFX(type: 'hover' | 'click' | 'success' | 'boot' | 'beep') {
    if (!this.ctx || !this.sfxBus) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.connect(gain);
    gain.connect(this.sfxBus);

    switch (type) {
        case 'hover': // Sharper, slightly louder hover
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1800, t);
            osc.frequency.exponentialRampToValueAtTime(2200, t + 0.05);
            gain.gain.setValueAtTime(0.08, t); // Increased
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
            osc.start(t);
            osc.stop(t + 0.05);
            break;
        case 'click': // Punchier click
            osc.type = 'square';
            osc.frequency.setValueAtTime(600, t);
            osc.frequency.exponentialRampToValueAtTime(50, t + 0.1);
            gain.gain.setValueAtTime(0.25, t); // Significantly increased
            gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
            osc.start(t);
            osc.stop(t + 0.1);
            break;
        case 'success':
            [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
                const o = this.ctx!.createOscillator();
                const g = this.ctx!.createGain();
                o.type = 'sine';
                o.frequency.value = freq;
                g.gain.setValueAtTime(0.08, t + i*0.06); // Increased
                g.gain.linearRampToValueAtTime(0, t + i*0.06 + 0.4);
                o.connect(g);
                g.connect(this.sfxBus!);
                o.start(t + i*0.06);
                o.stop(t + i*0.06 + 0.4);
            });
            break;
        case 'boot': // Reduced boot volume
            const noise = this.ctx.createBufferSource();
            const bSize = this.ctx.sampleRate * 2;
            const buffer = this.ctx.createBuffer(1, bSize, this.ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for(let i=0; i<bSize; i++) data[i] = (Math.random() * 2 - 1);
            noise.buffer = buffer;
            
            const bFilter = this.ctx.createBiquadFilter();
            bFilter.type = 'lowpass';
            bFilter.frequency.setValueAtTime(100, t);
            bFilter.frequency.exponentialRampToValueAtTime(2000, t + 1.5);
            
            const bGain = this.ctx.createGain();
            bGain.gain.setValueAtTime(0, t);
            bGain.gain.linearRampToValueAtTime(0.15, t + 1); // Reduced from 0.3 to 0.15
            bGain.gain.exponentialRampToValueAtTime(0.001, t + 3);
            
            noise.connect(bFilter);
            bFilter.connect(bGain);
            bGain.connect(this.masterBus!);
            noise.start(t);
            break;
    }
  }
}

const audioCore = new AudioCore();

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<ViewType>('map');
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isConsoleOpen, setConsoleOpen] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showEvidenceModal, setShowEvidenceModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [userClearance, setUserClearance] = useState<ClearanceLevel>('RECRUIT');

  const addLog = useCallback((prefix: string, message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
    setLogs(prev => [...prev.slice(-49), { timestamp: timeStr, prefix, message, type }]);
  }, []);

  const handleStartSystem = async () => {
      await audioCore.init();
      audioCore.playSFX('boot');
      setTimeout(() => audioCore.startBGM(), 1500);
  };

  const handleBootComplete = () => {
    setLoading(false);
    addLog("KERNEL", "VWW_INTERFACE: ONLINE", "success");
    addLog("AUTH", "USER_CLEARANCE: RECRUIT_LEVEL", "info");
  };

  const handleGrantClearance = () => {
      setUserClearance('AGENT');
      addLog("AUTH", "CLEARANCE_UPGRADE: AGENT_LEVEL_GRANTED", "success");
      audioCore.playSFX('success');
  };

  if (loading) {
    return (
        <LoadingScreen 
            onStart={handleStartSystem} 
            onComplete={handleBootComplete} 
        />
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] w-full bg-void text-gray-200 font-mono relative selection:bg-neon-gold selection:text-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none z-0 bg-grid-pattern bg-[length:40px_40px] md:bg-[length:60px_60px] opacity-10"></div>
      
      <Header clearance={userClearance} />
      
      <main className="flex-1 flex flex-col md:flex-row min-h-0 relative z-10 overflow-hidden">
        <Sidebar 
          activeView={activeView} 
          onNavigate={(v) => { audioCore.playSFX('click'); setActiveView(v); }}
          onToggleConsole={() => { audioCore.playSFX('click'); setConsoleOpen(!isConsoleOpen); }}
          onStartJourney={() => { audioCore.playSFX('click'); setShowDealModal(true); }}
          onHover={() => audioCore.playSFX('hover')}
        />

        <section className="flex-1 relative overflow-y-auto custom-scrollbar p-4 md:p-8 pb-32 md:pb-8 w-full h-full">
          {activeView === 'map' && (
            <div className="flex flex-col h-full gap-4 min-h-[500px]">
               <div className="shrink-0">
                   <h1 className="text-[clamp(1.2rem,5vw,3rem)] font-display font-bold text-white tracking-tighter cyber-glitch" data-text="MISSION CONTROL">
                        MISSION CONTROL
                   </h1>
                   <div className="flex items-center gap-2 mt-1">
                         <span className="w-2 h-2 bg-neon-red animate-pulse"></span>
                         <p className="font-hud text-neon-gold text-xs md:text-sm tracking-widest">
                            SELECT DEPLOYMENT ZONE
                         </p>
                   </div>
               </div>
               
               <div className="flex-1 w-full rounded-lg border border-gray-800 bg-panel relative overflow-hidden shadow-2xl min-h-[40vh] md:min-h-0">
                 <IndiaMap 
                   onSectorSelect={(s) => { audioCore.playSFX('success'); setActiveView(s); }} 
                   sectors={SECTORS}
                 />
                 <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-10" />
               </div>
            </div>
          )}

          {activeView === 'ethos' && <EthosView />}

          {SECTORS.includes(activeView as SectorKey) && PACKAGES[activeView as SectorKey] && (
            <PackageGrid 
              data={PACKAGES[activeView as SectorKey]}
              onBook={(pkg) => { audioCore.playSFX('click'); setSelectedPackage(pkg); setShowLeadModal(true); }}
              onViewEvidence={(pkg) => { audioCore.playSFX('hover'); setSelectedPackage(pkg); setShowEvidenceModal(true); }}
              onHover={() => audioCore.playSFX('hover')}
              userClearance={userClearance}
              onUnlockRequest={(pkg) => { audioCore.playSFX('click'); setSelectedPackage(pkg); setShowLeadModal(true); }}
            />
          )}
        </section>
      </main>

      <MobileNav 
         activeView={activeView}
         onNavigate={(v) => { audioCore.playSFX('click'); setActiveView(v); }}
         onHome={() => { audioCore.playSFX('click'); setActiveView('map'); }}
         onDeals={() => { audioCore.playSFX('click'); setShowDealModal(true); }}
      />

      <ConsoleLog logs={logs} isOpen={isConsoleOpen} />

      {showDealModal && (
        <DealFinderModal 
          onClose={() => setShowDealModal(false)} 
          onSearch={(s, b) => { 
              audioCore.playSFX('success'); 
              setShowDealModal(false); 
              if(PACKAGES[s as SectorKey]) setActiveView(s as SectorKey);
              addLog("DEAL", `SEARCH: ${s} [${b}]`, "info");
          }} 
          onUnlock={() => { handleGrantClearance(); setShowDealModal(false); }}
        />
      )}

      {showLeadModal && selectedPackage && (
        <LeadCaptureModal 
          pkg={selectedPackage} 
          onClose={() => setShowLeadModal(false)} 
          onSubmit={() => { 
              audioCore.playSFX('success'); 
              handleGrantClearance();
              setShowLeadModal(false); 
              addLog("NET", "CLEARANCE_GRANTED", "success"); 
          }} 
        />
      )}

      {showEvidenceModal && selectedPackage && (
        <EvidenceViewerModal 
          pkg={selectedPackage} 
          onClose={() => setShowEvidenceModal(false)} 
        />
      )}
    </div>
  );
};

export default App;