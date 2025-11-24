import React, { useState, useRef, useEffect } from 'react';
import { generateThinkingResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Bot, Send, X, Loader2, Sparkles, BrainCircuit } from 'lucide-react';

interface AiTutorProps {
  context?: string;
}

const AiTutor: React.FC<AiTutorProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'مرحباً! أنا بيان، مساعدك الذكي. كيف يمكنني مساعدتك في درس اليوم؟' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await generateThinkingResponse(input, context);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "عذراً، لم أتمكن من معالجة طلبك في الوقت الحالي."
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: 'error',
        role: 'model',
        text: "حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-40 p-4 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-110 ${isOpen ? 'hidden' : 'flex'}`}
        title="المساعد الذكي"
      >
        <Sparkles className="w-6 h-6 animate-pulse" />
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col animate-fade-in h-[600px] max-h-[80vh]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-white/20 rounded-lg">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">بيان AI</h3>
                <span className="text-xs text-indigo-200 flex items-center gap-1">
                  <BrainCircuit className="w-3 h-3" />
                  نمط التفكير العميق مفعل
                </span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tl-none shadow-md'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tr-none shadow-sm border border-slate-100 dark:border-slate-700'
                  }`}
                >
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0">{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tr-none shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-indigo-500 animate-pulse" />
                  <span className="text-xs text-slate-500 dark:text-slate-400 animate-pulse">جاري التفكير وتحليل السؤال...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="اسأل بيان عن الدرس..."
                className="flex-1 p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-950 transition-all outline-none text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 -rotate-90" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiTutor;