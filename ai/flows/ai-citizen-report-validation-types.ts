import { z } from 'zod';

export const AICitizenReportValidationInputSchema = z.object({
  photoOrVideoDataUri: z
    .string()
    .describe(
      "A photo or video of the sanitation violation, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  description: z.string().describe('Additional context or description provided by the citizen.'),
  timestamp: z.string().describe('The timestamp when the report evidence was captured (e.g., "2024-07-20T10:30:00Z").'),
  location: z.string().describe('The geolocation of the report (e.g., "Latitude: 34.0522, Longitude: -118.2437").'),
});
export type AICitizenReportValidationInput = z.infer<typeof AICitizenReportValidationInputSchema>;

export const AICitizenReportValidationOutputSchema = z.object({
  authenticity: z.object({
    isAuthentic: z.boolean().describe('True if the evidence appears authentic and legitimate, without signs of being old, blurry, or edited.'),
    authenticityReasons: z.array(z.string()).describe('A list of reasons if the evidence is deemed not authentic, indicating issues like blurriness, inconsistency with timestamp, or signs of manipulation. Empty if authentic.'),
  }).describe('Analysis of the evidence authenticity.').nullable(),
  violation: z.object({
    type: z.enum([
      'illegal dumping',
      'unsegregated waste',
      'public urination',
      'graffiti',
      'other',
    ]).describe('The classified type of sanitation violation.'),
    description: z.string().describe('A brief AI-generated description of the identified violation based on the evidence.'),
  }).describe('Classification of the sanitation violation.').nullable(),
});
export type AICitizenReportValidationOutput = z.infer<typeof AICitizenReportValidationOutputSchema>;
