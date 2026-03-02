import React from "react";
import { ChevronLeft, UserPlus, Check } from "lucide-react";
import { akad } from "./akad-theme";
import { motion } from "motion/react";

interface NewClientScreenProps {
  onBack: () => void;
}

export function NewClientScreen({ onBack }: NewClientScreenProps) {
  const [saved, setSaved] = React.useState(false);

  const fields = [
    { label: "Nome Completo", placeholder: "Ex: Maria Silva", type: "text" },
    { label: "CPF / CNPJ", placeholder: "000.000.000-00", type: "text" },
    { label: "E-mail", placeholder: "cliente@email.com", type: "email" },
    { label: "Telefone", placeholder: "(00) 00000-0000", type: "tel" },
    { label: "Cidade", placeholder: "São Paulo, SP", type: "text" },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => onBack(), 1200);
  };

  return (
    <>
      <nav className="px-5 pt-2 pb-1 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl flex items-center justify-center cursor-pointer"
          style={{ background: akad.surface }}
          aria-label="Voltar para clientes"
        >
          <ChevronLeft size={20} color={akad.text} />
        </button>
        <span style={{ fontSize: "14px", fontWeight: 600, color: akad.text }}>
          Novo Cliente
        </span>
        <div className="w-10" aria-hidden="true" />
      </nav>

      <main className="flex-1 px-5 pt-4 pb-6 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {saved ? (
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
            <p style={{ fontSize: "18px", fontWeight: 700, color: akad.text }}>Cliente Cadastrado!</p>
            <p style={{ fontSize: "13px", color: akad.textTertiary, marginTop: "4px" }}>Redirecionando...</p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 rounded-[18px] flex items-center justify-center"
                style={{ background: akad.gradientMixed }}>
                <UserPlus size={22} color="#fff" />
              </div>
              <div>
                <p style={{ fontSize: "16px", fontWeight: 700, color: akad.text }}>Cadastro de Cliente</p>
                <p style={{ fontSize: "12px", color: akad.textTertiary }}>Preencha os dados abaixo</p>
              </div>
            </div>

            {fields.map((field, i) => (
              <motion.div
                key={field.label}
                className="mb-3"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
              >
                <label style={{ fontSize: "11px", color: akad.textTertiary, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 500, display: "block", marginBottom: "6px", paddingLeft: "4px" }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full rounded-[14px] px-4 py-3.5 outline-none bg-transparent placeholder:text-[#A09CB8]"
                  style={{ background: akad.surface, color: akad.text, fontSize: "14px", fontWeight: 500, border: "1px solid transparent", lineHeight: 1.4 }}
                  onFocus={(e) => { e.currentTarget.style.border = `1px solid ${akad.pink}`; e.currentTarget.style.background = akad.card; }}
                  onBlur={(e) => { e.currentTarget.style.border = "1px solid transparent"; e.currentTarget.style.background = akad.surface; }}
                  aria-label={field.label}
                />
              </motion.div>
            ))}

            <div className="mb-3">
              <label style={{ fontSize: "11px", color: akad.textTertiary, letterSpacing: "1px", textTransform: "uppercase", fontWeight: 500, display: "block", marginBottom: "6px", paddingLeft: "4px" }}>
                Tipo de Seguro Interesse
              </label>
              <div className="flex flex-wrap gap-2">
                {["Auto", "Residencial", "Vida", "Empresarial", "Cyber"].map((t) => (
                  <button key={t} className="px-3.5 py-2 rounded-full cursor-pointer"
                    style={{ background: akad.surface, fontSize: "12px", fontWeight: 500, color: akad.textSecondary }}
                    aria-label={`Selecionar ${t}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleSave}
              className="w-full rounded-[16px] p-4 flex items-center justify-center gap-2 cursor-pointer mt-4"
              style={{ background: akad.gradientAccent, boxShadow: "0 8px 24px rgba(230,0,126,0.2)" }}
              aria-label="Cadastrar cliente"
            >
              <UserPlus size={17} color="#fff" />
              <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>Cadastrar Cliente</span>
            </button>
          </>
        )}
      </main>
    </>
  );
}
