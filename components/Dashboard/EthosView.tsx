import React from 'react';

const EthosView: React.FC = () => {
  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-20">
      <h1 className="text-3xl md:text-5xl font-hud font-black text-neon-gold mb-4 text-shadow-glow">THE VFM ETHOS</h1>
      <p className="text-lg text-cream/80 mb-10 border-l-4 border-neon-gold pl-4 font-mono">
        The core protocols governing all WanderWeaver operations.
      </p>

      <div className="space-y-8">
        <div className="bg-void/50 border-l-4 border-neon-gold p-6 rounded-r-lg">
          <h3 className="text-xl font-hud text-neon-gold mb-3">PROTOCOL 1.01: ASPIRATION ACCESSIBILITY</h3>
          <p className="text-cream/80 leading-relaxed">
            We are the data analysts of desire. We reject high commissions to democratize authentic, high-fidelity experiences.
            We eliminate the <span className="font-bold text-white">FOMO Tax</span>. Travel is not a luxury—it's a right for those who work hard and dream harder.
          </p>
        </div>

        <div className="bg-void/50 border-l-4 border-neon-red p-6 rounded-r-lg">
          <h3 className="text-xl font-hud text-neon-red mb-3">PROTOCOL 2.01: SMART-DEAL INOCULATION</h3>
          <p className="text-cream/80 leading-relaxed">
            Our core is the Deal Intelligence Engine, finding prices humans miss. We provide the <span className="font-bold text-white">SMARTEST</span> package:
            optimal experience at optimal value. Trust the system. We've scanned millions of data points so you don't have to.
          </p>
        </div>

        <div className="bg-void/50 border-l-4 border-neon-cyan p-6 rounded-r-lg">
          <h3 className="text-xl font-hud text-neon-cyan mb-3">PROTOCOL 3.01: WANDERWEAVER INTEGRITY</h3>
          <p className="text-cream/80 leading-relaxed">
            Transparency is absolute. Zero hidden fees. Every listed price is final. Our 'Palate Pilgrim' stamp ensures
            audited quality and authentic local experiences. We verify so you can travel with confidence.
          </p>
        </div>

        <div className="mt-12 text-center p-8 border border-neon-red/30 bg-neon-red/5 rounded-lg">
          <div className="font-hud text-2xl text-neon-gold mb-2 tracking-widest">"WEAVE YOUR JOURNEY. OWN YOUR STORY."</div>
          <div className="font-mono text-sm text-gray-500">— The WanderWeavers Manifesto</div>
        </div>
      </div>
    </div>
  );
};

export default EthosView;