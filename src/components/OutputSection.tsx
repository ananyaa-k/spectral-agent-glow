
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
      <div className="text-center py-20 animate-fade-in">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-slate-900/50 border border-slate-800/50 flex items-center justify-center">
          <Bot className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-light text-slate-300 mb-2">
          Ready to assist
        </h3>
        <p className="text-slate-500 text-base font-light max-w-md mx-auto leading-relaxed">
          Enter your prompt above and I'll provide detailed, helpful responses to your questions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-scale-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center">
            <Bot className="w-4 h-4 text-slate-300" />
          </div>
          <h3 className="text-lg font-medium text-slate-200">
            Response
          </h3>
        </div>
        
        {response && (
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 rounded-lg px-3 py-2"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        )}
      </div>

      <Card className="bg-slate-900/60 backdrop-blur-sm border-slate-800/50 shadow-2xl">
        <ScrollArea className="h-[450px] p-8">
          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-6 rounded-lg bg-slate-800 animate-pulse"></div>
                <Skeleton className="h-4 w-24 bg-slate-800" />
              </div>
              <Skeleton className="h-4 w-full bg-slate-800" />
              <Skeleton className="h-4 w-5/6 bg-slate-800" />
              <Skeleton className="h-4 w-4/5 bg-slate-800" />
              <Skeleton className="h-4 w-full bg-slate-800" />
              <Skeleton className="h-4 w-3/4 bg-slate-800" />
              <Skeleton className="h-4 w-5/6 bg-slate-800" />
            </div>
          ) : (
            <div className="prose prose-invert prose-slate max-w-none">
              <pre className="whitespace-pre-wrap font-light text-slate-200 text-base leading-relaxed tracking-wide">
                {response}
              </pre>
            </div>
          )}
        </ScrollArea>
      </Card>
    </div>
  );
};

export default OutputSection;
