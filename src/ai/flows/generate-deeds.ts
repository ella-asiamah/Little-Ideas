// Use server directive is required for Genkit Flows.
'use server';

/**
 * @fileOverview This file defines the Genkit flow for generating good deed suggestions based on the user's location.
 *
 * - generateDeeds - A function that triggers the good deed generation flow.
 * - GenerateDeedsInput - The input type for the generateDeeds function.
 * - GenerateDeedsOutput - The output type for the generateDeeds function, listing suggested good deeds.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema for the generateDeeds flow.
const GenerateDeedsInputSchema = z.object({
  location: z
    .string()
    .describe(
      'The current location of the user. This could be a city, neighborhood, or specific address.'
    ),
});
export type GenerateDeedsInput = z.infer<typeof GenerateDeedsInputSchema>;

// Define the output schema for the generateDeeds flow.
const GenerateDeedsOutputSchema = z.object({
  deeds: z
    .array(z.string())
    .describe('A list of suggested good deeds that can be performed at the specified location.'),
});
export type GenerateDeedsOutput = z.infer<typeof GenerateDeedsOutputSchema>;

// Exported function to trigger the generateDeeds flow.
export async function generateDeeds(input: GenerateDeedsInput): Promise<GenerateDeedsOutput> {
  return generateDeedsFlow(input);
}

// Define the prompt for generating good deed suggestions.
const generateDeedsPrompt = ai.definePrompt({
  name: 'generateDeedsPrompt',
  input: {schema: GenerateDeedsInputSchema},
  output: {schema: GenerateDeedsOutputSchema},
  prompt: `You are a helpful assistant that suggests good deeds to perform based on a user's location.

  Given the user's current location, suggest a list of good deeds that they can perform in that area. The list should be tailored to the location and should be diverse, including both small and large acts of kindness.

  Location: {{{location}}}

  Good Deeds:
  `,
});

// Define the Genkit flow for generating good deed suggestions.
const generateDeedsFlow = ai.defineFlow(
  {
    name: 'generateDeedsFlow',
    inputSchema: GenerateDeedsInputSchema,
    outputSchema: GenerateDeedsOutputSchema,
  },
  async input => {
    const {output} = await generateDeedsPrompt(input);
    return output!;
  }
);
