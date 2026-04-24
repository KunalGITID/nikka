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
import { isSupabaseConfigured, supabase, type AuthSession } from "./lib/supabase";
import { paths, subjectMap, totalCourses, totalHours, weeks, type Course } from "./data/roadmap";

const iconMap = { Keyboard, Sigma, Network };
const progressKey = "summer-roadmap-progress";

function App() {
  const [completed, setCompleted] = useState<Set<string>>(() => new Set());
  const [session, setSession] = useState<AuthSession>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(progressKey);
    if (stored) {
      setCompleted(new Set(JSON.parse(stored) as string[]));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(progressKey, JSON.stringify([...completed]));
  }, [completed]);

  useEffect(() => {
    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!supabase || !session?.user) {
      return;
    }

    const client = supabase;

    const syncProgress = async () => {
      setIsSyncing(true);
      setAuthMessage("Syncing progress...");

      const localIds = new Set(readLocalProgress());
      const { data, error } = await client
        .from("course_progress")
        .select("course_id")
        .eq("user_id", session.user.id);

      if (error) {
        setAuthMessage(error.message);
        setIsSyncing(false);
        return;
      }

      const cloudIds = new Set((data ?? []).map((row) => row.course_id as string));
      const merged = new Set([...localIds, ...cloudIds]);
      setCompleted(merged);

      if (localIds.size > 0) {
        const rows = [...merged].map((courseId) => ({
          user_id: session.user.id,
          course_id: courseId,
        }));
        const { error: upsertError } = await client.from("course_progress").upsert(rows);
        if (upsertError) {
          setAuthMessage(upsertError.message);
          setIsSyncing(false);
          return;
        }
      }

      setAuthMessage("Cloud sync is active.");
      setIsSyncing(false);
    };

    void syncProgress();
  }, [session]);

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

  async function toggleCourse(course: Course) {
    const willComplete = !completed.has(course.id);

    setCompleted((current) => {
      const next = new Set(current);
      if (willComplete) {
        next.add(course.id);
      } else {
        next.delete(course.id);
      }
      return next;
    });

    if (!supabase || !session?.user) {
      return;
    }

    setIsSyncing(true);
    const result = willComplete
      ? await supabase.from("course_progress").upsert({
          user_id: session.user.id,
          course_id: course.id,
        })
      : await supabase
          .from("course_progress")
          .delete()
          .eq("user_id", session.user.id)
          .eq("course_id", course.id);

    if (result.error) {
      setAuthMessage(result.error.message);
    } else {
      setAuthMessage("Progress saved.");
    }
    setIsSyncing(false);
  }

  async function signIn() {
    if (!supabase) {
      setAuthMessage("Add Supabase keys in .env.local to enable sign in.");
      return;
    }
    setIsSyncing(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setAuthMessage(error ? error.message : "Signed in.");
    setIsSyncing(false);
  }

  async function signUp() {
    if (!supabase) {
      setAuthMessage("Add Supabase keys in .env.local to enable sign up.");
      return;
    }
    setIsSyncing(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setAuthMessage(error ? error.message : "Account created. Check email if confirmation is enabled.");
    setIsSyncing(false);
  }

  async function signOut() {
    if (!supabase) {
      return;
    }
    setIsSyncing(true);
    await supabase.auth.signOut();
    setSession(null);
    setAuthMessage("Signed out. Local progress is still saved on this device.");
    setIsSyncing(false);
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
            {getSyncLabel(isSupabaseConfigured, Boolean(session), isSyncing)}
          </p>
          <div className="auth-panel">
            {session ? (
              <>
                <div>
                  <span className="auth-label">Signed in</span>
                  <strong>{session.user.email}</strong>
                </div>
                <button className="button auth-button" onClick={signOut} type="button">
                  Sign out
                </button>
              </>
            ) : (
              <>
                <input
                  autoComplete="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  type="email"
                  value={email}
                />
                <input
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  type="password"
                  value={password}
                />
                <div className="auth-actions">
                  <button className="button button--primary auth-button" onClick={signIn} type="button">
                    Sign in
                  </button>
                  <button className="button auth-button" onClick={signUp} type="button">
                    Sign up
                  </button>
                </div>
              </>
            )}
          </div>
          {authMessage && <p className="auth-message">{authMessage}</p>}
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
            Auth and progress sync are wired into the frontend. Add your Supabase keys and run the
            schema in Supabase to make progress follow you across devices.
          </p>
        </div>
        <a className="button button--primary" href="https://supabase.com/dashboard" target="_blank" rel="noreferrer">
          <Github size={18} />
          Open Supabase
        </a>
      </section>
    </main>
  );
}

function readLocalProgress() {
  const stored = window.localStorage.getItem(progressKey);
  return stored ? (JSON.parse(stored) as string[]) : [];
}

function getSyncLabel(configured: boolean, signedIn: boolean, syncing: boolean) {
  if (!configured) {
    return "Local progress is active. Add Supabase keys to enable cloud sync.";
  }
  if (syncing) {
    return "Syncing with Supabase...";
  }
  if (signedIn) {
    return "Cloud sync is active across devices.";
  }
  return "Supabase is configured. Sign in to sync progress across devices.";
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
