
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Loader2 } from 'lucide-react';

interface InputSectionProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const InputSection = ({ prompt, setPrompt, onSubmit, isLoading }: InputSectionProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      onSubmit();
    }
  };

  return (
    <div className="space-y-8 animate-scale-in">
      {/* Input Field */}
      <div className="relative">
        <div className="relative bg-slate-900/80 backdrop-blur-sm border border-slate-800/50 rounded-2xl shadow-2xl hover:border-slate-700/50 transition-all duration-300">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask the AI Agent..."
            className="min-h-[140px] bg-transparent border-none text-slate-100 placeholder:text-slate-500 text-lg resize-none focus:ring-0 focus:outline-none px-8 py-6 font-light leading-relaxed"
            disabled={isLoading}
          />
          
          {/* Character count hint */}
          <div className="absolute bottom-4 right-6 text-xs text-slate-600">
            {prompt.length > 0 && `${prompt.length} characters`}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={isLoading || !prompt.trim()}
          className="group relative px-10 py-4 bg-slate-800 hover:bg-slate-700 text-slate-100 font-medium rounded-xl text-base transition-all duration-300 border border-slate-700/50 hover:border-slate-600/50 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
        >
          <div className="flex items-center gap-3">
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                <span>Run Agent</span>
              </>
            )}
          </div>
        </Button>
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="text-center text-slate-600 text-sm font-light">
        <div className="inline-flex items-center gap-2">
          <span>Press</span>
          <kbd className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded text-slate-400 text-xs font-mono">Ctrl</kbd>
          <span>+</span>
          <kbd className="px-2 py-1 bg-slate-800/50 border border-slate-700/50 rounded text-slate-400 text-xs font-mono">Enter</kbd>
          <span>to run</span>
        </div>
      </div>
    </div>
  );
};

export default InputSection;
