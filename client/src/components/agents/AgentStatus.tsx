import { useState } from "react";
import { 
  Activity, 
  BrainCircuit, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  Zap,
  CheckCircle2,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const agents = [
  {
    id: "orchestrator",
    name: "Nexus Orchestrator",
    role: "Swarm Coordinator & Decision Logic",
    status: "active",
    icon: BrainCircuit,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-500/20",
    metrics: { cpu: "42%", tasks: "128/s", uptime: "99.9%" }
  },
  {
    id: "demand",
    name: "Forecaster-X",
    role: "Predictive Demand Modeling",
    status: "active",
    icon: TrendingUp,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-500/20",
    metrics: { conf: "94%", inputs: "2.1M", model: "v4.2" }
  },
  {
    id: "inventory",
    name: "StockMind",
    role: "Dynamic Buffer Optimization",
    status: "processing",
    icon: Package,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-500/20",
    metrics: { nodes: "42", optimized: "$1.2M", next_sync: "2m" }
  },
  {
    id: "risk",
    name: "Sentinel",
    role: "Global Anomaly Detection",
    status: "alert",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-500/20",
    metrics: { threats: "3", scan_rate: "5Hz", critical: "1" }
  }
];

export function AgentStatus() {
  return (
    <Card className="glass-panel border-0 bg-black/20 col-span-full xl:col-span-1 h-full relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-[40px] pointer-events-none" />
      
      <CardHeader className="pb-3 border-b border-white/5 relative z-10">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
            <Activity className="h-4 w-4 text-blue-400" />
            Swarm Health
          </CardTitle>
          <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20 text-[10px] uppercase tracking-wider px-2 py-0">
            System Nominal
          </Badge>
        </div>
        <CardDescription className="text-xs text-muted-foreground/80 pt-1">
          Real-time status of individual AI agent models.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-4 relative z-10">
        {agents.map((agent) => (
          <div 
            key={agent.id} 
            className={`p-4 rounded-xl border ${agent.border} ${agent.bg} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden group`}
          >
            {/* Hover glow effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-r from-transparent via-${agent.color.replace('text-', '')} to-transparent`} />
            
            <div className="flex items-start gap-3">
              <div className={`p-2.5 rounded-lg bg-black/40 border border-white/5 ${agent.color} shadow-inner`}>
                <agent.icon className="h-5 w-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-sm tracking-tight text-white truncate">{agent.name}</h4>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {agent.status === 'active' && <CheckCircle2 className="w-3 h-3 text-green-500" />}
                    {agent.status === 'processing' && <Zap className="w-3 h-3 text-blue-500 animate-pulse" />}
                    {agent.status === 'alert' && <AlertTriangle className="w-3 h-3 text-red-500 animate-pulse" />}
                    <span className={`text-[10px] uppercase font-mono tracking-wider
                      ${agent.status === 'active' ? 'text-green-400' : ''}
                      ${agent.status === 'processing' ? 'text-blue-400' : ''}
                      ${agent.status === 'alert' ? 'text-red-400' : ''}
                    `}>
                      {agent.status}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground mb-3 truncate">{agent.role}</p>
                
                {/* Agent specific metrics */}
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(agent.metrics).map(([key, value]) => (
                    <div key={key} className="bg-black/30 rounded border border-white/5 p-1.5 flex flex-col items-center justify-center">
                      <span className="text-[8px] text-muted-foreground/70 uppercase tracking-widest mb-0.5">{key}</span>
                      <span className={`text-[10px] font-mono font-medium ${agent.color}`}>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}