import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ChatInterface } from './ChatInterface';

// Mock the AI SDK's useChat hook entirely — tests must never call the
// real API. Each test configures what this mock returns before rendering.
const mockUseChat = vi.fn();

vi.mock('@ai-sdk/react', () => ({
  useChat: () => mockUseChat(),
}));

function baseChatState(overrides = {}) {
  return {
    messages: [],
    sendMessage: vi.fn(),
    status: 'ready',
    stop: vi.fn(),
    error: undefined,
    regenerate: vi.fn(),
    ...overrides,
  };
}

beforeEach(() => {
  mockUseChat.mockReset();
});

describe('ChatInterface', () => {
  it('shows the empty state with clickable suggestions when there are no messages', () => {
    mockUseChat.mockReturnValue(baseChatState());
    render(<ChatInterface />);

    expect(
      screen.getByText(/ask me about samaa's projects/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /tell me about your capstone project/i })
    ).toBeInTheDocument();
  });

  it('renders a text message part', () => {
    mockUseChat.mockReturnValue(
      baseChatState({
        messages: [
          {
            id: '1',
            role: 'assistant',
            parts: [{ type: 'text', text: 'Hello there!' }],
          },
        ],
      })
    );
    render(<ChatInterface />);

    expect(screen.getByText('Hello there!')).toBeInTheDocument();
  });

  it('shows a pending/thinking indicator while a message is submitted', () => {
    mockUseChat.mockReturnValue(baseChatState({ status: 'submitted' }));
    render(<ChatInterface />);

    // The thinking dots don't have visible text, so we assert on the
    // "Assistant" role label that appears alongside them.
    expect(screen.getByText('Assistant')).toBeInTheDocument();
  });

  it('disables the input while a response is streaming', () => {
    mockUseChat.mockReturnValue(baseChatState({ status: 'streaming' }));
    render(<ChatInterface />);

    expect(screen.getByPlaceholderText(/type a message/i)).toBeDisabled();
  });

  it('shows a designed error card with a retry option on failure', () => {
    mockUseChat.mockReturnValue(
      baseChatState({ error: new Error('Simulated failure') })
    );
    render(<ChatInterface />);

    expect(
      screen.getByText(/something went wrong/i)
    ).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /retry/i })).toHaveLength(2);
  });

  it('renders a tool result as a ProjectCard component, not raw text', () => {
    mockUseChat.mockReturnValue(
      baseChatState({
        messages: [
          {
            id: '2',
            role: 'assistant',
            parts: [
              {
                type: 'tool-getProjectInfo',
                state: 'output-available',
                output: {
                  found: true,
                  projects: [
                    {
                      slug: 'test-project',
                      name: 'Test Project',
                      description: 'A project used for testing.',
                      stack: ['React'],
                    },
                  ],
                },
              },
            ],
          },
        ],
      })
    );
    render(<ChatInterface />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A project used for testing.')).toBeInTheDocument();
  });

  it('shows a designed error state when a tool call fails', () => {
    mockUseChat.mockReturnValue(
      baseChatState({
        messages: [
          {
            id: '3',
            role: 'assistant',
            parts: [
              {
                type: 'tool-getProjectInfo',
                state: 'output-error',
                errorText: 'No project found matching "xyz".',
              },
            ],
          },
        ],
      })
    );
    render(<ChatInterface />);

    expect(screen.getByText(/couldn't find that project/i)).toBeInTheDocument();
  });
});