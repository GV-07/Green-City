"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { rewards } from "@/lib/data";
import { Coins, Gift, Ticket } from "lucide-react";
import { useSettings } from "@/lib/settings";
import { useUser } from "@/hooks/use-user";

const rewardIcons = {
  'Coupon': <Ticket className="h-8 w-8 text-primary" />,
  'Digital Good': <Gift className="h-8 w-8 text-primary" />,
} as const;

export default function WalletPage() {
  const { t } = useSettings();
  const currentUser = useUser();
  
  return (
    <AppLayout title={t('wallet_and_rewards')}>
      <div className="space-y-8">
        <Card className="bg-primary text-primary-foreground shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Your Wallet</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Coins className="h-12 w-12 text-accent" />
            <div>
              <p className="text-sm text-primary-foreground/80">Total Points</p>
              <p className="text-4xl font-bold font-headline">
                {currentUser.points.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <div>
            <h2 className="text-2xl font-headline font-semibold mb-4">Redeem Rewards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                <Card key={reward.id} className="flex flex-col overflow-hidden shadow-sm transition-all hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center gap-4">
                        {rewardIcons[reward.type]}
                        <div>
                            <CardTitle className="font-headline text-xl">{reward.name}</CardTitle>
                            <CardDescription>{reward.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center bg-secondary/50">
                        <div className="font-bold text-primary text-lg">{reward.pointsRequired.toLocaleString()} PTS</div>
                        <Button disabled={currentUser.points < reward.pointsRequired}>
                            Redeem
                        </Button>
                    </CardFooter>
                </Card>
                ))}
            </div>
        </div>
      </div>
    </AppLayout>
  );
}
