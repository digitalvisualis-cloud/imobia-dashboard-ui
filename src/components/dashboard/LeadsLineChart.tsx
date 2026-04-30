import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { leadsUltimos30Dias } from "@/data/kpis";

export function LeadsLineChart() {
  return (
    <div className="card-soft p-5">
      <div className="flex items-end justify-between gap-3 pb-4">
        <div>
          <div className="label-eyebrow mb-1">Leads · últimos 30 dias</div>
          <h3 className="font-display text-xl font-semibold text-foreground">
            Tu recebeu {leadsUltimos30Dias.reduce((a, p) => a + p.leads, 0)} leads
          </h3>
        </div>
        <span className="rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-foreground">
          +18%
        </span>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={leadsUltimos30Dias} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="leadsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(244 100% 70%)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="hsl(244 100% 70%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="data"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              interval={4}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              width={32}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground))", fontSize: 11 }}
            />
            <Area
              type="monotone"
              dataKey="leads"
              stroke="hsl(244 100% 70%)"
              strokeWidth={2.5}
              fill="url(#leadsFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
