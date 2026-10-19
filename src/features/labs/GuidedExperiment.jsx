import { useState } from "react";
import { activities, activityReadings } from "./labActivities.js";
export default function GuidedExperiment({
  kind,
  lang,
  onApply,
  onDone
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en,
    tr = x => x[lang];
  const [index, setIndex] = useState(0),
    [prediction, setPrediction] = useState(null),
    [ran, setRan] = useState(false),
    [reason, setReason] = useState(null),
    [checked, setChecked] = useState(false);
  const a = activities[kind][index];
  function restart(i) {
    setIndex(i);
    setPrediction(null);
    setRan(false);
    setReason(null);
    setChecked(false);
    onDone(false);
  }
  return <section className="guided-experiment" aria-label={t('Aktiviti berpandu', 'Guided activity')}>
 <div className="guided-heading">
      <div>
        <span className="eyebrow">
          {t('AKTIVITI BERPANDU', 'GUIDED ACTIVITY')}
        </span>
        <h3>
          {tr(a.title)}
        </h3>
      </div>
      <span className="activity-status">
        {checked && reason === a.reason ? t('Selesai', 'Complete') : ran ? t('Langkah 3 daripada 3', 'Step 3 of 3') : t('Langkah 1 daripada 3', 'Step 1 of 3')}
      </span>
    </div>
 {activities[kind].length > 1 && <div className="button-row">
      {activities[kind].map((item, i) => <button className="secondary" aria-pressed={index === i} key={item.id} onClick={() => restart(i)}>
        {tr(item.title)}
      </button>)}
    </div>}
 <p>
      {tr(a.setup)}
    </p><fieldset disabled={ran}>
      <legend>1 · {t('Ramal', 'Predict')}: {tr(a.question)}</legend>
      <div className="guided-choices">
        {a.options.map((o, i) => <label key={i}>
          <input type="radio" name={'prediction-' + a.id} checked={prediction === i} onChange={() => setPrediction(i)} />
          <span>
            {tr(o)}
          </span>
        </label>)}
      </div>
    </fieldset>
 <div className="button-row">
      <button className="primary" disabled={prediction === null || ran} onClick={() => {
        setRan(true);
        onApply(a.state);
      }}>2 · {t('Jalankan perbandingan', 'Run comparison')}</button>
      {ran && <button className="secondary" onClick={() => restart(index)}>
        {t('Cuba semula', 'Try again')}
      </button>}
    </div>
 {!ran && <p className="small">
      {t('Pilih ramalan dahulu. Jawapan salah juga berguna untuk menguji idea anda.', 'Choose a prediction first. An incorrect prediction can help you test your ideas.')}
    </p>}
 {ran && <div className="guided-results"><p className="small">
        {t('Rekod perbandingan ini kekal. Tutup panduan untuk meneroka radas; kawalan boleh diubah secara berasingan.', 'This comparison record stays fixed. Close the guide to explore the apparatus; its controls can be changed separately.')}
      </p><div className="compare-cards">
        {activityReadings(a.id, lang).map(r => <article key={r.label}>
          <b>
            {r.label}
          </b>
          {r.lines.map(l => <p key={l}>
            {l}
          </p>)}
        </article>)}
      </div>
 <div className="guided-feedback" role="status">
        <b>
          {prediction === a.answer ? t('Ramalan disokong pemerhatian.', 'Your prediction is supported by the observation.') : t('Mari semak semula ramalan.', 'Let’s revisit your prediction.')}
        </b>
        <p>
          {prediction !== a.answer && tr(a.misconception) + ' '}
          {tr(a.explanation)}
        </p>
      </div>
 <fieldset>
        <legend>3 · {t('Terangkan', 'Explain')}: {tr(a.reflection)}</legend>
        <div className="guided-choices">
          {a.reasons.map((r, i) => <label key={i}>
            <input type="radio" name={'reason-' + a.id} checked={reason === i} onChange={() => {
              setReason(i);
              setChecked(false);
              onDone(false);
            }} />
            <span>
              {tr(r)}
            </span>
          </label>)}
        </div>
      </fieldset>
 <button className="secondary" disabled={reason === null} onClick={() => {
        setChecked(true);
        onDone(reason === a.reason);
      }}>
        {t('Semak penjelasan', 'Check explanation')}
      </button>
 {checked && <p className="guided-feedback" role="status">
        {reason === a.reason ? t('Tepat. Aktiviti selesai. Tutup panduan dan teruskan meneroka radas.', 'Correct. Activity complete. Close the guide and continue exploring the apparatus.') : t('Belum tepat. Baca penjelasan pemerhatian di atas dan pilih sebab yang sepadan.', 'Not quite. Read the observation explanation above and choose the matching reason.')}
      </p>}
 </div>}
 </section>;
}
