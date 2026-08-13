import { google } from '@ai-sdk/google';
import {
  streamText,
  convertToModelMessages,
  stepCountIs,
  type UIMessage,
} from 'ai';
import { CHAT_MODEL, SYSTEM_PROMPT, MAX_OUTPUT_TOKENS } from '@/lib/chat-config';
import { getProjectInfo } from '@/lib/chat-tools';

// The API key is read from the server-only environment variable
// GOOGLE_GENERATIVE_AI_API_KEY (set in .env.local, never exposed to the client).
export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google(CHAT_MODEL),
    system: SYSTEM_PROMPT,
    messages: await convertToModelMessages(messages),
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    tools: { getProjectInfo },
    // Allow up to 2 model turns: one to call the tool, one to
    // respond in text once the tool result comes back.
    stopWhen: stepCountIs(2),
  });

  return result.toUIMessageStreamResponse();
}