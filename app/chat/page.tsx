import { ChatInterface } from '@/components/ChatInterface';
import '@/components/ChatInterface.css';
import { ShaderHero } from '@/components/ShaderHero';
import '@/components/ShaderHero.css';

export default function ChatPage() {
  return (
    <>
      <div className="shader-hero__fallback" />
      <ShaderHero />

      <section className="mx-auto max-w-2xl px-4 py-12">
        <div className="shader-hero__content shader-hero__content--inline">
          <h1 className="shader-hero__name">Samaa Ali</h1>
          <p className="shader-hero__tagline">
            Front-end developer building AI-powered interfaces.
          </p>
        </div>

<h2 className="font-display mb-6 text-3xl text-neutral-900">
  Chat with the Assistant
</h2>
        <ChatInterface />

        <p className="mt-6 text-xs leading-relaxed text-white/70">
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
    </>
  );
}