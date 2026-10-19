import { GuideButton } from "../../components/PageHeader.jsx";
import NoteStudio from "./NoteStudio.jsx";
import { NOTE_STEPS, completedNotes, nextNoteStep } from "../../lib/learningProgress.js";
import ModuleVideos from "./ModuleVideoPanel.jsx";
import SkuExplorer from "./SkuExplorer.jsx";
import TheoryExplorer from "./TheoryExplorer.jsx";
import { useState } from "react";
import { BookOpen, ArrowRight, Check, ChevronRight, ArrowLeft } from "lucide-react";
import { modules } from "../../data/content.js";
import Quiz from "../quiz/Quiz.jsx";
export default function Lesson({
  m,
  lang,
  p,
  ready,
  onStep,
  onQuiz,
  nav,
  onGuide,
  requestedStep,
  requestedTopic
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en,
    tr = x => x[lang];
  const initial = NOTE_STEPS.includes(Number(requestedStep)) && requestedStep !== undefined ? Number(requestedStep) : requestedStep === '3' ? 4 : nextNoteStep(p.steps);
  const [step, setStep] = useState(initial),
    count = completedNotes(p.steps),
    position = NOTE_STEPS.indexOf(step),
    s = m.sections[step];
  const title = [...m.sections.map(section => tr(section.title)), t('Semakan kefahaman', 'Knowledge check')];
  function change(id) {
    setStep(id);
    window.scrollTo(0, 0);
  }
  function next() {
    onStep(step);
    change(NOTE_STEPS[Math.min(position + 1, 3)]);
  }
  return <div className="learning-notes"><div className="page-top note-page-top">
      <div className="breadcrumb">
        <button onClick={() => nav('modules')}>
          {t('Modul', 'Modules')}
        </button>
        <ChevronRight size={14} />
        {tr(m.title)}
      </div>
      <GuideButton lang={lang} onOpen={() => onGuide('learn/' + m.id + '/' + step)} />
    </div>
 <div className="lesson-layout"><aside className="lesson-sidebar"><span className="eyebrow">{t('MODUL', 'MODULE')} {String(modules.indexOf(m) + 1).padStart(2, '0')}</span><h2>
          {tr(m.title)}
        </h2><div className="thin-progress">
          <i style={{
            width: count * 25 + '%'
          }} />
        </div><p className="small">{count}/4 {t('langkah selesai', 'steps completed')}</p>
 <div className="lesson-steps">
          {NOTE_STEPS.map((id, i) => <button key={id} className={step === id ? 'active' : ''} aria-current={step === id ? 'step' : undefined} onClick={() => change(id)}>
            <span>
              {p.steps.includes(id) ? <Check size={15} /> : i + 1}
            </span>
            {title[i]}
          </button>)}
        </div>
 <details className="note-objectives">
          <summary>
            {t('Hasil pembelajaran', 'Learning outcomes')}
          </summary>
          {tr(m.objectives).map(o => <p key={o}>• {o}</p>)}
        </details>
 {s && <button className="video-note-jump" onClick={() => document.getElementById('module-videos')?.scrollIntoView({
          block: 'start',
          behavior: 'auto'
        })}>
          <BookOpen size={18} />
          {t('Video penerangan modul', 'Module explanation videos')}
          <ArrowRight size={16} />
        </button>}
 <p className="note-sidebar-tip">
          {t('Baca nota, cuba penerokaan mini dan semak kefahaman. Eksperimen penuh tersedia di halaman Makmal.', 'Read, try the mini explorations and check your understanding. Full experiments are available on the Lab page.')}
        </p></aside>
 <section className="lesson-content"><div className="note-section-heading">
          <div>
            <span className="eyebrow">{t('LANGKAH', 'STEP')} {position + 1} / 4 · {s ? t('NOTA & PENEROKAAN', 'NOTES & EXPLORATION') : t('KUIZ MODUL', 'MODULE QUIZ')}</span>
            <h1>
              {title[position]}
            </h1>
          </div>
          <img src={import.meta.env.BASE_URL + 'module-art/' + m.id + '.png'} width="1672" height="941" alt="" />
        </div>
 {s ? <>{m.id === 'foundations' && step === 0 ? <>
            <TheoryExplorer lang={lang} />
            <ModuleVideos moduleId={m.id} step={step} lang={lang} />
          </> : <>
            <p className="lesson-lead">
              {tr(s.text)}
            </p>
            <div className="formula">
              {s.formula}
            </div>
            <div className="note-explanation-grid">
              <div className="example-box">
                <span className="eyebrow">
                  {t('CONTOH & APLIKASI', 'EXAMPLE & APPLICATION')}
                </span>
                <p>
                  {tr(s.example)}
                </p>
              </div>
              <div className="callout amber">
                <b>
                  {t('Idea yang perlu diingat', 'Remember this idea')}
                </b>
                <p>
                  {tr(s.misconception)}
                </p>
              </div>
            </div>
            <ModuleVideos moduleId={m.id} step={step} lang={lang} />
            <NoteStudio module={m.id} step={step} lang={lang} />
          </>}
 <SkuExplorer key={m.id + step} module={m.id} step={step} lang={lang} requestedTopic={requestedTopic} />
 <div className="lesson-bottom">
            <button className="secondary" disabled={position === 0} onClick={() => change(NOTE_STEPS[position - 1])}>
              <ArrowLeft size={16} />
              {t('Sebelumnya', 'Previous')}
            </button>
            <button className="primary" disabled={!ready} onClick={next}>
              {t('Saya faham · Teruskan', 'Understood · Continue')}
              <ArrowRight size={16} />
            </button>
          </div></> : <>
          <Quiz key={m.id} lang={lang} moduleId={m.id} ready={ready} onFinish={onQuiz} />
          <div className="lesson-bottom">
            <button className="secondary" onClick={() => change(2)}>
              <ArrowLeft size={16} />
              {t('Kembali ke nota', 'Back to notes')}
            </button>
          </div>
        </>}
 {count === 4 && step === 4 && <div className="callout">
          <b>✓ {t('Modul selesai', 'Module complete')}</b>
          <p>
            {t('Tiga bahagian nota dan kuiz telah selesai. Anda boleh mengulang kaji pada bila-bila masa.', 'Three note sections and the quiz are complete. Revisit them at any time.')}
          </p>
          <button className="primary" onClick={() => nav(modules.indexOf(m) < 5 ? 'learn/' + modules[modules.indexOf(m) + 1].id : 'dashboard')}>{modules.indexOf(m) < 5 ? t('Modul seterusnya', 'Next module') : t('Lihat kemajuan', 'View progress')} →</button>
        </div>}
 </section></div></div>;
}
