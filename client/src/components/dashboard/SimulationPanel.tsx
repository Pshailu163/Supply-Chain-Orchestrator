import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SlidersHorizontal, Zap, ThermometerSun, AlertOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SimulationPanel() {
  const [demandFactor, setDemandFactor] = useState([65]);
  const [supplyDelay, setSupplyDelay] = useState([2]);
  const [weatherRisk, setWeatherRisk] = useState([40]);
  const [autoRebalance, setAutoRebalance] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 2000);
  };

  return (
    <Card className="glass-panel border-0 bg-black/20 relative overflow-hidden h-full">
      {/* Background ambient glow */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-[50px] pointer-events-none" />
      
      <CardHeader className="pb-4 border-b border-white/5 relative z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
            <SlidersHorizontal className="h-4 w-4 text-purple-400" />
            Environment Simulation
          </CardTitle>
          <div className="px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider bg-white/5 border border-white/10 text-muted-foreground">
            Variables
          </div>
        </div>
        <CardDescription className="text-xs text-muted-foreground/80 pt-1">
          Adjust external factors to stress-test the multi-agent swarm in real-time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6 relative z-10">
        
        {/* Variable 1 */}
        <div className="space-y-3 p-3 rounded-lg bg-black/20 border border-white/5">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-green-400" />
              Demand Volatility Factor
            </Label>
            <span className="text-xs font-mono text-green-400 bg-green-400/10 px-1.5 rounded">{demandFactor}%</span>
          </div>
          <Slider 
            value={demandFactor} 
            onValueChange={setDemandFactor} 
            max={100} 
            step={1} 
            className="[&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-500 [&>.bg-primary]:bg-green-500"
          />
        </div>

        {/* Variable 2 */}
        <div className="space-y-3 p-3 rounded-lg bg-black/20 border border-white/5">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <AlertOctagon className="h-3 w-3 text-red-400" />
              Supplier Delay Risk
            </Label>
            <span className="text-xs font-mono text-red-400 bg-red-400/10 px-1.5 rounded">{supplyDelay} weeks</span>
          </div>
          <Slider 
            value={supplyDelay} 
            onValueChange={setSupplyDelay} 
            max={8} 
            step={1} 
            className="[&_[role=slider]]:bg-red-500 [&_[role=slider]]:border-red-500 [&>.bg-primary]:bg-red-500/50"
          />
        </div>

        {/* Variable 3 */}
        <div className="space-y-3 p-3 rounded-lg bg-black/20 border border-white/5">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground flex items-center gap-1.5">
              <ThermometerSun className="h-3 w-3 text-orange-400" />
              Global Weather Anomaly Risk
            </Label>
            <span className="text-xs font-mono text-orange-400 bg-orange-400/10 px-1.5 rounded">{weatherRisk}%</span>
          </div>
          <Slider 
            value={weatherRisk} 
            onValueChange={setWeatherRisk} 
            max={100} 
            step={1} 
            className="[&_[role=slider]]:bg-orange-500 [&_[role=slider]]:border-orange-500 [&>.bg-primary]:bg-orange-500/50"
          />
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between pt-2 px-1">
          <div className="space-y-1">
            <Label className="text-[13px] font-medium text-white flex items-center gap-2">
              Autonomous Swarm Execution
            </Label>
            <p className="text-[10px] text-muted-foreground max-w-[200px] leading-tight">
              Allow Orchestrator to automatically execute rerouting and rebalancing trades based on parameters.
            </p>
          </div>
          <Switch 
            checked={autoRebalance} 
            onCheckedChange={setAutoRebalance} 
            className="data-[state=checked]:bg-purple-500 shrink-0"
          />
        </div>

        <Button 
          className={`w-full mt-4 h-10 font-medium tracking-wide transition-all
            ${isSimulating 
              ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 cursor-not-allowed' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] shadow-[0_0_15px_rgba(var(--primary),0.3)]'
            }
          `}
          onClick={handleSimulate}
          disabled={isSimulating}
        >
          {isSimulating ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
              Injecting Variables into Swarm...
            </span>
          ) : "Run Agent Simulation"}
        </Button>

      </CardContent>
    </Card>
  );
}