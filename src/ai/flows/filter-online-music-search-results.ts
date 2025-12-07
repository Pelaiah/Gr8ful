'use server';

/**
 * @fileOverview Filters online music search results to prioritize stable and legal sources.
 *
 * - filterOnlineMusicSearchResults - A function that filters music search results.
 * - FilterOnlineMusicSearchResultsInput - The input type for the filterOnlineMusicSearchResults function.
 * - FilterOnlineMusicSearchResultsOutput - The return type for the filterOnlineMusicSearchResults function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FilterOnlineMusicSearchResultsInputSchema = z.object({
  query: z.string().describe('The user search query for music.'),
  results: z.array(z.string()).describe('An array of music search results from various sources.'),
});
export type FilterOnlineMusicSearchResultsInput = z.infer<
  typeof FilterOnlineMusicSearchResultsInputSchema
>;

const FilterOnlineMusicSearchResultsOutputSchema = z.object({
  filteredResults: z
    .array(z.string())
    .describe('An array of filtered music search results, prioritizing stable and legal sources.'),
});
export type FilterOnlineMusicSearchResultsOutput = z.infer<
  typeof FilterOnlineMusicSearchResultsOutputSchema
>;

export async function filterOnlineMusicSearchResults(
  input: FilterOnlineMusicSearchResultsInput
): Promise<FilterOnlineMusicSearchResultsOutput> {
  return filterOnlineMusicSearchResultsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'filterOnlineMusicSearchResultsPrompt',
  input: {schema: FilterOnlineMusicSearchResultsInputSchema},
  output: {schema: FilterOnlineMusicSearchResultsOutputSchema},
  prompt: `You are an AI expert in identifying reliable and legal music sources.

  Given a user's query and a list of search results from various sources (Google, YouTube, Spotify, etc.), your task is to filter the results to prioritize stable, legal sources and minimize potentially copyrighted or unreliable data.

  User Query: {{{query}}}
  Search Results: {{{results}}}

  Provide a filtered list of music search results, ensuring the sources are reliable and legal.
  Ensure that the output contains the filteredResults field.`,
});

const filterOnlineMusicSearchResultsFlow = ai.defineFlow(
  {
    name: 'filterOnlineMusicSearchResultsFlow',
    inputSchema: FilterOnlineMusicSearchResultsInputSchema,
    outputSchema: FilterOnlineMusicSearchResultsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
