'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hello! I'm BR's Digital Concierge. How can I assist you tonight?" }
  ]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatWindowRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessages = [...messages, { role: 'user', text: inputValue }];
    setMessages(newMessages);
    setInputValue('');

    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: "That sounds great! I'll pass that along to our team. Is there anything else you'd like to know about our menu or reservations?"
      }]);
    }, 1000);
  };

  const quickActions = ["Menu Highlights", "Reserve Table", "Happy Hour"];

  return (
    <div className="fixed bottom-6 right-6 z-[1000] flex flex-col items-end gap-4">
      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="w-[350px] max-w-[90vw] h-[500px] glass-nav rounded-2xl border border-brand-primary/20 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-brand-primary px-6 py-4 flex justify-between items-center text-bg-dark">
            <div>
              <h3 className="font-serif font-bold">BR's Concierge</h3>
              <p className="text-[10px] uppercase tracking-widest font-bold opacity-70">Active Now</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-primary/20 text-text-main border border-brand-primary/30' 
                    : 'bg-bg-surface text-text-muted border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="p-4 flex gap-2 flex-wrap">
            {quickActions.map(action => (
              <button 
                key={action}
                onClick={() => setMessages([...messages, { role: 'user', text: action }])}
                className="text-[10px] uppercase font-bold tracking-wider px-3 py-1.5 border border-brand-primary/30 rounded-full hover:bg-brand-primary/10 transition-colors text-brand-primary outline-none"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/5 bg-black/40">
            <div className="flex gap-2">
              <input 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-brand-primary/50 text-white placeholder:text-white/20"
              />
              <button className="bg-brand-primary text-bg-dark p-2 rounded-full hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-bg-surface border border-brand-primary/20' : 'bg-brand-primary text-bg-dark'
        }`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
        )}
      </button>
    </div>
  );
}
