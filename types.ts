export interface Media {
  type: 'image' | 'video';
  src: string;
}

export interface Package {
  codename: string;
  price: string;
  threat: string;
  vfm: string;
  duration: string;
  brief: string;
  media: Media[];
  inclusions: string[];
  lockedInclusions: string[]; // The "Bait" for lead gen
}

export interface SectorData {
  title: string;
  subtitle: string;
  coords: [number, number];
  missions: Package[];
}

export type SectorKey = 'goa' | 'himachal' | 'rajasthan' | 'kerala' | 'uttarakhand' | 'karnataka' | 'meghalaya';

export type ViewType = 'map' | 'ethos' | SectorKey;

export type ClearanceLevel = 'RECRUIT' | 'AGENT';

export interface LogEntry {
  timestamp: string;
  prefix: string;
  message: string;
  type: 'info' | 'success' | 'alert';
}

export const SECTORS_LIST: SectorKey[] = ['goa', 'himachal', 'rajasthan', 'kerala', 'uttarakhand', 'karnataka', 'meghalaya'];