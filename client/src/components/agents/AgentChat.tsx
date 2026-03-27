import { useState } from "react";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent?: string;
  confidence?: number;
};

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "System initialized. Orchestrator active. I'm monitoring the global supply chain. How can I assist you today?",
    agent: "Orchestrator",
    confidence: 0.99
  }
];

export function AgentChat() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking and routing to different agents based on input
    setTimeout(() => {
      let response: Message;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("risk") || lowerInput.includes("delay")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Sentinel detects a 65% probability of a 3-day shipping delay at the Port of Long Beach due to incoming weather. I recommend rerouting shipment #442 through Seattle.",
          agent: "Sentinel",
          confidence: 0.88
        };
      } else if (lowerInput.includes("inventory") || lowerInput.includes("stock")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "StockMind analysis: We are currently carrying 15% excess inventory of component Alpha in the EU warehouse. Rebalancing to the APAC region could save $45k this quarter.",
          agent: "StockMind",
          confidence: 0.92
        };
      } else if (lowerInput.includes("demand") || lowerInput.includes("forecast")) {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Forecaster-X model predicts a 22% spike in Q3 demand for the new product line based on recent social sentiment and macro indicators.",
          agent: "Forecaster-X",
          confidence: 0.85
        };
      } else {
        response = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I've routed that query across the agent network. The consensus is that our current supply chain health score is 92/100, though we should monitor APAC logistics closely.",
          agent: "Orchestrator",
          confidence: 0.95
        };
      }

      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const getAgentColor = (agentName?: string) => {
    switch (agentName) {
      case "Sentinel": return "text-red-400 bg-red-400/10 border-red-500/30";
      case "StockMind": return "text-blue-400 bg-blue-400/10 border-blue-500/30";
      case "Forecaster-X": return "text-green-400 bg-green-400/10 border-green-500/30";
      default: return "text-purple-400 bg-purple-400/10 border-purple-500/30";
    }
  };

  return (
    <Card className="glass-panel border-0 bg-black/20 col-span-full lg:col-span-1 flex flex-col h-[500px]">
      <CardHeader className="pb-3 border-b border-white/5">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-400" />
          Agent Interface
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-3 text-sm ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <Avatar className="h-8 w-8 border border-white/10 shrink-0">
                    <AvatarFallback className="bg-black/40 text-xs">AI</AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  {msg.role === 'assistant' && msg.agent && (
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border ${getAgentColor(msg.agent)}`}>
                        {msg.agent}
                      </span>
                      {msg.confidence && (
                        <span className="text-[10px] text-muted-foreground">
                          conf: {Math.round(msg.confidence * 100)}%
                        </span>
                      )}
                    </div>
                  )}
                  
                  <div className={`p-3 rounded-xl leading-relaxed
                    ${msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 rounded-tl-none text-foreground'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <Avatar className="h-8 w-8 border border-primary/30 shrink-0">
                    <AvatarFallback className="bg-primary/20 text-xs">US</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 text-sm justify-start">
                <Avatar className="h-8 w-8 border border-white/10 shrink-0">
                  <AvatarFallback className="bg-black/40 text-xs"><Bot size={14}/></AvatarFallback>
                </Avatar>
                <div className="bg-white/5 border border-white/10 rounded-xl rounded-tl-none p-3 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-3 border-t border-white/5">
        <form onSubmit={handleSend} className="flex w-full gap-2 relative">
          <Input 
            placeholder="Ask the agent swarm..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-black/30 border-white/10 focus-visible:ring-purple-500/50 pr-10"
          />
          <Button 
            type="submit" 
            size="icon" 
            variant="ghost" 
            disabled={!input.trim() || isTyping}
            className="absolute right-1 top-1 h-7 w-7 hover:bg-white/10"
          >
            <Send className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}