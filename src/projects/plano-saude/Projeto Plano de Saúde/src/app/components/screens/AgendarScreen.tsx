import { motion } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { SubHeader } from "../SubHeader";
import { ImageWithFallback } from "../figma/ImageWithFallback";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const specialties = [
  "Clínico Geral", "Cardiologia", "Dermatologia", "Ortopedia", "Oftalmologia", "Neurologia", "Pediatria", "Psicologia",
];

const timeSlots = ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"];

const days = [
  { label: "S", num: 3, available: true },
  { label: "T", num: 4, available: true },
  { label: "Q", num: 5, available: true },
  { label: "Q", num: 6, available: false },
  { label: "S", num: 7, available: true },
  { label: "S", num: 8, available: false },
  { label: "D", num: 9, available: false },
];

export function AgendarScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [spec, setSpec] = useState<string | null>(null);
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [mode, setMode] = useState<"presencial" | "online" | null>(null);

  const canProceed = step === 0 ? !!spec : step === 1 ? !!mode : step === 2 ? !!day && !!time : false;

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  return (
    <>
      <SubHeader title="Agendar Consulta" subtitle={`Etapa ${step + 1} de 4`} />

      {/* Progress */}
      <motion.div className="px-5 pb-5" variants={fade(0)} initial="hidden" animate="visible">
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((s) => (
            <div key={s} className="flex-1 h-[3px] rounded-full transition-all" style={{ background: s <= step ? "#6C5CE7" : "#F0F0F5" }} />
          ))}
        </div>
      </motion.div>

      {/* Step 0: Specialty */}
      {step === 0 && (
        <motion.div className="px-5 pb-6" variants={fade(1)} initial="hidden" animate="visible">
          <p className="mb-4" style={{ fontSize: "18px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.02em" }}>
            Qual especialidade?
          </p>
          <div className="grid grid-cols-2 gap-2">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setSpec(s)}
                className="text-left p-3.5 rounded-2xl outline-none transition-all active:scale-[0.97]"
                style={{
                  background: spec === s ? "#0F0F23" : "#fff",
                  border: `1px solid ${spec === s ? "#0F0F23" : "rgba(0,0,0,0.05)"}`,
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: 600, color: spec === s ? "#fff" : "#0F0F23" }}>{s}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 1: Mode */}
      {step === 1 && (
        <motion.div className="px-5 pb-6" variants={fade(1)} initial="hidden" animate="visible">
          <p className="mb-4" style={{ fontSize: "18px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.02em" }}>
            Como prefere?
          </p>
          <div className="space-y-2.5">
            {([
              { key: "presencial" as const, title: "Presencial", desc: "Vá ao consultório do médico", icon: "🏥", color: "#6C5CE7" },
              { key: "online" as const, title: "Telemedicina", desc: "Consulte por vídeo de casa", icon: "📱", color: "#00C48C" },
            ]).map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className="w-full text-left p-4 rounded-2xl outline-none transition-all active:scale-[0.98] flex items-center gap-3.5"
                style={{
                  background: mode === m.key ? "#0F0F23" : "#fff",
                  border: `1px solid ${mode === m.key ? "#0F0F23" : "rgba(0,0,0,0.05)"}`,
                }}
              >
                <span style={{ fontSize: "28px" }}>{m.icon}</span>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 700, color: mode === m.key ? "#fff" : "#0F0F23" }}>{m.title}</p>
                  <p style={{ fontSize: "11px", fontWeight: 400, color: mode === m.key ? "rgba(255,255,255,0.5)" : "#8F8FA3" }}>{m.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 2: Date + Time */}
      {step === 2 && (
        <motion.div className="px-5 pb-6" variants={fade(1)} initial="hidden" animate="visible">
          <p className="mb-4" style={{ fontSize: "18px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.02em" }}>
            Quando?
          </p>
          <p className="mb-2" style={{ fontSize: "12px", fontWeight: 600, color: "#8F8FA3" }}>Março 2026</p>
          <div className="flex gap-1.5 mb-5">
            {days.map((d) => (
              <button
                key={d.num}
                disabled={!d.available}
                onClick={() => setDay(d.num)}
                className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl outline-none transition-all disabled:opacity-30"
                style={{ background: day === d.num ? "#0F0F23" : "transparent", border: `1px solid ${day === d.num ? "#0F0F23" : "rgba(0,0,0,0.05)"}` }}
              >
                <span style={{ fontSize: "10px", fontWeight: 500, color: day === d.num ? "rgba(255,255,255,0.5)" : "#B0B0C4" }}>{d.label}</span>
                <span style={{ fontSize: "15px", fontWeight: 700, color: day === d.num ? "#fff" : "#0F0F23" }}>{d.num}</span>
              </button>
            ))}
          </div>
          <p className="mb-2" style={{ fontSize: "12px", fontWeight: 600, color: "#8F8FA3" }}>Horário</p>
          <div className="grid grid-cols-4 gap-2">
            {timeSlots.map((t) => (
              <button
                key={t}
                onClick={() => setTime(t)}
                className="py-2.5 rounded-xl outline-none transition-all active:scale-95"
                style={{
                  background: time === t ? "#6C5CE7" : "#fff",
                  border: `1px solid ${time === t ? "#6C5CE7" : "rgba(0,0,0,0.05)"}`,
                  fontSize: "12px", fontWeight: 600, color: time === t ? "#fff" : "#0F0F23",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <motion.div className="px-5 pb-6" variants={fade(1)} initial="hidden" animate="visible">
          <p className="mb-5" style={{ fontSize: "18px", fontWeight: 800, color: "#0F0F23", letterSpacing: "-0.02em" }}>
            Confirme sua consulta
          </p>
          <div className="rounded-2xl p-5 mb-4" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0" style={{ background: "#F0F0F5" }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1642975967602-653d378f3b5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwc21pbGluZyUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MTkzNzQwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Dr. Roberto Almeida" className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p style={{ fontSize: "15px", fontWeight: 700, color: "#0F0F23" }}>Dr. Roberto Almeida</p>
                <p style={{ fontSize: "12px", fontWeight: 400, color: "#8F8FA3" }}>{spec}</p>
              </div>
            </div>
            <div className="space-y-2.5">
              {[
                { label: "Modalidade", value: mode === "online" ? "Telemedicina" : "Presencial" },
                { label: "Data", value: day ? `${day} Mar 2026` : "—" },
                { label: "Horário", value: time || "—" },
                { label: "Custo", value: "R$ 0 (coberto pelo plano)" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid #F5F5FA" }}>
                  <span style={{ fontSize: "12px", fontWeight: 400, color: "#8F8FA3" }}>{r.label}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#0F0F23" }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => navigate("/agenda")}
            className="w-full py-3.5 rounded-2xl outline-none transition-transform active:scale-[0.98]"
            style={{ background: "#6C5CE7", fontSize: "14px", fontWeight: 700, color: "#fff" }}
          >
            Confirmar agendamento
          </button>
        </motion.div>
      )}

      {/* Bottom CTA */}
      {step < 3 && (
        <div className="px-5 pb-6">
          <button
            onClick={handleNext}
            disabled={!canProceed}
            className="w-full py-3.5 rounded-2xl outline-none transition-all active:scale-[0.98] disabled:opacity-30"
            style={{ background: "#0F0F23", fontSize: "14px", fontWeight: 700, color: "#fff" }}
          >
            Continuar
          </button>
        </div>
      )}
    </>
  );
}
