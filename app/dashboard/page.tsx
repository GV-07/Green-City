"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { StatCard } from "@/components/dashboard/stat-card";
import {
  Trophy,
  Coins,
} from "lucide-react";
import { challenges } from "@/lib/data";
import { useSettings } from "@/lib/settings";
import { useUser } from "@/hooks/use-user";

export default function DashboardPage() {
  const { t } = useSettings();
  const currentUser = useUser();
  const activeChallenges = challenges.filter(c => c.status === 'Active').length;

  return (
    <AppLayout title={t('quest_dashboard')}>
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Active Challenges"
          value={activeChallenges.toString()}
          icon={Trophy}
          description="Ongoing Kuppai Quest challenges"
        />
        <StatCard
          title="Your Points"
          value={currentUser.points.toLocaleString()}
          icon={Coins}
          description="Points earned from activities"
          color="accent"
        />
      </div>
    </AppLayout>
  );
}
