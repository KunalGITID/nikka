import {
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  Clock3,
  Database,
  Github,
  Keyboard,
  Network,
  Sigma,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured } from "./lib/supabase";
import { paths, subjectMap, totalCourses, totalHours, weeks, type Course } from "./data/roadmap";

const iconMap = { Keyboard, Sigma, Network };
const progressKey = "summer-roadmap-progress";

function App() {
  const [completed, setCompleted] = useState<Set<string>>(() => new Set());

  useEffect(() => {
    const stored = window.localStorage.getItem(progressKey);
    if (stored) {
      setCompleted(new Set(JSON.parse(stored) as string[]));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(progressKey, JSON.stringify([...completed]));
  }, [completed]);

  const completedHours = useMemo(() => {
    return weeks.reduce((total, week) => {
      return (
        total +
        week.courses.reduce((weekTotal, course) => {
          return completed.has(course.id) ? weekTotal + course.hours : weekTotal;
        }, 0)
      );
    }, 0);
  }, [completed]);

  const completedCourses = completed.size;
  const progressPercent = Math.round((completedHours / totalHours) * 100);

  function toggleCourse(course: Course) {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(course.id)) {
        next.delete(course.id);
      } else {
        next.add(course.id);
      }
      return next;
    });
  }

  return (
    <main>
      <section className="hero">
        <div className="hero__content">
          <div className="eyebrow">SRM University / B.Tech CSE Data Science / Sem 02 to Sem 03</div>
          <h1>Kunal's Summer Roadmap</h1>
          <p>
            A structured 7-week preparation dashboard for coding, math, systems, and AI foundations.
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#weeks">
              <BookOpen size={18} />
              Start roadmap
            </a>
            <a className="button" href="#progress">
              <Clock3 size={18} />
              View progress
            </a>
          </div>
        </div>
        <div className="hero__panel" id="progress">
          <div className="panel-header">
            <span>Live Progress</span>
            <Sparkles size={18} />
          </div>
          <strong>{progressPercent}%</strong>
          <div className="progress-track">
            <span style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="progress-grid">
            <span>{completedCourses} / {totalCourses} courses</span>
            <span>{completedHours.toFixed(1)} / {totalHours.toFixed(1)} hrs</span>
          </div>
          <p className="sync-note">
            {isSupabaseConfigured
              ? "Supabase is configured and ready for cloud sync."
              : "Local progress works now. Supabase sync is the next backend step."}
          </p>
        </div>
      </section>

      <section className="stats">
        <Stat icon={CalendarDays} value="49" label="Calendar days" />
        <Stat icon={Clock3} value={Math.round(totalHours).toString()} label="Hours rounded" />
        <Stat icon={BookOpen} value={totalCourses.toString()} label="Courses" />
        <Stat icon={Database} value="Supabase" label="Backend target" />
      </section>

      <section className="section">
        <div className="section-heading">
          <span>// Learning paths</span>
          <h2>Three tracks, one dashboard</h2>
        </div>
        <div className="path-grid">
          {paths.map((path) => {
            const Icon = iconMap[path.icon as keyof typeof iconMap];
            return (
              <article className={`path-card path-card--${path.accent}`} key={path.title}>
                <Icon size={30} />
                <h3>{path.title}</h3>
                <p>{path.description}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section subject-section">
        <div className="section-heading">
          <span>// Semester map</span>
          <h2>Why each course exists</h2>
        </div>
        <div className="subject-list">
          {subjectMap.map(([subject, prep]) => (
            <div className="subject-row" key={subject}>
              <strong>{subject}</strong>
              <ChevronRight size={18} />
              <span>{prep}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="weeks">
        <div className="section-heading">
          <span>// Weekly roadmap</span>
          <h2>May 28 to July 15, 2026</h2>
        </div>
        <div className="week-list">
          {weeks.map((week) => {
            const weekHours = week.courses.reduce((sum, course) => sum + course.hours, 0);
            return (
              <article className="week-card" key={week.id}>
                <div className="week-card__header">
                  <div>
                    <span className="week-number">Week {week.number}</span>
                    <h3>{week.title}</h3>
                    <p>{week.dates}</p>
                  </div>
                  <div className="hours-pill">{weekHours.toFixed(1)} hrs</div>
                </div>
                <p className="week-theme">{week.theme}</p>
                <div className="course-list">
                  {week.courses.map((course) => (
                    <button
                      className={`course-row ${completed.has(course.id) ? "is-complete" : ""}`}
                      key={course.id}
                      onClick={() => toggleCourse(course)}
                      type="button"
                    >
                      <span className="course-check">
                        {completed.has(course.id) && <Check size={16} />}
                      </span>
                      <span className="course-copy">
                        <span className="course-meta">
                          {course.provider} / {course.duration}
                        </span>
                        <strong>{course.title}</strong>
                        <span>{course.detail}</span>
                      </span>
                      <span className={`tag tag--${course.category}`}>{course.category}</span>
                    </button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section final-section">
        <div>
          <span>// Next backend step</span>
          <h2>Connect Supabase after the UI is approved</h2>
          <p>
            The app already has local progress tracking. The next pass will add auth, Supabase tables,
            row-level security, and cloud progress sync for all devices.
          </p>
        </div>
        <a className="button button--primary" href="https://github.com/new" target="_blank" rel="noreferrer">
          <Github size={18} />
          Create GitHub repo
        </a>
      </section>
    </main>
  );
}

function Stat({ icon: Icon, value, label }: { icon: LucideIcon; value: string; label: string }) {
  return (
    <div className="stat-card">
      <Icon size={22} />
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default App;
