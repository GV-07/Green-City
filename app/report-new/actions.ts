"use server";

import { z } from "zod";
import { aiCitizenReportValidation } from "@/ai/flows/ai-citizen-report-validation";
import type { AICitizenReportValidationOutput } from "@/ai/flows/ai-citizen-report-validation-types";

const formSchema = z.object({
  description: z.string(),
  location: z.string(),
  timestamp: z.string(),
  photoOrVideoDataUri: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export async function createReport(
  values: FormValues
): Promise<{ success: boolean; error?: string; aiOutput?: AICitizenReportValidationOutput }> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data." };
  }

  try {
    // In a real app, you'd save the report to a database here first.
    // For this demo, we proceed directly to AI validation.

    const aiOutput = await aiCitizenReportValidation(validatedFields.data);
    
    // After getting AI output, you might update the report in the database with the validation results.
    console.log("AI Validation Output:", aiOutput);

    return { success: true, aiOutput };
  } catch (error) {
    console.error("Error during AI validation:", error);
    return {
      success: false,
      error: "Failed to validate the report with AI. Please try again.",
    };
  }
}
