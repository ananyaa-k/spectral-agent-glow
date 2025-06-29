
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-900/10 to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-4">
            AI Agent
          </h1>
          <p className="text-slate-400 text-lg md:text-xl font-light">
            Your intelligent assistant powered by advanced AI
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Input Section */}
        <div className="flex-1 max-w-4xl mx-auto w-full space-y-8">
          <InputSection 
            prompt={prompt}
            setPrompt={setPrompt}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          {/* Output Section */}
          <OutputSection 
            response={response}
            isLoading={isLoading}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500 text-sm">
          <p>Powered by advanced AI technology</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
