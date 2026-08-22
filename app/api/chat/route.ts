import { google } from '@ai-sdk/google';
import {
  streamText,
  convertToModelMessages,
  stepCountIs,
  type UIMessage,
} from 'ai';
import { CHAT_MODEL, SYSTEM_PROMPT, MAX_OUTPUT_TOKENS } from '@/lib/chat-config';
import { getProjectInfo } from '@/lib/chat-tools';
import { checkRateLimit } from '@/lib/rate-limit';

// Cap how long a single streaming response is allowed to run, so a
// stuck or unusually long generation can't tie up the function
// indefinitely (Vercel's own plan limit is the hard ceiling; this is
// the app being a good citizen within that).
export const maxDuration = 30;

// The API key is read from the server-only environment variable
// GOOGLE_GENERATIVE_AI_API_KEY (set in .env.local, never exposed to the client).
export async function POST(req: Request) {
  // Rate limit by IP before doing anything else, so an abusive
  // caller can't drain API credits by hammering this route.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  const { allowed, resetAt } = checkRateLimit(ip);

  if (!allowed) {
    return new Response(
      `data: ${JSON.stringify({ type: 'error', errorText: 'Rate limit exceeded. Please try again later.' })}\n\n`,
      {
        status: 429,
        headers: {
          'Content-Type': 'text/event-stream',
          'Retry-After': String(Math.ceil((resetAt - Date.now()) / 1000)),
        },
      }
    );
  }

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