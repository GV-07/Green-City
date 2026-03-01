"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/lib/settings";
import { useUser } from "@/hooks/use-user";

export default function ProfilePage() {
  const { toast } = useToast();
  const { t } = useSettings();
  const currentUser = useUser();

  const handleUpdate = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved.",
    });
  };

  return (
    <AppLayout title={t('my_profile')}>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Profile Information</CardTitle>
            <CardDescription>View and edit your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-24 w-24 border-4 border-primary">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h2 className="text-2xl font-bold font-headline">{currentUser.name}</h2>
                <p className="text-muted-foreground">{currentUser.email}</p>
                <Badge variant="secondary">{currentUser.type}</Badge>
              </div>
            </div>
            <div className="space-y-4">
               <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={currentUser.name} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={currentUser.email} readOnly />
              </div>
              <Button onClick={handleUpdate}>Update Profile</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
