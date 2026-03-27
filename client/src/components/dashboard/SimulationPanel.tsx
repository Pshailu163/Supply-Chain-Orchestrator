import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SlidersHorizontal, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SimulationPanel() {
  const [demandFactor, setDemandFactor] = useState([50]);
  const [supplyDelay, setSupplyDelay] = useState([2]);
  const [autoRebalance, setAutoRebalance] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setIsSimulating(false);
    }, 1500);
  };

  return (
    <Card className="glass-panel border-0 bg-black/20">
      <CardHeader className="pb-4 border-b border-white/5">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-accent-foreground" />
          Agent Simulation Variables
        </CardTitle>
        <CardDescription className="text-xs">
          Tweak external factors to see how the agent swarm adapts in real-time.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Demand Volatility Factor</Label>
            <span className="text-xs font-mono text-primary">{demandFactor}%</span>
          </div>
          <Slider 
            value={demandFactor} 
            onValueChange={setDemandFactor} 
            max={100} 
            step={1} 
            className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Supplier Delay Risk (Weeks)</Label>
            <span className="text-xs font-mono text-red-400">{supplyDelay}w</span>
          </div>
          <Slider 
            value={supplyDelay} 
            onValueChange={setSupplyDelay} 
            max={8} 
            step={1} 
            className="[&_[role=slider]]:bg-red-500 [&_[role=slider]]:border-red-500 [&>.bg-primary]:bg-red-500/50"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            <Label className="text-xs font-medium text-foreground flex items-center gap-1.5">
              <Zap className="h-3 w-3 text-yellow-500" />
              Auto-Rebalance
            </Label>
            <p className="text-[10px] text-muted-foreground">Allow Orchestrator to execute trades</p>
          </div>
          <Switch 
            checked={autoRebalance} 
            onCheckedChange={setAutoRebalance} 
            className="data-[state=checked]:bg-purple-500"
          />
        </div>

        <Button 
          className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border border-white/10" 
          onClick={handleSimulate}
          disabled={isSimulating}
        >
          {isSimulating ? "Swarm Calculating..." : "Run Agent Simulation"}
        </Button>

      </CardContent>
    </Card>
  );
}