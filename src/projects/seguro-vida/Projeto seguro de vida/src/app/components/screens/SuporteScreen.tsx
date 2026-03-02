import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  Headphones,
  MessageCircle,
  Phone,
  Mail,
  ChevronRight,
  Send,
  Bot,
  User,
  HelpCircle,
  BookOpen,
  Clock,
} from "lucide-react";
import { hapticLight, hapticMedium, hapticTick } from "../haptics";

interface SuporteScreenProps {
  onBack: () => void;
}

type View = "main" | "chat" | "faq";

interface ChatMessage {
  id: number;
  from: "bot" | "user";
  text: string;
}

const faqItems = [
  { q: "Como alterar meu metodo de pagamento?", a: "Acesse Perfil > Pagamento > Alterar cartao. Voce pode cadastrar ate 3 cartoes." },
  { q: "Quanto tempo demora um sinistro?", a: "O prazo medio e de 3 a 5 dias uteis apos a abertura. Sinistros prioritarios sao analisados em 24h." },
  { q: "Como solicitar carro reserva?", a: "O carro reserva e ativado automaticamente em sinistros de colisao. Periodo: 15 dias (HB20) ou conforme apolice." },
  { q: "Posso transferir minha apolice?", a: "Sim, apolices podem ser transferidas mediante analise. Entre em contato com nosso suporte." },
  { q: "Como funciona o rastreador?", a: "O rastreador e instalado gratuitamente e garante 12% de desconto na renovacao. Monitoramento 24h via app." },
];

export function SuporteScreen({ onBack }: SuporteScreenProps) {
  const [view, setView] = useState<View>("main");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, from: "bot", text: "Ola Ricardo! Sou a assistente virtual do SeguroPro. Como posso ajudar voce hoje?" },
  ]);
  const [input, setInput] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    hapticMedium();
    const userMsg: ChatMessage = { id: Date.now(), from: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        from: "bot",
        text: "Entendido! Vou verificar isso para voce. Um momento, por favor. Se preferir, posso transferir para um atendente humano.",
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="px-5 sm:px-6 shrink-0">
        <div className="flex items-center gap-3 pt-2 pb-5">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => {
              hapticLight();
              if (view !== "main") setView("main");
              else onBack();
            }}
            className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100/60 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#0D9488]"
            aria-label="Voltar"
          >
            <ChevronLeft size={16} className="text-[#0F172A]" strokeWidth={1.8} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-[20px] text-[#0F172A] tracking-tight">
              {view === "chat" ? "Chat" : view === "faq" ? "Perguntas frequentes" : "Suporte"}
            </h1>
            <p className="text-[11px] text-gray-400">
              {view === "chat" ? "Assistente virtual" : view === "faq" ? `${faqItems.length} topicos` : "Estamos aqui para ajudar"}
            </p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#D97706]/8 flex items-center justify-center">
            <Headphones size={17} className="text-[#D97706]" strokeWidth={1.6} />
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {view === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto px-5 sm:px-6"
            style={{ scrollbarWidth: "none" }}
          >
            {/* Contact cards */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {[
                { icon: MessageCircle, label: "Chat ao vivo", desc: "Online agora", color: "#0D9488", action: () => setView("chat") },
                { icon: Phone, label: "Ligar", desc: "0800 123 4567", color: "#6366F1", action: () => {} },
                { icon: Mail, label: "Email", desc: "Ate 24h", color: "#D97706", action: () => {} },
                { icon: BookOpen, label: "FAQ", desc: `${faqItems.length} topicos`, color: "#0F172A", action: () => setView("faq") },
              ].map(item => (
                <motion.button
                  key={item.label}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => { hapticMedium(); item.action(); }}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white border border-gray-100/60"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${item.color}08` }}>
                    <item.icon size={17} style={{ color: item.color }} strokeWidth={1.5} />
                  </div>
                  <div className="text-center">
                    <p className="text-[12px] text-[#0F172A] tracking-tight">{item.label}</p>
                    <p className="text-[9px] text-gray-400">{item.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Status */}
            <div className="rounded-2xl bg-[#0F172A] p-4 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] text-emerald-400">Central online</span>
              </div>
              <p className="text-[12px] text-gray-400">Tempo medio de espera: <span className="text-white">2 minutos</span></p>
              <p className="text-[10px] text-gray-500 mt-1">Atendimento 24h por dia, 7 dias por semana</p>
            </div>

            {/* Recent tickets */}
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.1em] mb-3 px-0.5">Atendimentos recentes</p>
            <div className="space-y-2">
              {[
                { title: "Duvida sobre franquia", date: "12 Fev 2026", status: "Resolvido" },
                { title: "Alteracao de endereco", date: "05 Jan 2026", status: "Resolvido" },
              ].map((ticket, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-white border border-gray-100/60">
                  <div>
                    <p className="text-[12px] text-[#0F172A]">{ticket.title}</p>
                    <p className="text-[9px] text-gray-300">{ticket.date}</p>
                  </div>
                  <span className="text-[9px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">{ticket.status}</span>
                </div>
              ))}
            </div>
            <div className="h-8" />
          </motion.div>
        )}

        {view === "chat" && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col overflow-hidden"
          >
            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-2" style={{ scrollbarWidth: "none" }}>
              <div className="space-y-3">
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex items-start gap-2 max-w-[85%] ${msg.from === "user" ? "flex-row-reverse" : ""}`}>
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        msg.from === "bot" ? "bg-[#0D9488]/10" : "bg-[#0F172A]/5"
                      }`}>
                        {msg.from === "bot" ? (
                          <Bot size={13} className="text-[#0D9488]" strokeWidth={1.5} />
                        ) : (
                          <User size={13} className="text-[#0F172A]" strokeWidth={1.5} />
                        )}
                      </div>
                      <div className={`px-3.5 py-2.5 rounded-2xl ${
                        msg.from === "user"
                          ? "bg-[#0F172A] text-white"
                          : "bg-white border border-gray-100/60 text-[#0F172A]"
                      }`}>
                        <p className="text-[12px] leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="px-5 sm:px-6 py-3 shrink-0">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-gray-100/60">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 text-[12px] text-[#0F172A] placeholder:text-gray-300 bg-transparent outline-none px-2"
                />
                <motion.button
                  whileTap={{ scale: 0.88 }}
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="w-8 h-8 rounded-lg bg-[#0D9488] flex items-center justify-center disabled:opacity-30"
                >
                  <Send size={14} className="text-white" strokeWidth={1.8} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}

        {view === "faq" && (
          <motion.div
            key="faq"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 overflow-y-auto px-5 sm:px-6"
            style={{ scrollbarWidth: "none" }}
          >
            <div className="space-y-2">
              {faqItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl bg-white border border-gray-100/60 overflow-hidden"
                >
                  <button
                    onClick={() => { hapticTick(); setExpandedFaq(expandedFaq === i ? null : i); }}
                    className="w-full flex items-center gap-3 p-4 text-left"
                  >
                    <HelpCircle size={15} className="text-[#D97706] shrink-0" strokeWidth={1.5} />
                    <span className="text-[12px] text-[#0F172A] flex-1">{item.q}</span>
                    <motion.div animate={{ rotate: expandedFaq === i ? 90 : 0 }}>
                      <ChevronRight size={14} className="text-gray-300" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {expandedFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 pt-0">
                          <div className="p-3 rounded-xl bg-gray-50/80">
                            <p className="text-[11px] text-gray-500 leading-relaxed">{item.a}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
            <div className="h-8" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
