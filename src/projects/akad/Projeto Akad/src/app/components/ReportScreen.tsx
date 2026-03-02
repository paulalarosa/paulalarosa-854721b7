import { ChevronLeft, Download, TrendingUp, TrendingDown, BarChart3, PieChart } from "lucide-react";
import { akad } from "./akad-theme";

const monthlyData = [
  { label: "Vendas Brutas", value: "R$ 2.4M", change: "+18.2%", positive: true },
  { label: "Comissões", value: "R$ 184K", change: "+12.5%", positive: true },
  { label: "Cancelamentos", value: "R$ 38K", change: "-8.3%", positive: true },
  { label: "Sinistralidade", value: "42%", change: "+2.1%", positive: false },
];

const topProducts = [
  { name: "Auto Premium", share: 34, color: akad.pink },
  { name: "Residencial", share: 22, color: akad.blue },
  { name: "Vida Individual", share: 18, color: akad.blueLight },
  { name: "Empresarial", share: 15, color: akad.success },
  { name: "Outros", share: 11, color: akad.textTertiary },
];

interface ReportScreenProps {
  onBack: () => void;
}

export function ReportScreen({ onBack }: ReportScreenProps) {
  return (
    <>
      <nav className="px-4 pt-1 pb-1 flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-[12px] flex items-center justify-center cursor-pointer"
          style={{ background: "rgba(255,255,255,0.06)" }}
          aria-label="Voltar ao dashboard"
        >
          <ChevronLeft size={18} color="#fff" />
        </button>
        <span style={{ fontSize: "13px", fontWeight: 600, color: "#fff" }}>
          Relatório Mensal
        </span>
        <button
          className="w-9 h-9 rounded-[12px] flex items-center justify-center cursor-pointer"
          style={{ background: "rgba(230,0,126,0.1)" }}
          aria-label="Baixar relatório em PDF"
        >
          <Download size={16} color={akad.pink} />
        </button>
      </nav>

      <main className="flex-1 px-4 pt-3 pb-4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {/* Period */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, letterSpacing: "-0.5px" }}>
              Fevereiro 2026
            </h2>
            <p style={{ color: akad.textOnDarkTertiary, fontSize: "12px", marginTop: "2px" }}>
              01/02 — 24/02/2026
            </p>
          </div>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-full"
            style={{ background: akad.successSoft }}>
            <TrendingUp size={13} color={akad.success} />
            <span style={{ fontSize: "12px", color: akad.success, fontWeight: 600 }}>Positivo</span>
          </div>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-5">
          {monthlyData.map((item) => (
            <article
              key={item.label}
              className="rounded-[18px] p-4"
              style={{ background: akad.darkCard, border: `1px solid ${akad.darkBorder}` }}
              aria-label={`${item.label}: ${item.value}, variação ${item.change}`}
            >
              <p style={{ color: akad.textOnDarkTertiary, fontSize: "10px", letterSpacing: "1.5px", textTransform: "uppercase", fontWeight: 500 }}>
                {item.label}
              </p>
              <p style={{ color: "#fff", fontSize: "22px", fontWeight: 700, letterSpacing: "-1px", marginTop: "6px" }}>
                {item.value}
              </p>
              <div className="flex items-center gap-1 mt-2">
                {item.positive ? (
                  <TrendingUp size={12} color={akad.success} />
                ) : (
                  <TrendingDown size={12} color={akad.danger} />
                )}
                <span style={{ fontSize: "11px", color: item.positive ? akad.success : akad.danger, fontWeight: 600 }}>
                  {item.change}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Revenue chart placeholder */}
        <section className="rounded-[20px] p-5 mb-4" style={{ background: akad.darkCard, border: `1px solid ${akad.darkBorder}` }}>
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={16} color={akad.pink} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Receita Semanal
            </span>
          </div>
          <div className="flex items-end gap-2 h-[100px]" role="img" aria-label="Gráfico de receita semanal">
            {[65, 45, 80, 55, 92, 70, 88, 60, 95, 75, 85, 98].map((v, i) => (
              <div key={i} className="flex-1 rounded-[4px]" style={{
                height: `${v}%`,
                background: i >= 10
                  ? akad.pink
                  : `linear-gradient(180deg, rgba(230,0,126,${0.15 + (i / 12) * 0.6}) 0%, rgba(230,0,126,0.05) 100%)`,
              }} />
            ))}
          </div>
          <div className="flex items-center justify-between mt-3">
            <span style={{ fontSize: "10px", color: akad.textOnDarkTertiary }}>Sem 1</span>
            <span style={{ fontSize: "10px", color: akad.textOnDarkTertiary }}>Sem 2</span>
            <span style={{ fontSize: "10px", color: akad.textOnDarkTertiary }}>Sem 3</span>
          </div>
        </section>

        {/* Top products */}
        <section className="rounded-[20px] p-5 mb-4" style={{ background: akad.darkCard, border: `1px solid ${akad.darkBorder}` }}>
          <div className="flex items-center gap-2 mb-4">
            <PieChart size={16} color={akad.blueLight} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "#fff", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Top Produtos
            </span>
          </div>
          <div className="flex flex-col gap-3">
            {topProducts.map((p) => (
              <div key={p.name} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                <span className="flex-1" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>{p.name}</span>
                <div className="w-[100px] h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                  <div className="h-full rounded-full" style={{ width: `${p.share}%`, background: p.color }} />
                </div>
                <span style={{ fontSize: "12px", color: "#fff", fontWeight: 600, minWidth: "28px", textAlign: "right" }}>{p.share}%</span>
              </div>
            ))}
          </div>
        </section>

        {/* Download CTA */}
        <button
          className="w-full rounded-[18px] p-4 flex items-center justify-center gap-2 cursor-pointer"
          style={{ background: akad.gradientAccent }}
          aria-label="Baixar relatório completo em PDF"
        >
          <Download size={17} color="#fff" />
          <span style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
            Baixar PDF Completo
          </span>
        </button>
      </main>
    </>
  );
}