import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { SubHeader } from "../SubHeader";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const faqs = [
  { id: "1", q: "Como agendar uma consulta?", a: "Acesse a aba Agenda ou toque em \"Telemedicina\" na tela inicial. Escolha a especialidade, modalidade e horário disponível." },
  { id: "2", q: "Como acessar meus exames?", a: "Na tela inicial, toque em \"Exames\" ou acesse pelo menu de ações rápidas. Resultados ficam disponíveis assim que liberados pelo laboratório." },
  { id: "3", q: "Como funciona a telemedicina?", a: "Escolha um médico disponível, agende ou inicie imediatamente. A consulta acontece por vídeo dentro do app, com total sigilo." },
  { id: "4", q: "Como adicionar dependentes?", a: "Vá em Perfil > Dependentes > + Adicionar. Informe os dados e o dependente será incluído em até 24h." },
  { id: "5", q: "Como solicitar reembolso?", a: "Acesse Documentos, toque em \"Nova solicitação\" e envie os comprovantes. O prazo é de até 30 dias úteis." },
  { id: "6", q: "Como trocar de plano?", a: "Entre em contato pelo chat 24h ou ligue para a Central Viva Saúde. Nossos consultores encontrarão o melhor plano para você." },
];

export function AjudaScreen() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    (f) => f.q.toLowerCase().includes(search.toLowerCase()) || f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <SubHeader title="Central de Ajuda" />

      {/* Search */}
      <motion.div className="px-5 pb-4" variants={fade(0)} initial="hidden" animate="visible">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.05)" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B0B0C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar pergunta..."
            className="flex-1 bg-transparent outline-none" style={{ fontSize: "13px", fontWeight: 400, color: "#0F0F23" }}
            aria-label="Buscar na central de ajuda"
          />
        </div>
      </motion.div>

      {/* Quick links */}
      <motion.div className="px-5 pb-4" variants={fade(1)} initial="hidden" animate="visible">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate("/perfil/chat")}
            className="flex items-center gap-2.5 p-3.5 rounded-2xl outline-none transition-transform active:scale-[0.97]"
            style={{ background: "#6C5CE7" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
            </svg>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#fff" }}>Chat 24h</p>
              <p style={{ fontSize: "9px", fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>Online agora</p>
            </div>
          </button>
          <button
            className="flex items-center gap-2.5 p-3.5 rounded-2xl outline-none transition-transform active:scale-[0.97]"
            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.05)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F0F23" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#0F0F23" }}>Ligar</p>
              <p style={{ fontSize: "9px", fontWeight: 400, color: "#8F8FA3" }}>0800 123 4567</p>
            </div>
          </button>
        </div>
      </motion.div>

      {/* FAQs */}
      <div className="px-5 pb-6">
        <p className="px-1 mb-2.5" style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#8F8FA3" }}>
          PERGUNTAS FREQUENTES
        </p>
        {filtered.map((faq, i) => (
          <motion.div key={faq.id} variants={fade(2 + i * 0.3)} initial="hidden" animate="visible" className="mb-2">
            <button
              onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}
              className="w-full text-left rounded-2xl p-4 outline-none transition-all"
              style={{ background: "#fff", border: `1px solid ${expanded === faq.id ? "rgba(108,92,231,0.15)" : "rgba(0,0,0,0.04)"}` }}
              aria-expanded={expanded === faq.id}
            >
              <div className="flex items-center gap-3">
                <p className="flex-1" style={{ fontSize: "13px", fontWeight: 700, color: "#0F0F23" }}>{faq.q}</p>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C8C8D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 transition-transform" style={{ transform: expanded === faq.id ? "rotate(90deg)" : "rotate(0deg)" }}>
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
              {expanded === faq.id && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                  style={{ fontSize: "12px", fontWeight: 400, color: "#8F8FA3", lineHeight: 1.6, marginTop: "8px", paddingTop: "8px", borderTop: "1px solid #F5F5FA" }}
                >
                  {faq.a}
                </motion.p>
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </>
  );
}
