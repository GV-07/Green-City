import { z } from 'zod';

export const AskLegalAssistantInputSchema = z.object({
  question: z.string().describe('The user\'s question about waste management laws.'),
  language: z.string().describe('The language for the AI to respond in (e.g., "English", "Tamil", "Hindi").'),
});
export type AskLegalAssistantInput = z.infer<typeof AskLegalAssistantInputSchema>;

export const AskLegalAssistantOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});
export type AskLegalAssistantOutput = z.infer<typeof AskLegalAssistantOutputSchema>;
