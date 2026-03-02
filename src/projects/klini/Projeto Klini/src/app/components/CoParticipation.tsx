import { motion } from "motion/react";
import { PageHeader } from "./PageHeader";
import { DollarSign, TrendingDown, Calendar, Receipt } from "lucide-react";

const monthlyData = [
  { month: "Set", amount: 45 },
  { month: "Out", amount: 120 },
  { month: "Nov", amount: 85 },
  { month: "Dez", amount: 210 },
  { month: "Jan", amount: 150 },
  { month: "Fev", amount: 65 },
];

const transactions = [
  {
    id: 1,
    procedure: "Consulta Psiquiatria",
    provider: "Dr. Marcelo Ximenes",
    date: "15 Fev 2026",
    total: "R$ 350,00",
    copay: "R$ 35,00",
    percentage: "10%",
  },
  {
    id: 2,
    procedure: "Hemograma Completo",
    provider: "Lab Klini - Barra",
    date: "8 Fev 2026",
    total: "R$ 180,00",
    copay: "R$ 18,00",
    percentage: "10%",
  },
  {
    id: 3,
    procedure: "Eletrocardiograma",
    provider: "CM Klini - Centro",
    date: "22 Jan 2026",
    total: "R$ 250,00",
    copay: "R$ 50,00",
    percentage: "20%",
  },
  {
    id: 4,
    procedure: "Consulta Dermatologia",
    provider: "CM Klini - Botafogo",
    date: "10 Jan 2026",
    total: "R$ 300,00",
    copay: "R$ 30,00",
    percentage: "10%",
  },
];

const maxAmount = Math.max(...monthlyData.map((d) => d.amount));

export function CoParticipation() {
  return (
    <div className="pb-4">
      <PageHeader title="Coparticipação" />

      {/* Cards resumo */}
      <div className="px-5 pt-1 flex gap-2.5">
        <div
          className="flex-1 bg-white rounded-[20px] p-4"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="w-9 h-9 rounded-[12px] bg-[#2D9F93]/[0.07] flex items-center justify-center mb-3">
            <DollarSign size={16} className="text-[#2D9F93]" />
          </div>
          <p className="text-[18px] text-[#1a1a2e] tracking-[-0.02em]">R$ 65,00</p>
          <p className="text-[11px] text-[#9a9aaa] mt-0.5">Este mês</p>
        </div>

        <div
          className="flex-1 bg-white rounded-[20px] p-4"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="w-9 h-9 rounded-[12px] bg-amber-50 flex items-center justify-center mb-3">
            <TrendingDown size={16} className="text-amber-500" />
          </div>
          <p className="text-[18px] text-[#1a1a2e] tracking-[-0.02em]">R$ 675,00</p>
          <p className="text-[11px] text-[#9a9aaa] mt-0.5">Total anual</p>
        </div>
      </div>

      {/* Gráfico */}
      <div className="px-5 pt-5">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">Últimos 6 Meses</p>
        <div
          className="bg-white rounded-[20px] p-5"
          style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
        >
          <div className="flex items-end justify-between gap-3 h-[100px]" role="img" aria-label="Gráfico mensal de coparticipação">
            {monthlyData.map((d, i) => {
              const height = (d.amount / maxAmount) * 100;
              const isLast = i === monthlyData.length - 1;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                  <motion.div
                    className="w-full rounded-xl min-h-[4px]"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{
                      background: isLast
                        ? "linear-gradient(180deg, #2D9F93, #3DB4A7)"
                        : "#F0F1F3",
                    }}
                  />
                  <span className={`text-[10px] ${isLast ? "text-[#2D9F93]" : "text-[#B0B4BC]"}`}>
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transações */}
      <div className="px-5 pt-5">
        <p className="text-[11px] text-[#9a9aaa] tracking-wider uppercase mb-3 px-1">Transações Recentes</p>
        <div className="flex flex-col gap-3" role="list" aria-label="Transações de coparticipação">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
              className="bg-white rounded-[20px] p-4"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.03), 0 0 0 1px rgba(0,0,0,0.02)" }}
              role="listitem"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-[14px] bg-[#FAFBFC] flex items-center justify-center shrink-0">
                  <Receipt size={16} className="text-[#7a7a8a]" strokeWidth={1.7} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-0.5">
                    <h4 className="text-[13px] text-[#1a1a2e] tracking-[-0.01em]">{tx.procedure}</h4>
                    <span className="text-[14px] text-[#2D9F93] shrink-0 ml-2">{tx.copay}</span>
                  </div>
                  <p className="text-[12px] text-[#9a9aaa]">{tx.provider}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar size={11} className="text-[#C0C4CC]" />
                      <span className="text-[11px] text-[#B0B4BC]">{tx.date}</span>
                    </div>
                    <span className="text-[11px] text-[#B0B4BC]">Total: {tx.total}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#2D9F93]/[0.08] text-[#2D9F93]">
                      {tx.percentage}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
