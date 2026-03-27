import { useState, useEffect, useRef } from "react";
import { Send, Bot, User, Sparkles, Terminal, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type Message = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  agent?: string;
  confidence?: number;
  timestamp: string;
  metrics?: { label: string; value: string }[];
};

const getCurrentTime = () => new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit' });

const initialMessages: Message[] = [
  {
    id: "sys-1",
    role: "system",
    content: "NEXUS Core initialized. Multi-agent swarm online. Monitoring 4,200 nodes.",
    timestamp: getCurrentTime()
  },
  {
    id: "1",
    role: "assistant",
    content: "Orchestrator active. I have synthesized data from Forecaster-X, StockMind, and Sentinel. Global supply chain efficiency is at 92%. How can I assist with your logistics routing today?",
    agent: "Orchestrator",
    confidence: 0.99,
    timestamp: getCurrentTime()
  }
];

export function AgentChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: getCurrentTime()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Enhanced realistic simulation responses
    setTimeout(() => {
      let response: Message;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("risk") || lowerInput.includes("delay") || lowerInput.includes("weather")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sentinel detects a high-probability anomaly: A Category 3 typhoon is forming near the South China Sea. This will impact Port of Shenzhen operations within 72 hours. I recommend preemptively rerouting shipments to Ningbo.",
          agent: "Sentinel",
          confidence: 0.89,
          timestamp: getCurrentTime(),
          metrics: [
            { label: "Delay Prob.", value: "89%" },
            { label: "Est. Impact", value: "3-5 days" }
          ]
        };
      } else if (lowerInput.includes("inventory") || lowerInput.includes("stock") || lowerInput.includes("shortage")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "StockMind analysis indicates a potential stockout of Component Alpha in the EU facility within 14 days due to the recent demand spike. Relocating 5,000 units from the US East warehouse will stabilize the buffer with minimal freight cost.",
          agent: "StockMind",
          confidence: 0.94,
          timestamp: getCurrentTime(),
          metrics: [
            { label: "Buffer Level", value: "Critical (12%)" },
            { label: "Freight Cost", value: "$4,200" }
          ]
        };
      } else if (lowerInput.includes("demand") || lowerInput.includes("forecast") || lowerInput.includes("trend")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Forecaster-X model has ingested new POS data and social sentiment. We are projecting a 22% spike in Q3 demand for the Omega Product Line. Current production schedules will fall short by ~15,000 units.",
          agent: "Forecaster-X",
          confidence: 0.87,
          timestamp: getCurrentTime(),
          metrics: [
            { label: "Demand Lift", value: "+22%" },
            { label: "Unit Shortfall", value: "15k" }
          ]
        };
      } else {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I've routed that query across the agent network. The consensus is that our current supply chain health score is stable, but we must address the APAC logistics vulnerability to maintain our SLA targets.",
          agent: "Orchestrator",
          confidence: 0.95,
          timestamp: getCurrentTime()
        };
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const getAgentStyles = (agentName?: string) => {
    switch (agentName) {
      case "Sentinel": return { color: "text-red-400", border: "border-red-500/30", bg: "bg-red-400/10", icon: "🔴" };
      case "StockMind": return { color: "text-blue-400", border: "border-blue-500/30", bg: "bg-blue-400/10", icon: "🔵" };
      case "Forecaster-X": return { color: "text-green-400", border: "border-green-500/30", bg: "bg-green-400/10", icon: "🟢" };
      default: return { color: "text-purple-400", border: "border-purple-500/30", bg: "bg-purple-400/10", icon: "🟣" };
    }
  };

  return (
    <Card className="glass-panel border-0 bg-black/40 col-span-full lg:col-span-1 flex flex-col h-[600px] shadow-2xl relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-50 pointer-events-none" />

      <CardHeader className="pb-3 border-b border-white/10 bg-black/20 z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-white">
            <Terminal className="h-4 w-4 text-purple-400" />
            Agent Swarm Terminal
          </CardTitle>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] text-muted-foreground uppercase font-mono tracking-wider">Live</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 p-0 overflow-hidden relative z-10">
        <ScrollArea className="h-full p-4" ref={scrollRef}>
          <div className="space-y-5">
            {messages.map((msg) => (
              <div key={msg.id}>
                {msg.role === 'system' ? (
                  <div className="flex items-center justify-center my-4">
                    <div className="bg-black/40 border border-white/5 px-3 py-1 rounded text-[10px] font-mono text-muted-foreground tracking-wider flex items-center gap-2">
                      <Activity className="w-3 h-3 text-primary" />
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  <div className={`flex gap-3 text-sm ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <Avatar className="h-8 w-8 border border-white/10 shrink-0 bg-black/40 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                      </Avatar>
                    )}
                    
                    <div className={`flex flex-col gap-1.5 max-w-[85%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                      {msg.role === 'assistant' && msg.agent && (
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] text-muted-foreground font-mono">{msg.timestamp}</span>
                          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded border ${getAgentStyles(msg.agent).color} ${getAgentStyles(msg.agent).border} ${getAgentStyles(msg.agent).bg} flex items-center gap-1`}>
                            {getAgentStyles(msg.agent).icon} {msg.agent}
                          </span>
                          {msg.confidence && (
                            <span className="text-[10px] text-green-400 font-mono bg-green-400/10 px-1.5 rounded">
                              conf:{Math.round(msg.confidence * 100)}%
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className={`p-3 rounded-lg leading-relaxed text-[13px] shadow-sm
                        ${msg.role === 'user' 
                          ? 'bg-primary/90 text-primary-foreground rounded-tr-sm border border-primary' 
                          : 'bg-white/5 border border-white/10 rounded-tl-sm text-foreground backdrop-blur-md font-light'
                        }`}
                      >
                        {msg.content}
                        
                        {/* Metrics payload from agent */}
                        {msg.metrics && (
                          <div className="mt-3 grid grid-cols-2 gap-2">
                            {msg.metrics.map((m, i) => (
                              <div key={i} className="bg-black/30 border border-white/5 p-2 rounded flex flex-col">
                                <span className="text-[9px] text-muted-foreground uppercase tracking-wider">{m.label}</span>
                                <span className="text-xs font-mono font-medium text-white">{m.value}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {msg.role === 'user' && (
                      <Avatar className="h-8 w-8 border border-primary/30 shrink-0 bg-primary/20 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </Avatar>
                    )}
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 text-sm justify-start">
                <Avatar className="h-8 w-8 border border-white/10 shrink-0 bg-black/40 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-muted-foreground" />
                </Avatar>
                <div className="bg-white/5 border border-white/10 rounded-lg rounded-tl-sm p-3 flex items-center gap-1.5 h-10 w-16 justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="p-3 border-t border-white/10 bg-black/20 z-10">
        <form onSubmit={handleSend} className="flex w-full gap-2 relative">
          <Input 
            placeholder="Query the swarm (e.g., 'What are the risks?')" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-black/40 border-white/10 focus-visible:ring-purple-500/50 pr-10 text-sm h-10 font-mono shadow-inner"
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            disabled={!input.trim() || isTyping}
            className="absolute right-1 top-1 h-8 w-8 hover:bg-white/10 text-primary hover:text-primary-foreground"
          >
            <Send className="h-4 w-4 transition-colors" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}