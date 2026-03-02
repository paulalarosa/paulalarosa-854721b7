import { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  MessageCircle,
  Send,
  CheckCheck,
  Phone,
  Paperclip,
} from "lucide-react";
import { hapticLight, hapticMedium } from "../haptics";

interface WhatsAppScreenProps {
  onBack: () => void;
}

interface Message {
  id: number;
  from: "user" | "agent";
  text: string;
  time: string;
  read: boolean;
}

const initialMessages: Message[] = [
  { id: 1, from: "agent", text: "Ola Ricardo! Bem-vindo ao atendimento via WhatsApp do SeguroPro. Como posso ajudar?", time: "09:40", read: true },
  { id: 2, from: "agent", text: "Voce pode enviar documentos, fotos ou simplesmente tirar duvidas por aqui.", time: "09:40", read: true },
];

export function WhatsAppScreen({ onBack }: WhatsAppScreenProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    hapticMedium();
    setMessages(prev => [
      ...prev,
      { id: Date.now(), from: "user", text: input, time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }), read: false },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "agent",
          text: "Recebido! Nosso time esta analisando sua solicitacao. Retornaremos em instantes.",
          time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
          read: true,
        },
      ]);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 sm:px-6 shrink-0">
        <div className="flex items-center gap-3 pt-2 pb-4">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { hapticLight(); onBack(); }}
            className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100/60 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#0D9488]"
            aria-label="Voltar"
          >
            <ChevronLeft size={16} className="text-[#0F172A]" strokeWidth={1.8} />
          </motion.button>
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <MessageCircle size={17} className="text-[#25D366]" strokeWidth={1.6} />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#F8F8FA]" />
            </div>
            <div>
              <h1 className="text-[15px] text-[#0F172A] tracking-tight">SeguroPro</h1>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                <p className="text-[10px] text-[#25D366]">Online agora</p>
              </div>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            className="w-9 h-9 rounded-xl bg-white/80 border border-gray-100/60 flex items-center justify-center"
          >
            <Phone size={15} className="text-[#0F172A]" strokeWidth={1.6} />
          </motion.button>
        </div>
      </div>

      {/* WhatsApp-style chat background */}
      <div
        className="flex-1 overflow-y-auto px-5 sm:px-6 py-3"
        style={{
          scrollbarWidth: "none",
          backgroundColor: "#F0F0F0",
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(13,148,136,0.03) 0%, transparent 50%)",
        }}
      >
        {/* Date divider */}
        <div className="flex justify-center mb-4">
          <span className="px-3 py-1 rounded-lg bg-white/80 text-[9px] text-gray-400 tracking-wide">HOJE</span>
        </div>

        <div className="space-y-2">
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 6, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] px-3 py-2 rounded-2xl relative ${
                  msg.from === "user"
                    ? "bg-[#DCF8C6] rounded-br-sm"
                    : "bg-white rounded-bl-sm"
                }`}
                style={{ boxShadow: "0 1px 1px rgba(0,0,0,0.04)" }}
              >
                <p className="text-[12px] text-[#0F172A] leading-relaxed">{msg.text}</p>
                <div className={`flex items-center gap-1 mt-0.5 ${msg.from === "user" ? "justify-end" : ""}`}>
                  <span className="text-[8px] text-gray-400">{msg.time}</span>
                  {msg.from === "user" && (
                    <CheckCheck size={10} className={msg.read ? "text-[#53BDEB]" : "text-gray-300"} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="px-5 sm:px-6 py-3 shrink-0 bg-[#F0F0F0]">
        <div className="flex items-center gap-2">
          <motion.button
            whileTap={{ scale: 0.88 }}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0"
          >
            <Paperclip size={16} className="text-gray-400" strokeWidth={1.5} />
          </motion.button>
          <div className="flex-1 flex items-center bg-white rounded-full px-4 py-2.5">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Mensagem"
              className="flex-1 text-[12px] text-[#0F172A] placeholder:text-gray-300 bg-transparent outline-none"
            />
          </div>
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={sendMessage}
            className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center shrink-0"
          >
            <Send size={15} className="text-white" strokeWidth={1.8} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}
