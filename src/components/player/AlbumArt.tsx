import Image from 'next/image';

interface AlbumArtProps {
  imageUrl: string;
}

export default function AlbumArt({ imageUrl }: AlbumArtProps) {
  return (
    <Image
      key={imageUrl}
      src={imageUrl}
      alt="Album Art"
      fill
      className="object-cover transition-all duration-500 animate-in fade-in"
      data-ai-hint="album cover"
      priority
    />
  );
}
