import PageHeader from "../components/PageHeader.jsx";
import { completedNotes } from "../lib/learningProgress.js";
import { ArrowRight, Check, Target, ShieldCheck, ChartNoAxesCombined } from "lucide-react";
import { modules } from "../data/content.js";
import ModuleCard from "../features/modules/ModuleCard.jsx";
export default function Dashboard({
  progress,
  completed,
  lang,
  openGuide,
  t,
  profile,
  percent,
  tr,
  nav,
  totalSteps,
  page
}) {
  const next = modules.find(m => completedNotes(progress[m.id]?.steps) < 4) || modules[0];
  const attempts = Object.values(progress).flatMap(p => p.attempts || []).sort((a, b) => b.date.localeCompare(a.date));
  const points = attempts.reduce((sum, a) => sum + (a.score || 0), 0);
  const badges = completed >= 3 ? completed : completed ? 1 : 0;
  const dayKey = d => [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-');
  const activeDays = new Set(attempts.map(a => dayKey(new Date(a.date))));
  let streak = 0,
    cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  if (!activeDays.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  while (activeDays.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return <>
    <PageHeader lang={lang} onGuide={openGuide} eyebrow={t('RUANG PELAJAR', 'STUDENT WORKSPACE')} title={t('Selamat kembali', 'Welcome back') + (profile?.full_name ? ', ' + profile.full_name.split(' ')[0] : '') + '.'} description={t('Setiap langkah kecil membawa kefahaman yang lebih besar.', 'Every small step builds deeper understanding.')} />
    <div className="dashboard-stat-grid">
      <div className="dashboard-stat">
        <span className="stat-icon">
          <ChartNoAxesCombined size={20} />
        </span>
        <div>
          <strong>{percent}%</strong>
          <small>
            {t('Siap keseluruhan', 'Overall completion')}
          </small>
        </div>
      </div>
      <div className="dashboard-stat">
        <span className="stat-icon amber">
          <Target size={20} />
        </span>
        <div>
          <strong>
            {streak}
          </strong>
          <small>
            {t('Hari berturut-turut', 'Learning streak')}
          </small>
        </div>
      </div>
      <div className="dashboard-stat">
        <span className="stat-icon purple">
          <Check size={20} />
        </span>
        <div>
          <strong>
            {points}
          </strong>
          <small>
            {t('Jumlah mata', 'Total points')}
          </small>
        </div>
      </div>
      <div className="dashboard-stat">
        <span className="stat-icon coral">
          <ShieldCheck size={20} />
        </span>
        <div>
          <strong>
            {badges}
          </strong>
          <small>
            {t('Lencana diperoleh', 'Badges earned')}
          </small>
        </div>
      </div>
    </div>
    <div className="dashboard-grid">
      <div className="continue-card">
        <div>
          <span className="pill">
            {t('TERUSKAN PERJALANAN', 'CONTINUE YOUR JOURNEY')}
          </span>
          <h2>
            {tr(next.title)}
          </h2>
          <p>
            {tr(next.subtitle)}
          </p>
          <button className="primary" onClick={() => nav('learn/' + next.id)}>{t('Sambung belajar', 'Continue learning')} <ArrowRight size={18} /></button>
        </div>
        <div className="progress-ring" style={{
          '--p': percent + '%'
        }}>
          <span>
            <b>{percent}%</b>
            <small>
              {t('kemajuan', 'progress')}
            </small>
          </span>
        </div>
      </div>
      <div className="panel">
        <span className="eyebrow">
          {t('PENCAPAIAN ANDA', 'YOUR MILESTONES')}
        </span>
        <div className="metric">
          <strong>
            {completed}
            <small>/6</small>
          </strong>
          <span>
            {t('Modul selesai', 'Modules completed')}
          </span>
        </div>
        <div className="metric">
          <strong>
            {attempts.length}
          </strong>
          <span>
            {t('Percubaan kuiz direkodkan', 'Recorded quiz attempts')}
          </span>
        </div>
        <div className="dashboard-chart" aria-label={t('Ringkasan modul selesai', 'Completed module summary')}>
          {modules.map((m, i) => <span key={m.id} style={{
            height: Math.max(8, completedNotes(progress[m.id]?.steps) * 18) + '%'
          }} title={tr(m.title)}>
            <i>
              {i + 1}
            </i>
          </span>)}
        </div>
      </div>
    </div>
    <div className="section-header section">
      <h2>
        {t('Perjalanan pembelajaran', 'Learning journey')}
      </h2>
      <span>{totalSteps}/24 {t('langkah', 'steps')}</span>
    </div>
    <div className="module-grid">
      {modules.map((m, i) => <ModuleCard key={m.id} m={m} index={i} page={page} progress={progress} lang={lang} nav={nav} tr={tr} t={t} />)}
    </div>
    <section className="panel section">
      <h2>
        {t('Sejarah kuiz', 'Quiz history')}
      </h2>
      {attempts.length ? <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>
                {t('Tarikh', 'Date')}
              </th>
              <th>
                {t('Modul', 'Module')}
              </th>
              <th>
                {t('Skor', 'Score')}
              </th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a, i) => <tr key={i}>
              <td>
                {new Date(a.date).toLocaleString(lang === 'ms' ? 'ms-MY' : 'en-GB')}
              </td>
              <td>
                {tr(modules.find(m => m.id === a.moduleId)?.title) || t('Penilaian keseluruhan', 'Overall assessment')}
              </td>
              <td>{a.score}% · {a.correct}/{a.total}</td>
            </tr>)}
          </tbody>
        </table>
      </div> : <p>
        {t('Lengkapkan kuiz pertama untuk melihat rekod anda di sini.', 'Complete your first quiz to see your record here.')}
      </p>}
    </section>
  </>;
}
