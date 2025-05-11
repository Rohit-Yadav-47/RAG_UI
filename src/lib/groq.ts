import Groq from 'groq-sdk';
import { Document } from '../types';

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
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile' },
  { id: 'llama3-70b-8192', name: 'Llama 3 70B' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' },
  { id: 'gemma-7b-it', name: 'Gemma 7B' },
];

export interface ChatCompletionOptions {
  model: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  documents?: Document[];
}

type ChatMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

export const generateResponse = async (
  messages: ChatMessage[],
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

export const generateResponseWithContext = async (
  messages: ChatMessage[],
  documents: Document[],
  options: ChatCompletionOptions = { model: 'llama3-8b-8192' }
) => {
  try {
    // Set default values if not provided
    const temperature = options.temperature ?? 0.7;
    const maxTokens = options.maxTokens ?? 2048;
    const topP = options.topP ?? 1;
    
    // Extract document content to build context
    const context = documents.map(doc => {
      return `Document: ${doc.title}\nContent: ${doc.content}\n\n`;
    }).join('');
    
    // Create system message with the context
    const systemMessage: ChatMessage = {
      role: 'system',
      content: `You are an AI assistant that uses a knowledge base to answer questions. 
      Here is the content from the documents:
      loboTech Solutions, Inc. experienced significant market growth in fiscal year 2024-2025, achieving total revenue of $87.3 million across all divisions, representing a 14.2% year-over-year increase from the previous fiscal period's $76.4 million. The company's Enterprise Software division emerged as the top performer, generating $34.6 million in revenue (39.6% of total sales), followed by Cloud Services at $28.7 million (32.9%), Hardware Solutions at $15.4 million (17.6%), and Professional Services at $8.6 million (9.9%). Geographic distribution showed North America as the dominant market with $42.8 million in sales (49%), followed by Europe with $26.2 million (30%), Asia-Pacific with $12.3 million (14%), and emerging markets contributing $6.0 million (7%). The company's client portfolio expanded to 1,427 active accounts, adding 218 new clients while maintaining a 91.3% retention rate among existing customers. The average deal
      ${context}
      
      Use ONLY the information provided in these documents to answer questions. If you don't know the answer based on these documents, say so clearly. Do not make up information.`
    };
    
    // Add system message at the beginning
    const messagesWithContext = [systemMessage, ...messages];
    
    const completion = await client.chat.completions.create({
      messages: messagesWithContext,
      model: options.model,
      temperature,
      max_tokens: maxTokens,
      top_p: topP,
      stream: false,
    });
    
    return completion.choices[0]?.message?.content || "I apologize, but I couldn't generate a response.";
  } catch (error) {
    console.error("Error generating response with context:", error);
    throw new Error("Failed to generate response with document context");
  }
};
