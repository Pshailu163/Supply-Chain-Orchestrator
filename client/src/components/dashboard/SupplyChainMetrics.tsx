import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Package, Truck, AlertCircle, TrendingUp, BarChart3, PieChart } from "lucide-react";

// Mock data for the 7-day forecast
const forecastData = [
  { name: 'Mon', demand: 4000, inventory: 5400, risk: 20 },
  { name: 'Tue', demand: 3000, inventory: 4398, risk: 40 },
  { name: 'Wed', demand: 2000, inventory: 3800, risk: 15 },
  { name: 'Thu', demand: 2780, inventory: 3908, risk: 65 },
  { name: 'Fri', demand: 1890, inventory: 4800, risk: 35 },
  { name: 'Sat', demand: 2390, inventory: 3800, risk: 10 },
  { name: 'Sun', demand: 3490, inventory: 4300, risk: 5 },
];

// Mock data for regional node status
const nodeData = [
  { name: 'NA-East', capacity: 85, fill: '#4ade80' },
  { name: 'NA-West', capacity: 62, fill: '#4ade80' },
  { name: 'EU-Central', capacity: 94, fill: '#facc15' },
  { name: 'APAC-South', capacity: 45, fill: '#f87171' },
  { name: 'LATAM-1', capacity: 78, fill: '#4ade80' },
];

export function SupplyChainMetrics() {
  return (
    <div className="flex flex-col gap-6">
      {/* Top KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-panel border-0 bg-black/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-green-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <TrendingUp size={80} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Predicted Demand Lift
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display tracking-tighter text-white">
              +14.2%
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded border border-green-500/20 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" /> High Conf.
              </span>
              <span className="text-[10px] text-muted-foreground">Forecaster-X</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0 bg-black/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-blue-500 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500">
            <Package size={80} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Buffer Optimization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display tracking-tighter text-white">
              $1.2M
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-blue-400 bg-blue-400/10 px-1.5 py-0.5 rounded border border-blue-500/20 flex items-center gap-1">
                <ArrowDownRight className="h-3 w-3" /> Holding Costs
              </span>
              <span className="text-[10px] text-muted-foreground">StockMind</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0 bg-black/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-red-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <AlertCircle size={80} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Active Anomalies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display tracking-tighter text-red-400">
              3 High
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded border border-red-500/20">
                Action Req.
              </span>
              <span className="text-[10px] text-muted-foreground">Sentinel</span>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-0 bg-black/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-purple-500 group-hover:scale-110 transition-all duration-500">
            <Truck size={80} />
          </div>
          <CardHeader className="pb-2">
            <CardTitle className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              Logistics Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-display tracking-tighter text-purple-400">
              92/100
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-purple-400 bg-purple-400/10 px-1.5 py-0.5 rounded border border-purple-500/20">
                Stable
              </span>
              <span className="text-[10px] text-muted-foreground">Orchestrator</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Forecast Chart */}
        <Card className="glass-panel border-0 bg-black/20 lg:col-span-2 h-[350px] relative">
          {/* Subtle background glow based on chart colors */}
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-green-500/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-[60px] pointer-events-none" />
          
          <CardHeader className="pb-2 relative z-10">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-primary" />
                  7-Day Multi-Agent Consensus Forecast
                </CardTitle>
                <CardDescription className="text-xs text-muted-foreground/80 mt-1">
                  Demand vs Inventory vs Risk (Normalized)
                </CardDescription>
              </div>
              <div className="flex gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div> Demand</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-400"></div> Inventory</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div> Risk</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[270px] relative z-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4ade80" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#4ade80" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInventory" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#ffffff40" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)',
                    fontSize: '12px'
                  }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="inventory" stroke="#60a5fa" fillOpacity={1} fill="url(#colorInventory)" strokeWidth={2} activeDot={{ r: 4, fill: "#60a5fa", strokeWidth: 0 }} />
                <Area type="monotone" dataKey="demand" stroke="#4ade80" fillOpacity={1} fill="url(#colorDemand)" strokeWidth={2} activeDot={{ r: 4, fill: "#4ade80", strokeWidth: 0 }} />
                {/* Risk is rendered last so it sits on top, usually lower value but spikes high */}
                <Area type="monotone" dataKey="risk" stroke="#f87171" fillOpacity={1} fill="url(#colorRisk)" strokeWidth={1.5} strokeDasharray="4 4" activeDot={{ r: 4, fill: "#f87171", strokeWidth: 0 }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Node Capacity Chart */}
        <Card className="glass-panel border-0 bg-black/20 h-[350px]">
           <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400" />
              Node Capacity
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground/80 mt-1">
              Current facility utilization %
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[270px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={nodeData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" horizontal={true} vertical={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#ffffff60" fontSize={10} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}}
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)', 
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="capacity" radius={[0, 4, 4, 0]} barSize={20}>
                  {nodeData.map((entry, index) => (
                    <cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}