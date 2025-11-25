import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../../types';

interface ConsoleLogProps {
  logs: LogEntry[];
  isOpen: boolean;
}

const ConsoleLog: React.FC<ConsoleLogProps> = ({ logs, isOpen }) => {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  return (
    <div 
      className={`fixed bottom-4 right-4 w-96 h-64 bg-void/95 border-2 border-neon-cyan rounded-lg p-4 font-mono text-xs z-50 transition-all duration-300 shadow-[0_0_20px_rgba(0,217,255,0.2)] ${isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-10 pointer-events-none'}`}
    >
      <div className="h-full overflow-y-auto custom-scrollbar" ref={feedRef}>
        {logs.length === 0 && <div className="text-gray-600 italic">System Idle...</div>}
        {logs.map((log, i) => (
          <div key={i} className="mb-1 leading-relaxed break-words">
            <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
            <span className="text-neon-gold mr-2">&lt;{log.prefix}&gt;</span>
            <span className={log.type === 'alert' ? 'text-neon-red font-bold' : log.type === 'success' ? 'text-neon-cyan' : 'text-cream'}>
              {log.message}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConsoleLog;