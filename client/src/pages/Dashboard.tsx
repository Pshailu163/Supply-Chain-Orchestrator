import { AppLayout } from "@/components/layout/AppLayout";
import { AgentStatus } from "@/components/agents/AgentStatus";
import { AgentChat } from "@/components/agents/AgentChat";
import { SupplyChainMetrics } from "@/components/dashboard/SupplyChainMetrics";
import { SimulationPanel } from "@/components/dashboard/SimulationPanel";
import { Network, Cpu } from "lucide-react";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Network className="h-5 w-5 animate-pulse-slow" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase">Nexus.Core_v2.0</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
              Agentic Supply Chain
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-relaxed">
              Real-time monitoring and autonomous decision-making powered by a multi-agent LLM swarm. 
              Forecasting, inventory, and risk agents operating in consensus.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-2 rounded-full">
            <Cpu className="h-4 w-4 text-purple-400" />
            <div className="flex flex-col">
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Swarm Compute</span>
              <span className="text-xs font-mono text-green-400">Optimal (142 t/s)</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 flex flex-col gap-6">
            <SupplyChainMetrics />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AgentStatus />
              <SimulationPanel />
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <AgentChat />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}