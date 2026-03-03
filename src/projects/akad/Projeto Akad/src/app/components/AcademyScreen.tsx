import React from "react";
import { Play, Clock, Award, ChevronRight, BookOpen, ChevronLeft } from "lucide-react";
import { akad } from "./akad-theme";
import { PhoneFrame } from "./PhoneFrame";
import { TabBar, TabId } from "./TabBar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const cyberImage = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80";
const abstractImage = "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80";

interface CourseData { id: string; title: string; subtitle: string; image: string; lessons: number; duration: string; progress: number; tag: string; }

const courses: CourseData[] = [
  { id: "cyber", title: "Cyber Security", subtitle: "Seguros Cibernéticos para Empresas", image: cyberImage, lessons: 6, duration: "1h 51m", progress: 44, tag: "Em Progresso" },
  { id: "auto", title: "Auto & Frota", subtitle: "Precificação e Subscrição Avançada", image: abstractImage, lessons: 8, duration: "2h 20m", progress: 0, tag: "Novo" },
];

const lessonsList = [
  { title: "Introdução à Cyber Security", duration: "12 min", progress: 100 },
  { title: "Riscos Cibernéticos em PMEs", duration: "18 min", progress: 100 },
  { title: "Coberturas e Exclusões", duration: "24 min", progress: 65 },
  { title: "Precificação e Subscrição", duration: "20 min", progress: 0 },
  { title: "Cases de Sinistros Reais", duration: "15 min", progress: 0 },
  { title: "Argumentação de Vendas", duration: "22 min", progress: 0 },
];

function ProgressRing({ progress, size = 30 }: { progress: number; size?: number }) {
  const sw = 2;
  const r = (size - sw) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (progress / 100) * circ;
  const done = progress === 100;
  const active = progress > 0 && progress < 100;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}
      role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label={`${progress}%`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={done ? `${akad.success}20` : akad.surface} strokeWidth={sw} />
        {progress > 0 && (
          <circle cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={done ? akad.success : akad.pink}
            strokeWidth={sw} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={offset} />
        )}
      </svg>
      <div className="absolute flex items-center justify-center">
        {done ? <Award size={11} color={akad.success} /> :
          active ? <span style={{ fontSize: "8px", fontWeight: 700, color: akad.text }}>{progress}%</span> :
            <span style={{ fontSize: "8px", color: akad.textTertiary }}>—</span>}
      </div>
    </div>
  );
}

