'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const STORAGE_KEY = 'ftd_chat_messages_v1';
const MAX_HISTORY = 20;

const defaultMessages: ChatMessage[] = [
  {
    role: 'assistant',
    content:
      'You are connected to Fee’s concierge. Share the outcome, timeline, and constraints, and I will route the next step.',
  },
];

function safeParseMessages(raw: string | null): ChatMessage[] | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return null;
    }

    const messages = parsed.filter((message) => {
      return (
        message &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string'
      );
    });

    return messages.length ? messages : null;
  } catch {
    return null;
  }
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(defaultMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadEmail, setLeadEmail] = useState('');
  const [leadTimeline, setLeadTimeline] = useState('');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'submitting' | 'sent'>(
    'idle'
  );
  const [leadError, setLeadError] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);

  const quickReplies = [
    'Build a website',
    'Fix a deployment',
    'Add a chatbot',
    'APIs & Integrations',
    'Automation',
  ];

  useEffect(() => {
    const stored = safeParseMessages(localStorage.getItem(STORAGE_KEY));
    if (stored) {
      setMessages(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [isOpen, messages]);

  const handleSend = async (override?: string) => {
    const trimmed = (override ?? input).trim();
    if (!trimmed || isLoading) {
      return;
    }

    setError(null);
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: trimmed },
    ];
    const boundedMessages = nextMessages.slice(-MAX_HISTORY);
    setMessages(boundedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: boundedMessages }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || 'Something went wrong.');
      }

      const data = (await response.json()) as { reply?: string };
      if (!data.reply) {
        throw new Error('No reply returned.');
      }
      const reply = data.reply;

      setMessages((prev) => {
        const updated: ChatMessage[] = [
          ...prev,
          { role: 'assistant', content: reply },
        ];
        return updated.slice(-MAX_HISTORY);
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const isLeadCaptureTriggered = messages.some(
    (message) =>
      message.role === 'assistant' &&
      /request access\s*\/\s*engagement/i.test(message.content)
  );

  const handleQuickReply = (message: string) => {
    if (isLoading) {
      return;
    }
    setIsOpen(true);
    setInput(message);
    void handleSend(message);
  };

  const handleLeadSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (leadStatus === 'submitting') {
      return;
    }

    setLeadError(null);
    setLeadStatus('submitting');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: leadEmail, timeline: leadTimeline }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload?.error || 'Unable to send details.');
      }

      setLeadStatus('sent');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to send details.';
      setLeadError(message);
      setLeadStatus('idle');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen ? (
        <div className="w-[90vw] max-w-sm rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Fee&apos;s Concierge
              </p>
              <p className="text-xs text-slate-500">
                Executive answers, clear next steps.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-slate-500 transition hover:text-slate-900"
              aria-label="Close chat"
            >
              Close
            </button>
          </div>
          <div className="max-h-[55vh] space-y-4 overflow-y-auto px-4 py-3 text-sm">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={
                  message.role === 'user'
                    ? 'flex justify-end'
                    : 'flex justify-start'
                }
              >
                <div
                  className={
                    message.role === 'user'
                      ? 'max-w-[80%] rounded-2xl bg-slate-900 px-4 py-2 text-white'
                      : 'max-w-[80%] rounded-2xl bg-slate-100 px-4 py-2 text-slate-900'
                  }
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-slate-100 px-4 py-2 text-slate-500">
                  Thinking...
                </div>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>
          <div className="border-t border-slate-100 px-4 py-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickReplies.map((label) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => handleQuickReply(label)}
                  className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-900"
                >
                  {label}
                </button>
              ))}
            </div>
            {isLeadCaptureTriggered ? (
              <div className="mb-3 rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Request Access / Engagement
                </p>
                {leadStatus === 'sent' ? (
                  <p className="mt-2 text-sm text-slate-700">
                    Thanks — we will confirm next steps shortly.
                  </p>
                ) : (
                  <form className="mt-2 grid gap-2" onSubmit={handleLeadSubmit}>
                    <input
                      type="email"
                      value={leadEmail}
                      onChange={(event) => setLeadEmail(event.target.value)}
                      placeholder="Email address"
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                      required
                    />
                    <input
                      value={leadTimeline}
                      onChange={(event) => setLeadTimeline(event.target.value)}
                      placeholder="Target timeline"
                      className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                      required
                    />
                    {leadError ? (
                      <p className="text-xs text-rose-500">{leadError}</p>
                    ) : null}
                    <button
                      type="submit"
                      disabled={leadStatus === 'submitting'}
                      className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                    >
                      {leadStatus === 'submitting' ? 'Sending…' : 'Send details'}
                    </button>
                  </form>
                )}
              </div>
            ) : null}
            {error ? (
              <p className="mb-2 text-xs text-rose-500">{error}</p>
            ) : null}
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault();
                    void handleSend();
                  }
                }}
                placeholder="Type your question..."
                className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
              />
              <button
                onClick={() => void handleSend()}
                disabled={isLoading}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      ) : null}
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-slate-800"
        aria-label="Open chat"
      >
        {isOpen ? 'Hide Concierge' : 'Concierge'}
      </button>
    </div>
  );
}
