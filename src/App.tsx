import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, User, Bot, Sparkles, MessageSquare, RefreshCcw, ChevronRight, Terminal } from "lucide-react";
import { cn } from "./lib/utils";
import { PERSONAS, type Persona } from "./lib/prompts";
import { callLLM } from "./lib/llm";

interface Message {
  id: string;
  role: "user" | "model";
  content: string;
  timestamp: Date;
}

export default function App() {
  const [activePersona, setActivePersona] = useState<Persona>(PERSONAS[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const result = await callLLM({
        systemPrompt: activePersona.systemPrompt,
        userMessage: text,
        history: messages.map((m) => ({ role: m.role, content: m.content })),
        personaId: activePersona.id,
      });
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: result,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Failed to fetch response:", error);
      // Fallback responses
      const fallbacks: Record<string, string> = {
        anshuman: "Focus on fundamentals. What exactly are you struggling with?",
        abhimanyu: "Think long-term. What skill are you building right now?",
        kshitij: "Let’s break it down step by step. Which part is unclear?",
      };
      
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        content: fallbacks[activePersona.id] || "The knowledge engine is temporarily offline. Please try again soon.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaSwitch = (persona: Persona) => {
    if (persona.id === activePersona.id) return;
    setActivePersona(persona);
    setMessages([]); // Reset conversation on switch as requested
  };

  const getPersonaColor = (id: string) => {
    switch (id) {
      case "anshuman": return "text-zinc-600 border-zinc-600 bg-zinc-600";
      case "abhimanyu": return "text-indigo-600 border-indigo-600 bg-indigo-600";
      case "kshitij": return "text-emerald-600 border-emerald-600 bg-emerald-600";
      default: return "text-zinc-600 border-zinc-600 bg-zinc-600";
    }
  };

  return (
    <div className="flex h-screen bg-editorial-bg font-sans overflow-hidden border border-editorial-border lg:m-4 lg:rounded-sm">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-[320px] flex-col border-r border-editorial-text/10 bg-editorial-sidebar">
        <div className="p-8 border-b border-editorial-text/10">
          <h1 className="text-[10px] font-bold tracking-[0.2em] uppercase text-editorial-text/40 mb-2">
            Intelligent Agent
          </h1>
          <p className="text-2xl font-serif italic font-medium">Persona.AI</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-4 py-8">
          <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-editorial-text/40 px-2 mb-4">Select Authority</div>
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              onClick={() => handlePersonaSwitch(p)}
              className={cn(
                "w-full flex flex-col items-start gap-2 p-4 border transition-all duration-300 text-left",
                activePersona.id === p.id 
                  ? "bg-editorial-text text-white border-editorial-text shadow-xl" 
                  : "bg-transparent border-editorial-text/10 hover:border-editorial-text text-editorial-text"
              )}
            >
              <div className="flex justify-between items-center w-full">
                <span className={cn(
                  "text-[9px] tracking-widest uppercase font-bold",
                  activePersona.id === p.id ? "opacity-60" : "opacity-40"
                )}>
                  {p.id === "anshuman" ? "Systems Thinking" : p.id === "abhimanyu" ? "Career Strategy" : "Concept Mastery"}
                </span>
                {activePersona.id === p.id && (
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                )}
              </div>
              <h2 className="text-xl font-serif leading-tight">{p.name}</h2>
              <p className={cn(
                "text-[11px] leading-relaxed line-clamp-2",
                activePersona.id === p.id ? "opacity-70" : "opacity-40"
              )}>
                {p.description}
              </p>
            </button>
          ))}
        </nav>
        
        <div className="p-8 border-t border-editorial-text/10">
          <div className="text-[10px] uppercase tracking-widest opacity-40 mb-4 font-bold">System Status</div>
          <div className="space-y-2">
             <div className="flex items-center gap-2">
               <div className="w-1 h-1 rounded-full bg-green-500" />
               <span className="text-[11px] font-mono text-editorial-text/60">Models: Active</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-1 h-1 rounded-full bg-green-500" />
               <span className="text-[11px] font-mono text-editorial-text/60">Latency: 42ms</span>
             </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-editorial-main relative">
        {/* Header - Mobile & Desktop Info */}
        <header className="h-20 border-b border-editorial-text/10 px-8 flex items-center justify-between bg-editorial-main/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-editorial-text flex items-center justify-center font-mono text-xs font-bold bg-white">
              {activePersona.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
               <h3 className="text-sm font-bold tracking-tight text-editorial-text">Chatting with {activePersona.name}</h3>
               <p className="text-[10px] uppercase tracking-[0.15em] text-editorial-text/40 font-bold">{activePersona.title}</p>
            </div>
          </div>
          
          <button 
            onClick={() => setMessages([])}
            className="text-[11px] uppercase tracking-widest font-bold border-b-2 border-editorial-text pb-0.5 text-editorial-text hover:opacity-70 transition-opacity"
          >
            Reset Thread
          </button>
        </header>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-8 lg:p-12 space-y-10 custom-scrollbar"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="mx-auto w-12 h-1 bg-editorial-text/20 mb-8" />
                <h2 className="text-4xl lg:text-5xl font-serif italic text-editorial-text">
                  Persona Knowledge Engine
                </h2>
                <p className="text-editorial-text/60 text-lg font-serif italic max-w-md mx-auto leading-relaxed">
                  {activePersona.description}
                </p>
              </motion.div>

              <div className="w-full space-y-6">
                <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-editorial-text/30">Inquiry Protocols</div>
                <div className="flex flex-wrap justify-center gap-3">
                  {activePersona.starterQuestions.map((q, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ y: -2 }}
                      onClick={() => handleSendMessage(q)}
                      className="text-[10px] uppercase tracking-widest font-bold border border-editorial-text/20 px-6 py-2.5 hover:bg-editorial-text hover:text-white transition-all bg-white"
                    >
                      {q}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto w-full space-y-10">
              <AnimatePresence mode="popLayout">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "flex flex-col gap-2",
                      m.role === "user" ? "items-end" : "items-start"
                    )}
                  >
                    <p className="text-[10px] uppercase tracking-[0.2em] text-editorial-text/40 font-bold">
                      {m.role === "user" ? "Inquiry" : activePersona.name}
                    </p>
                    <div className={cn(
                      "p-6 text-[15px] leading-relaxed font-serif",
                      m.role === "user" 
                        ? "bg-editorial-text text-white shadow-lg" 
                        : "bg-white border border-editorial-border shadow-sm italic text-editorial-text"
                    )}>
                      {m.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-2"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-editorial-text/40 font-bold">
                    {activePersona.name}
                  </p>
                  <div className="bg-editorial-accent p-6 text-[14px] leading-relaxed font-serif italic text-editorial-text/60">
                    Sourcing expertise... <span className="inline-flex gap-1 ml-2"><span className="w-1 h-1 bg-editorial-text rounded-full animate-pulse" /> <span className="w-1 h-1 bg-editorial-text rounded-full animate-pulse delay-75" /> <span className="w-1 h-1 bg-editorial-text rounded-full animate-pulse delay-150" /></span>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>

        {/* Input Area */}
        <footer className="p-8 lg:p-12 border-t border-editorial-text/10 bg-white/40">
           <div className="max-w-2xl mx-auto">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex flex-col gap-4"
              >
                <div className="flex gap-2">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Submit your inquiry..."
                    className="flex-1 bg-white border border-editorial-text px-6 py-4 text-sm focus:outline-none placeholder:text-editorial-text/30 font-serif italic"
                    disabled={isLoading}
                  />
                  <button 
                    type="submit"
                    disabled={!input.trim() || isLoading}
                    className="bg-editorial-text text-white px-8 lg:px-12 py-4 text-[11px] uppercase tracking-[0.2em] font-bold disabled:opacity-30 transition-all hover:bg-neutral-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
           </div>
        </footer>
      </main>
    </div>
  );
}
