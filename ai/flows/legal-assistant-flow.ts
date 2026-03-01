'use server';
/**
 * @fileOverview This file implements a Genkit flow for an AI legal assistant.
 * It answers user questions about waste management laws in their local language.
 *
 * - askLegalAssistant - A function that handles the legal query.
 */

import { ai } from '@/ai/genkit';
import {
  AskLegalAssistantInputSchema,
  type AskLegalAssistantInput,
  AskLegalAssistantOutputSchema,
  type AskLegalAssistantOutput,
} from './legal-assistant-types';

export async function askLegalAssistant(
  input: AskLegalAssistantInput
): Promise<AskLegalAssistantOutput> {
  return legalAssistantFlow(input);
}

const legalAssistantPrompt = ai.definePrompt({
  name: 'legalAssistantPrompt',
  input: { schema: AskLegalAssistantInputSchema },
  output: { schema: AskLegalAssistantOutputSchema },
  prompt: `You are an expert AI legal assistant for "Green City", specializing in waste management laws and regulations in India. Your goal is to provide clear, simple, and accurate information to citizens who may not have legal expertise.

When a user asks a question, you must answer it based on your knowledge of Indian waste management laws (like the Solid Waste Management Rules, 2016, and other relevant environmental regulations).

IMPORTANT:
1.  **Simplify Legal Jargon**: Avoid complex legal terms. Explain concepts in a simple, easy-to-understand manner.
2.  **Be Actionable**: Where possible, provide actionable advice (e.g., "You can report this to your local municipal corporation...").
3.  **Language**: You MUST respond in the language specified by the user.

---
User's Question: {{{question}}}
Language for Response: {{{language}}}
---
`,
});

const legalAssistantFlow = ai.defineFlow(
  {
    name: 'legalAssistantFlow',
    inputSchema: AskLegalAssistantInputSchema,
    outputSchema: AskLegalAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await legalAssistantPrompt(input);
    if (!output) {
      throw new Error('Failed to generate a legal advice answer.');
    }
    return output;
  }
);
