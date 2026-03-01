"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReportsChart } from "@/components/dashboard/reports-chart";
import { ViolationsChart } from "@/components/dashboard/violations-chart";
import {
  FileText,
  Hourglass,
} from "lucide-react";
import { useReports } from "@/hooks/use-reports";
import { useSettings } from "@/lib/settings";

export default function InspectorDashboardPage() {
  const reports = useReports();
  const pendingReports = reports.filter(r => r.status === 'Pending').length;
  const { t } = useSettings();

  return (
    <AppLayout title={t('inspector_dashboard')}>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Reports"
          value={reports.length.toString()}
          icon={FileText}
          description="All submitted violation reports"
        />
        <StatCard
          title="Pending Reviews"
          value={pendingReports.toString()}
          icon={Hourglass}
          description="Reports awaiting inspector approval"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Reports Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ReportsChart />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Violations by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <ViolationsChart reports={reports} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
