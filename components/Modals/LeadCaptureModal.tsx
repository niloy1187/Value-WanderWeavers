import React, { useState } from 'react';
import { Package } from '../../types';

interface LeadCaptureModalProps {
  pkg: Package;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ pkg, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadeIn p-4">
      <div className="w-full max-w-md bg-panel border-2 border-neon-cyan relative overflow-hidden shadow-[0_0_50px_rgba(0,240,255,0.2)]">
        
        {/* Header - Looks like an ID Card */}
        <div className="bg-neon-cyan p-4 flex justify-between items-center">
            <h2 className="font-hud text-black font-black text-xl tracking-tighter">CLEARANCE PROTOCOL</h2>
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center border-2 border-white">
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-ping"></div>
            </div>
        </div>

        <div className="p-6">
            <div className="mb-6 flex gap-4 items-start">
                <div className="w-20 h-20 border border-dashed border-gray-600 flex items-center justify-center bg-black/50">
                    <span className="text-4xl text-gray-700">?</span>
                </div>
                <div>
                    <div className="font-mono text-[10px] text-neon-gold uppercase mb-1">REQ_TARGET</div>
                    <div className="font-hud text-white leading-none mb-2">{pkg.codename}</div>
                    <p className="font-mono text-[10px] text-gray-400 leading-relaxed">
                        Full tactical details and classified inclusions are restricted to Field Agents.
                    </p>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-[9px] font-mono text-gray-500 mb-1 tracking-widest">AGENT ID (NAME)</label>
                <input 
                type="text" 
                required
                className="w-full bg-void border-b border-gray-600 text-cream p-2 focus:border-neon-cyan focus:bg-white/5 outline-none font-mono"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-[9px] font-mono text-gray-500 mb-1 tracking-widest">SECURE UPLINK (EMAIL)</label>
                <input 
                type="email" 
                required
                className="w-full bg-void border-b border-gray-600 text-cream p-2 focus:border-neon-cyan focus:bg-white/5 outline-none font-mono"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                />
            </div>
            <div>
                <label className="block text-[9px] font-mono text-gray-500 mb-1 tracking-widest">COMMS (PHONE)</label>
                <input 
                type="tel" 
                required
                className="w-full bg-void border-b border-gray-600 text-cream p-2 focus:border-neon-cyan focus:bg-white/5 outline-none font-mono"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                />
            </div>

            <button 
                type="submit"
                className="w-full py-4 mt-4 bg-neon-cyan text-black font-black hover:bg-white transition-all font-hud text-sm tracking-[0.2em] shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.6)]"
            >
                GRANT CLEARANCE & BOOK
            </button>
            </form>
            
            <button onClick={onClose} className="w-full mt-4 text-[10px] text-gray-600 hover:text-white font-mono">
                ABORT MISSION
            </button>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;