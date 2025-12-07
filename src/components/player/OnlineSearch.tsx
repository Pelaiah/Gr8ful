'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { filterOnlineMusicSearchResults } from '@/ai/flows/filter-online-music-search-results';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { tracks } from '@/lib/data';
import { usePlayer } from '@/hooks/usePlayer';

const searchSchema = z.object({
  query: z.string().min(1, 'Please enter a search query.'),
});

export default function OnlineSearch() {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const { toast } = useToast();
  const { setTrack } = usePlayer();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: '' },
  });

  const onSubmit = async (values: z.infer<typeof searchSchema>) => {
    setIsSearching(true);
    setSearchResults([]);
    try {
      const dummyResults = [
        `${values.query} - YouTube`,
        `${values.query} Official Video - YouTube`,
        `${values.query} on Spotify`,
        `Lyrics for ${values.query} - Google`,
        `Download ${values.query} mp3 - unreliable.com`,
      ];

      const response = await filterOnlineMusicSearchResults({
        query: values.query,
        results: dummyResults,
      });
      
      setSearchResults(response.filteredResults);
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        variant: 'destructive',
        title: 'Search Failed',
        description: 'Could not fetch search results.',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectTrack = (result: string) => {
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
    const newTitle = result.split(' - ')[0].split(' on ')[0].replace('Lyrics for ', '');
    const newTrack = { ...randomTrack, title: newTitle };
    setTrack(newTrack);
    toast({
        title: "Track selected",
        description: `${newTrack.title} is now playing.`,
    })
  };

  return (
    <div className="p-4 h-[70vh] flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Online Music Search</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2 mb-4">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem className="flex-grow">
                <FormControl>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search for songs, artists, lyrics..." className="pl-10" {...field} />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isSearching}>
            {isSearching ? <Loader2 className="animate-spin" /> : 'Search'}
          </Button>
        </form>
      </Form>
      <ScrollArea className="flex-grow">
        {isSearching && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <div className="space-y-2">
            {searchResults.map((result, index) => (
            <button
                key={index}
                className="w-full text-left p-3 rounded-lg hover:bg-muted transition-colors"
                onClick={() => handleSelectTrack(result)}
            >
                <p className="font-medium text-foreground">{result}</p>
                <p className="text-sm text-muted-foreground">Tap to play</p>
            </button>
            ))}
        </div>
      </ScrollArea>
    </div>
  );
}
