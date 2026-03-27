import { AppLayout } from "@/components/layout/AppLayout";
import { AgentStatus } from "@/components/agents/AgentStatus";
import { AgentChat } from "@/components/agents/AgentChat";
import { SupplyChainMetrics } from "@/components/dashboard/SupplyChainMetrics";
import { SimulationPanel } from "@/components/dashboard/SimulationPanel";
import { Network, Cpu, Server, Activity } from "lucide-react";

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6 relative">
          
          {/* Subtle bg glow for header */}
          <div className="absolute top-0 left-0 w-64 h-32 bg-primary/10 rounded-full blur-[80px] pointer-events-none -z-10" />

          <div>
            <div className="flex items-center gap-2 mb-2 text-primary">
              <Network className="h-5 w-5 animate-pulse-slow" />
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-white">Nexus.Core_v2.0</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white mb-2 text-glow">
              Agentic Supply Chain AI
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed border-l-2 border-primary/50 pl-4">
              Real-time monitoring and autonomous decision-making powered by a multi-agent LLM swarm. 
              Forecasting, inventory, and risk agents operating in consensus to optimize logistics.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex flex-col items-end gap-1">
               <div className="flex items-center gap-2">
                 <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Nodes Active</span>
                 <span className="text-xs font-mono text-white">4,204</span>
               </div>
               <div className="flex items-center gap-2">
                 <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Latencies</span>
                 <span className="text-xs font-mono text-white">12ms</span>
               </div>
             </div>

            <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-2 rounded-xl shadow-inner backdrop-blur-sm">
              <div className="relative">
                <Cpu className="h-5 w-5 text-purple-400" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Swarm Compute</span>
                <span className="text-xs font-mono text-green-400">Optimal (142 t/s)</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Metrics and Simulation */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <SupplyChainMetrics />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              <AgentStatus />
              <SimulationPanel />
            </div>
          </div>
          
          {/* Right Column: Agent Chat Terminal */}
          <div className="lg:col-span-4 flex flex-col h-full min-h-[600px]">
             <AgentChat />
          </div>

        </div>
      </div>
    </AppLayout>
  );
}