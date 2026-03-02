import { useState } from "react";
import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import { Check, Globe } from "lucide-react";

const languages = [
  { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷", active: true },
  { code: "en", name: "English", flag: "🇺🇸", active: false },
  { code: "es", name: "Español", flag: "🇪🇸", active: false },
];

export function Language() {
  const [selected, setSelected] = useState("pt-BR");

  return (
    <div className="pb-4">
      <PageHeader title="Idioma" backTo="/profile" />

      <div className="px-5 pt-1 pb-2">
        <div
          className="bg-white rounded-[20px] p-5 flex items-center gap-4"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #E8F6F4, #F0FAF9)" }}
          >
            <Globe size={22} className="text-[#2D9F93]" />
          </div>
          <div>
            <p className="text-[15px] text-[#1a1a2e] tracking-[-0.01em]">Idioma do App</p>
            <p className="text-[12px] text-[#9a9aaa]">Escolha o idioma de exibição</p>
          </div>
        </div>
      </div>

      <div className="px-5 pt-3">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Disponíveis</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          {languages.map((lang, index) => (
            <motion.button
              key={lang.code}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => setSelected(lang.code)}
              className={`w-full px-5 py-4 flex items-center gap-4 text-left cursor-pointer hover:bg-[#FAFBFC] transition-colors ${
                index < languages.length - 1 ? "border-b border-[#F5F5F7]" : ""
              }`}
              aria-pressed={selected === lang.code}
            >
              <span className="text-[24px]">{lang.flag}</span>
              <div className="flex-1">
                <p className="text-[14px] text-[#1a1a2e]">{lang.name}</p>
              </div>
              {selected === lang.code && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-6 h-6 rounded-full bg-[#2D9F93] flex items-center justify-center"
                >
                  <Check size={14} className="text-white" strokeWidth={2.5} />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
