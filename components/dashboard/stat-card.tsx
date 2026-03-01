import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  description: string;
  color?: "primary" | "accent";
}

export function StatCard({ title, value, icon: Icon, description, color }: StatCardProps) {
  return (
    <Card className="shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn("h-5 w-5 text-muted-foreground", color === "accent" && "text-accent")} />
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-bold font-headline", color === "accent" && "text-accent")}>{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
