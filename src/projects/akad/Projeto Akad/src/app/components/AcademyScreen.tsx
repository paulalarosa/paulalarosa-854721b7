import React from "react";
import { Play, Clock, Award, ChevronRight, BookOpen, ChevronLeft } from "lucide-react";
import { akad } from "./akad-theme";

import { TabBar, TabId } from "./TabBar";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const cyberImage = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"; // Tech/Cyber
const abstractImage = "https://images.unsplash.com/photo-1615906655593-ad0386982a0f?w=800&q=80"; // Abstract blue/purple tech

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

  if (course) return <div className="flex flex-col h-full bg-[#f8f9fa]"><CourseDetail course={course} onBack={() => setSelectedCourse(null)} /></div>;

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <header className="px-5 pt-12 pb-4 bg-white border-b border-gray-100 shadow-sm z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 style={{ color: akad.text, fontSize: "28px", fontWeight: 700, letterSpacing: "-0.8px", lineHeight: 1.2 }}>Academy</h1>
            <p style={{ color: akad.textTertiary, fontSize: "13px", marginTop: "2px", fontWeight: 500 }}>Capacitação avançada para corretores</p>
          </div>
          <div className="w-12 h-12 rounded-[16px] flex items-center justify-center p-2 shadow-sm" style={{ background: akad.pinkSoft, border: `1px solid rgba(230,0,126,0.1)` }}>
            <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
              <BookOpen size={20} color={akad.pink} />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-5 pt-5 pb-4 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        <p className="px-1 mb-3" style={{ fontSize: "11px", fontWeight: 700, color: akad.textTertiary, letterSpacing: "2.5px", textTransform: "uppercase" }}>
          Cursos Disponíveis
        </p>

        <div className="flex flex-col gap-4" role="list" aria-label="Cursos">
          {courses.map((c) => (
            <button key={c.id} onClick={() => setSelectedCourse(c.id)}
              className="rounded-[24px] overflow-hidden text-left cursor-pointer w-full transition-transform hover:-translate-y-1 hover:shadow-lg"
              style={{ background: "#fff", border: `1px solid ${akad.border}`, boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}
              role="listitem" aria-label={`${c.title} — ${c.tag}`}>
              <div className="relative" style={{ aspectRatio: "2.2/1" }}>
                <ImageWithFallback src={c.image} alt={c.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 20%, rgba(13,8,38,0.85) 100%)" }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                    style={{ background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.3)" }}>
                    <Play size={20} color="#fff" fill="#fff" className="ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-[8px] flex items-center gap-1.5 shadow-sm"
                    style={{ background: c.progress > 0 ? "rgba(230,0,126,0.85)" : "rgba(59,34,184,0.85)", color: "#fff", fontSize: "10px", fontWeight: 700, letterSpacing: "0.5px", backdropFilter: "blur(8px)" }}>
                    {c.progress > 0 && <span className="w-1.5 h-1.5 rounded-full bg-white opacity-80" />}
                    {c.tag.toUpperCase()}
                  </span>
                </div>
                <div className="absolute bottom-3 left-4 right-4">
                  <h3 style={{ color: "#fff", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.5px" }}>{c.title}</h3>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px", marginTop: "2px", fontWeight: 500 }}>{c.subtitle}</p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between border-t border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg">
                    <BookOpen size={14} color={akad.pink} />
                    <span style={{ fontSize: "12px", color: akad.textSecondary, fontWeight: 600 }}>{c.lessons} aulas</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-lg">
                    <Clock size={14} color={akad.blueLight} />
                    <span style={{ fontSize: "12px", color: akad.textSecondary, fontWeight: 600 }}>{c.duration}</span>
                  </div>
                </div>
                {c.progress > 0 ? <ProgressRing progress={c.progress} size={30} /> : <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center"><ChevronRight size={16} color={akad.textTertiary} /></div>}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 mb-4 rounded-[24px] p-6 text-white relative overflow-hidden shadow-md" style={{ background: akad.gradientPrimary }}>
          {/* Decorative bg element */}
          <div className="absolute -top-10 -right-10 w-[150px] h-[150px] rounded-full blur-3xl opacity-30 bg-white" aria-hidden="true" />
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", letterSpacing: "2.5px", textTransform: "uppercase", fontWeight: 700, position: "relative", zIndex: 10 }}>Seu Progresso de Aprendizado</p>
          <div className="flex items-center gap-6 mt-4 relative z-10">
            {[{ v: "2", l: "Cursos" }, { v: "14", l: "Aulas" }, { v: "4h", l: "Assistidas" }].map((s, i) => (
              <React.Fragment key={s.l}>
                {i > 0 && <div className="w-px h-10" style={{ background: "rgba(255,255,255,0.15)" }} />}
                <div>
                  <p style={{ color: "#fff", fontSize: "32px", fontWeight: 800, letterSpacing: "-1.5px", lineHeight: 1 }}>{s.v}</p>
                  <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "11px", marginTop: "4px", fontWeight: 500 }}>{s.l}</p>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="h-6" />
      </main>

      <TabBar active={activeTab} onNavigate={onNavigate} />
    </div>
  );
}
