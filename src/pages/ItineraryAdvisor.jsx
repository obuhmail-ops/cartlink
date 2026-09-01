import React, { useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';
import Navbar from '@/components/Navbar';
import { Send, Map, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const AGENT_NAME = 'itinerary_advisor';

function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={isUser ? 'flex justify-end' : 'flex justify-start'}>
      <div
        className={
          isUser
            ? 'max-w-[85%] rounded-2xl rounded-br-md bg-solar text-brand px-4 py-2.5 text-sm font-medium shadow-sm'
            : 'max-w-[90%] rounded-2xl rounded-bl-md bg-white border border-brand/10 px-4 py-3 text-sm text-brand shadow-sm'
        }
      >
        {message.content ? (
          isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown className="prose prose-sm max-w-none [&_h2]:font-display [&_h2]:text-brand [&_h3]:font-semibold [&_li]:my-0.5">{message.content}</ReactMarkdown>
          )
        ) : (
          !isUser && <span className="inline-flex gap-1"><span className="animate-bounce">•</span><span className="animate-bounce [animation-delay:120ms]">•</span><span className="animate-bounce [animation-delay:240ms]">•</span></span>
        )}
        {message.tool_calls?.map((tc, i) => (
          <div key={i} className="mt-2 text-[11px] text-brand/50 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Looking up your reservation…
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ItineraryAdvisor() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const existing = await base44.agents.listConversations({ agent_name: AGENT_NAME });
        const found = existing?.[0];
        const convo = found
          ? await base44.agents.getConversation(found.id)
          : await base44.agents.createConversation({
              agent_name: AGENT_NAME,
              metadata: { name: 'Itinerary Advisor', description: 'Key West trip planning' },
            });
        if (!active) return;
        setConversation(convo);
        setMessages(convo.messages || []);
      } catch (e) {
        if (!active) return;
        try {
          const convo = await base44.agents.createConversation({
            agent_name: AGENT_NAME,
            metadata: { name: 'Itinerary Advisor', description: 'Key West trip planning' },
          });
          if (!active) return;
          setConversation(convo);
          setMessages(convo.messages || []);
        } catch (err) {
          console.error(err);
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!conversation) return;
    const unsubscribe = base44.agents.subscribeToConversation(conversation.id, (data) => {
      setMessages(data.messages || []);
    });
    return () => unsubscribe();
  }, [conversation]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || !conversation) return;
    setInput('');
    await base44.agents.addMessage(conversation, { role: 'user', content: text });
  };

  return (
    <div className="min-h-screen bg-dune flex flex-col">
      <Navbar />
      <div className="pt-24 flex-1 flex flex-col max-w-2xl mx-auto w-full px-4 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full bg-solar/15 flex items-center justify-center">
            <Map className="w-5 h-5 text-brand" />
          </div>
          <div>
            <h1 className="font-display text-xl text-brand leading-tight">Itinerary Advisor</h1>
            <p className="text-brand/55 text-xs">Personalized Key West routes & stops for your outing</p>
          </div>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto rounded-3xl bg-dune/60 border border-brand/10 p-4 space-y-3 no-scrollbar">
          {loading ? (
            <p className="text-center text-brand/50 text-sm py-10">Starting your advisor…</p>
          ) : messages.length === 0 ? (
            <div className="text-center text-brand/55 text-sm py-10 space-y-2">
              <p className="font-medium text-brand">Tell me about your trip!</p>
              <p>Ask for scenic routes, photo spots, or a full day plan — I'll tailor it to your reservation.</p>
            </div>
          ) : (
            messages.map((m, i) => <MessageBubble key={i} message={m} />)
          )}
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-full bg-white border border-brand/15 pl-4 pr-1.5 py-1.5 shadow-sm">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Ask for a route, stops, or a full itinerary…"
            className="flex-1 bg-transparent text-sm text-brand placeholder:text-brand/40 outline-none"
          />
          <button
            onClick={send}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-full bg-solar text-brand flex items-center justify-center disabled:opacity-40 hover:brightness-110 transition"
            aria-label="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}