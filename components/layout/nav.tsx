"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import type { NavItem } from "@/lib/types"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  ClipboardList,
  Trophy,
  Users,
  Wallet,
  FilePlus,
  LogOut,
  Settings,
  Scale,
  Flame,
  ChevronRight,
  Megaphone,
  User,
  Sparkles,
  Camera,
  ClipboardCheck,
} from "lucide-react"
import { Logo } from "../icons/logo"
import { Separator } from "../ui/separator"
import { useSettings } from "@/lib/settings"

export function Nav() {
  const pathname = usePathname();
  const { t } = useSettings();
  const [userMenuOpen, setUserMenuOpen] = React.useState(true)
  const [inspectorMenuOpen, setInspectorMenuOpen] = React.useState(true);
  const [energyMenuOpen, setEnergyMenuOpen] = React.useState(true)
  const [aiMenuOpen, setAiMenuOpen] = React.useState(true)

  const userNavItems: NavItem[] = [
    { href: "/dashboard", label: t("quest_dashboard"), icon: LayoutDashboard },
    { href: "/challenges", label: t("kuppai_quest"), icon: Trophy },
    { href: "/leaderboard", label: t("leaderboard"), icon: Users },
    { href: "/announcements", label: t("announcements"), icon: Megaphone },
    { href: "/wallet", label: t("wallet_rewards"), icon: Wallet },
  ]

  const inspectorNavItems: NavItem[] = [
    { href: "/inspector", label: t("inspector_dashboard"), icon: ClipboardCheck },
    { href: "/reports", label: t("violation_reports"), icon: ClipboardList },
  ];

  const energyNavItems: NavItem[] = [
    { href: "/energy", label: t("energy_pipeline"), icon: Flame },
  ]

  const aiNavItems: NavItem[] = [
    { href: "/legal-assistant", label: t("ai_legal_assistant"), icon: Scale },
    { href: "/waste-analyzer", label: t("waste_analyzer"), icon: Camera },
  ]

  React.useEffect(() => {
    const isUserActive = userNavItems.some(item => pathname.startsWith(item.href));
    const isInspectorActive = inspectorNavItems.some(item => pathname.startsWith(item.href));
    const isEnergyActive = energyNavItems.some(item => pathname.startsWith(item.href));
    const isAiActive = aiNavItems.some(item => pathname.startsWith(item.href));

    setUserMenuOpen(isUserActive || (!isInspectorActive && !isEnergyActive && !isAiActive));
    setInspectorMenuOpen(isInspectorActive);
    setEnergyMenuOpen(isEnergyActive);
    setAiMenuOpen(isAiActive);
  }, [pathname, userNavItems, inspectorNavItems, energyNavItems, aiNavItems])

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-lg font-headline font-semibold text-primary-foreground">Green City</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className="mb-2">
          <Button asChild size="lg" className="w-full justify-start bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/report-new">
              <FilePlus className="mr-2 h-5 w-5" />
              {t('report_violation')}
            </Link>
          </Button>
        </div>

        <Collapsible open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between">
                  <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span>{t('citizen')}</span>
                  </div>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", userMenuOpen && "rotate-90")} />
              </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-1">
              <SidebarMenu className="pl-6">
                  {userNavItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.href)}
                          tooltip={item.label}
                          className="justify-start"
                      >
                          <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                          </Link>
                      </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
              </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
        
        <Separator className="my-2 bg-sidebar-border/50" />

        <Collapsible open={inspectorMenuOpen} onOpenChange={setInspectorMenuOpen}>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton className="w-full justify-between">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-5 w-5" />
                <span>{t('inspector')}</span>
              </div>
              <ChevronRight
                className={cn(
                  "h-4 w-4 transition-transform",
                  inspectorMenuOpen && "rotate-90"
                )}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-1">
            <SidebarMenu className="pl-6">
              {inspectorNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href)}
                    tooltip={item.label}
                    className="justify-start"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>

        <Separator className="my-2 bg-sidebar-border/50" />

        <Collapsible open={energyMenuOpen} onOpenChange={setEnergyMenuOpen}>
          <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between">
                  <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5" />
                      <span>{t('energy')}</span>
                  </div>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", energyMenuOpen && "rotate-90")} />
              </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-1">
              <SidebarMenu className="pl-6">
                  {energyNavItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.href)}
                          tooltip={item.label}
                          className="justify-start"
                      >
                          <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                          </Link>
                      </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
              </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>

        <Separator className="my-2 bg-sidebar-border/50" />

        <Collapsible open={aiMenuOpen} onOpenChange={setAiMenuOpen}>
          <CollapsibleTrigger asChild>
              <SidebarMenuButton className="w-full justify-between">
                  <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5" />
                      <span>{t('ai')}</span>
                  </div>
                  <ChevronRight className={cn("h-4 w-4 transition-transform", aiMenuOpen && "rotate-90")} />
              </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-1">
              <SidebarMenu className="pl-6">
                  {aiNavItems.map((item) => (
                      <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                          asChild
                          isActive={pathname.startsWith(item.href)}
                          tooltip={item.label}
                          className="justify-start"
                      >
                          <Link href={item.href}>
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                          </Link>
                      </SidebarMenuButton>
                      </SidebarMenuItem>
                  ))}
              </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter className="p-2">
        <Separator className="mb-2 bg-sidebar-border/50" />
         <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="justify-start">
                <Link href="/profile">
                    <User className="h-5 w-5" />
                    <span>{t('profile')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild className="justify-start">
                  <Link href="/settings">
                    <Settings className="h-5 w-5" />
                    <span>{t('settings')}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild className="justify-start">
                <Link href="/">
                    <LogOut className="h-5 w-5" />
                    <span>{t('logout')}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  )
}
