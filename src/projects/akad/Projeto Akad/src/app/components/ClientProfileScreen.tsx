import { ChevronLeft, Phone, Mail, Shield, Clock, FileCheck, Send, MapPin, MessageCircle } from "lucide-react";
import { akad } from "./akad-theme";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

const avatarUrl = "https://images.unsplash.com/photo-1740153204804-200310378f2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwYnVzaW5lc3MlMjBhdmF0YXJ8ZW58MXx8fHwxNzcxOTI5NDI0fDA&ixlib=rb-4.1.0&q=80&w=1080";

const activePolicies = [
  { name: "Auto Premium", value: "R$ 4.200/ano", status: "Ativa" },
  { name: "Residencial Plus", value: "R$ 2.800/ano", status: "Ativa" },
  { name: "Vida Individual", value: "R$ 1.500/ano", status: "Ativa" },
];

const pendingQuotes = [
  { name: "Cyber Empresarial", value: "R$ 8.400/ano", days: "3 dias" },
  { name: "Frota Comercial", value: "R$ 22.000/ano", days: "1 dia" },
];

interface ClientProfileScreenProps {
  onBack: () => void;
  onSendQuote: () => void;
}

export function ClientProfileScreen({ onBack, onSendQuote }: ClientProfileScreenProps) {
  return (
    <>
      <nav className="px-4 pt-1 pb-1 flex items-center justify-between">
        <button onClick={onBack}
          className="w-9 h-9 rounded-[12px] flex items-center justify-center cursor-pointer"
          style={{ background: akad.surface }} aria-label="Voltar">
          <ChevronLeft size={18} color={akad.text} />
        </button>
        <span style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>Perfil</span>
        <button className="w-9 h-9 rounded-[12px] flex items-center justify-center cursor-pointer"
          style={{ background: akad.surface }} aria-label="Mensagem">
          <MessageCircle size={16} color={akad.text} />
        </button>
      </nav>

      <section className="flex flex-col items-center px-5 pt-3 pb-2" aria-label="Informações do cliente">
        <motion.div className="relative"
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, type: "spring", stiffness: 300, damping: 20 }}>
          <div className="w-[72px] h-[72px] rounded-[22px] overflow-hidden"
            style={{ boxShadow: `0 6px 24px rgba(230,0,126,0.1), 0 0 0 2px ${akad.bg}` }}>
            <ImageWithFallback src={avatarUrl} alt="Ana Carolina Silva" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: akad.gradientAccent, boxShadow: "0 2px 6px rgba(230,0,126,0.25)" }}>
            <Shield size={11} color="#fff" />
          </div>
        </motion.div>
        <h2 style={{ color: akad.text, fontSize: "20px", fontWeight: 700, marginTop: "10px", letterSpacing: "-0.5px" }}>
          Ana Carolina Silva
        </h2>
        <div className="flex items-center gap-1 mt-0.5">
          <MapPin size={11} color={akad.textTertiary} />
          <p style={{ color: akad.textTertiary, fontSize: "12px" }}>São Paulo, SP</p>
        </div>

        <div className="flex items-center gap-2 mt-3" role="group" aria-label="Ações rápidas">
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-full cursor-pointer"
            style={{ background: akad.surface }} aria-label="Ligar">
            <Phone size={13} color={akad.pink} />
            <span style={{ fontSize: "12px", color: akad.text, fontWeight: 500 }}>Ligar</span>
          </button>
          <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-full cursor-pointer"
            style={{ background: akad.surface }} aria-label="E-mail">
            <Mail size={13} color={akad.blueLight} />
            <span style={{ fontSize: "12px", color: akad.text, fontWeight: 500 }}>E-mail</span>
          </button>
        </div>
      </section>

      <main className="flex-1 px-4 pb-20 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <motion.section className="rounded-[18px] p-4 mb-2.5"
          style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.08 }} aria-label="Apólices ativas">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: akad.successSoft }}>
                <FileCheck size={12} color={akad.success} />
              </div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: akad.text, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                Apólices Ativas
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full"
              style={{ background: akad.successSoft, color: akad.success, fontSize: "11px", fontWeight: 600 }}>
              {activePolicies.length}
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {activePolicies.map((p, i) => (
              <li key={i} className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>{p.name}</p>
                  <p style={{ fontSize: "11px", color: akad.textTertiary }}>{p.value}</p>
                </div>
                <span className="px-2 py-0.5 rounded-full"
                  style={{ background: akad.successSoft, color: akad.success, fontSize: "10px", fontWeight: 600 }}>
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section className="rounded-[18px] p-4"
          style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.12 }} aria-label="Cotações pendentes">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: akad.warningSoft }}>
                <Clock size={12} color={akad.warning} />
              </div>
              <span style={{ fontSize: "11px", fontWeight: 700, color: akad.text, letterSpacing: "0.8px", textTransform: "uppercase" }}>
                Cotações Pendentes
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full"
              style={{ background: akad.warningSoft, color: akad.warning, fontSize: "11px", fontWeight: 600 }}>
              {pendingQuotes.length}
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {pendingQuotes.map((q, i) => (
              <li key={i} className="flex items-center justify-between">
                <div>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>{q.name}</p>
                  <p style={{ fontSize: "11px", color: akad.textTertiary }}>{q.value}</p>
                </div>
                <span style={{ fontSize: "10px", color: akad.warning, fontWeight: 500 }}>há {q.days}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </main>

      <motion.div
        className="absolute bottom-4 left-4 right-4 z-10"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 0px)" }}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}>
        <button
          onClick={onSendQuote}
          className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl cursor-pointer"
          style={{ background: akad.gradientPrimary, boxShadow: "0 10px 32px rgba(26,16,84,0.3)" }}
          aria-label="Enviar cotação para Ana Carolina Silva">
          <Send size={15} color={akad.pinkLight} />
          <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>Enviar Cotação</span>
        </button>
      </motion.div>
    </>
  );
}
