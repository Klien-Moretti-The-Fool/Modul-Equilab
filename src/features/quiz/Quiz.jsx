import { useState } from "react";
import { ArrowRight, Check, Target } from "lucide-react";
import { modules, allQuestions } from "../../data/content.js";
import { REVIEW, safeRead, shuffled } from "../../lib/appShared.js";
export default function Quiz({
  lang,
  moduleId,
  onFinish,
  ready
}) {
  const t = (a, b) => lang === 'ms' ? a : b;
  const storageKey = (REVIEW ? 'equilab-review-quiz-' : 'equilab-quiz-') + moduleId;
  const [session, setSession] = useState(() => {
    const s = safeRead(storageKey, null);
    return s && Array.isArray(s.ids) && s.ids.length > 0 && s.ids.every(id => allQuestions.some(q => q.id === id)) && Array.isArray(s.answers) && s.answers.every(a => a && typeof a.correct === 'boolean') && Number.isInteger(s.index) && s.index >= 0 && s.index < s.ids.length ? s : null;
  });
  const [chosen, setChosen] = useState(null);
  function update(s) {
    setSession(s);
    try {
      if (s) localStorage.setItem(storageKey, JSON.stringify(s));else localStorage.removeItem(storageKey);
    } catch {}
  }
  function start() {
    const core = modules.flatMap(m => shuffled(allQuestions.filter(q => q.moduleId === m.id)).slice(0, 2));
    const ids = new Set(core.map(q => q.id));
    const qs = moduleId === 'assessment' ? shuffled([...core, ...shuffled(allQuestions.filter(q => !ids.has(q.id))).slice(0, 3)]) : shuffled(allQuestions.filter(q => q.moduleId === moduleId));
    update({
      ids: qs.map(q => q.id),
      index: 0,
      answers: [],
      complete: false
    });
    setChosen(null);
  }
  const question = session && allQuestions.find(q => q.id === session.ids?.[session.index]);
  const answer = session?.answers?.[session.index];
  const correct = session?.answers?.filter(a => a.correct).length || 0;
  function submit() {
    if (chosen === null || answer) return;
    update({
      ...session,
      answers: [...session.answers, {
        id: question.id,
        selected: chosen,
        correct: chosen === question.answer
      }]
    });
  }
  function next() {
    if (!answer || !ready || session.complete) return;
    if (session.index + 1 === session.ids.length) {
      const result = {
        moduleId,
        date: new Date().toISOString(),
        score: Math.round(correct / session.ids.length * 100),
        correct,
        total: session.ids.length
      };
      onFinish(result);
      update({
        ...session,
        complete: true
      });
    } else {
      update({
        ...session,
        index: session.index + 1
      });
      setChosen(null);
    }
  }
  if (!session || !Array.isArray(session.ids) || !question && !session.complete) return <div className="quiz-intro panel">
    <span className="round-icon">
      <Target size={36} />
    </span>
    <h2>
      {t('Bersedia untuk mencuba?', 'Ready to give it a try?')}
    </h2>
    <p>
      {moduleId === 'assessment' ? t('15 soalan • Semua modul', '15 questions • All modules') : `${allQuestions.filter(q => q.moduleId === moduleId).length} ${t('soalan • Topik modul ini', 'questions • This module')}`}
    </p>
    <p>
      {t('Pilih jawapan, kemudian semak penerangan. Anda boleh mencuba semula tanpa had.', 'Choose an answer and review the explanation. You can retry as often as you like.')}
    </p>
    <button className="primary" onClick={start} disabled={!ready}>
      {t('Mulakan kuiz', 'Start quiz')}
      <ArrowRight size={18} />
    </button>
  </div>;
  if (session.complete) return <div className="quiz-intro panel">
    <span className="round-icon">
      <Check size={36} />
    </span>
    <span className="eyebrow">
      {t('SESI SELESAI', 'SESSION COMPLETE')}
    </span>
    <h2>{Math.round(correct / session.ids.length * 100)}%</h2>
    <p>{correct}/{session.ids.length} {t('jawapan betul', 'correct answers')}</p>
    <p>
      {t('Gunakan penerangan di bawah untuk menyemak semula idea anda.', 'Use the explanations below to revisit your reasoning.')}
    </p>
    <button className="primary" onClick={start}>
      {t('Cuba semula', 'Try again')}
    </button>
    <div className="answer-review">
      {session.answers.map((a, i) => {
        const q = allQuestions.find(q => q.id === a.id);
        return q && <details key={a.id}>
        <summary>{a.correct ? '✓' : '○'} {i + 1}. {q.text[lang]}</summary>
        <p>
          {q.explanation[lang]}
        </p>
      </details>;
      })}
    </div>
  </div>;
  return <div className="quiz-panel panel">
    <div className="section-header">
      <span className="eyebrow">{t('SOALAN', 'QUESTION')} {session.index + 1} / {session.ids.length}</span>
      <span>{correct} {t('betul', 'correct')}</span>
    </div>
    <div className="thin-progress">
      <i style={{
        width: session.answers.length / session.ids.length * 100 + '%'
      }} />
    </div>
    <h2>
      {question.text[lang]}
    </h2>
    <div className="answer-options">
      {question.options.map((o, i) => <button key={i} disabled={!!answer} className={answer ? i === question.answer ? 'correct' : i === answer.selected ? 'incorrect' : '' : chosen === i ? 'selected' : ''} aria-pressed={answer ? answer.selected === i : chosen === i} onClick={() => setChosen(i)}>
        <span>
          {String.fromCharCode(65 + i)}
        </span>
        {o[lang]}
        {answer && i === question.answer && <Check size={19} />}
      </button>)}
    </div>
    {answer ? <>
      <div className={'callout ' + (answer.correct ? '' : 'amber')} aria-live="polite">
        <b>
          {answer.correct ? t('Tepat!', 'Correct!') : t('Mari semak semula.', 'Let’s review.')}
        </b>
        <p>
          {question.explanation[lang]}
        </p>
      </div>
      <button className="primary" disabled={!ready} onClick={next}>{session.index + 1 === session.ids.length ? t('Simpan & lihat keputusan', 'Save & view results') : t('Soalan seterusnya', 'Next question')} →</button>
    </> : <button className="primary" onClick={submit} disabled={chosen === null}>
      {t('Semak jawapan', 'Check answer')}
    </button>}
  </div>;
}
