import { useState } from "react";
import { 
  Activity, 
  BrainCircuit, 
  Package, 
  TrendingUp, 
  AlertTriangle 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const agents = [
  {
    id: "orchestrator",
    name: "Nexus Orchestrator",
    role: "System Coordinator",
    status: "active",
    icon: BrainCircuit,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    border: "border-purple-500/20"
  },
  {
    id: "demand",
    name: "Forecaster-X",
    role: "Demand Prediction",
    status: "active",
    icon: TrendingUp,
    color: "text-green-400",
    bg: "bg-green-400/10",
    border: "border-green-500/20"
  },
  {
    id: "inventory",
    name: "StockMind",
    role: "Inventory Optimization",
    status: "processing",
    icon: Package,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-500/20"
  },
  {
    id: "risk",
    name: "Sentinel",
    role: "Risk Detection",
    status: "alert",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    border: "border-red-500/20"
  }
];

export function AgentStatus() {
  return (
    <Card className="glass-panel border-0 bg-black/20 col-span-full xl:col-span-1 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Activity className="h-4 w-4" />
          Active Agents
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {agents.map((agent) => (
          <div 
            key={agent.id} 
            className={`p-3 rounded-lg border ${agent.border} ${agent.bg} flex items-start gap-3 transition-all duration-300 hover:scale-[1.02]`}
          >
            <div className={`p-2 rounded-md bg-background/50 ${agent.color}`}>
              <agent.icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm tracking-tight">{agent.name}</h4>
                <Badge variant="outline" className={`
                  text-[10px] uppercase px-1.5 py-0 h-4
                  ${agent.status === 'active' ? 'border-green-500 text-green-400' : ''}
                  ${agent.status === 'processing' ? 'border-blue-500 text-blue-400 animate-pulse' : ''}
                  ${agent.status === 'alert' ? 'border-red-500 text-red-400 animate-pulse' : ''}
                `}>
                  {agent.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{agent.role}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}