import { ChatInterface } from '@/components/ChatInterface';
import '@/components/ChatInterface.css';

export default function ChatPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Chat with the Assistant</h1>
      <ChatInterface />

      <p className="mt-6 text-xs leading-relaxed text-neutral-500">
        <strong>Send button motion notes:</strong> state changes use a 200ms
        ease-out transition — fast enough to feel instant, slow enough to
        register. Success holds for 1200ms (enough time to read the
        checkmark without feeling like a delay), and the error state plays
        a single 400ms ease-in-out shake rather than repeating, so it reads
        as feedback rather than punishment. Only <code>transform</code> and{' '}
        <code>opacity</code> are animated to stay off the layout thread, and
        the button honors <code>prefers-reduced-motion</code> by dropping
        the shake/scale while keeping the spinner and color feedback.
      </p>
    </section>
  );
}
