
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface OutputSectionProps {
  response: string | null;
  isLoading: boolean;
}

const OutputSection = ({ response, isLoading }: OutputSectionProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (response) {
      await navigator.clipboard.writeText(response);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!response && !isLoading) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
          <Bot className="w-12 h-12 text-purple-400" />
        </div>
        <p className="text-slate-400 text-lg">
          AI Agent is ready to assist you
        </p>
        <p className="text-slate-500 text-sm mt-2">
          Enter your prompt above to get started
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-scale-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-slate-200">
            AI Agent Response
          </h3>
        </div>
        
        {response && (
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="text-slate-400 hover:text-slate-200"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl blur-xl"></div>
        <Card className="relative bg-slate-800/50 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <ScrollArea className="h-[400px] p-6">
            {isLoading ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 animate-pulse"></div>
                  <Skeleton className="h-4 w-32 bg-slate-700" />
                </div>
                <Skeleton className="h-4 w-full bg-slate-700" />
                <Skeleton className="h-4 w-4/5 bg-slate-700" />
                <Skeleton className="h-4 w-3/4 bg-slate-700" />
                <Skeleton className="h-4 w-full bg-slate-700" />
                <Skeleton className="h-4 w-2/3 bg-slate-700" />
              </div>
            ) : (
              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap font-sans text-slate-200 text-base leading-relaxed">
                  {response}
                </pre>
              </div>
            )}
          </ScrollArea>
        </Card>
      </div>
    </div>
  );
};

export default OutputSection;
