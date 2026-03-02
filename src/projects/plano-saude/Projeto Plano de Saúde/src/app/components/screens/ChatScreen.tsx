import { motion } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { SubHeader } from "../SubHeader";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  time: string;
}

const initialMessages: Message[] = [
  { id: "1", text: "Olá, Mariana! Sou a assistente virtual da Viva Saúde. Como posso ajudar?", sender: "bot", time: "14:30" },
];

const quickReplies = [
  "Agendar consulta",
  "2ª via do boleto",
  "Rede credenciada",
  "Falar com humano",
];

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: text.trim(), sender: "user", time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const botReplies: Record<string, string> = {
        "Agendar consulta": "Claro! Para agendar, me diga a especialidade desejada e se prefere presencial ou telemedicina.",
        "2ª via do boleto": "Vou gerar a 2ª via agora. Seu boleto de Março/2026 no valor de R$ 890,00 está disponível. Deseja que eu envie por e-mail?",
        "Rede credenciada": "Posso buscar médicos, hospitais e laboratórios perto de você. Qual especialidade precisa?",
        "Falar com humano": "Estou transferindo para um atendente. Tempo estimado: 2 minutos. Aguarde, por favor.",
      };
      const reply = botReplies[text] || "Entendi! Vou verificar essa informação. Um momento, por favor.";
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: reply, sender: "bot", time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) };
      setMessages((p) => [...p, botMsg]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <SubHeader
        title="Chat"
        subtitle="Online · resposta em segundos"
        action={
          <div className="w-2 h-2 rounded-full" style={{ background: "#00C48C", boxShadow: "0 0 6px rgba(0,196,140,0.5)" }} />
        }
      />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 pb-4" style={{ scrollbarWidth: "none" }}>
        {messages.map((msg, i) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i === 0 ? 0.1 : 0, duration: 0.25 }}
            className={`flex mb-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className="max-w-[80%] px-4 py-2.5 rounded-2xl"
              style={{
                background: msg.sender === "user" ? "#0F0F23" : "#fff",
                border: msg.sender === "bot" ? "1px solid rgba(0,0,0,0.04)" : "none",
                borderBottomRightRadius: msg.sender === "user" ? "6px" : undefined,
                borderBottomLeftRadius: msg.sender === "bot" ? "6px" : undefined,
              }}
            >
              <p style={{ fontSize: "13px", fontWeight: 400, color: msg.sender === "user" ? "#fff" : "#0F0F23", lineHeight: 1.5 }}>
                {msg.text}
              </p>
              <p style={{ fontSize: "9px", fontWeight: 400, color: msg.sender === "user" ? "rgba(255,255,255,0.35)" : "#C8C8D4", marginTop: "3px", textAlign: "right" }}>
                {msg.time}
              </p>
            </div>
          </motion.div>
        ))}

        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start mb-2.5">
            <div className="px-4 py-3 rounded-2xl flex gap-1" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)", borderBottomLeftRadius: "6px" }}>
              {[0, 1, 2].map((d) => (
                <motion.div
                  key={d} className="w-1.5 h-1.5 rounded-full" style={{ background: "#B0B0C4" }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, delay: d * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick replies */}
        {messages.length <= 1 && !typing && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {quickReplies.map((qr) => (
              <button
                key={qr}
                onClick={() => send(qr)}
                className="px-3 py-1.5 rounded-xl outline-none transition-transform active:scale-95"
                style={{ background: "#F3F1FE", fontSize: "11px", fontWeight: 600, color: "#6C5CE7", border: "1px solid #EDEAFD" }}
              >
                {qr}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-5 py-3" style={{ borderTop: "1px solid #F0F0F5", background: "#FAFAFD" }}>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-xl" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.05)" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-transparent outline-none"
              style={{ fontSize: "13px", fontWeight: 400, color: "#0F0F23" }}
              aria-label="Mensagem"
            />
          </div>
          <button
            onClick={() => send(input)}
            disabled={!input.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center outline-none transition-transform active:scale-90 disabled:opacity-30"
            style={{ background: "#6C5CE7" }}
            aria-label="Enviar mensagem"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}