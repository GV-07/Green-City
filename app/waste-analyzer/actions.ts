"use server";

import { z } from "zod";
import { analyzeWaste } from "@/ai/flows/waste-analyzer-flow";
import type { WasteAnalyzerOutput } from "@/ai/flows/waste-analyzer-types";

const formSchema = z.object({
  photoDataUri: z.string().min(1, "Image data is required."),
  language: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export async function getWasteAnalysis(
  values: FormValues
): Promise<{ success: boolean; error?: string; aiOutput?: WasteAnalyzerOutput }> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid form data." };
  }

  try {
    const aiOutput = await analyzeWaste(validatedFields.data);
    
    return { success: true, aiOutput };
  } catch (error) {
    console.error("Error during AI waste analysis:", error);
    return {
      success: false,
      error: "Failed to get analysis from the AI. Please try again.",
    };
  }
}
