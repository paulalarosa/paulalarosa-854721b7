import React from "react";
import { ChevronLeft, Send, Check, Car, Home as HomeIcon, Heart, Briefcase, Zap, Shield } from "lucide-react";
import { akad } from "./akad-theme";
import { motion } from "motion/react";

const insuranceTypes = [
  { id: "auto", label: "Auto", icon: Car },
  { id: "residencial", label: "Residencial", icon: HomeIcon },
  { id: "vida", label: "Vida", icon: Heart },
  { id: "empresarial", label: "Empresarial", icon: Briefcase },
  { id: "cyber", label: "Cyber", icon: Zap },
];

interface SendQuoteScreenProps {
  clientName: string;
  onBack: () => void;
}

export function SendQuoteScreen({ clientName, onBack }: SendQuoteScreenProps) {
  const [selected, setSelected] = React.useState<string | null>(null);
  const [sent, setSent] = React.useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => onBack(), 1500);
  };

  return (
    <>
      <nav className="px-5 pt-2 pb-1 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer"
          style={{ background: akad.surface }}
          aria-label="Voltar"
        >
          <ChevronLeft size={20} color={akad.text} />
        </button>
        <span style={{ fontSize: "14px", fontWeight: 600, color: akad.text }}>
          Enviar Cotação
        </span>
        <div className="w-10" aria-hidden="true" />
      </nav>

      <main className="flex-1 px-5 pt-4 pb-6 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {sent ? (
          <motion.div
            className="flex flex-col items-center justify-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
              style={{ background: akad.successSoft }}>
              <Check size={28} color={akad.success} strokeWidth={2.5} />
            </div>
            <p style={{ fontSize: "18px", fontWeight: 700, color: akad.text }}>Cotação Enviada!</p>
            <p style={{ fontSize: "13px", color: akad.textTertiary, marginTop: "4px", textAlign: "center" }}>
              {clientName} receberá por e-mail
            </p>
          </motion.div>
        ) : (
          <>
            <div className="rounded-[20px] p-4 mb-5 flex items-center gap-3"
              style={{ background: akad.surface }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: akad.gradientMixed }}>
                <span style={{ color: "#fff", fontSize: "14px", fontWeight: 700 }}>
                  {clientName.split(" ").slice(0, 2).map(n => n[0]).join("")}
                </span>
              </div>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 600, color: akad.text }}>{clientName}</p>
                <p style={{ fontSize: "12px", color: akad.textTertiary }}>Destinatário da cotação</p>
              </div>
            </div>

            <p style={{ fontSize: "11px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", paddingLeft: "4px" }}>
              Tipo de Seguro
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {insuranceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelected(type.id)}
                  className="rounded-[16px] p-4 flex items-center gap-3 cursor-pointer text-left"
                  style={{
                    background: selected === type.id ? akad.pinkSoft : akad.card,
                    border: selected === type.id ? `2px solid ${akad.pink}` : `1px solid ${akad.border}`,
                    boxShadow: selected === type.id ? "none" : akad.shadow,
                  }}
                  aria-label={type.label}
                  aria-pressed={selected === type.id}
                >
                  <type.icon size={18} color={selected === type.id ? akad.pink : akad.textTertiary} />
                  <span style={{ fontSize: "13px", fontWeight: 600, color: selected === type.id ? akad.pink : akad.text }}>
                    {type.label}
                  </span>
                </button>
              ))}
            </div>

            <p style={{ fontSize: "11px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "10px", paddingLeft: "4px" }}>
              Observações
            </p>
            <textarea
              placeholder="Adicione notas para a cotação..."
              className="w-full rounded-[14px] px-4 py-3.5 outline-none bg-transparent resize-none placeholder:text-[#A09CB8]"
              style={{ background: akad.surface, color: akad.text, fontSize: "14px", fontWeight: 500, minHeight: "80px", border: "1px solid transparent", lineHeight: 1.5 }}
              aria-label="Observações"
            />

            <button
              onClick={handleSend}
              disabled={!selected}
              className="w-full rounded-[16px] p-4 flex items-center justify-center gap-2 cursor-pointer mt-5"
              style={{
                background: selected ? akad.gradientPrimary : akad.surface,
                boxShadow: selected ? "0 8px 24px rgba(26,16,84,0.2)" : "none",
                opacity: selected ? 1 : 0.5,
              }}
              aria-label="Enviar cotação"
            >
              <Send size={16} color={selected ? "#fff" : akad.textTertiary} />
              <span style={{ fontSize: "14px", fontWeight: 600, color: selected ? "#fff" : akad.textTertiary }}>
                Enviar Cotação
              </span>
            </button>
          </>
        )}
      </main>
    </>
  );
}
