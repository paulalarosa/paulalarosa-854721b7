import { useState } from "react";
import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import { Copy, CheckCircle2, Share2, Download, QrCode } from "lucide-react";

export function DigitalCard() {
  const [copied, setCopied] = useState<string | null>(null);
  const [showQr, setShowQr] = useState(false);

  const handleCopy = (field: string, value: string) => {
    navigator.clipboard?.writeText(value);
    setCopied(field);
    setTimeout(() => setCopied(null), 1500);
  };

  const cardFields = [
    { label: "Nome", value: "Paula Rosa de Souza" },
    { label: "Nº Cartão", value: "0144 0672 2300", copyable: true },
    { label: "CPF", value: "•••.•••.789-00" },
    { label: "Plano", value: "Klini Start PJ QC" },
    { label: "Tipo", value: "Empresarial" },
    { label: "Abrangência", value: "Nacional" },
    { label: "Acomodação", value: "Enfermaria" },
    { label: "Rede", value: "Cobertura Total" },
    { label: "ANS", value: "412.345/22-1", copyable: true },
    { label: "Validade", value: "31/12/2026" },
    { label: "Data de Adesão", value: "01/01/2026" },
    { label: "Empresa", value: "Klini Digital Ltda." },
  ];

  return (
    <div className="pb-4">
      <PageHeader title="Carteirinha Digital" />

      {/* Card visual */}
      <div className="px-5 pt-1">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="rounded-[24px] p-6 relative overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #2A9B8F 0%, #35A99D 35%, #D4944A 75%, #D07048 100%)",
            aspectRatio: "1.6 / 1",
          }}
        >
          <div className="absolute top-[-30px] right-[-20px] w-[140px] h-[140px] rounded-full bg-white/[0.06]" />
          <div className="absolute bottom-[-15px] left-[-15px] w-[80px] h-[80px] rounded-full bg-white/[0.04]" />

          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-[6px] h-[6px] rounded-full bg-emerald-300 animate-pulse" />
                <span className="text-white/80 text-[10px] tracking-widest uppercase">Ativo</span>
              </div>
              <span className="text-white/60 text-[12px] tracking-[0.2em]">KLINI</span>
            </div>

            <div>
              <p className="text-white text-[17px] tracking-[-0.01em]">Paula Rosa de Souza</p>
              <p className="text-white/60 text-[13px] tracking-wider mt-1">0144 0672 2300</p>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-white/40 text-[9px] tracking-wider uppercase">Plano</p>
                <p className="text-white/80 text-[11px]">Klini Start PJ QC</p>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-[9px] tracking-wider uppercase">Validade</p>
                <p className="text-white/80 text-[11px]">12/2026</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ações rápidas */}
      <div className="px-5 pt-4 flex gap-2.5">
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowQr(!showQr)}
          className="flex-1 bg-white rounded-[16px] py-3.5 flex items-center justify-center gap-2 cursor-pointer"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <QrCode size={16} className="text-[#2D9F93]" strokeWidth={1.8} />
          <span className="text-[13px] text-[#3a3a4a]">QR Code</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="flex-1 bg-white rounded-[16px] py-3.5 flex items-center justify-center gap-2 cursor-pointer"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <Share2 size={16} className="text-[#2D9F93]" strokeWidth={1.8} />
          <span className="text-[13px] text-[#3a3a4a]">Compartilhar</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="flex-1 bg-white rounded-[16px] py-3.5 flex items-center justify-center gap-2 cursor-pointer"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <Download size={16} className="text-[#2D9F93]" strokeWidth={1.8} />
          <span className="text-[13px] text-[#3a3a4a]">Baixar</span>
        </motion.button>
      </div>

      {/* QR Code */}
      {showQr && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="px-5 pt-3 overflow-hidden"
        >
          <div
            className="bg-white rounded-[20px] p-6 flex flex-col items-center"
            style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
          >
            <div className="w-[160px] h-[160px] bg-[#F5F6F8] rounded-2xl flex items-center justify-center mb-3">
              <QrCode size={80} className="text-[#1a1a2e]" strokeWidth={0.8} />
            </div>
            <p className="text-[12px] text-[#9a9aaa]">Apresente este código na recepção</p>
          </div>
        </motion.div>
      )}

      {/* Dados do cartão */}
      <div className="px-5 pt-4">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">Dados do Beneficiário</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          {cardFields.map((field, index) => (
            <motion.div
              key={field.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className={`px-5 py-3.5 flex items-center justify-between ${
                index < cardFields.length - 1 ? "border-b border-[#F5F5F7]" : ""
              }`}
            >
              <div>
                <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase">{field.label}</p>
                <p className="text-[14px] text-[#1a1a2e] mt-0.5">{field.value}</p>
              </div>
              {field.copyable && (
                <button
                  onClick={() => handleCopy(field.label, field.value)}
                  className="text-[#C0C4CC] hover:text-[#2D9F93] transition-colors cursor-pointer p-1"
                  aria-label={`Copiar ${field.label}`}
                >
                  {copied === field.label ? (
                    <CheckCircle2 size={16} className="text-[#2D9F93]" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
