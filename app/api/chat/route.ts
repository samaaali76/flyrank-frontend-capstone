import { anthropic } from '@ai-sdk/anthropic';
import { streamText, convertToModelMessages, type UIMessage } from 'ai';
import { CHAT_MODEL, SYSTEM_PROMPT, MAX_OUTPUT_TOKENS } from '@/lib/chat-config';

// The API key is read from the server-only environment variable
// ANTHROPIC_API_KEY (set in .env.local, never exposed to the client).
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: anthropic(CHAT_MODEL),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
  });

  return result.toUIMessageStreamResponse();
}
