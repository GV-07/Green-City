"use client";

import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useSettings } from "@/lib/settings";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sun, Moon, Laptop } from "lucide-react";

const languages = ["English", "Hindi", "Tamil", "Bengali", "Telugu"];

export default function SettingsPage() {
  const { toast } = useToast();
  const { theme, setTheme, language, setLanguage, isMounted, t } = useSettings();

  const handleSave = () => {
    toast({
      title: t('settings_saved'),
      description: t('settings_saved_desc'),
    });
  };

  if (!isMounted || !theme) {
    return (
        <AppLayout title={t('settings')}>
            <div className="max-w-2xl mx-auto space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{t('appearance')}</CardTitle>
                        <CardDescription>{t('customize_appearance')}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="h-24 w-full animate-pulse rounded-md bg-muted"></div>
                        <div className="flex items-center justify-between">
                           <div className="h-6 w-24 animate-pulse rounded-md bg-muted"></div>
                           <div className="h-10 w-[180px] animate-pulse rounded-md bg-muted"></div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
  }

  return (
    <AppLayout title={t('settings')}>
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">{t('notifications')}</CardTitle>
                <CardDescription>{t('manage_notifications')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <Label htmlFor="email-notifications">{t('email_notifications')}</Label>
                    <Switch id="email-notifications" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="push-notifications">{t('push_notifications')}</Label>
                    <Switch id="push-notifications" />
                </div>
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="font-headline">{t('appearance')}</CardTitle>
                <CardDescription>{t('customize_appearance')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                    <Label className="mb-2 block font-medium">{t('theme')}</Label>
                    <RadioGroup
                        value={theme}
                        onValueChange={setTheme}
                        className="grid grid-cols-3 gap-4"
                    >
                        <div>
                            <RadioGroupItem value="light" id="light" className="peer sr-only" />
                            <Label
                                htmlFor="light"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Sun className="mb-2 h-6 w-6" />
                                {t('light')}
                            </Label>
                        </div>
                         <div>
                            <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                            <Label
                                htmlFor="dark"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Moon className="mb-2 h-6 w-6" />
                                {t('dark')}
                            </Label>
                        </div>
                         <div>
                            <RadioGroupItem value="system" id="system" className="peer sr-only" />
                            <Label
                                htmlFor="system"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                                <Laptop className="mb-2 h-6 w-6" />
                                {t('system')}
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="language-select">{t('language')}</Label>
                    <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger id="language-select" className="w-[180px]">
                            <SelectValue placeholder={t('select_language')} />
                        </SelectTrigger>
                        <SelectContent>
                            {languages.map((lang) => (
                            <SelectItem key={lang} value={lang}>
                                {lang}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardContent>
        </Card>
        <Button onClick={handleSave}>{t('save_changes')}</Button>
      </div>
    </AppLayout>
  );
}
