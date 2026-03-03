import { useMemo } from "react";
import { motion } from "motion/react";
import { Sun, Moon, Sunrise, Sunset } from "lucide-react";

interface SmartGreetingProps {
  name: string;
}

export function SmartGreeting({ name }: SmartGreetingProps) {
  const { greeting, icon: Icon, ambientColor } = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return { greeting: "Bom dia", icon: Sunrise, ambientColor: "#F59E0B" };
    }
    if (hour >= 12 && hour < 18) {
      return { greeting: "Boa tarde", icon: Sun, ambientColor: "#0D9488" };
    }
    if (hour >= 18 && hour < 21) {
      return { greeting: "Boa noite", icon: Sunset, ambientColor: "#6366F1" };
    }
    return { greeting: "Boa noite", icon: Moon, ambientColor: "#6366F1" };
  }, []);

  return (
    <div className="flex items-center gap-3.5">
      <motion.div
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#0F172A] flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {/* Ambient ring */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 rounded-2xl"
          style={{ boxShadow: `inset 0 0 12px ${ambientColor}30` }}
        />
        <span className="relative text-[13px] sm:text-[14px] text-white tracking-tight">RL</span>
      </motion.div>
      <div>
        <div className="flex items-center gap-1.5">
          <p className="text-[11px] text-gray-400 tracking-wide">{greeting}</p>
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
          >
            <Icon size={11} style={{ color: ambientColor }} strokeWidth={1.8} />
          </motion.div>
        </div>
        <h1 className="text-[20px] text-[#0F172A] tracking-tight font-semibold">{name.split(" ")[0]}</h1>
      </div>
    </div>
  );
}