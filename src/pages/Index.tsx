
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import InputSection from '@/components/InputSection';
import OutputSection from '@/components/OutputSection';
import { useAIAgent } from '@/hooks/useAIAgent';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();
  const { response, isLoading, sendPrompt } = useAIAgent();

  const handleSubmit = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Input Required",
        description: "Please enter a prompt for the AI Agent.",
        variant: "destructive",
      });
      return;
    }

    try {
      await sendPrompt(prompt);
      toast({
        title: "Agent Activated",
        description: "AI Agent is processing your request...",
      });
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "Unable to connect to AI Agent. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
            <div className="w-1 h-1 rounded-full bg-slate-400"></div>
            <div className="w-1 h-1 rounded-full bg-slate-500"></div>
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-slate-100 mb-4">
            AI Agent
          </h1>
          <p className="text-slate-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
            Intelligent assistance powered by advanced artificial intelligence. 
            Ask questions, solve problems, and explore possibilities.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl mx-auto w-full space-y-8">
          <InputSection 
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          <OutputSection 
            response={response}
            isLoading={isLoading}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-slate-500 text-sm font-light">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
            <span>Secure & Private</span>
            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
