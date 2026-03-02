import { useState } from "react";
import { motion } from "motion/react";
import {
  ChevronLeft,
  MapPin,
  Phone,
  Clock,
  Navigation,
  CheckCircle2,
  Truck,
  AlertCircle,
} from "lucide-react";
import { hapticLight, hapticMedium, hapticSuccess } from "../haptics";

interface GuinchoScreenProps {
  onBack: () => void;
}

type GuinchoStep = "select" | "confirm" | "tracking";

export function GuinchoScreen({ onBack }: GuinchoScreenProps) {
  const [step, setStep] = useState<GuinchoStep>("select");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const types = [
    { id: "pane", label: "Pane mecanica", desc: "Motor, bateria, pneu", icon: Truck },
    { id: "acidente", label: "Acidente", desc: "Colisao ou capotamento", icon: AlertCircle },
    { id: "outro", label: "Outro", desc: "Atolamento, enchente", icon: Navigation },
  ];

  return (
    <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
      <div className="px-5 sm:px-6">
        {/* Header */}
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
            <h1 className="text-[20px] text-[#0F172A] tracking-tight">Guincho 24h</h1>
            <p className="text-[11px] text-gray-400">Assistencia em todo Brasil</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-[#0D9488]/8 flex items-center justify-center">
            <MapPin size={17} className="text-[#0D9488]" strokeWidth={1.6} />
          </div>
        </div>

        {/* Emergency call */}
        <motion.button
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center gap-3.5 p-4 rounded-2xl bg-[#0F172A] mb-5"
        >
          <div className="w-10 h-10 rounded-xl bg-white/8 flex items-center justify-center border border-white/6">
            <Phone size={17} className="text-white" strokeWidth={1.6} />
          </div>
          <div className="flex-1 text-left">
            <p className="text-[13px] text-white tracking-tight">Ligar para central</p>
            <p className="text-[10px] text-gray-400">0800 123 4567 · Atendimento imediato</p>
          </div>
        </motion.button>

        {step === "select" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.1em] mb-3 px-0.5">Tipo de assistencia</p>
            <div className="space-y-2.5 mb-6">
              {types.map((type) => (
                <motion.button
                  key={type.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { hapticMedium(); setSelectedType(type.id); setStep("confirm"); }}
                  className={`w-full flex items-center gap-3.5 p-4 rounded-2xl border transition-all ${
                    selectedType === type.id
                      ? "bg-[#0D9488]/5 border-[#0D9488]/20"
                      : "bg-white border-gray-100/60"
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0D9488]/6 flex items-center justify-center">
                    <type.icon size={17} className="text-[#0D9488]" strokeWidth={1.5} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-[13px] text-[#0F172A] tracking-tight">{type.label}</p>
                    <p className="text-[10px] text-gray-400">{type.desc}</p>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Recent history */}
            <p className="text-[11px] text-gray-400 uppercase tracking-[0.1em] mb-3 px-0.5">Ultima solicitacao</p>
            <div className="p-4 rounded-2xl bg-white border border-gray-100/60">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  <span className="text-[11px] text-emerald-600">Concluido</span>
                </div>
                <span className="text-[10px] text-gray-300">15 Nov 2025</span>
              </div>
              <p className="text-[12px] text-[#0F172A]">Pane mecanica · HB20</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Av. Paulista, 1000 → Oficina Centro</p>
            </div>
          </motion.div>
        )}

        {step === "confirm" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="rounded-2xl bg-white border border-gray-100/60 p-5 mb-5">
              <p className="text-[11px] text-gray-400 uppercase tracking-[0.1em] mb-4">Confirmar solicitacao</p>
              <div className="space-y-3.5">
                {[
                  { label: "Tipo", value: types.find(t => t.id === selectedType)?.label },
                  { label: "Veiculo", value: "Hyundai HB20 2024" },
                  { label: "Apolice", value: "AUT-2024-001847" },
                  { label: "Localizacao", value: "Usando GPS atual" },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">{item.label}</span>
                    <span className="text-[12px] text-[#0F172A]">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2.5">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { hapticLight(); setStep("select"); }}
                className="flex-1 py-3.5 rounded-xl bg-gray-100 text-[13px] text-gray-600"
              >
                Voltar
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => { hapticSuccess(); setStep("tracking"); }}
                className="flex-1 py-3.5 rounded-xl bg-[#0D9488] text-[13px] text-white"
              >
                Solicitar guincho
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === "tracking" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="relative mx-auto w-20 h-20 mb-5">
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 2], opacity: [0.2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.6 }}
                  className="absolute inset-0 rounded-full border border-[#0D9488]"
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-2xl bg-[#0D9488] flex items-center justify-center">
                  <Truck size={24} className="text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            <h3 className="text-[18px] text-[#0F172A] tracking-tight mb-1">Guincho a caminho</h3>
            <p className="text-[12px] text-gray-400 mb-6">Tempo estimado: 15-25 minutos</p>

            <div className="rounded-2xl bg-white border border-gray-100/60 p-4 mb-4 text-left">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={13} className="text-[#0D9488]" strokeWidth={1.5} />
                <span className="text-[11px] text-[#0F172A]">Acompanhamento</span>
              </div>
              <div className="space-y-3">
                {[
                  { time: "Agora", text: "Solicitacao confirmada", done: true },
                  { time: "~5 min", text: "Guincho designado", done: true },
                  { time: "~15 min", text: "Chegada ao local", done: false },
                  { time: "~45 min", text: "Entrega na oficina", done: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center ${item.done ? "bg-[#0D9488]/10" : "bg-gray-50"}`}>
                      {item.done ? (
                        <CheckCircle2 size={11} className="text-[#0D9488]" strokeWidth={2} />
                      ) : (
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-200" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`text-[11px] ${item.done ? "text-[#0F172A]" : "text-gray-400"}`}>{item.text}</p>
                    </div>
                    <span className="text-[9px] text-gray-300">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => { hapticLight(); onBack(); }}
              className="w-full py-3.5 rounded-xl bg-[#0F172A] text-[13px] text-white"
            >
              Voltar ao inicio
            </motion.button>
          </motion.div>
        )}
      </div>
      <div className="h-8" />
    </div>
  );
}
