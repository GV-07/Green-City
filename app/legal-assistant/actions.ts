"use server";

import { z } from "zod";
import { askLegalAssistant } from "@/ai/flows/legal-assistant-flow";
import type { AskLegalAssistantOutput } from "@/ai/flows/legal-assistant-types";

const formSchema = z.object({
  question: z.string().min(10, "Please ask a more detailed question."),
  language: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export async function getLegalAdvice(
  values: FormValues
): Promise<{ success: boolean; error?: string; aiOutput?: AskLegalAssistantOutput }> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data." };
  }

  try {
    const aiOutput = await askLegalAssistant(validatedFields.data);
    
    return { success: true, aiOutput };
  } catch (error) {
    console.error("Error during AI legal advice generation:", error);
    return {
      success: false,
      error: "Failed to get legal advice from the AI. Please try again.",
    };
  }
}
