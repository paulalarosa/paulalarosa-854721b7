import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import { Activity, Stethoscope, FlaskConical, Brain, Heart, Eye } from "lucide-react";

const usageStats = [
  { label: "Consultas", count: 8, limit: 12, icon: Stethoscope },
  { label: "Exames Lab.", count: 4, limit: 20, icon: FlaskConical },
  { label: "Sessões de Terapia", count: 15, limit: 24, icon: Brain },
  { label: "Exames de Imagem", count: 1, limit: 6, icon: Eye },
  { label: "Especialistas", count: 5, limit: 8, icon: Heart },
];

const recentActivity = [
  { id: 1, provider: "Dr. Marcelo Ximenes", date: "15 Fev 2026", category: "Psiquiatria" },
  { id: 2, provider: "Lab Klini - Barra", date: "8 Fev 2026", category: "Hemograma" },
  { id: 3, provider: "Dra. Patricia Sodre", date: "22 Jan 2026", category: "Cardiologia" },
  { id: 4, provider: "Imagem Klini - Botafogo", date: "15 Jan 2026", category: "Raio-X Tórax" },
  { id: 5, provider: "CM Klini - Copacabana", date: "10 Jan 2026", category: "Fisioterapia" },
];

export function Usage() {
  const totalUsed = usageStats.reduce((a, b) => a + b.count, 0);
  const totalLimit = usageStats.reduce((a, b) => a + b.limit, 0);
  const overallPercentage = Math.round((totalUsed / totalLimit) * 100);

  return (
    <div className="pb-4">
      <PageHeader title="Utilização" />

      {/* Uso geral */}
      <div className="px-5 pt-1">
        <div
          className="bg-white rounded-[20px] p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
              style={{ background: "linear-gradient(135deg, #E8F6F4, #F0FAF9)" }}
            >
              <Activity size={24} className="text-[#2D9F93]" />
            </div>
            <div>
              <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase">Uso Anual</p>
              <p className="text-[26px] text-[#1a1a2e] tracking-[-0.03em] leading-none mt-1">
                {overallPercentage}%
              </p>
            </div>
          </div>

          <div className="h-2 rounded-full bg-[#F0F1F3] overflow-hidden" role="progressbar" aria-valuenow={overallPercentage} aria-valuemin={0} aria-valuemax={100} aria-label="Uso anual do plano">
            <motion.div
              className="h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${overallPercentage}%` }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{ background: "linear-gradient(90deg, #2D9F93, #3DB4A7)" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-[#9a9aaa]">{totalUsed} utilizados</span>
            <span className="text-[11px] text-[#9a9aaa]">{totalLimit} disponíveis</span>
          </div>
        </div>
      </div>

      {/* Por categoria */}
      <div className="px-5 pt-5">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">Por Categoria</p>
        <div className="flex flex-col gap-2.5">
          {usageStats.map((stat, index) => {
            const percentage = Math.round((stat.count / stat.limit) * 100);
            const isHigh = percentage >= 75;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="bg-white rounded-[20px] p-4"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-[12px] bg-[#FAFBFC] flex items-center justify-center">
                    <stat.icon size={16} className="text-[#7a7a8a]" strokeWidth={1.7} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#1a1a2e]">{stat.label}</span>
                      <span className="text-[12px] text-[#9a9aaa]">
                        {stat.count}/{stat.limit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="h-1.5 rounded-full bg-[#F0F1F3] overflow-hidden" role="progressbar" aria-label={`Uso de ${stat.label}`} aria-valuenow={stat.count} aria-valuemax={stat.limit}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.6, delay: index * 0.06 + 0.2 }}
                    style={{
                      background: isHigh
                        ? "linear-gradient(90deg, #E8A04C, #F0B86E)"
                        : "linear-gradient(90deg, #2D9F93, #3DB4A7)",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Atividade recente */}
      <div className="px-5 pt-5">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">Atividade Recente</p>
        <div
          className="bg-white rounded-[20px] overflow-hidden"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          {recentActivity.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
              className={`px-4 py-3.5 flex items-center gap-3 ${
                index < recentActivity.length - 1 ? "border-b border-[#F0F1F3]" : ""
              }`}
            >
              <div className="w-1 h-8 rounded-full bg-[#2D9F93]/20" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] text-[#1a1a2e] truncate">{item.category}</p>
                <p className="text-[11px] text-[#B0B4BC]">{item.provider}</p>
              </div>
              <span className="text-[11px] text-[#B0B4BC] shrink-0">{item.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
