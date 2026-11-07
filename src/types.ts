export interface NasaImageItem {
  nasa_id: string;
  title: string;
  description: string;
  date_created: string;
  center?: string;
  photographer?: string;
  keywords?: string[];
  previewUrl: string;
  originalUrl?: string;
  sourceUrl?: string;
}

export interface ApodData {
  title: string;
  date: string;
  explanation: string;
  url: string;
  hdurl?: string;
  copyright?: string;
  media_type: string;
}

export interface CollectionSector {
  id: string;
  query: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  platesCount: string;
}

export interface MissionDossier {
  id: string;
  name: string;
  acronym: string;
  status: string;
  launchDate: string;
  destination: string;
  primaryInstrument: string;
  description: string;
  keyDiscovery: string;
  searchQuery: string;
  imageUrl: string;
  catalogCount: string;
}

export interface FieldNote {
  id: string;
  catalogId: string;
  title: string;
  subtitle: string;
  date: string;
  author: string;
  readTime: string;
  previewSnippet: string;
  fullEssay: string;
  coordinates: string;
  telescope: string;
  imageUrl: string;
}

export type ZoomModalTarget =
  | { type: 'nasa_image'; data: NasaImageItem }
  | { type: 'collection'; data: CollectionSector }
  | { type: 'mission'; data: MissionDossier }
  | { type: 'field_note'; data: FieldNote };
