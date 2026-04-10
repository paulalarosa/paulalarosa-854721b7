import { useState } from "react";
import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import { LucideIcon, Sun, Moon, Monitor, Palette, Type, Maximize } from "lucide-react";

type Theme = "light" | "dark" | "system";

const themes: { value: Theme; label: string; icon: LucideIcon; description: string }[] = [
  { value: "light", label: "Claro", icon: Sun, description: "Fundo branco com texto escuro" },
  { value: "dark", label: "Escuro", icon: Moon, description: "Fundo escuro com texto claro" },
  { value: "system", label: "Sistema", icon: Monitor, description: "Seguir configuração do dispositivo" },
];

export function Appearance() {
  const [selectedTheme, setSelectedTheme] = useState<Theme>("light");
  const [textSize, setTextSize] = useState(1); // 0=small, 1=normal, 2=large

  const textSizes = ["Pequeno", "Normal", "Grande"];

  return (
    <div className="pb-4">
      <PageHeader title="Aparência" backTo="/profile" />

      {/* Tema */}
      <div className="px-4 xs:px-5 pt-1 pb-2">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Tema</p>
        <div className="flex gap-2.5">
          {themes.map((theme, index) => {
            const isSelected = selectedTheme === theme.value;
            return (
              <motion.button
                key={theme.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.06 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setSelectedTheme(theme.value)}
                className={`flex-1 rounded-[20px] p-4 flex flex-col items-center gap-3 cursor-pointer transition-all ${isSelected ? "ring-2 ring-[#2D9F93]" : ""
                  }`}
                style={{
                  background: isSelected ? "linear-gradient(135deg, #E8F6F4, #F0FAF9)" : "#fff",
                  boxShadow: "0 0 0 1px rgba(0,0,0,0.03)",
                }}
                aria-pressed={isSelected}
              >
                <div className={`w-11 h-11 rounded-[14px] flex items-center justify-center ${isSelected ? "bg-[#2D9F93]/[0.12]" : "bg-[#FAFBFC]"
                  }`}>
                  <theme.icon size={20} className={isSelected ? "text-[#2D9F93]" : "text-[#7a7a8a]"} strokeWidth={1.7} />
                </div>
                <span className={`text-[12px] ${isSelected ? "text-[#2D9F93]" : "text-[#5a5a6a]"}`}>
                  {theme.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Tamanho do texto */}
      <div className="px-5 pt-5">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Tamanho do Texto</p>
        <div
          className="bg-white rounded-[20px] p-5"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <Type size={18} className="text-[#7a7a8a]" />
            <span className="text-[13px] text-[#1a1a2e] flex-1">{textSizes[textSize]}</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#B0B4BC]">A</span>
            <div className="flex-1 relative">
              <div className="h-1 bg-[#F0F1F3] rounded-full" />
              <div className="absolute top-0 left-0 right-0 flex justify-between -mt-[3px]">
                {[0, 1, 2].map((i) => (
                  <button
                    key={i}
                    onClick={() => setTextSize(i)}
                    className="w-[10px] h-[10px] rounded-full cursor-pointer transition-colors"
                    style={{
                      background: i === textSize ? "#2D9F93" : "#E0E2E6",
                      boxShadow: i === textSize ? "0 0 0 3px rgba(45,159,147,0.15)" : "none",
                    }}
                    aria-label={textSizes[i]}
                  />
                ))}
              </div>
            </div>
            <span className="text-[15px] text-[#B0B4BC]">A</span>
          </div>

          <div className="mt-5 p-4 rounded-2xl bg-[#FAFBFC]">
            <p
              className="text-[#1a1a2e] leading-[1.5]"
              style={{ fontSize: `${13 + textSize * 2}px` }}
            >
              Exemplo de texto com o tamanho selecionado. Assim ficará o conteúdo do app.
            </p>
          </div>
        </div>
      </div>

      {/* Outras opções */}
      <div className="px-5 pt-4">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-2.5 px-1">Acessibilidade</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden divide-y divide-[#F5F5F7]"
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.03)" }}
        >
          <ToggleOption
            icon={Palette}
            label="Alto contraste"
            description="Aumentar contraste de cores"
            defaultOn={false}
            delay={0.2}
          />
          <ToggleOption
            icon={Maximize}
            label="Reduzir animações"
            description="Desativar animações de transição"
            defaultOn={false}
            delay={0.25}
          />
        </div>
      </div>
    </div>
  );
}

function ToggleOption({ icon: Icon, label, description, defaultOn = false, delay }: {
  icon: LucideIcon;
  label: string;
  description: string;
  defaultOn?: boolean;
  delay: number;
}) {
  const [enabled, setEnabled] = useState(defaultOn);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center gap-3.5 px-5 py-4"
    >
      <div className="w-10 h-10 rounded-[14px] bg-[#FAFBFC] flex items-center justify-center shrink-0">
        <Icon size={17} className="text-[#7a7a8a]" strokeWidth={1.7} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] text-[#1a1a2e]">{label}</p>
        <p className="text-[11px] text-[#B0B4BC]">{description}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-[46px] h-[28px] rounded-full p-[2px] transition-colors duration-200 cursor-pointer shrink-0 ${enabled ? "bg-[#2D9F93]" : "bg-[#E0E2E6]"
          }`}
        role="switch"
        aria-checked={enabled}
        aria-label={label}
      >
        <motion.div
          className="w-[24px] h-[24px] rounded-full bg-white"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
          animate={{ x: enabled ? 18 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </motion.div>
  );
}
