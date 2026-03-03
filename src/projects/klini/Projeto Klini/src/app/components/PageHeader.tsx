import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  backTo?: string;
  rightAction?: React.ReactNode;
}

export function PageHeader({ title, showBack = true, backTo = "/", rightAction }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <header
      className="px-4 xs:px-6 pt-10 xs:pt-14 pb-4 flex items-center justify-between sticky top-0 z-40"
      style={{
        background: "rgba(250,251,252,0.82)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
    >
      <div className="flex items-center gap-2">
        {showBack && (
          <button
            onClick={() => navigate(backTo)}
            className="w-9 h-9 rounded-xl flex items-center justify-center -ml-1 hover:bg-black/[0.04] active:scale-95 transition-all cursor-pointer"
            aria-label="Voltar"
          >
            <ChevronLeft size={22} className="text-[#1a1a2e]" strokeWidth={2} />
          </button>
        )}
        <h2 className="text-[#1a1a2e] text-[16px] font-semibold tracking-[-0.02em] truncate">{title}</h2>
      </div>
      {rightAction && <div>{rightAction}</div>}
    </header>
  );
}
