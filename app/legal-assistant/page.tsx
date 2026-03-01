"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { LegalForm } from "./legal-form";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettings } from "@/lib/settings";

export default function LegalAssistantPage() {
  const { t } = useSettings();

  return (
    <AppLayout title={t('ai_legal_assistant')}>
      <div className="mx-auto max-w-3xl space-y-6">
        <Card className="border-0 shadow-none">
          <CardHeader className="p-0">
            <CardTitle className="font-headline text-2xl">{t('ask_about_waste_laws')}</CardTitle>
            <CardDescription>
              {t('ask_about_waste_laws_desc')}
            </CardDescription>
          </CardHeader>
        </Card>
        <LegalForm />
      </div>
    </AppLayout>
  );
}
