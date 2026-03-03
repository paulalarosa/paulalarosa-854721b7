import { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  QrCode,
  Car,
  Heart,
  Shield,
  CheckCircle2,
  Copy,
  Share2,
  Smartphone,
} from "lucide-react";
import { hapticLight, hapticSuccess, hapticTick } from "../haptics";

interface CarteiraScreenProps {
  onBack: () => void;
}

interface DigitalCard {
  type: "auto" | "vida";
  title: string;
  subtitle: string;
  policyNumber: string;
  validity: string;
  holder: string;
  cpf: string;
  color: string;
}

const cards: DigitalCard[] = [
  {
    type: "auto",
    title: "Seguro Auto",
    subtitle: "Hyundai HB20 2024",
    policyNumber: "AUT-2025-001847",
    validity: "15 Jan 2026",
    holder: "Ricardo Lima",
    cpf: "***.***.***-47",
    color: "#0D9488",
  },
  {
    type: "vida",
    title: "Seguro Vida",
    subtitle: "Plano Premium",
    policyNumber: "VID-2025-003291",
    validity: "01 Mar 2026",
    holder: "Ricardo Lima",
    cpf: "***.***.***-47",
    color: "#6366F1",
  },
  {
    type: "auto",
    title: "Seguro Auto",
    subtitle: "Honda Civic 2023",
    policyNumber: "AUT-2025-002103",
    validity: "10 Jun 2026",
    holder: "Ricardo Lima",
    cpf: "***.***.***-47",
    color: "#0D9488",
  },
];

export function CarteiraScreen({ onBack }: CarteiraScreenProps) {
  const [activeCard, setActiveCard] = useState(0);
  const [showQr, setShowQr] = useState(false);
  const [copied, setCopied] = useState(false);

  const card = cards[activeCard];
  const Icon = card.type === "auto" ? Car : Heart;

  const handleCopy = () => {
    hapticSuccess();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 sm:px-6">
        <div className="flex items-center gap-3 pt-2 pb-5">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => { hapticLight(); onBack(); }}
            className="w-9 h-9 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100/60 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#0D9488]"
            aria-label="Voltar"
          >
            <ChevronLeft size={16} className="text-[#0F172A]" strokeWidth={1.8} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-[20px] text-[#0F172A] tracking-tight">Carteira Digital</h1>
            <p className="text-[11px] text-gray-400">{cards.length} cartoes disponiveis</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#0F172A]/5 flex items-center justify-center">
            <QrCode size={17} className="text-[#0F172A]" strokeWidth={1.6} />
          </div>
        </div>

        {/* Card selector */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
          {cards.map((c, i) => (
            <button
              key={i}
              onClick={() => { hapticTick(); setActiveCard(i); setShowQr(false); }}
              className={`px-3.5 py-2 rounded-xl text-[10px] tracking-wide whitespace-nowrap transition-all ${
                activeCard === i
                  ? "bg-[#0F172A] text-white"
                  : "bg-white text-gray-500 border border-gray-100/60"
              }`}
            >
              {c.subtitle}
            </button>
          ))}
        </div>

        {/* Digital Card */}
        <motion.div
          key={activeCard}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl p-5 mb-5 relative overflow-hidden"
          style={{ backgroundColor: card.color }}
        >
          {/* Decorative circles */}
          <div className="absolute top-[-30px] right-[-30px] w-[120px] h-[120px] rounded-full border border-white/10" />
          <div className="absolute bottom-[-20px] left-[-20px] w-[80px] h-[80px] rounded-full border border-white/8" />

          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-white/80" strokeWidth={1.5} />
                <span className="text-[11px] text-white/70 tracking-wider uppercase">SeguroPro</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 size={11} className="text-white/80" strokeWidth={2} />
                <span className="text-[9px] text-white/70">Ativa</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/10">
                <Icon size={20} className="text-white" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[16px] text-white tracking-tight">{card.title}</p>
                <p className="text-[11px] text-white/60">{card.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-6 mb-4">
              {[
                { label: "Titular", value: card.holder },
                { label: "CPF", value: card.cpf },
                { label: "Apolice", value: card.policyNumber },
                { label: "Validade", value: card.validity },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-[8px] text-white/40 uppercase tracking-[0.1em]">{item.label}</p>
                  <p className="text-[11px] text-white/90">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* QR Code area */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => { hapticLight(); setShowQr(!showQr); }}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white border border-gray-100/60 mb-4"
        >
          <QrCode size={15} className="text-[#0F172A]" strokeWidth={1.5} />
          <span className="text-[12px] text-[#0F172A] tracking-tight">
            {showQr ? "Ocultar QR Code" : "Mostrar QR Code"}
          </span>
        </motion.button>

        {showQr && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="flex flex-col items-center py-6 rounded-2xl bg-white border border-gray-100/60 mb-4 overflow-hidden"
          >
            {/* Simulated QR Code */}
            <div className="w-[140px] h-[140px] rounded-xl bg-[#0F172A] p-3 mb-3 relative">
              <div className="w-full h-full grid grid-cols-7 grid-rows-7 gap-[2px]">
                {Array.from({ length: 49 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-[1px]"
                    style={{
                      backgroundColor: Math.random() > 0.4 ? "white" : "transparent",
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-md bg-[#0F172A] flex items-center justify-center">
                  <Shield size={14} className="text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400">Apresente este QR em oficinas credenciadas</p>
          </motion.div>
        )}

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2.5 mb-4">
          {[
            { icon: Copy, label: copied ? "Copiado!" : "Copiar N.", action: handleCopy },
            { icon: Share2, label: "Compartilhar", action: () => hapticTick() },
            { icon: Smartphone, label: "Apple Wallet", action: () => hapticTick() },
          ].map(item => (
            <motion.button
              key={item.label}
              whileTap={{ scale: 0.95 }}
              onClick={item.action}
              className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-white border border-gray-100/60"
            >
              <item.icon size={15} className={copied && item.label === "Copiado!" ? "text-[#0D9488]" : "text-gray-500"} strokeWidth={1.5} />
              <span className="text-[9px] text-gray-500 tracking-wide">{item.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Info */}
        <div className="rounded-2xl bg-[#0D9488]/5 border border-[#0D9488]/10 p-4">
          <p className="text-[11px] text-[#0D9488] mb-1">Carteira digital valida</p>
          <p className="text-[10px] text-gray-500 leading-relaxed">
            Este cartao digital tem a mesma validade que o documento fisico.
            Apresente em oficinas, hospitais e postos credenciados.
          </p>
        </div>
      </div>
      <div className="h-8" />
    </div>
  );
}
