"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/data";
import { Trophy, Star } from "lucide-react";
import { useSettings } from "@/lib/settings";

export default function AnnouncementsPage() {
  const { t } = useSettings();
  // Let's feature Jane Smith as the winner of the month
  const winner = users.find(u => u.id === 'user-2');

  if (!winner) {
    return (
      <AppLayout title={t('announcements')}>
        <p>No announcement available.</p>
      </AppLayout>
    )
  }

  return (
    <AppLayout title={t('announcements')}>
      <div className="flex justify-center">
        <Card className="w-full max-w-2xl shadow-2xl shadow-primary/10 border-accent/50">
          <CardHeader className="text-center items-center">
            <div className="p-4 bg-accent/20 rounded-full mb-4">
              <Trophy className="h-12 w-12 text-accent" strokeWidth={2.5}/>
            </div>
            <CardTitle className="font-headline text-3xl text-primary">Green Citizen of the Month!</CardTitle>
            <CardDescription className="text-lg">Congratulations to our top contributor for last month!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4 pt-4">
            <Avatar className="h-24 w-24 border-4 border-accent">
              <AvatarImage src={winner.avatarUrl} alt={winner.name} />
              <AvatarFallback>{winner.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h3 className="text-2xl font-bold font-headline">{winner.name}</h3>
            <p className="text-muted-foreground max-w-md text-center">
              {winner.name} has shown outstanding dedication by reporting the most violations and actively participating in community clean-up challenges. Thank you for making our city a cleaner, greener place!
            </p>
            <div className="flex items-center gap-2 mt-4 font-bold text-accent font-headline text-2xl">
              <Star className="h-6 w-6" />
              <span>{winner.points.toLocaleString()} Points Earned</span>
              <Star className="h-6 w-6" />
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
