export { FTON } from './FTON';
export { ObjUtil } from './object';
export { SeqNum } from './SeqNum';
export { Type } from './types';
export { Comparisons } from './Comparisons';
export { Logger, MakeLogger, MakeError } from './logger';
import * as media from './media';

export type FTONData =
  | undefined
  | string
  | number
  | boolean
  | null
  | FTONObject
  | FTONData[]
  | FTONMap
  | Set<FTONData>;
export type FTONMap = Map<string | number, FTONData>;
export type FTONObject = { [key: string]: FTONData };
// eslint-disable-next-line @typescript-eslint/naming-convention
export type typecheck<T> = (val: any) => val is T;

export type SeqNumGenerator = {
  (): string;
  keyCompare: (a: string, b: string) => number;
};

export type SongKey = string;
export type AlbumKey = string;
export type ArtistKey = string;
export type PlaylistName = string;
export type Playlist = SongKey[];

export type Song = {
  key: SongKey;
  track: number;
  title: string;
  albumId: AlbumKey;
  artistIds: ArtistKey[];
  secondaryIds: ArtistKey[];
  variations?: string[];
};

export type Artist = {
  key: ArtistKey;
  name: string;
  albums: AlbumKey[];
  songs: SongKey[];
};

export type Album = {
  key: AlbumKey;
  year: number;
  title: string;
  vatype: '' | 'va' | 'ost';
  primaryArtists: ArtistKey[];
  songs: SongKey[];
};

export type MediaInfo = {
  general: Map<string, string>;
  audio: Map<string, string>;
};

// This is a helper type used in a few places
export type Attributes = { [key: string]: string };

// This is the most simplistic strongly typed metadata you'll find
export interface SimpleMetadata {
  artist: string;
  album: string;
  year?: string;
  track: string;
  title: string;
  compilation?: 'va' | 'ost';
}

// This is a more robust metadata type, meant to be used in,
// among other scenarios, situations where you're moving files around
export type FullMetadata = {
  originalPath: string;
  artist: string[] | string;
  album: string;
  year?: number;
  track: number;
  title: string;
  vaType?: 'va' | 'ost';
  moreArtists?: string[];
  variations?: string[];
  disk?: number;
};

// This is a general mechanism for describing how to extract
// various metadata components out of a file path
export type RegexPattern = {
  // This can be something like "soundtrack"
  // or "true/false" to simply indicate that it's
  // a compilation of works by various artists
  compilation?: string | boolean;
  // This is the regular expression to match
  rgx: RegExp;
  // These are the names of the metadata fields
  // and their corresponding RegExp capture numbers
  metadata: { [key: string]: number };
};

export type MimeData = {
  type: string;
  data: string;
};

export const Media = media;
