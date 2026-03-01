"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { DataTable } from "@/components/reports/data-table";
import { columns } from "@/components/reports/columns";
import { useReports } from "@/hooks/use-reports";
import { useSettings } from "@/lib/settings";

export default function ReportsPage() {
  const reports = useReports();
  const { t } = useSettings();
  return (
    <AppLayout title={t('violation_reports')}>
      <div className="rounded-lg border shadow-sm bg-card p-4">
        <DataTable columns={columns} data={reports} />
      </div>
    </AppLayout>
  );
}
