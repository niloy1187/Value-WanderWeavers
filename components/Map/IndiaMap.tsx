import React, { useEffect, useRef } from 'react';
import { SectorKey } from '../../types';

interface IndiaMapProps {
  sectors: SectorKey[];
  onSectorSelect: (sector: SectorKey) => void;
}

const IndiaMap: React.FC<IndiaMapProps> = ({ sectors, onSectorSelect }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const L = (window as any).L;
    if (!L) return;

    if (!mapInstanceRef.current) {
      const isMobile = window.innerWidth < 768;
      
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
        dragging: !isMobile,
        tap: true
      });

      // Centered View
      map.setView([22.5, 79.0], isMobile ? 4 : 5);
      
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd',
        opacity: 0.95
      }).addTo(map);

      mapInstanceRef.current = map;

      // PRECISE COORDINATES FOR SECTOR HUBS
      const coords: Record<string, [number, number]> = {
        goa: [15.4909, 73.8278], // Panjim
        himachal: [32.2432, 77.1892], // Manali
        rajasthan: [26.9124, 75.7873], // Jaipur
        kerala: [9.9312, 76.2673], // Kochi
        uttarakhand: [30.3165, 78.0322], // Dehradun
        karnataka: [15.3350, 76.4600], // Hampi
        meghalaya: [25.5788, 91.8933] // Shillong
      };
      
      sectors.forEach((sector) => {
        if (coords[sector]) {
          const icon = L.divIcon({
            className: 'bg-transparent',
            html: `
              <div class="relative flex items-center justify-center w-12 h-12 -translate-x-1/2 -translate-y-1/2 group">
                <div class="radar-ring"></div>
                <div class="radar-marker transition-transform duration-300 group-hover:scale-150"></div>
                <div class="absolute top-8 left-1/2 -translate-x-1/2 bg-black border border-neon-cyan px-2 py-1 text-[9px] font-mono text-neon-cyan uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-[0_0_10px_rgba(0,240,255,0.4)]">
                    ${sector.toUpperCase()}
                </div>
              </div>
            `,
            iconSize: [48, 48],
            iconAnchor: [24, 24]
          });

          L.marker(coords[sector], { icon })
            .addTo(map)
            .on('click', () => onSectorSelect(sector));
        }
      });
      
      // Ensure map renders correctly by invalidating size after a slight delay
      setTimeout(() => {
          map.invalidateSize();
      }, 500);
    }
  }, [sectors, onSectorSelect]);

  // Handle Resize and visibility changes
  useEffect(() => {
     const handleResize = () => {
         if(mapInstanceRef.current) {
             mapInstanceRef.current.invalidateSize();
         }
     };
     
     // Observer for container resize (more robust than window resize)
     const resizeObserver = new ResizeObserver(() => {
        if(mapInstanceRef.current) mapInstanceRef.current.invalidateSize();
     });
     
     if (mapContainerRef.current) {
        resizeObserver.observe(mapContainerRef.current);
     }

     window.addEventListener('resize', handleResize);
     return () => {
         window.removeEventListener('resize', handleResize);
         resizeObserver.disconnect();
     };
  }, []);

  return <div ref={mapContainerRef} className="w-full h-full bg-[#111] z-0" />;
};

export default IndiaMap;