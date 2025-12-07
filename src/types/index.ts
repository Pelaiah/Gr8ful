export type Track = {
  id: number;
  title: string;
  artist: string;
  album: string;
  albumArtUrl: string;
  lyrics: string;
  duration: number; // in seconds
  audioUrl: string;
};

export type RepeatMode = 'off' | 'one' | 'all';
