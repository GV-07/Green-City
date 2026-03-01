import {z} from 'zod';

export const WasteAnalyzerInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a waste item, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  language: z.string().describe('The language for the AI to respond in (e.g., "English", "Tamil", "Hindi").'),
});
export type WasteAnalyzerInput = z.infer<typeof WasteAnalyzerInputSchema>;

export const WasteAnalyzerOutputSchema = z.object({
    isBiodegradable: z.boolean().describe('Whether the waste item is biodegradable or not.'),
    wasteType: z.string().describe('The type of waste identified (e.g., "Plastic Bottle", "Food Scraps", "Paper").'),
    handlingInstructions: z.string().describe('Clear, concise instructions on how to properly dispose of or handle the waste.'),
});
export type WasteAnalyzerOutput = z.infer<typeof WasteAnalyzerOutputSchema>;
