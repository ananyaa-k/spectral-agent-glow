
import { useState } from 'react';

interface AIAgentResponse {
  response: string | null;
  isLoading: boolean;
  sendPrompt: (prompt: string) => Promise<void>;
}

export const useAIAgent = (): AIAgentResponse => {
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendPrompt = async (prompt: string): Promise<void> => {
    setIsLoading(true);
    setResponse(null);
    
    try {
      console.log('Sending prompt to AI Agent:', prompt);
      
      const res = await fetch('http://127.0.0.1:8000/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.text();
      console.log('AI Agent response:', data);
      
      setResponse(data);
    } catch (error) {
      console.error('Error calling AI Agent:', error);
      
      // For demo purposes, show a mock response when the API is not available
      const mockResponse = `AI Agent Response to: "${prompt}"

I understand you're looking for assistance with your request. Here's how I would approach this:

1. **Analysis**: I've analyzed your prompt and identified the key components you're asking about.

2. **Solution Strategy**: Based on the context, here are some recommendations:
   - Consider the scope of your request
   - Evaluate available resources
   - Plan implementation steps

3. **Next Steps**: 
   - Review the proposed approach
   - Gather any additional requirements
   - Proceed with implementation

Please note: This is a demonstration response since the AI Agent API at http://127.0.0.1:8000/task is not currently available. In a production environment, this would connect to your actual AI Agent service.

Is there anything specific you'd like me to elaborate on?`;

      setResponse(mockResponse);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    response,
    isLoading,
    sendPrompt,
  };
};
