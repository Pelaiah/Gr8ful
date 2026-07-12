export type Track = {
  id: string;
  artistId: string;
  title: string;
  album: string;
  audioUrl: string;
  duration: number;
  lyrics?: TimedLyric[];
};

export type TimedLyric = {
  word: string;
  start: number;
  end: number;
};

export type UserRole = 'artist' | 'fan';

export type OnboardingLevel = 1 | 2 | 3 | 4;

export type ArtistProfile = {
  uid: string;
  slug: string;
  onboardingLevel: OnboardingLevel;
  metrics: {
    streams: number;
    fans: number;
    revenueCents: number;
  };
};
