import Dashboard from "./pages/ProgressPage.jsx";
import Home from "./pages/HomePage.jsx";
import ModuleCard from "./features/modules/ModuleCard.jsx";
import Lesson from "./features/modules/Lesson.jsx";
import Quiz from "./features/quiz/Quiz.jsx";
import { REVIEW, empty, safeRead, validProgress } from "./lib/appShared.js";
import GuidePage from "./pages/GuidePage.jsx";
import PageHeader from "./components/PageHeader.jsx";
import { completedNotes } from "./lib/learningProgress.js";
import "./styles/learning-notes.css";
import { ReviewPanel } from "./features/modules/SkuExplorer.jsx";
import { useEffect, useRef, useState } from "react";
import { Atom, FlaskConical, BookOpen, LayoutDashboard, Menu, X, Languages, Target, LogIn, Users } from "lucide-react";
import { modules } from "./data/content.js";
import Lab from "./features/labs/Lab.jsx";
import { cloud, checked, getProgress, setProgress } from "./lib/cloud.js";
import { Account, Classroom, PasswordRecovery } from "./features/accounts/Accounts.jsx";
import "./styles/styles.css";
export default function App() {
  const [guideFrom, setGuideFrom] = useState('home'),
    [activeLab, setActiveLab] = useState('ionization');
  const [lang, setLang] = useState(() => safeRead('equilab-lang', 'ms') === 'en' ? 'en' : 'ms');
  const [page, setPage] = useState(() => location.hash.replace('#/', '') || 'home'),
    [menu, setMenu] = useState(false),
    [account, setAccount] = useState(false),
    [user, setUser] = useState(null),
    [profile, setProfile] = useState(null),
    [recovery, setRecovery] = useState(false),
    [ready, setReady] = useState(!cloud),
    [sync, setSync] = useState(''),
    [progress, setLocalProgress] = useState(() => validProgress(safeRead('equilab-progress-guest', {})));
  const userRef = useRef(null),
    progressRef = useRef(progress),
    queue = useRef(Promise.resolve());
  const t = (a, b) => lang === 'ms' ? a : b;
  const tr = x => x?.[lang] ?? '';
  const nav = id => {
    location.hash = '/' + id;
    setMenu(false);
    window.scrollTo(0, 0);
  };
  const openGuide = target => {
    if (page === 'guide') {
      window.scrollTo(0, 0);
      return;
    }
    setGuideFrom(typeof target === 'string' ? target : page);
    nav('guide');
  };
  useEffect(() => {
    const h = () => {
      setPage(location.hash.replace('#/', '') || 'home');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem('equilab-lang', JSON.stringify(lang));
    } catch {}
  }, [lang]);
  useEffect(() => {
    if (!cloud) return;
    let alive = true;
    let version = 0;
    async function load(u) {
      const current = ++version;
      userRef.current = u;
      setUser(u);
      setProfile(null);
      setReady(false);
      setSync('');
      const cached = validProgress(safeRead('equilab-progress-' + (u?.id || 'guest'), {}));
      progressRef.current = cached;
      setLocalProgress(cached);
      if (!u) {
        setReady(true);
        return;
      }
      try {
        const [p, pr] = await Promise.all([checked(cloud.from('profiles').select('*').eq('id', u.id).single()), getProgress(u.id)]);
        if (!alive || current !== version) return;
        const fetched = validProgress(Object.fromEntries(pr.map(r => [r.module_id, r.payload])));
        for (const [key, value] of Object.entries(cached)) {
          if (!fetched[key] || (value.updatedAt || '') > (fetched[key].updatedAt || '')) fetched[key] = value;
        }
        progressRef.current = fetched;
        setLocalProgress(fetched);
        setProfile(p);
        setReady(true);
      } catch (e) {
        if (alive && current === version) {
          setSync(e.message);
          setReady(true);
        }
      }
    }
    cloud.auth.getSession().then(({
      data,
      error
    }) => {
      if (error) setSync(error.message);
      if (alive) load(data.session?.user ?? null);
    });
    const {
      data: {
        subscription
      }
    } = cloud.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
      setTimeout(() => {
        if (alive) load(session?.user ?? null);
      }, 0);
    });
    return () => {
      alive = false;
      subscription.unsubscribe();
    };
  }, []);
  function save(id, transform) {
    if (REVIEW) return;
    const p = transform(progressRef.current[id] || empty);
    p.updatedAt = new Date().toISOString();
    const next = {
      ...progressRef.current,
      [id]: p
    };
    progressRef.current = next;
    setLocalProgress(next);
    try {
      localStorage.setItem('equilab-progress-' + (userRef.current?.id || 'guest'), JSON.stringify(next));
      setSync('');
    } catch {
      setSync(t('Storan pelayar penuh; kemajuan mungkin tidak kekal.', 'Browser storage is full; progress may not persist.'));
    }
    if (cloud && userRef.current) {
      const uid = userRef.current.id;
      queue.current = queue.current.catch(() => {}).then(() => setProgress(uid, id, p)).catch(e => {
        setSync(t('Belum disegerakkan: ', 'Not synced: ') + e.message);
      });
    }
  }
  async function retry() {
    if (REVIEW || !user || !cloud) return;
    setSync('');
    try {
      for (const [id, p] of Object.entries(progressRef.current)) await setProgress(user.id, id, p);
    } catch (e) {
      setSync(e.message);
    }
  }
  const completeStep = (id, step) => save(id, p => ({
    ...p,
    steps: [...new Set([...p.steps, step])]
  }));
  const finishQuiz = (id, result) => save(id, p => ({
    ...p,
    steps: [...new Set([...p.steps, 4])],
    best: Math.max(p.best || 0, result.score),
    attempts: [...p.attempts, result].slice(-30)
  }));
  const totalSteps = modules.reduce((n, m) => n + completedNotes(progress[m.id]?.steps), 0),
    percent = Math.round(totalSteps / 24 * 100),
    completed = modules.filter(m => completedNotes(progress[m.id]?.steps) === 4).length;
  const reviewEnabled = REVIEW;
  const currentModule = modules.find(m => m.id === page.split('/')[1]);
  const navItems = [['home', t('Utama', 'Home'), Atom], ['modules', t('Modul', 'Modules'), BookOpen], ['lab', t('Makmal', 'Lab'), FlaskConical], ['quiz', t('Kuiz', 'Quiz'), Target], ['dashboard', t('Kemajuan', 'Progress'), LayoutDashboard], ['classroom', profile?.role === 'instructor' ? t('Pensyarah', 'Instructor') : t('Kelas', 'Classes'), Users]];
  return <><a className="skip-link" href="#main">
      {t('Langkau ke kandungan', 'Skip to content')}
    </a><header className="topbar">
      <div className="nav-wrap">
        <button className="brand" onClick={() => nav('home')} aria-label="EquiLab Home">
          <span className="brand-symbol">
            <FlaskConical size={24} />
          </span>
          <span>Equi<span className="teal-text">Lab</span><small>
              {t('KIMIA DALAM KESEIMBANGAN', 'CHEMISTRY IN BALANCE')}
            </small></span>
        </button>
        <nav className={menu ? 'open' : ''} aria-label={t('Navigasi utama', 'Main navigation')}>
          {navItems.map(([id, label]) => <button key={id} onClick={() => nav(id)} className={page === id || id === 'modules' && page.startsWith('learn/') || id === 'lab' && page.startsWith('lab/') ? 'active' : ''}>
            {label}
          </button>)}
        </nav>
        <div className="nav-actions">
          <button className="language" aria-label={t('Tukar bahasa ke English', 'Switch language to Malay')} onClick={() => setLang(lang === 'ms' ? 'en' : 'ms')}>
            <Languages size={16} />
            <b>
              {lang.toUpperCase()}
            </b>
            <span>⌄</span>
          </button>
          <button className="account-button" onClick={() => setAccount(true)}>
            <LogIn size={16} />
            <span>
              {user ? t('Akaun', 'Account') : t('Log masuk', 'Sign in')}
            </span>
          </button>
          <button className="menu-button" aria-label={t('Buka menu', 'Open menu')} aria-expanded={menu} onClick={() => setMenu(!menu)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </div>
    </header>
 <main id="main" className={page === 'modules' ? 'container modules-gallery' : 'container'}>{reviewEnabled && <ReviewPanel lang={lang} nav={nav} />}{page !== 'home' && <div className="storage-note">
        <span className="status-dot" />
        {user ? t('Akaun online', 'Online account') : t('Mod tetamu · Kemajuan disimpan pada pelayar ini', 'Guest mode · Progress saved in this browser')}
        {!ready && ' · ' + t('Memuatkan…', 'Loading…')}
        {!user && <button onClick={() => setAccount(true)}>
          {t('Akses akaun', 'Account access')}
        </button>}
      </div>}{sync && <div className="error" role="alert">
        {sync}
        {user && <button className="text-button" onClick={retry}>
          {t('Cuba segerak semula', 'Retry sync')}
        </button>}
      </div>}
 {page === 'home' ? <Home lang={lang} openGuide={openGuide} t={t} nav={nav} page={page} progress={progress} tr={tr} /> : page === 'modules' ? <>
        <PageHeader className="module-page-top" lang={lang} onGuide={openGuide} eyebrow={'SKU3073 · ' + t('KIMIA', 'CHEMISTRY')} title={t('Laluan pembelajaran anda.', 'Your learning path.')} description={t('Enam modul. Satu pemahaman yang saling berkaitan. Mulakan dari asas atau ulang kaji topik pilihan.', 'Six modules. One connected understanding. Start with the foundations or revisit a topic.')} />
        <div className="module-grid">
          {modules.map((m, i) => <ModuleCard key={m.id} m={m} index={i} page={page} progress={progress} lang={lang} nav={nav} tr={tr} t={t} />)}
        </div>
        <p className="module-completion-note">
          {t('Setiap modul: 3 bahagian nota + 1 kuiz. Eksperimen penuh di halaman Makmal.', 'Each module: 3 note sections + 1 quiz. Full experiments are on the Lab page.')}
        </p>
      </> : page === 'dashboard' ? <Dashboard progress={progress} completed={completed} lang={lang} openGuide={openGuide} t={t} profile={profile} percent={percent} tr={tr} nav={nav} totalSteps={totalSteps} page={page} /> : page.startsWith('learn/') && currentModule ? <Lesson key={page} requestedStep={page.split('/')[2]} requestedTopic={page.split('/')[3]} m={currentModule} lang={lang} p={progress[currentModule.id] || empty} ready={ready} onStep={step => completeStep(currentModule.id, step)} onQuiz={r => finishQuiz(currentModule.id, r)} nav={nav} onGuide={openGuide} /> : page === 'lab' || page.startsWith('lab/') ? <>
        <PageHeader className="lab-page-top" lang={lang} onGuide={() => openGuide('lab/' + activeLab)} eyebrow={'E-LAB · ' + t('BELAJAR MELALUI PENEMUAN', 'LEARN THROUGH DISCOVERY')} title={t('Makmal tanpa sempadan.', 'A lab without limits.')} description={t('Ubah, perhatikan dan fahami. Anda bebas mencuba semula.', 'Change, observe and understand. Explore as often as you like.')} />
        <Lab key={page} lang={lang} initial={page.split('/')[1] || 'ionization'} onKindChange={setActiveLab} />
      </> : page === 'quiz' ? <>
        <PageHeader lang={lang} onGuide={openGuide} eyebrow={t('PENILAIAN KENDIRI', 'SELF-ASSESSMENT')} title={t('Semak kefahaman anda.', 'Check your understanding.')} description={t('15 soalan rawak merentas enam modul, dengan penerangan jawapan.', '15 randomized questions across six modules, with answer explanations.')} />
        <Quiz lang={lang} moduleId="assessment" ready={ready} onFinish={r => finishQuiz('assessment', r)} />
      </> : page === 'classroom' ? <Classroom lang={lang} user={user} profile={profile} modules={modules} onGuide={openGuide} onLogin={() => setAccount(true)} /> : page === 'guide' ? <GuidePage lang={lang} nav={nav} returnTo={guideFrom} /> : <div className="empty-state">
        <h1>
          {t('Halaman tidak ditemui', 'Page not found')}
        </h1>
        <button className="primary" onClick={() => nav('home')}>
          {t('Kembali ke utama', 'Back to home')}
        </button>
      </div>}
 </main><footer>
      <div className="container footer-inner">
        <div>
          <b>EquiLab<span className="teal-text">.</span></b>
          <p>
            {t('E-modul keseimbangan asid–bes · Kimia SKU3073', 'Acid–base equilibrium e-module · Chemistry SKU3073')}
          </p>
        </div>
        <div>
          <button onClick={openGuide}>
            {t('Panduan & rujukan', 'Guide & references')}
          </button>
          <span>
            {t('Dibangunkan untuk pembelajaran universiti', 'Designed for university learning')}
          </span>
        </div>
      </div>
    </footer>
 {account && <Account lang={lang} user={user} onClose={() => setAccount(false)} onDemo={() => nav('dashboard')} />} {recovery && <PasswordRecovery lang={lang} onDone={() => setRecovery(false)} />}
 </>;
}
