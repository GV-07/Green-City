"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { users } from "@/lib/data";
import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useSettings } from "@/lib/settings";

export default function LeaderboardPage() {
  const { t } = useSettings();
  return (
    <AppLayout title={t('leaderboard')}>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Top Green Citizens</CardTitle>
          <CardDescription>
            See who is leading the charge in making our city cleaner.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.sort((a, b) => b.points - a.points).map((user, index) => (
                <TableRow key={user.id} className={cn(index === 0 && 'bg-accent/50')}>
                  <TableCell className="font-bold text-lg">
                    <div className="flex items-center gap-2">
                     {index < 3 && <Trophy className={cn("h-5 w-5", 
                        index === 0 && "text-yellow-500",
                        index === 1 && "text-gray-400",
                        index === 2 && "text-yellow-700"
                      )} />}
                      {user.rank}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{user.type}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold font-mono">{user.points.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AppLayout>
  );
}
