import { motion } from "motion/react";
import { SubHeader } from "../SubHeader";

const fade = (i: number) => ({
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
});

const fields = [
  { label: "Nome completo", value: "Mariana Santos Silva" },
  { label: "CPF", value: "***.***.***-42" },
  { label: "Data de nascimento", value: "15/06/1990" },
  { label: "Telefone", value: "(11) 98765-4321" },
  { label: "E-mail", value: "mariana.silva@email.com" },
  { label: "Endereço", value: "Rua das Flores, 230 — São Paulo, SP" },
  { label: "Tipo sanguíneo", value: "O+" },
  { label: "Alergias", value: "Dipirona (leve)" },
];

export function DadosPessoaisScreen() {
  return (
    <>
      <SubHeader
        title="Dados Pessoais"
        action={
          <button className="px-3 py-1.5 rounded-lg outline-none transition-transform active:scale-95" style={{ background: "#F3F1FE", fontSize: "10px", fontWeight: 700, color: "#6C5CE7" }}>
            Editar
          </button>
        }
      />
      <motion.div className="px-5 pb-6" variants={fade(0)} initial="hidden" animate="visible">
        <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.04)" }}>
          {fields.map((f, i) => (
            <div key={f.label} className="px-4 py-3.5" style={{ borderBottom: i < fields.length - 1 ? "1px solid #F5F5FA" : "none" }}>
              <p style={{ fontSize: "10px", fontWeight: 600, color: "#8F8FA3", letterSpacing: "0.04em", marginBottom: "2px" }}>{f.label}</p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#0F0F23" }}>{f.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </>
  );
}
