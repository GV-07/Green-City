"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getLegalAdvice } from "./actions";
import { Loader2, Sparkles } from "lucide-react";
import type { AskLegalAssistantOutput } from "@/ai/flows/legal-assistant-types";
import { useSettings } from "@/lib/settings";

const formSchema = z.object({
  question: z.string().min(10, "Please ask a more detailed question (at least 10 characters)."),
});

type FormValues = z.infer<typeof formSchema>;

export function LegalForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [aiResult, setAiResult] = useState<AskLegalAssistantOutput | null>(null);
  const { language, t } = useSettings();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    setAiResult(null);
    startTransition(async () => {
      const result = await getLegalAdvice({ ...values, language });
      if (result.success && result.aiOutput) {
        toast({
          title: "Answer Received!",
          description: "The AI has provided an answer to your question.",
        });
        setAiResult(result.aiOutput);
      } else {
        toast({
          variant: "destructive",
          title: "Request Failed",
          description: result.error || "An unknown error occurred.",
        });
      }
    });
  };

  return (
    <>
      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Question</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., What is the fine for not segregating waste at home?"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending} className="w-full">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isPending ? "Getting Advice..." : "Ask AI Assistant"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
        <Card className="mt-6">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center items-center gap-2 text-muted-foreground">
              <Loader2 className="h-5 w-5 animate-spin" />
              <p>The AI is thinking... Please wait.</p>
            </div>
          </CardContent>
        </Card>
      )}

      {aiResult && (
        <Card className="mt-6 border-primary/50 shadow-lg shadow-primary/10">
          <CardHeader>
            <CardTitle className="font-headline text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              {t('ai_legal_assistant')}'s Response
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap rounded-md bg-secondary/50 p-4">
              {aiResult.answer}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
