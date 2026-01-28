type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type ChatCompletionRequest = {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  max_tokens?: number;
};

type ChatCompletionResponse = {
  choices: { message?: { content?: string | null } }[];
};

class OpenAI {
  private apiKey: string;

  constructor({ apiKey }: { apiKey?: string }) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required.');
    }
    this.apiKey = apiKey;
  }

  chat = {
    completions: {
      create: async (
        payload: ChatCompletionRequest
      ): Promise<ChatCompletionResponse> => {
        const response = await fetch(
          'https://api.openai.com/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.apiKey}`,
            },
            body: JSON.stringify(payload),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText || 'OpenAI request failed.');
        }

        return response.json() as Promise<ChatCompletionResponse>;
      },
    },
  };
}

export default OpenAI;
export type { ChatMessage };
