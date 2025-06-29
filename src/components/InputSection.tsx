
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Zap } from 'lucide-react';

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
    <div className="space-y-6 animate-scale-in">
      {/* Input Field */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl blur-xl group-focus-within:blur-2xl transition-all duration-300"></div>
        <div className="relative bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-1 shadow-2xl">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ask the AI Agent..."
            className="min-h-[120px] bg-transparent border-none text-slate-100 placeholder:text-slate-400 text-lg resize-none focus:ring-0 focus:outline-none px-6 py-4"
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Button
          onClick={onSubmit}
          disabled={isLoading || !prompt.trim()}
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-[0_0_30px_rgba(168,85,247,0.3)] hover:shadow-[0_0_40px_rgba(168,85,247,0.5)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
          <div className="relative flex items-center gap-3">
            {isLoading ? (
              <>
                <Zap className="w-5 h-5 animate-pulse" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Run Agent</span>
              </>
            )}
          </div>
        </Button>
      </div>

      {/* Keyboard Shortcut Hint */}
      <div className="text-center text-slate-500 text-sm">
        <p>Press <kbd className="px-2 py-1 bg-slate-700 rounded">Ctrl</kbd> + <kbd className="px-2 py-1 bg-slate-700 rounded">Enter</kbd> to run</p>
      </div>
    </div>
  );
};

export default InputSection;
