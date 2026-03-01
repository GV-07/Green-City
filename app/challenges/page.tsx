"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { challenges } from "@/lib/data";
import type { Challenge } from "@/lib/types";
import { CheckCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/lib/settings";

export default function ChallengesPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { t } = useSettings();

  const handleParticipate = (challenge: Challenge) => {
    if (challenge.status !== 'Active') return;

    if (challenge.actionType === 'report') {
      router.push('/report-new');
    } else {
      toast({
        title: "Challenge Details",
        description: "More information about this challenge will be available soon.",
      });
    }
  };

  return (
    <AppLayout title={t('kuppai_quest_challenges')}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <Card key={challenge.id} className="flex flex-col overflow-hidden shadow-sm transition-all hover:shadow-lg">
            <CardHeader className="p-0">
               <div className="relative h-48 w-full">
                <Image
                    src={challenge.imageUrl}
                    alt={challenge.title}
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint={challenge.imageHint}
                />
                <Badge className={cn("absolute top-2 right-2", {
                  "bg-green-600": challenge.status === 'Active',
                  "bg-blue-600": challenge.status === 'Completed',
                  "bg-gray-500": challenge.status === 'Expired',
                })}>
                  {challenge.status === 'Active' && <Clock className="mr-1 h-3 w-3" />}
                  {challenge.status === 'Completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                  {challenge.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <CardTitle className="font-headline text-xl mb-2">{challenge.title}</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between items-center">
              <div className="font-bold text-primary text-lg">{challenge.points} PTS</div>
              <Button 
                onClick={() => handleParticipate(challenge)}
                disabled={challenge.status !== 'Active'}
              >
                {challenge.status === 'Active' ? 'Participate' : 'View Details'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
