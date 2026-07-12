'use server';
/**
 * @fileOverview AI Forced Aligner for synchronized lyrics.
 *
 * - alignLyrics - Maps raw text lyrics to word-level timestamps using audio reference.
 * - AlignLyricsInput - Audio URI and text lyrics.
 * - AlignLyricsOutput - Word-level JSON.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AlignLyricsInputSchema = z.object({
  audioUrl: z.string().describe('URL or Data URI of the master audio file.'),
  rawLyrics: z.string().describe('The plain text lyrics provided by the artist.'),
});
export type AlignLyricsInput = z.infer<typeof AlignLyricsInputSchema>;

const WordTimestampSchema = z.object({
  word: z.string(),
  start: z.number().describe('Start time in seconds'),
  end: z.number().describe('End time in seconds'),
});

const AlignLyricsOutputSchema = z.object({
  alignedLyrics: z.array(WordTimestampSchema),
  confidence: z.number().describe('Confidence score of the alignment.'),
});
export type AlignLyricsOutput = z.infer<typeof AlignLyricsOutputSchema>;

export async function alignLyrics(input: AlignLyricsInput): Promise<AlignLyricsOutput> {
  return alignLyricsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'alignLyricsPrompt',
  input: {schema: AlignLyricsInputSchema},
  output: {schema: AlignLyricsOutputSchema},
  prompt: `You are an expert audio engineer specializing in forced alignment.
  
  Your task is to map the provided lyrics to the audio file.
  
  Lyrics: {{{rawLyrics}}}
  Audio Reference: {{audioUrl}}
  
  Analyze the audio to determine the exact start and end times for each word in the lyrics. Return a structured JSON array of word-level timestamps.`,
});

const alignLyricsFlow = ai.defineFlow(
  {
    name: 'alignLyricsFlow',
    inputSchema: AlignLyricsInputSchema,
    outputSchema: AlignLyricsOutputSchema,
  },
  async input => {
    // In a production environment, this would call a specialized alignment model like WhisperX.
    const {output} = await prompt(input);
    return output!;
  }
);
