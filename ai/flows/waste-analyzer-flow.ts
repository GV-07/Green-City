'use server';
/**
 * @fileOverview An AI flow to analyze waste from an image.
 *
 * - analyzeWaste - A function that analyzes a photo of waste.
 */

import {ai} from '@/ai/genkit';
import {
  WasteAnalyzerInputSchema,
  type WasteAnalyzerInput,
  WasteAnalyzerOutputSchema,
  type WasteAnalyzerOutput,
} from './waste-analyzer-types';

export async function analyzeWaste(input: WasteAnalyzerInput): Promise<WasteAnalyzerOutput> {
  return wasteAnalyzerFlow(input);
}

const wasteAnalyzerPrompt = ai.definePrompt({
  name: 'wasteAnalyzerPrompt',
  input: {schema: WasteAnalyzerInputSchema},
  output: {schema: WasteAnalyzerOutputSchema},
  prompt: `You are an expert environmental scientist specializing in waste management and recycling. Your task is to analyze the image of a waste item provided by a user.

Based on the image, you must:
1.  Identify the primary waste item in the photo.
2.  Determine if this item is biodegradable.
3.  Provide a clear and simple classification for the waste (e.g., "Plastic Bottle", "Organic Kitchen Waste", "Newspaper").
4.  Give the user simple, actionable instructions on how to handle it. For example: "This is a plastic bottle. It is not biodegradable but is recyclable. Please rinse it and place it in the blue recycling bin." or "These are vegetable peels. They are biodegradable. You can put them in your home compost bin or the green municipal waste bin."

IMPORTANT: You MUST respond in the language specified by the user.

Analyze the following image:
Photo: {{media url=photoDataUri}}
Language for Response: {{{language}}}`,
});

const wasteAnalyzerFlow = ai.defineFlow(
  {
    name: 'wasteAnalyzerFlow',
    inputSchema: WasteAnalyzerInputSchema,
    outputSchema: WasteAnalyzerOutputSchema,
  },
  async input => {
    const {output} = await wasteAnalyzerPrompt(input);
    if (!output) {
      throw new Error('Failed to analyze the waste image.');
    }
    return output;
  }
);
