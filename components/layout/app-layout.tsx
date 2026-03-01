"use client"

import * as React from "react"
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Header } from "./header"
import { Nav } from "./nav"

export function AppLayout({
  children,
  title
}: {
  children: React.ReactNode,
  title: string
}) {
  const [open, setOpen] = React.useState(true);

  return (
    <SidebarProvider defaultOpen>
        <Sidebar side="left" collapsible="icon" className="border-r border-sidebar-border/50">
          <Nav />
        </Sidebar>
        <SidebarInset className="bg-background min-h-screen">
          <Header title={title} />
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </SidebarInset>
    </SidebarProvider>
  )
}
