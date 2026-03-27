import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Package, Truck, AlertCircle } from "lucide-react";

const data = [
  { name: 'Mon', demand: 4000, inventory: 2400, risk: 20 },
  { name: 'Tue', demand: 3000, inventory: 1398, risk: 40 },
  { name: 'Wed', demand: 2000, inventory: 9800, risk: 15 },
  { name: 'Thu', demand: 2780, inventory: 3908, risk: 65 },
  { name: 'Fri', demand: 1890, inventory: 4800, risk: 35 },
  { name: 'Sat', demand: 2390, inventory: 3800, risk: 10 },
  { name: 'Sun', demand: 3490, inventory: 4300, risk: 5 },
];

export function SupplyChainMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
      <Card className="glass-panel border-0 bg-black/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-green-500 group-hover:scale-110 transition-transform duration-500">
          <ArrowUpRight size={100} />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Predicted Demand (7d)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-display tracking-tighter">
            +14.2%
          </div>
          <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
            <ArrowUpRight className="h-3 w-3" />
            Forecaster-X High Confidence
          </p>
        </CardContent>
      </Card>

      <Card className="glass-panel border-0 bg-black/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-500 group-hover:scale-110 transition-transform duration-500">
          <Package size={100} />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Inventory Health
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-display tracking-tighter">
            92/100
          </div>
          <p className="text-xs text-blue-400 mt-1 flex items-center gap-1">
            <ArrowDownRight className="h-3 w-3" />
            StockMind optimized -12% holding costs
          </p>
        </CardContent>
      </Card>

      <Card className="glass-panel border-0 bg-black/20 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 text-red-500 group-hover:scale-110 transition-transform duration-500">
          <AlertCircle size={100} />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Active Risks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-display tracking-tighter text-red-400">
            3 High
          </div>
          <p className="text-xs text-red-400/80 mt-1 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Sentinel tracking port delays
          </p>
        </CardContent>
      </Card>
      
      <Card className="glass-panel border-0 bg-black/20 col-span-full h-[300px]">
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">7-Day Multi-Agent Forecast</CardTitle>
        </CardHeader>
        <CardContent className="h-[230px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInventory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="name" stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#ffffff40" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="demand" stroke="#4ade80" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={2} />
              <Area type="monotone" dataKey="inventory" stroke="#60a5fa" fillOpacity={1} fill="url(#colorInventory)" strokeWidth={2} />
              <Area type="monotone" dataKey="risk" stroke="#f87171" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={1} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}