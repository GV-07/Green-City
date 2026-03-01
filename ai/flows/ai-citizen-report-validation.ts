'use server';
/**
 * @fileOverview This file implements a Genkit flow for AI-powered citizen report validation.
 *
 * - aiCitizenReportValidation - A function that handles the AI validation and classification process for citizen reports.
 */

import { ai } from '@/ai/genkit';
import {
  AICitizenReportValidationInputSchema,
  type AICitizenReportValidationInput,
  AICitizenReportValidationOutputSchema,
  type AICitizenReportValidationOutput,
} from './ai-citizen-report-validation-types';

export async function aiCitizenReportValidation(
  input: AICitizenReportValidationInput
): Promise<AICitizenReportValidationOutput> {
  return aiCitizenReportValidationFlow(input);
}

const aiCitizenReportValidationPrompt = ai.definePrompt({
  name: 'aiCitizenReportValidationPrompt',
  input: { schema: AICitizenReportValidationInputSchema },
  output: { schema: AICitizenReportValidationOutputSchema },
  prompt: `You are an AI assistant specialized in validating sanitation reports and classifying violation types from citizen submissions. Your task is to analyze the provided photo or video evidence along with any additional context to determine its authenticity and classify the type of sanitation violation.\n\nWhen evaluating authenticity, consider the following:\n-   **Clarity**: Is the image/video clear, or does it appear blurry or pixelated?\n-   **Recency**: Does the visual content appear consistent with the provided timestamp ({{{timestamp}}}) and general contemporary environment, or does it look significantly older or out of place?\n-   **Manipulation**: Are there any visual signs of digital editing or alteration (e.g., inconsistencies in lighting, unnatural edges, or repeated patterns)?\nIf you find any issues, list them in the 'authenticityReasons' array and set 'isAuthentic' to false. Otherwise, set 'isAuthentic' to true and leave 'authenticityReasons' empty.\n\nFor classification, identify the primary type of sanitation violation depicted. Choose from the following types or categorize as 'other' if none fit precisely:\n-   "illegal dumping": Large amounts of waste or specific items (e.g., furniture, electronics) discarded in unauthorized areas.\n-   "unsegregated waste": Mixed waste where proper segregation into recyclables, organic, and non-recyclable waste is not observed.\n-   "public urination": Evidence of public urination.\n-   "graffiti": Unauthorized markings or drawings on public or private property.\n-   "other": Any other significant sanitation issue not covered by the above categories.\n\nProvide a concise description of the identified violation.\n\n---\nEvidence to analyze:\nDescription: {{{description}}}\nTimestamp of submission: {{{timestamp}}}\nLocation: {{{location}}}\nPhoto/Video: {{media url=photoOrVideoDataUri}}`,
});

const aiCitizenReportValidationFlow = ai.defineFlow(
  {
    name: 'aiCitizenReportValidationFlow',
    inputSchema: AICitizenReportValidationInputSchema,
    outputSchema: AICitizenReportValidationOutputSchema,
  },
  async (input) => {
    const { output } = await aiCitizenReportValidationPrompt(input);
    if (!output) {
      throw new Error('Failed to generate validation and classification output.');
    }
    return output;
  }
);
