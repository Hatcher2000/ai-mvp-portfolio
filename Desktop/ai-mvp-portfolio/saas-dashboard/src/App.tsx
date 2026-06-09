import { useMemo, useState } from "react"
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

type Timeline = "last30" | "thisMonth"

type MetricConfig = {
  title: string
  value: string
  change: string
  description: string
  icon: typeof DollarSign
  glow: string
  border: string
  iconBg: string
  accent: string
}

const timelineMetrics: Record<Timeline, MetricConfig[]> = {
  last30: [
    {
      title: "Total Revenue",
      value: "$12,450",
      change: "+12.5%",
      description: "vs prior 30 days",
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
      description: "vs prior 30 days",
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
      description: "vs prior 30 days",
      icon: Percent,
      glow: "shadow-[0_0_24px_-4px_rgba(52,211,153,0.35)]",
      border: "border-emerald-500/20 hover:border-emerald-400/40",
      iconBg: "bg-emerald-500/10 text-emerald-400",
      accent: "text-emerald-400",
    },
  ],
  thisMonth: [
    {
      title: "Total Revenue",
      value: "$9,820",
      change: "+6.1%",
      description: "vs last month",
      icon: DollarSign,
      glow: "shadow-[0_0_24px_-4px_rgba(56,189,248,0.35)]",
      border: "border-sky-500/20 hover:border-sky-400/40",
      iconBg: "bg-sky-500/10 text-sky-400",
      accent: "text-sky-400",
    },
    {
      title: "Active Users",
      value: "1,087",
      change: "+4.5%",
      description: "vs last month",
      icon: Users,
      glow: "shadow-[0_0_24px_-4px_rgba(167,139,250,0.35)]",
      border: "border-violet-500/20 hover:border-violet-400/40",
      iconBg: "bg-violet-500/10 text-violet-400",
      accent: "text-violet-400",
    },
    {
      title: "Conversion Rate",
      value: "2.9%",
      change: "+0.2%",
      description: "vs last month",
      icon: Percent,
      glow: "shadow-[0_0_24px_-4px_rgba(52,211,153,0.35)]",
      border: "border-emerald-500/20 hover:border-emerald-400/40",
      iconBg: "bg-emerald-500/10 text-emerald-400",
      accent: "text-emerald-400",
    },
  ],
}

const customers = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@acme.io",
    plan: "Premium" as const,
    status: "Active" as const,
  },
  {
    name: "Marcus Webb",
    email: "marcus@orbitlabs.com",
    plan: "Basic" as const,
    status: "Active" as const,
  },
  {
    name: "Elena Rodriguez",
    email: "elena.r@novatech.dev",
    plan: "Premium" as const,
    status: "Churned" as const,
  },
  {
    name: "James Okafor",
    email: "james.okafor@pixelstack.io",
    plan: "Basic" as const,
    status: "Active" as const,
  },
]

const timelineOptions: { value: Timeline; label: string }[] = [
  { value: "last30", label: "Last 30 Days" },
  { value: "thisMonth", label: "This Month" },
]

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
}: MetricConfig) {
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
            <CardTitle className="font-heading text-3xl font-semibold tracking-tight text-white tabular-nums transition-all duration-300">
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

function TimelineToggle({
  value,
  onChange,
}: {
  value: Timeline
  onChange: (timeline: Timeline) => void
}) {
  return (
    <div
      role="group"
      aria-label="Select timeline"
      className="inline-flex rounded-xl border border-slate-800 bg-slate-900/80 p-1"
    >
      {timelineOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200",
            value === option.value
              ? "bg-slate-800 text-white shadow-[0_0_16px_-4px_rgba(56,189,248,0.3)] ring-1 ring-sky-500/30"
              : "text-slate-400 hover:text-slate-200"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

function CustomerTable({
  rows,
  searchQuery,
}: {
  rows: typeof customers
  searchQuery: string
}) {
  return (
    <Card className="overflow-hidden border border-slate-800 bg-slate-900/60 py-0 ring-0 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-800/80">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-heading text-lg font-semibold text-white">
              Customer Accounts
            </CardTitle>
            <CardDescription className="text-slate-400">
              {searchQuery
                ? `${rows.length} result${rows.length === 1 ? "" : "s"} for "${searchQuery}"`
                : "Live account overview across all plans"}
            </CardDescription>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
            <span className="size-1.5 animate-pulse rounded-full bg-emerald-400" />
            Live
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800/80 text-xs font-medium tracking-wide text-slate-400 uppercase">
                <th className="px-6 py-3 font-medium">Name</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Plan</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-10 text-center text-slate-500"
                  >
                    No customers match your search.
                  </td>
                </tr>
              ) : (
                rows.map((customer) => (
                  <tr
                    key={customer.email}
                    className="border-b border-slate-800/50 transition-colors last:border-0 hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 text-slate-400">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          customer.plan === "Premium"
                            ? "border-violet-500/30 bg-violet-500/10 text-violet-300"
                            : "border-slate-700 bg-slate-800 text-slate-300"
                        )}
                      >
                        {customer.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                          customer.status === "Active"
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-rose-500/30 bg-rose-500/10 text-rose-400"
                        )}
                      >
                        <span
                          className={cn(
                            "size-1.5 rounded-full",
                            customer.status === "Active"
                              ? "bg-emerald-400"
                              : "bg-rose-400"
                          )}
                        />
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

export default function App() {
  const [timeline, setTimeline] = useState<Timeline>("last30")
  const [searchQuery, setSearchQuery] = useState("")

  const metrics = timelineMetrics[timeline]

  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) =>
        customer.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
      ),
    [searchQuery]
  )

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
            <label className="flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-1.5 text-sm text-slate-400 transition-colors focus-within:border-sky-500/40 focus-within:shadow-[0_0_16px_-4px_rgba(56,189,248,0.25)] sm:min-w-56 sm:flex-none">
              <Search className="size-4 shrink-0" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search customers…"
                className="min-w-0 flex-1 bg-transparent text-slate-200 outline-none placeholder:text-slate-500"
              />
              <kbd className="hidden rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-medium text-slate-500 sm:inline">
                ⌘K
              </kbd>
            </label>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 border-slate-800 bg-slate-900/80 text-slate-400 hover:border-slate-700 hover:bg-slate-800 hover:text-slate-200"
            >
              <Bell className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="shrink-0 border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:bg-slate-800 hover:text-white"
            >
              <Activity className="size-4" />
              <span className="hidden sm:inline">Live view</span>
            </Button>
          </div>
        </header>

        <main className="py-8">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-2xl font-semibold tracking-tight text-white">
                Dashboard
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Key metrics for the current billing period
              </p>
            </div>
            <TimelineToggle value={timeline} onChange={setTimeline} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>

          <div className="mt-8">
            <CustomerTable rows={filteredCustomers} searchQuery={searchQuery} />
          </div>
        </main>
      </div>
    </div>
  )
}
