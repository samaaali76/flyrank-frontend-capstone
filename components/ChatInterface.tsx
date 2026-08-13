'use client';
import { ProjectCard } from '@/components/ProjectCard';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect, FormEvent } from 'react';

export function ChatInterface() {
  const { messages, sendMessage, status, stop } = useChat();
  const [input, setInput] = useState('');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isPinnedToBottom = useRef(true);

  const isStreaming = status === 'streaming' || status === 'submitted';

  // Track whether the user is currently scrolled to the bottom.
  // If they scroll up mid-stream, we stop auto-scrolling until they
  // scroll back down themselves (or click "jump to latest").
  function handleScroll() {
    const el = scrollContainerRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    isPinnedToBottom.current = distanceFromBottom < 60;
  }

  useEffect(() => {
    if (isPinnedToBottom.current) {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
      });
    }
  }, [messages]);

  function scrollToBottom() {
    isPinnedToBottom.current = true;
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    sendMessage({ text: trimmed });
    setInput('');
    isPinnedToBottom.current = true;
  }

  return (
    <div className="chat">
      <div className="chat__messages" ref={scrollContainerRef} onScroll={handleScroll}>
        {messages.length === 0 && (
          <p className="chat__empty">Say hello to start the conversation.</p>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat__message chat__message--${message.role}`}
          >
            <span className="chat__message-role">
              {message.role === 'user' ? 'You' : 'Assistant'}
            </span>
            <div className="chat__message-body">
{message.parts.map((part, index) => {
                if (part.type === 'text') {
                  return <span key={index}>{part.text}</span>;
                }

                if (part.type === 'tool-getProjectInfo') {
                  // State 1: the model is still deciding/streaming the
                  // arguments it will send to the tool.
                  if (part.state === 'input-streaming') {
                    return (
                      <div key={index} className="tool-card tool-card--pending">
                        <span className="tool-card__icon">✎</span>
                        <span>Preparing project lookup…</span>
                      </div>
                    );
                  }

                  // State 2: input is ready, execute() is running now.
                  if (part.state === 'input-available') {
                    return (
                      <div key={index} className="tool-card tool-card--loading">
                        <span className="tool-card__spinner" />
<span>
                          Looking up{' '}
                          {(part.input as { projectName?: string } | undefined)
                            ?.projectName
                            ? `"${(part.input as { projectName?: string }).projectName}"`
                            : 'project info'}
                          …
                        </span>
                      </div>
                    );
                  }

                  // State 3: the tool returned successfully — render a
                  // real component, not raw JSON.
                  if (part.state === 'output-available') {
                    const output = part.output as {
                      found: boolean;
                      projects: import('@/lib/projects-data').Project[];
                    };
                    return (
                      <div key={index} className="tool-card tool-card--result">
                        {output.projects.map((project) => (
                          <ProjectCard key={project.slug} project={project} />
                        ))}
                      </div>
                    );
                  }

                  // State 4: the tool threw an error — designed error
                  // state, not a crash or a raw stack trace.
                  if (part.state === 'output-error') {
                    return (
                      <div key={index} className="tool-card tool-card--error">
                        <span className="tool-card__icon">⚠</span>
                        <span>
                          Couldn&apos;t find that project.{' '}
                          {part.errorText ?? 'Please try a different name.'}
                        </span>
                      </div>
                    );
                  }
                }

                return null;
              })}
            </div>
          </div>
        ))}

        {status === 'submitted' && (
          <div className="chat__message chat__message--assistant">
            <span className="chat__message-role">Assistant</span>
            <div className="chat__thinking">
              <span className="chat__dot" />
              <span className="chat__dot" />
              <span className="chat__dot" />
            </div>
          </div>
        )}
      </div>

      {!isPinnedToBottom.current && (
        <button
          type="button"
          className="chat__jump-button"
          onClick={scrollToBottom}
        >
          ↓ Jump to latest
        </button>
      )}

      <form className="chat__input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="chat__input"
          disabled={isStreaming}
        />
        {isStreaming ? (
          <button type="button" className="chat__stop-button" onClick={stop}>
            Stop
          </button>
        ) : (
          <button type="submit" className="chat__send-button" disabled={!input.trim()}>
            Send
          </button>
        )}
      </form>
    </div>
  );
}
