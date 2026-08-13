import { ChatInterface } from '@/components/ChatInterface';
import '@/components/ChatInterface.css';

export default function ChatPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Chat with the Assistant</h1>
      <ChatInterface />
    </section>
  );
}
