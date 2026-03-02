import { ChevronLeft, Car, Home as HomeIcon, Heart, Briefcase, Zap, Calendar, DollarSign, Shield, FileText, Download, MessageCircle } from "lucide-react";
import { akad } from "./akad-theme";

const policyIcons: Record<string, typeof Car> = {
  "Auto Premium": Car,
  "Residencial Plus": HomeIcon,
  "Vida Individual": Heart,
  "Empresarial": Briefcase,
  "Cyber Security": Zap,
  "Auto Básico": Car,
};

const coverageItems = [
  { label: "Colisão e Incêndio", value: "R$ 80.000" },
  { label: "Terceiros", value: "R$ 150.000" },
  { label: "Roubo e Furto", value: "R$ 80.000" },
  { label: "Danos Morais", value: "R$ 30.000" },
  { label: "Guincho 24h", value: "Incluso" },
  { label: "Carro Reserva", value: "15 dias" },
];

const timeline = [
  { date: "15/02/2026", event: "Pagamento parcela 6/12 confirmado" },
  { date: "01/02/2026", event: "Endosso aprovado — inclusão de condutor" },
  { date: "15/01/2026", event: "Pagamento parcela 5/12 confirmado" },
  { date: "10/12/2025", event: "Emissão da apólice" },
];

interface PolicyDetailScreenProps {
  policyType: string;
  clientName: string;
  status: string;
  statusColor: string;
  value: string;
  onBack: () => void;
}

export function PolicyDetailScreen({ policyType, clientName, status, statusColor, value, onBack }: PolicyDetailScreenProps) {
  const IconComp = policyIcons[policyType] || FileText;

  return (
    <>
      <nav className="px-4 pt-1 pb-1 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-[12px] flex items-center justify-center cursor-pointer"
          style={{ background: akad.surface }}
          aria-label="Voltar para apólices"
        >
          <ChevronLeft size={18} color={akad.text} />
        </button>
        <span style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>
          Detalhes da Apólice
        </span>
        <div className="w-10" aria-hidden="true" />
      </nav>

      <main className="flex-1 px-4 pt-2 pb-4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Header Card */}
        <section
          className="rounded-[22px] p-5 mb-3 relative overflow-hidden"
          style={{ background: akad.gradientPrimary }}
          aria-label={`Apólice ${policyType}`}
        >
          <div className="absolute top-0 right-0 w-[140px] h-[140px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(230,0,126,0.1) 0%, transparent 70%)" }}
            aria-hidden="true" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-[16px] flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.1)" }}>
                <IconComp size={22} color="#fff" />
              </div>
              <div>
                <h2 style={{ color: "#fff", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.5px" }}>
                  {policyType}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>{clientName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full" style={{
                background: `${statusColor}20`,
                color: statusColor === akad.success ? "#4ADE80" : statusColor === akad.warning ? "#FBBF24" : statusColor === akad.danger ? "#FB7185" : akad.pinkLight,
                fontSize: "11px", fontWeight: 600
              }}>
                {status}
              </span>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px" }}>
                Apólice #AK-2026-0847
              </span>
            </div>
          </div>
        </section>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-2.5 mb-3">
          <div className="rounded-[18px] p-4" style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={14} color={akad.pink} />
              <span style={{ fontSize: "10px", color: akad.textTertiary, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500 }}>Prêmio</span>
            </div>
            <p style={{ fontSize: "20px", fontWeight: 700, color: akad.text, letterSpacing: "-0.5px" }}>{value}/ano</p>
          </div>
          <div className="rounded-[18px] p-4" style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={14} color={akad.blueLight} />
              <span style={{ fontSize: "10px", color: akad.textTertiary, letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500 }}>Vigência</span>
            </div>
            <p style={{ fontSize: "14px", fontWeight: 600, color: akad.text }}>10/12/2025</p>
            <p style={{ fontSize: "11px", color: akad.textTertiary }}>até 10/12/2026</p>
          </div>
        </div>

        {/* Coverages */}
        <section
          className="rounded-[22px] p-5 mb-3"
          style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}
          aria-label="Coberturas da apólice"
        >
          <div className="flex items-center gap-2 mb-4">
            <Shield size={15} color={akad.success} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: akad.text, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Coberturas
            </span>
          </div>
          <ul className="flex flex-col gap-2.5">
            {coverageItems.map((item, i) => (
              <li key={i} className="flex items-center justify-between">
                <span style={{ fontSize: "13px", color: akad.textSecondary }}>{item.label}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>{item.value}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Timeline */}
        <section
          className="rounded-[22px] p-5 mb-4"
          style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}
          aria-label="Histórico da apólice"
        >
          <div className="flex items-center gap-2 mb-4">
            <Calendar size={15} color={akad.blueLight} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: akad.text, letterSpacing: "0.8px", textTransform: "uppercase" }}>
              Histórico
            </span>
          </div>
          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0 mt-1"
                    style={{ background: i === 0 ? akad.pink : akad.surface }} />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 my-1" style={{ background: akad.surface }} />
                  )}
                </div>
                <div className="pb-4">
                  <p style={{ fontSize: "10px", color: akad.textTertiary, fontWeight: 500 }}>{item.date}</p>
                  <p style={{ fontSize: "13px", color: akad.text, fontWeight: 500, marginTop: "1px" }}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            className="flex-1 rounded-[16px] p-3.5 flex items-center justify-center gap-2 cursor-pointer"
            style={{ background: akad.surface }}
            aria-label="Baixar apólice em PDF"
          >
            <Download size={16} color={akad.text} />
            <span style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>PDF</span>
          </button>
          <button
            className="flex-1 rounded-[16px] p-3.5 flex items-center justify-center gap-2 cursor-pointer"
            style={{ background: akad.surface }}
            aria-label="Contatar seguradora"
          >
            <MessageCircle size={16} color={akad.text} />
            <span style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>Contato</span>
          </button>
          <button
            className="flex-1 rounded-[16px] p-3.5 flex items-center justify-center gap-2 cursor-pointer"
            style={{ background: akad.gradientAccent }}
            aria-label="Renovar apólice"
          >
            <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>Renovar</span>
          </button>
        </div>
      </main>
    </>
  );
}