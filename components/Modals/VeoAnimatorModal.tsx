import React, { useState, useRef, useEffect } from 'react';
import { Package } from '../../types';
import { GoogleGenAI } from "@google/genai";

interface VeoAnimatorModalProps {
  pkg: Package;
  onClose: () => void;
  onLog: (prefix: string, msg: string, type: 'info' | 'success' | 'alert') => void;
}

const VeoAnimatorModal: React.FC<VeoAnimatorModalProps> = ({ pkg, onClose, onLog }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [statusText, setStatusText] = useState('READY FOR INPUT');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper for internal modal logging
  const addInternalLog = (msg: string) => {
    setLogs(prev => [...prev, `> ${msg}`]);
  };

  // Play a short beep (visual simulation via console for now, or Audio API if feasible without assets)
  // We'll rely on the visual FX of the UI updating.

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setStatusText("IMAGE LOADED. READY TO SYNTHESIZE.");
        addInternalLog("Image buffer loaded into memory.");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    try {
      // 1. Check API Key
      if (!window.aistudio.hasSelectedApiKey()) {
         onLog("AUTH", "API Key Required for Veo Protocol", "alert");
         addInternalLog("Requesting Clearance Code (API Key)...");
         await window.aistudio.openSelectKey();
      }

      setIsProcessing(true);
      setStatusText("INITIALIZING VEO-3.1 ENGINE...");
      onLog("VEO", "Establishing Uplink to Generation Core...", "info");
      addInternalLog("Handshake initiated with Veo-3.1...");

      // 2. Prepare Image Data
      const sourceImage = uploadedImage || pkg.media[0].src;
      let base64Data = "";
      let mimeType = "image/png";

      if (sourceImage.startsWith('data:')) {
        const matches = sourceImage.match(/^data:(.+);base64,(.+)$/);
        if (matches) {
            mimeType = matches[1];
            base64Data = matches[2];
        }
      } else {
        // Fetch external URL
        setStatusText("DOWNLOADING SOURCE ASSET...");
        addInternalLog("Fetching remote asset...");
        const response = await fetch(sourceImage);
        const blob = await response.blob();
        mimeType = blob.type;
        const reader = new FileReader();
        base64Data = await new Promise((resolve) => {
            reader.onloadend = () => {
                const res = reader.result as string;
                resolve(res.split(',')[1]);
            };
            reader.readAsDataURL(blob);
        });
      }

      // 3. Initialize AI
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      setStatusText("TRANSMITTING DATA TO VEO NODES...");
      addInternalLog(`Transmitting payload [${aspectRatio}]...`);
      
      // 4. Start Generation
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        image: {
            imageBytes: base64Data,
            mimeType: mimeType
        },
        config: {
            numberOfVideos: 1,
            aspectRatio: aspectRatio,
        }
      });

      setStatusText("RENDERING VIDEO [EST: 30s]...");
      addInternalLog("Rendering sequence initiated...");
      
      // 5. Polling Loop
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 3000));
        setStatusText("RENDERING IN PROGRESS... STANDBY");
        // Simulated "progress" logs
        if (Math.random() > 0.7) addInternalLog("Optimizing neural weights...");
        
        operation = await ai.operations.getVideosOperation({operation: operation});
      }

      // 6. Handle Result
      if (operation.response?.generatedVideos?.[0]?.video?.uri) {
        const downloadLink = operation.response.generatedVideos[0].video.uri;
        const finalUrl = `${downloadLink}&key=${process.env.API_KEY}`;
        setVideoUrl(finalUrl);
        setStatusText("SYNTHESIS COMPLETE.");
        onLog("VEO", "Video Asset Generated Successfully.", "success");
        addInternalLog("Asset received. Playback ready.");
      } else {
        throw new Error("No video URI returned in response.");
      }

    } catch (error: any) {
      console.error(error);
      setStatusText("ERROR: GENERATION FAILED");
      onLog("ERR", "Veo Synthesis Failed: " + (error.message || error), "alert");
      addInternalLog(`FATAL: ${error.message || 'Unknown Error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-void/90 backdrop-blur-md animate-fadeIn p-4">
      <div className="w-full max-w-5xl bg-navy-deep border-2 border-neon-cyan rounded-lg overflow-hidden shadow-[0_0_80px_rgba(0,243,255,0.15)] flex flex-col md:flex-row h-[90vh] md:h-auto md:max-h-[80vh]">
        
        {/* Left: Input / Preview */}
        <div className="w-full md:w-2/3 p-1 md:p-6 border-b md:border-b-0 md:border-r border-interface-line flex flex-col relative bg-grid-pattern bg-[length:20px_20px]">
          <div className="absolute top-0 left-0 p-2 text-[10px] font-mono text-neon-cyan/50">CAM_01 // PREVIEW</div>
          
          <div className="flex-1 bg-black/60 border border-interface-line rounded-lg overflow-hidden relative group flex items-center justify-center min-h-[300px] shadow-inner">
             {videoUrl ? (
                <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
             ) : (
                <div className="relative w-full h-full">
                  <img 
                      src={uploadedImage || pkg.media[0].src} 
                      alt="Source" 
                      className={`w-full h-full object-contain transition-opacity duration-500 ${isProcessing ? 'opacity-30 blur-sm' : 'opacity-100'}`} 
                  />
                  {!isProcessing && !uploadedImage && (
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 text-[10px] font-mono text-white">DEFAULT_ASSET</div>
                  )}
                </div>
             )}
             
             {/* Processing Overlay */}
             {isProcessing && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center">
                    <div className="w-64 h-2 bg-interface-line rounded overflow-hidden border border-neon-cyan/50 mb-4">
                        <div className="h-full bg-neon-cyan animate-pulse w-full origin-left animate-[scale-x_2s_infinite]"></div>
                    </div>
                    <div className="font-hud text-neon-cyan text-xl tracking-widest animate-pulse shadow-black drop-shadow-lg">{statusText}</div>
                    <div className="font-mono text-xs text-neon-red mt-2">DO NOT CLOSE WINDOW</div>
                </div>
             )}

             {/* Grid overlay for aesthetic */}
             <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[length:40px_40px]"></div>
          </div>

          <div className="mt-4 flex gap-3 h-12">
             <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileUpload} 
                accept="image/*" 
                className="hidden" 
             />
             <button 
               onClick={() => fileInputRef.current?.click()}
               className="flex-1 border border-dashed border-neon-cyan/50 text-neon-cyan font-mono text-xs hover:bg-neon-cyan/10 hover:border-neon-cyan transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
               disabled={isProcessing}
             >
               <span className="text-xl">⇪</span> UPLOAD IMAGE
             </button>
             {uploadedImage && (
                 <button 
                   onClick={() => setUploadedImage(null)}
                   className="px-6 border border-neon-red/50 text-neon-red font-mono text-xs hover:bg-neon-red hover:text-white uppercase transition-all"
                   disabled={isProcessing}
                 >
                   RESET
                 </button>
             )}
          </div>
        </div>

        {/* Right: Controls */}
        <div className="w-full md:w-1/3 p-6 flex flex-col bg-navy-deep relative">
           <h2 className="font-hud text-2xl text-white mb-6 border-b border-neon-cyan/30 pb-2 flex justify-between items-center">
             <span>VEO CONTROL</span>
             <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></span>
           </h2>

           <div className="mb-6">
              <label className="block font-mono text-neon-cyan text-[10px] mb-2 uppercase tracking-widest">Target Ratio</label>
              <div className="flex gap-2">
                  <button 
                    onClick={() => setAspectRatio('16:9')}
                    className={`flex-1 py-3 border clip-path-slant text-sm font-bold font-hud transition-all ${aspectRatio === '16:9' ? 'border-neon-gold bg-neon-gold text-navy-deep' : 'border-interface-line text-gray-500 hover:border-neon-gold hover:text-white'}`}
                  >
                    16:9 LANDSCAPE
                  </button>
                  <button 
                    onClick={() => setAspectRatio('9:16')}
                    className={`flex-1 py-3 border clip-path-slant text-sm font-bold font-hud transition-all ${aspectRatio === '9:16' ? 'border-neon-gold bg-neon-gold text-navy-deep' : 'border-interface-line text-gray-500 hover:border-neon-gold hover:text-white'}`}
                  >
                    9:16 PORTRAIT
                  </button>
              </div>
           </div>

           <div className="flex-1 bg-black/40 border border-interface-line p-2 mb-6 font-mono text-[10px] text-green-500 overflow-y-auto max-h-[150px] custom-scrollbar">
              <div className="opacity-50 mb-2">--- SYSTEM LOGS ---</div>
              {logs.map((l, i) => <div key={i}>{l}</div>)}
           </div>

           <div className="space-y-3 mt-auto">
              <button 
                onClick={handleGenerate}
                disabled={isProcessing}
                className={`w-full py-4 font-black font-hud text-lg tracking-[0.2em] transition-all relative overflow-hidden group ${isProcessing ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-neon-cyan text-navy-deep hover:bg-white hover:scale-[1.02]'}`}
              >
                {!isProcessing && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>}
                {isProcessing ? 'PROCESSING...' : 'INITIATE'}
              </button>
              
              <button 
                onClick={onClose}
                disabled={isProcessing}
                className="w-full py-3 border border-neon-red text-neon-red font-mono text-xs hover:bg-neon-red hover:text-white transition-colors uppercase tracking-widest"
              >
                TERMINATE
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

export default VeoAnimatorModal;