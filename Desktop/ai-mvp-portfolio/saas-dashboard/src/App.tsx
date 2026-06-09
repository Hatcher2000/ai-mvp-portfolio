import {
  Activity,
  ArrowUpRight,
  Bell,
  DollarSign,
  LayoutDashboard,
  Percent,
  Search,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

const metrics = [
  {
    title: "Total Revenue",
    value: "$12,450",
    change: "+12.5%",
    description: "vs last month",
    icon: DollarSign,
    glow: "shadow-[0_0_24px_-4px_rgba(56,189,248,0.35)]",
    border: "border-sky-500/20 hover:border-sky-400/40",
    iconBg: "bg-sky-500/10 text-sky-400",
    accent: "text-sky-400",
  },
  {
    title: "Active Users",
    value: "1,205",
    change: "+8.2%",
    description: "vs last month",
    icon: Users,
    glow: "shadow-[0_0_24px_-4px_rgba(167,139,250,0.35)]",
    border: "border-violet-500/20 hover:border-violet-400/40",
    iconBg: "bg-violet-500/10 text-violet-400",
    accent: "text-violet-400",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.4%",
    description: "vs last month",
    icon: Percent,
    glow: "shadow-[0_0_24px_-4px_rgba(52,211,153,0.35)]",
    border: "border-emerald-500/20 hover:border-emerald-400/40",
    iconBg: "bg-emerald-500/10 text-emerald-400",
    accent: "text-emerald-400",
  },
] as const

function MetricCard({
  title,
  value,
  change,
  description,
  icon: Icon,
  glow,
  border,
  iconBg,
  accent,
}: (typeof metrics)[number]) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border bg-slate-900/60 py-0 ring-0 backdrop-blur-sm transition-all duration-300",
        border,
        glow
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/[0.04] to-transparent" />
      <CardHeader className="relative pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardDescription className="text-xs font-medium tracking-wide text-slate-400 uppercase">
              {title}
            </CardDescription>
            <CardTitle className="font-heading text-3xl font-semibold tracking-tight text-white tabular-nums">
              {value}
            </CardTitle>
          </div>
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl border border-white/5",
              iconBg
            )}
          >
            <Icon className="size-5" strokeWidth={1.75} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative pt-0">
        <div className="flex items-center gap-2 text-sm">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 font-medium tabular-nums",
              accent
            )}
          >
            <ArrowUpRight className="size-3.5" />
            {change}
          </span>
          <span className="text-slate-500">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default function App() {
  return (
    <div className="dark min-h-svh bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-800/80 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl border border-sky-500/30 bg-sky-500/10 shadow-[0_0_20px_-4px_rgba(56,189,248,0.4)]">
              <LayoutDashboard className="size-4.5 text-sky-400" strokeWidth={1.75} />
            </div>
            <div>
              <h1 className="font-heading text-lg font-semibold tracking-tight text-white">
                Nexus Analytics
              </h1>
              <p className="text-sm text-slate-400">SaaS performance overview</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-400 sm:flex">
              <Search className="size-4 shrink-0" />
              <span>Search metrics…</span>
              <kbd className="ml-6 rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
                ⌘K
              </kbd>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-200"
            >
              <Bell className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            >
              <Activity className="size-4" />
              Live view
            </Button>
          </div>
        </header>

        <main className="py-8">
          <div className="mb-8">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-white">
              Dashboard
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Key metrics for the current billing period
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
