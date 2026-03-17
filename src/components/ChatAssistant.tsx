import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, User, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const FunnyHouseIcon = ({ isOpen }: { isOpen: boolean }) => (
  <motion.div
    animate={isOpen ? { rotate: 0, scale: 1 } : { 
      y: [0, -6, 0],
      rotate: [0, -2, 2, 0],
      scale: [1, 1.05, 1]
    }}
    transition={{ 
      repeat: Infinity, 
      duration: 4,
      ease: "easeInOut"
    }}
    className="relative w-16 h-16 flex items-center justify-center"
  >
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl">
      <defs>
        <linearGradient id="woodGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8B7355" />
          <stop offset="50%" stopColor="#6B5335" />
          <stop offset="100%" stopColor="#4B3315" />
        </linearGradient>
        <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A5F3FC" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="metalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="50%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4B3315" />
          <stop offset="100%" stopColor="#2B1305" />
        </linearGradient>
        <clipPath id="houseClip">
          <path d="M50 10 L15 40 L15 90 L85 90 L85 40 Z" />
        </clipPath>
      </defs>

      {/* Chimney & Smoke */}
      <rect x="65" y="15" width="8" height="15" fill="#475569" rx="1" />
      <motion.g
        animate={{ y: [-2, -15], opacity: [0, 0.6, 0], scale: [0.5, 1.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
      >
        <circle cx="69" cy="12" r="3" fill="#CBD5E1" />
      </motion.g>

      {/* Main House Shape */}
      <path d="M50 10 L15 40 L15 90 L85 90 L85 40 Z" fill="#1E293B" />
      
      {/* Upper Wood Part (Pitched Roof area) */}
      <path d="M50 10 L15 40 L85 40 Z" fill="url(#woodGradient)" />
      <path d="M15 40 L15 65 L85 65 L85 40 Z" fill="url(#woodGradient)" />
      {/* Plank lines */}
      {[25, 35, 45, 55, 65, 75].map(x => (
        <line key={x} x1={x} y1="20" x2={x} y2="65" stroke="#3F2E1B" strokeWidth="0.5" opacity="0.5" />
      ))}

      {/* Roof Trim */}
      <path d="M50 10 L12 42 L15 45 L50 15 L85 45 L88 42 Z" fill="url(#roofGradient)" />

      {/* Lower Glass Part */}
      <rect x="18" y="65" width="64" height="22" rx="2" fill="url(#glassGradient)" />
      {/* Window frames */}
      <line x1="39" y1="65" x2="39" y2="87" stroke="#475569" strokeWidth="1" />
      <line x1="61" y1="65" x2="61" y2="87" stroke="#475569" strokeWidth="1" />
      {/* Plants inside */}
      <circle cx="25" cy="80" r="3" fill="#15803D" />
      <circle cx="75" cy="80" r="3" fill="#15803D" />

      {/* Face */}
      <g>
        {/* Eyes */}
        <circle cx="40" cy="45" r="7" fill="white" />
        <circle cx="40" cy="45" r="4.5" fill="#3B82F6" />
        <circle cx="40" cy="45" r="2" fill="black" />
        <circle cx="41.5" cy="43.5" r="1.2" fill="white" />
        
        <circle cx="60" cy="45" r="7" fill="white" />
        <circle cx="60" cy="45" r="4.5" fill="#3B82F6" />
        <circle cx="60" cy="45" r="2" fill="black" />
        <circle cx="61.5" cy="43.5" r="1.2" fill="white" />
      </g>
      {/* Cheeks */}
      <circle cx="32" cy="52" r="3" fill="#F43F5E" opacity="0.3" />
      <circle cx="68" cy="52" r="3" fill="#F43F5E" opacity="0.3" />
      {/* Smile */}
      <path d="M38 55C38 55 42 60 50 60C58 60 62 55 62 55" stroke="black" strokeWidth="1.5" fill="white" strokeLinecap="round" />

      {/* Robotic Arms */}
      {/* Left Arm (Enthusiastic Wave) */}
      <motion.g
        animate={{ 
          rotate: [0, -40, 10, -40, 0],
          y: [0, -4, 2, -4, 0]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 1, 
          ease: "easeInOut" 
        }}
        style={{ originX: "15px", originY: "50px" }}
      >
        {/* Longer arm segment */}
        <rect x="-8" y="47" width="23" height="7" rx="3.5" fill="url(#metalGradient)" />
        {/* Hand/Joint */}
        <circle cx="-8" cy="50.5" r="5.5" fill="#94A3B8" />
        {/* Enthusiastic "motion lines" to show energy */}
        <motion.path
          animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 0.5 }}
          d="M-15 40 Q-20 50 -15 60"
          stroke="#CBD5E1"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.g>

      {/* Right Arm (Subtle balance) */}
      <motion.g
        animate={{ rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 0.5, ease: "easeInOut" }}
        style={{ originX: "85px", originY: "50px" }}
      >
        <rect x="83" y="47" width="15" height="6" rx="3" fill="url(#metalGradient)" />
        <circle cx="98" cy="50" r="4" fill="#94A3B8" />
      </motion.g>

      {/* Base */}
      <rect x="15" y="87" width="70" height="3" fill="#64748B" rx="1" />
    </svg>
  </motion.div>
);

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy el asistente de EMS. ¿En qué puedo ayudarte hoy? ¿Buscas casa o quieres vender la tuya?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const model = "gemini-3-flash-preview";
      
      const chat = ai.chats.create({
        model: model,
        config: {
          systemInstruction: `Eres el asistente virtual de "EMS GESTIONES INMOBILIARIAS". 
          Tu objetivo es ayudar a los usuarios de forma RÁPIDA, AMABLE y MUY DIRECTA.
          
          Información clave:
          - Empresa: EMS GESTIONES INMOBILIARIAS.
          - Promesa: Vendemos tu vivienda en menos de 30 días.
          - Fundadores: Eloy Bódalo Martí, Sergio Schmith Hernández y Miguel Emo Moreno.
          - Ubicación: Madrid (Calle Serrano 100).
          
          REGLAS DE ORO DE ESCRITURA:
          1. PROHIBIDO usar negritas, asteriscos (**) o cualquier formato Markdown. Solo texto plano.
          2. Sé EXTREMADAMENTE breve. Máximo 1 o 2 frases cortas.
          3. Ve al grano de inmediato. Sin introducciones ni despedidas largas.
          4. Usa un tono amable y profesional, pero muy conciso.
          5. Si el usuario necesita ayuda específica, sugiere WhatsApp brevemente.
          
          Ejemplo de respuesta correcta: "Claro, vendemos tu casa en menos de 30 días. ¿Quieres que tasemos tu propiedad ahora?"`,
        },
      });

      // We send the whole history for context
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      const response = await ai.models.generateContent({
        model: model,
        contents: [
          ...history.map(h => ({ role: h.role, parts: h.parts })),
          { role: 'user', parts: [{ text: userMessage }] }
        ]
      });

      const aiText = response.text || "Lo siento, he tenido un pequeño problema técnico. ¿Podrías repetirme eso?";
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Lo siento, en este momento no puedo procesar tu solicitud. Por favor, contacta con nosotros directamente por WhatsApp." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: 'blur(10px)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-16 md:bottom-20 right-0 w-[calc(100vw-32px)] md:w-[400px] h-[500px] md:h-[550px] bg-dark/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 bg-accent/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center shadow-lg shadow-gold/20">
                  <Sparkles className="w-5 h-5 text-dark" />
                </div>
                <div>
                  <h3 className="text-white font-serif text-lg leading-tight">Asistente EMS</h3>
                  <p className="text-gold text-[8px] uppercase tracking-widest font-bold">Estamos para ayudarte</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/20 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 10 : -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-gold/10'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white/40" /> : <Bot className="w-4 h-4 text-gold" />}
                    </div>
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white/5 text-white' : 'bg-accent/40 text-white/80 border border-white/5'}`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[85%]">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-gold" />
                    </div>
                    <div className="p-4 rounded-2xl bg-accent/40 border border-white/5 flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-white/5 bg-accent/10">
              <div className="relative">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu consulta..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-6 pr-14 text-sm text-white focus:outline-none focus:border-gold/50 transition-all placeholder:text-white/20"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 top-2 bottom-2 px-4 bg-gold text-dark rounded-lg hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${isOpen ? 'bg-white text-dark rotate-90' : 'bg-gold text-dark'}`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <FunnyHouseIcon isOpen={isOpen} />}
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center"
          >
            <Sparkles className="w-3 h-3 text-gold" />
          </motion.div>
        )}
      </motion.button>
    </div>
  );
}
