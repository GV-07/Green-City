"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { ReportForm } from "./report-form";
import { useSettings } from "@/lib/settings";

export default function NewReportPage() {
  const { t } = useSettings();
  return (
    <AppLayout title={t('submit_violation_report')}>
      <div className="mx-auto max-w-2xl">
        <ReportForm />
      </div>
    </AppLayout>
  );
}
