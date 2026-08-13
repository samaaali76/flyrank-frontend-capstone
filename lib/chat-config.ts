// Central place for chat model configuration.
// Keeping this separate from the route handler makes it easy to extend
// later (FE-07 adds tool calling on top of this same config).

export const CHAT_MODEL = 'claude-sonnet-4-5';

export const SYSTEM_PROMPT = `You are a helpful assistant embedded in Samaa Ali's
front-end portfolio site. Keep responses concise and friendly. This is a demo
chat interface built to practice streaming AI responses — you can mention that
if asked what you are.`;

export const MAX_OUTPUT_TOKENS = 1024;