function CourseDetail({ course, onBack }: { course: CourseData; onBack: () => void }) {
  const totalProgress = Math.round(lessonsList.reduce((a, l) => a + l.progress, 0) / lessonsList.length);

  return (
    <>
      <nav className="px-4 pt-1 pb-1 flex items-center justify-between">
        <button onClick={onBack} className="w-9 h-9 rounded-[12px] flex items-center justify-center cursor-pointer"
          style={{ background: akad.surface }} aria-label="Voltar">
          <ChevronLeft size={18} color={akad.text} />
        </button>
        <span style={{ fontSize: "13px", fontWeight: 600, color: akad.text }}>{course.title}</span>
        <div className="w-9" aria-hidden="true" />
      </nav>

      <div className="px-4 pt-1 mb-2">
        <div className="relative rounded-[18px] overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <ImageWithFallback src={course.image} alt={course.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 20%, rgba(13,8,38,0.85) 100%)" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer"
              style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}
              aria-label="Reproduzir">
              <Play size={18} color="#fff" fill="#fff" />
            </button>
          </div>
          <div className="absolute bottom-2.5 left-3 right-3">
            <span className="px-2 py-0.5 rounded-full"
              style={{ background: "rgba(230,0,126,0.2)", color: akad.pinkLight, fontSize: "9px", fontWeight: 600 }}>
              {course.tag}
            </span>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", marginTop: "4px" }}>{course.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="px-4 mb-2 flex items-center gap-2">
        <div className="flex-1 rounded-xl p-2.5 flex items-center gap-2" style={{ background: akad.surface }}>
          <ProgressRing progress={totalProgress} size={32} />
          <div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: akad.text, letterSpacing: "-0.5px" }}>{totalProgress}%</p>
            <p style={{ fontSize: "9px", color: akad.textTertiary }}>Completo</p>
          </div>
        </div>
        <div className="flex-1 rounded-xl p-2.5 flex items-center gap-2" style={{ background: akad.surface }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: akad.pinkSoft }}>
            <Clock size={14} color={akad.pink} />
          </div>
          <div>
            <p style={{ fontSize: "16px", fontWeight: 700, color: akad.text, letterSpacing: "-0.5px" }}>{course.duration}</p>
            <p style={{ fontSize: "9px", color: akad.textTertiary }}>Duração</p>
          </div>
        </div>
      </div>

      <div className="px-4 mb-1.5">
        <p style={{ fontSize: "10px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase" }}>Aulas</p>
      </div>

      <div className="flex-1 px-4 pb-4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <ol className="flex flex-col gap-1" aria-label="Aulas">
          {lessonsList.map((lesson, i) => {
            const isActive = lesson.progress > 0 && lesson.progress < 100;
            return (
              <li key={i} className="flex items-center gap-2.5 p-2.5 rounded-[14px]"
                style={{ background: isActive ? akad.pinkSubtle : "transparent", border: isActive ? "1px solid rgba(230,0,126,0.05)" : "1px solid transparent" }}>
                <span className="shrink-0 w-6 text-center"
                  style={{ fontSize: "12px", fontWeight: 700, color: lesson.progress === 100 ? akad.textTertiary : isActive ? akad.pink : akad.textTertiary }}
                  aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: "13px", fontWeight: 600, color: lesson.progress === 100 ? akad.textTertiary : akad.text, textDecoration: lesson.progress === 100 ? "line-through" : "none", textDecorationColor: akad.surface }}>{lesson.title}</p>
                  <p style={{ fontSize: "10px", color: akad.textTertiary, marginTop: "1px" }}>{lesson.duration}</p>
                </div>
                <ProgressRing progress={lesson.progress} size={28} />
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
}

interface AcademyScreenProps { activeTab: TabId; onNavigate: (tab: TabId) => void; }

export function AcademyScreen({ activeTab, onNavigate }: AcademyScreenProps) {
  const [selectedCourse, setSelectedCourse] = React.useState<string | null>(null);
  const course = courses.find(c => c.id === selectedCourse);

  if (course) return <PhoneFrame><CourseDetail course={course} onBack={() => setSelectedCourse(null)} /></PhoneFrame>;

  return (
    <PhoneFrame>
      <header className="px-5 pt-2 pb-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ color: akad.text, fontSize: "26px", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.2 }}>Academy</h1>
            <p style={{ color: akad.textTertiary, fontSize: "12px", marginTop: "1px" }}>Capacitação para corretores</p>
          </div>
          <div className="w-9 h-9 rounded-[12px] flex items-center justify-center" style={{ background: akad.pinkSoft }}>
            <BookOpen size={17} color={akad.pink} />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 pt-3 pb-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <p className="px-1 mb-2" style={{ fontSize: "10px", fontWeight: 600, color: akad.textTertiary, letterSpacing: "2px", textTransform: "uppercase" }}>
          Cursos Disponíveis
        </p>

        <div className="flex flex-col gap-2.5" role="list" aria-label="Cursos">
          {courses.map((c) => (
            <button key={c.id} onClick={() => setSelectedCourse(c.id)}
              className="rounded-[18px] overflow-hidden text-left cursor-pointer w-full"
              style={{ background: akad.card, border: `1px solid ${akad.border}`, boxShadow: akad.shadow }}
              role="listitem" aria-label={`${c.title} — ${c.tag}`}>
              <div className="relative" style={{ aspectRatio: "2.2/1" }}>
                <ImageWithFallback src={c.image} alt={c.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 30%, rgba(13,8,38,0.8) 100%)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)" }}>
                    <Play size={16} color="#fff" fill="#fff" />
                  </div>
                </div>
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-full"
                    style={{ background: c.progress > 0 ? "rgba(230,0,126,0.2)" : "rgba(59,34,184,0.2)", color: c.progress > 0 ? akad.pinkLight : "#A88BFF", fontSize: "9px", fontWeight: 600, backdropFilter: "blur(6px)" }}>
                    {c.tag}
                  </span>
                </div>
                <div className="absolute bottom-2.5 left-3 right-3">
                  <h3 style={{ color: "#fff", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.5px" }}>{c.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "10px", marginTop: "1px" }}>{c.subtitle}</p>
                </div>
              </div>
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="flex items-center gap-1">
                    <BookOpen size={12} color={akad.textTertiary} />
                    <span style={{ fontSize: "11px", color: akad.textSecondary }}>{c.lessons} aulas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} color={akad.textTertiary} />
                    <span style={{ fontSize: "11px", color: akad.textSecondary }}>{c.duration}</span>
                  </div>
                </div>
                {c.progress > 0 ? <ProgressRing progress={c.progress} size={26} /> : <ChevronRight size={14} color={akad.textTertiary} />}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 mb-2 rounded-[16px] p-4" style={{ background: akad.gradientPrimary }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 500 }}>Seu Progresso</p>
          <div className="flex items-center gap-5 mt-2.5">
            {[{ v: "2", l: "Cursos" }, { v: "14", l: "Aulas" }, { v: "4h", l: "Assistidas" }].map((s, i) => (
              <React.Fragment key={s.l}>
                {i > 0 && <div className="w-px h-7" style={{ background: "rgba(255,255,255,0.08)" }} />}
                <div>
                  <p style={{ color: "#fff", fontSize: "26px", fontWeight: 800, letterSpacing: "-1.2px", lineHeight: 1 }}>{s.v}</p>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", marginTop: "2px" }}>{s.l}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="h-1" />
      </main>

      <TabBar active={activeTab} onNavigate={onNavigate} />
    </PhoneFrame>
  );
}
