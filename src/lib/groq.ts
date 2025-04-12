import Groq from 'groq-sdk';

// Helper function to safely access environment variables
const getEnvVariable = (key: string): string | undefined => {
  if (typeof process !== 'undefined' && process.env) {
    return process.env[key];
  }
  // For browser environments or where process is not defined
  return undefined;
};

const client = new Groq({
  apiKey: getEnvVariable('GROQ_API_KEY') || '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',
  dangerouslyAllowBrowser: true, // Add this to allow browser usage
});

export const AVAILABLE_MODELS = [
  { id: 'llama3-8b-8192', name: 'Llama 3 8B' },
  { id: 'llama3-70b-8192', name: 'Llama 3 70B' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
  { id: 'gemma-7b-it', name: 'Gemma 7B' },
];

export interface ChatCompletionOptions {
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
}

export const generateResponse = async (
  messages: { role: string; content: string }[],
  options: ChatCompletionOptions = { model: 'llama3-8b-8192' }
) => {
  try {
    // Set default values if not provided
    const temperature = options.temperature ?? 0.7;
    const maxTokens = options.maxTokens ?? 2048;
    const topP = options.topP ?? 1;
    
    const completion = await client.chat.completions.create({
      messages,
      model: options.model,
      temperature,
      max_tokens: maxTokens,
      top_p: topP,
      stream: false,
    });
    
    return completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating response:", error);
    throw new Error("Failed to generate response");
  }
};
