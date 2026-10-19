import { useEffect, useState } from "react";
import { Atom, Beaker, FlaskConical, RefreshCw, Play, Pause, Droplets, ArrowLeftRight, Thermometer, ChevronDown, BookOpen } from "lucide-react";
import GuidedExperiment from "./GuidedExperiment.jsx";
import { IonComparison, BufferComparison, ShiftStages, indicators } from "./LabVisuals.jsx";
import { IonApparatus, BufferApparatus, TitrationApparatus, DynamicApparatus, GasApparatus } from "./LabApparatus.jsx";
import { solutionPH, titrationPH, bufferPH, equilibriumAt, weakSpecies, saltPH } from "../../lib/chemistry.js";
import { addDose, gasExperiment } from "./labModels.js";
import "../../styles/lab-guided.css";
import "../../styles/lab-workbench.css";
export const labNames = {
  ionization: ['Pengionan dalam air', 'Ionization in water'],
  titration: ['Studio titrasi', 'Titration studio'],
  buffer: ['Makmal penimbal', 'Buffer lab'],
  dynamic: ['Keseimbangan dinamik', 'Dynamic equilibrium'],
  lechatelier: ['Prinsip Le Chatelier', 'Le Chatelier’s principle']
};
const icons = {
  ionization: Atom,
  titration: FlaskConical,
  buffer: Beaker,
  dynamic: ArrowLeftRight,
  lechatelier: Thermometer
};
const descriptions = {
  ionization: ['Bandingkan ion dan pH', 'Compare ions and pH'],
  titration: ['Titis, lihat warna dan pH', 'Dose, observe colour and pH'],
  buffer: ['Uji daya tahan penimbal', 'Test buffer resistance'],
  dynamic: ['Lihat dua arah berterusan', 'Watch both directions continue'],
  lechatelier: ['Ganggu dan lihat respons', 'Disturb and observe the response']
};
const saltNames = {
  nacl: 'NaCl',
  ammonium: 'NH₄Cl',
  acetate: 'CH₃COONa'
};
const disturbanceNames = [['heat', 'Panaskan', 'Heat'], ['cool', 'Sejukkan', 'Cool'], ['compress', 'Tekan omboh', 'Push piston'], ['expand', 'Tarik omboh', 'Pull piston'], ['reactant', 'Tambah N₂O₄', 'Add N₂O₄'], ['product', 'Tambah NO₂', 'Add NO₂'], ['inert', 'Gas lengai', 'Inert gas'], ['catalyst', 'Mangkin', 'Catalyst']];
function Fact({
  label,
  value,
  detail
}) {
  return <div className="lab-fact">
    <span>
      {label}
    </span>
    <strong>
      {value}
    </strong>
    {detail && <small>
      {detail}
    </small>}
  </div>;
}
function Insight({
  title,
  formula,
  children
}) {
  return <section className="live-insight">
    <h4>
      {title}
    </h4>
    {formula && <div className="reaction-card">
      {formula}
    </div>}
    {children}
  </section>;
}
function Chart({
  points,
  second,
  value,
  max = 50,
  label = 'pH',
  yMax = 14
}) {
  const map = (x, y) => `${48 + x / max * 390},${208 - y / yMax * 170}`;
  return <svg className="chart" viewBox="0 0 470 250" role="img" aria-label={label}>
    {[0, .25, .5, .75, 1].map(f => <g key={f}>
      <path d={`M48 ${208 - f * 170} H438`} stroke="#d8e7ed" />
      <text x="39" y={213 - f * 170} textAnchor="end" fontSize="13" fill="#31556b">
        {+(f * yMax).toFixed(2)}
      </text>
    </g>)}
    <path d="M48 30 V208 H440" fill="none" stroke="#5b798d" />
    <polyline points={points.map(([x, y]) => map(x, y)).join(' ')} fill="none" stroke="#087f91" strokeWidth="3" />
    {second && <polyline points={second.map(([x, y]) => map(x, y)).join(' ')} fill="none" stroke="#8754bd" strokeWidth="3" strokeDasharray="7 4" />}
    {value && <circle cx={48 + value[0] / max * 390} cy={208 - value[1] / yMax * 170} r="6" fill="#c77815" stroke="white" strokeWidth="2" />}
    <text x="48" y="232" fontSize="13" fill="#31556b">0</text>
    <text x="416" y="232" fontSize="13" fill="#31556b">
      {max}
    </text>
    <text x="49" y="21" fontSize="13" fill="#244b62">
      {label}
    </text>
  </svg>;
}
export default function LabWorkbench({
  lang,
  initial = 'ionization',
  onComplete,
  onKindChange
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en;
  const [kind, setKind] = useState(labNames[initial] ? initial : 'ionization');
  useEffect(() => {
    onKindChange?.(kind);
  }, [kind, onKindChange]);
  const [c, setC] = useState(-1),
    [strength, setStrength] = useState('weak'),
    [base, setBase] = useState(false),
    [weakChoice, setWeakChoice] = useState('acetate-acid'),
    [ionMode, setIonMode] = useState('molecular'),
    [salt, setSalt] = useState('nacl');
  const [volume, setVolume] = useState(0),
    [pair, setPair] = useState('weak-acid'),
    [indicator, setIndicator] = useState('phenolphthalein'),
    [dripping, setDripping] = useState(false);
  const [amount, setAmount] = useState(0),
    [dose, setDose] = useState(.5),
    [stirring, setStirring] = useState(true);
  const [time, setTime] = useState(0),
    [initialA, setInitialA] = useState(1),
    [running, setRunning] = useState(false),
    [plot, setPlot] = useState('concentration');
  const [change, setChange] = useState('none'),
    [stage, setStage] = useState('after');
  const [guidedDone, setGuidedDone] = useState(false),
    [observed, setObserved] = useState(false),
    [epoch, setEpoch] = useState(0),
    [pulse, setPulse] = useState(0),
    [mobilePane, setMobilePane] = useState('visual');
  useEffect(() => {
    if (!running || kind !== 'dynamic') return;
    const timer = setInterval(() => setTime(x => Math.min(80, x + 1)), 150);
    return () => clearInterval(timer);
  }, [running, kind]);
  useEffect(() => {
    if (time >= 80) setRunning(false);
  }, [time]);
  useEffect(() => {
    if (!dripping || kind !== 'titration') return;
    const timer = setInterval(() => {
      setVolume(x => Math.min(50, Math.round((x + .1) * 10) / 10));
      setPulse(x => x + 1);
      setObserved(true);
    }, 300);
    return () => clearInterval(timer);
  }, [dripping, kind]);
  useEffect(() => {
    if (volume >= 50) setDripping(false);
  }, [volume]);
  function react() {
    setObserved(true);
    setPulse(x => x + 1);
  }
  function reset() {
    setC(-1);
    setStrength('weak');
    setBase(false);
    setWeakChoice('acetate-acid');
    setIonMode('molecular');
    setSalt('nacl');
    setVolume(0);
    setPair('weak-acid');
    setIndicator('phenolphthalein');
    setDripping(false);
    setAmount(0);
    setDose(.5);
    setStirring(true);
    setTime(0);
    setInitialA(1);
    setRunning(false);
    setPlot('concentration');
    setChange('none');
    setStage('after');
    setObserved(false);
    setGuidedDone(false);
    setEpoch(x => x + 1);
    setPulse(0);
  }
  function applyActivity(s) {
    setRunning(false);
    setDripping(false);
    setIonMode('molecular');
    setInitialA(1);
    if (s.c !== undefined) setC(s.c);
    if (s.strength) setStrength(s.strength);
    if (s.base !== undefined) setBase(s.base);
    if (s.weakChoice) setWeakChoice(s.weakChoice);
    if (s.time !== undefined) setTime(s.time);
    if (s.amount !== undefined) setAmount(s.amount);
    if (s.change) {
      setChange(s.change);
      setStage('after');
    }
    if (s.volume !== undefined) setVolume(s.volume);
    if (s.pair) setPair(s.pair);
    react();
  }
  const species = weakSpecies.find(s => s.id === weakChoice && s.base === base) || weakSpecies.find(s => s.base === base);
  const concentration = 10 ** c,
    ph = ionMode === 'salts' ? saltPH(salt, concentration) : solutionPH({
      concentration,
      strength,
      base,
      ka: species.k
    }),
    ion = 10 ** -(base ? 14 - ph : ph),
    fraction = strength === 'strong' ? 1 : species.k / (species.k + ion);
  const tPh = titrationPH(volume, pair),
    bPh = bufferPH(10, 10, amount),
    eq = equilibriumAt(time, .08, .04, initialA),
    gas = gasExperiment(change),
    ind = indicators[indicator],
    mix = Math.max(0, Math.min(1, (tPh - ind.lo) / (ind.hi - ind.lo)));
  const titrate = delta => {
    setDripping(false);
    setVolume(x => Math.min(50, Math.max(0, Math.round((x + delta) * 10) / 10)));
    react();
  };
  const control = (label, value, min, max, step, update, display) => <label className="slider-label">
    <span>
      {label}
      <b>
        {display ?? value}
      </b>
    </span>
    <input type="range" aria-label={label} aria-valuetext={String(display ?? value)} value={value} min={min} max={max} step={step} onChange={e => {
      update(+e.target.value);
      react();
    }} />
  </label>;
  const prompt = children => <p className="try-prompt">
    {children}
  </p>;
  const Icon = icons[kind];
  return <div className={'lab-shell lab-workbench lab-' + kind + ' mobile-pane-' + mobilePane}>
  <div className="lab-selector" role="group" aria-label={t('Pilih makmal', 'Choose a lab')}>
      {Object.entries(labNames).map(([id, n], i) => {
        const LabIcon = icons[id];
        return <button key={id} className={kind === id ? 'active' : ''} aria-pressed={kind === id} onClick={e => {
          const shell = e.currentTarget.closest('.lab-workbench');
          setKind(id);
          reset();
          requestAnimationFrame(() => shell.querySelector(window.innerWidth <= 540 ? '.mobile-lab-nav' : '.workbench-title')?.scrollIntoView({
            block: 'start',
            behavior: 'auto'
          }));
        }}>
        <span className={'lab-selector-icon tone-' + id}>
          <LabIcon size={24} />
        </span>
        <span>
          <b>
            {n[lang === 'ms' ? 0 : 1]}
          </b>
          <small>
            {descriptions[id][lang === 'ms' ? 0 : 1]}
          </small>
        </span>
        <span className="lab-selector-number">0{i + 1}</span>
      </button>;
      })}
    </div>
  <details className="guided-drawer" key={'drawer-' + kind}>
      <summary>
        <span className="drawer-icon">
          <BookOpen size={21} />
        </span>
        <span>
          <b>
            {t('Aktiviti berpandu', 'Guided activity')}
          </b>
          <small>
            {t('Ramal → Jalankan → Jelaskan · buka panduan langkah demi langkah', 'Predict → Run → Explain · open the step-by-step guide')}
          </small>
        </span>
        <span className="drawer-status">
          {guidedDone ? t('Selesai', 'Complete') : t('3 langkah', '3 steps')}
        </span>
        <ChevronDown size={19} />
      </summary>
      <GuidedExperiment key={kind + '-' + epoch} kind={kind} lang={lang} onApply={applyActivity} onDone={setGuidedDone} />
    </details>
  <div className="workbench-title">
      <div>
        <span className="workbench-badge">
          <Icon size={20} />
          {t('CUBA SENDIRI', 'EXPLORE FOR YOURSELF')}
        </span>
        <h2>
          {labNames[kind][lang === 'ms' ? 0 : 1]}
        </h2>
      </div>
      <button className="secondary reset-lab" onClick={reset}>
        <RefreshCw size={16} />
        {t('Set semula', 'Reset lab')}
      </button>
    </div>
  <div className="mobile-lab-nav" role="group" aria-label={t('Paparan makmal telefon', 'Mobile lab view')}>
      <button aria-pressed={mobilePane === 'visual'} onClick={e => {
        setMobilePane('visual');
        e.currentTarget.parentElement.scrollIntoView({
          block: 'start',
          behavior: 'auto'
        });
      }}>
        {t('Radas & penerangan', 'Apparatus & explanation')}
      </button>
      <button aria-pressed={mobilePane === 'controls'} onClick={e => {
        setMobilePane('controls');
        e.currentTarget.parentElement.scrollIntoView({
          block: 'start',
          behavior: 'auto'
        });
      }}>
        {t('Kawalan eksperimen', 'Experiment controls')}
      </button>
    </div>
  <div className="lab-grid">
      <section className="lab-controls" aria-label={t('Kawalan eksperimen', 'Experiment controls')}><h3>
          {t('Kawalan eksperimen', 'Experiment controls')}
        </h3><p className="control-hint">
          {t('Ubah satu perkara, lihat respons di sebelah.', 'Change one thing, watch the response beside you.')}
        </p>
   {kind === 'ionization' && <>
    <label>
            {t('Penerokaan', 'Exploration')}
            <select aria-label={t('Penerokaan', 'Exploration')} value={ionMode} onChange={e => {
              setIonMode(e.target.value);
              react();
            }}>
              <option value="molecular">
                {t('Kuat, lemah dan pencairan', 'Strength and dilution')}
              </option>
              <option value="salts">
                {t('Hidrolisis garam', 'Salt hydrolysis')}
              </option>
            </select>
          </label>
    {ionMode === 'molecular' ? <>
            <div className="control-pair">
              <label>
                {t('Jenis', 'Type')}
                <select aria-label={t('Jenis', 'Type')} value={base ? 'base' : 'acid'} onChange={e => {
                  setBase(e.target.value === 'base');
                  react();
                }}>
                  <option value="acid">
                    {t('Asid', 'Acid')}
                  </option>
                  <option value="base">
                    {t('Bes', 'Base')}
                  </option>
                </select>
              </label>
              <label>
                {t('Kekuatan', 'Strength')}
                <select aria-label={t('Kekuatan', 'Strength')} value={strength} onChange={e => {
                  setStrength(e.target.value);
                  react();
                }}>
                  <option value="weak">
                    {t('Lemah', 'Weak')}
                  </option>
                  <option value="strong">
                    {t('Kuat', 'Strong')}
                  </option>
                </select>
              </label>
            </div>
            {strength === 'weak' && <label>
              {t('Bahan', 'Species')}
              <select aria-label={t('Bahan', 'Species')} value={species.id} onChange={e => {
                setWeakChoice(e.target.value);
                react();
              }}>
                {weakSpecies.filter(s => s.base === base).map(s => <option key={s.id} value={s.id}>
                  {s.label}
                </option>)}
              </select>
            </label>}
          </> : <label>
            {t('Garam terlarut', 'Dissolved salt')}
            <select aria-label={t('Garam terlarut', 'Dissolved salt')} value={salt} onChange={e => {
              setSalt(e.target.value);
              react();
            }}>
              {Object.entries(saltNames).map(([id, n]) => <option key={id} value={id}>
                {n}
              </option>)}
            </select>
          </label>}
    {control(t('Kepekatan', 'Concentration'), c, -4, -1, .1, setC, concentration.toPrecision(2) + ' M')}
    <button className="apparatus-action" disabled={c <= -4} onClick={() => {
            setC(x => Math.max(-4, Math.round((x - 1) * 10) / 10));
            react();
          }}>
            <Droplets size={18} />
            {t('Cairkan 10× dengan air', 'Dilute 10× with water')}
          </button>
    <p className="model-note">{ionMode === 'molecular' && strength === 'weak' ? `${base ? 'Kb' : 'Ka'} = ${species.k.toExponential(2)} · ` : ''}25 °C · {t('larutan ideal', 'ideal solution')}</p>
   </>}
   {kind === 'titration' && <>
    <label>
            {t('Pasangan titrasi', 'Titration pair')}
            <select aria-label={t('Pasangan titrasi', 'Titration pair')} value={pair} onChange={e => {
              setPair(e.target.value);
              react();
            }}>
              {[['strong-acid', 'Asid kuat + bes kuat', 'Strong acid + strong base'], ['weak-acid', 'Asid lemah + bes kuat', 'Weak acid + strong base'], ['strong-base', 'Bes kuat + asid kuat', 'Strong base + strong acid'], ['weak-base', 'Bes lemah + asid kuat', 'Weak base + strong acid']].map(([id, a, b]) => <option key={id} value={id}>
                {t(a, b)}
              </option>)}
            </select>
          </label>
    <label>
            {t('Penunjuk', 'Indicator')}
            <select aria-label={t('Penunjuk', 'Indicator')} value={indicator} onChange={e => {
              setIndicator(e.target.value);
              react();
            }}>
              {Object.entries(indicators).map(([id, d]) => <option key={id} value={id}>{d.name[lang === 'ms' ? 0 : 1]} ({d.lo}–{d.hi})</option>)}
            </select>
          </label>
    {control(t('Titran ditambah', 'Titrant added'), volume, 0, 50, .1, x => {
            setDripping(false);
            setVolume(x);
          }, volume.toFixed(1) + ' mL')}
    <div className="dose-actions">
            <button className="apparatus-action" disabled={volume >= 50} onClick={() => titrate(.1)}><Droplets size={17} />+ 0.1 mL</button>
            <button className="apparatus-action" disabled={volume >= 50} onClick={() => titrate(1)}>+ 1.0 mL</button>
          </div>
    <button className="apparatus-action" aria-pressed={dripping} disabled={volume >= 50} onClick={() => {
            setDripping(x => !x);
            react();
          }}>{dripping ? <Pause size={17} /> : <Play size={17} />} {dripping ? t('Tutup pili buret', 'Close the stopcock') : t('Buka pili buret', 'Open the stopcock')}</button>
    <div className="button-row landmarks">
            <button className="secondary" onClick={() => {
              setDripping(false);
              setVolume(12.5);
              react();
            }}>{t('Separuh', 'Half')} · 12.5 mL</button>
            <button className="secondary" onClick={() => {
              setDripping(false);
              setVolume(25);
              react();
            }}>{t('Kesetaraan', 'Equivalence')} · 25 mL</button>
          </div>
    <p className="model-note">
            {t('Analit 25.0 mL, 0.100 M; titran 0.100 M. Bahan lemah: Ka/Kb = 1.8 × 10⁻⁵.', 'Analyte 25.0 mL, 0.100 M; titrant 0.100 M. Weak species: Ka/Kb = 1.8 × 10⁻⁵.')}
          </p>
   </>}
   {kind === 'buffer' && <>
    <label>
            {t('Dos setiap pipet', 'Dose per pipette')}
            <select aria-label={t('Dos setiap pipet', 'Dose per pipette')} value={dose} onChange={e => setDose(+e.target.value)}>
              <option value={.25}>0.25 mmol</option>
              <option value={.5}>0.50 mmol</option>
              <option value={1}>1.00 mmol</option>
            </select>
          </label>
    <div className="dose-actions">
            <button className="apparatus-action acid-action" disabled={amount <= -12} onClick={() => {
              setAmount(x => addDose(x, -dose));
              react();
            }}>
              <Droplets size={17} />
              {t('Pipet HCl', 'Pipette HCl')}
            </button>
            <button className="apparatus-action base-action" disabled={amount >= 12} onClick={() => {
              setAmount(x => addDose(x, dose));
              react();
            }}>
              <Droplets size={17} />
              {t('Pipet NaOH', 'Pipette NaOH')}
            </button>
          </div>
    {control(t('Tambahan bersih', 'Net addition'), amount, -12, 12, .25, setAmount, amount === 0 ? t('Tiada dos', 'No dose') : `${Math.abs(amount).toFixed(2)} mmol ${amount < 0 ? 'HCl' : 'NaOH'}`)}
    <button className="apparatus-action" aria-pressed={stirring} onClick={() => {
            setStirring(x => !x);
            react();
          }}>
            <RefreshCw size={17} />
            {stirring ? t('Hentikan pengacau', 'Stop the stirrer') : t('Hidupkan pengacau', 'Start the stirrer')}
          </button>
    <p className="model-note">
            {t('Sampel: 10 mmol HA + 10 mmol A⁻ dalam 100 mL. Ka = 1.8 × 10⁻⁵. Dos ialah beza jumlah bes dan asid kuat; perubahan isi padu diabaikan. Pengacau mengubah animasi; bacaan menganggap campuran lengkap.', 'Sample: 10 mmol HA + 10 mmol A⁻ in 100 mL. Ka = 1.8 × 10⁻⁵. Dose is net strong base minus acid; volume change neglected. Stirring changes animation; readings assume complete mixing.')}
          </p>
   </>}
   {kind === 'dynamic' && <>
    <label>
            {t('Campuran awal', 'Initial mixture')}
            <select aria-label={t('Campuran awal', 'Initial mixture')} value={initialA} onChange={e => {
              setInitialA(+e.target.value);
              setTime(0);
              setRunning(false);
              react();
            }}>
              <option value="1">[A]₀ = 1 M · [B]₀ = 0</option>
              <option value="0">[A]₀ = 0 · [B]₀ = 1 M</option>
              <option value="0.5">[A]₀ = [B]₀ = 0.5 M</option>
            </select>
          </label>
    <button className="apparatus-action" aria-pressed={running} onClick={() => {
            if (time >= 80) setTime(0);
            setRunning(x => !x);
            react();
          }}>{running ? <Pause size={18} /> : <Play size={18} />} {running ? t('Jeda masa model', 'Pause model time') : time >= 80 ? t('Ulang eksperimen', 'Replay experiment') : t('Mulakan eksperimen', 'Start experiment')}</button>
    {control(t('Masa model', 'Model time'), time, 0, 80, 1, x => {
            setRunning(false);
            setTime(x);
          }, time + ' s')}
    <button className="secondary" onClick={() => {
            setRunning(false);
            setTime(80);
            react();
          }}>
            {t('Lihat hampir keseimbangan', 'See near-equilibrium')}
          </button>
    <div className="control-formula">A ⇌ B<br />k<sub>f</sub> = 0.08 s⁻¹ · k<sub>r</sub> = 0.04 s⁻¹</div>
    <p className="model-note">
            {t('Bekas kekal tertutup. Masa model dipercepat. Pada 80 s, zarah terus bergerak untuk menunjukkan sifat dinamik keseimbangan.', 'The vessel stays closed. Model time is accelerated. At 80 s particles keep moving to show the dynamic nature of equilibrium.')}
          </p>
   </>}
   {kind === 'lechatelier' && <>
    <div className="control-formula">N₂O₄(g) ⇌ 2NO₂(g)<br />{t('Arah hadapan endotermik · ΔH > 0', 'Forward direction endothermic · ΔH > 0')}</div>
    <p className="control-hint">
            {t('Pilih satu tindakan radas daripada keseimbangan awal.', 'Choose an apparatus action from the initial equilibrium.')}
          </p>
    <div className="disturbance-actions">
            {disturbanceNames.map(([id, a, b]) => <button key={id} className="apparatus-action" aria-pressed={change === id} onClick={() => {
              setChange(id);
              setStage('after');
              react();
            }}>
              {t(a, b)}
            </button>)}
          </div>
    <p className="model-note">
            {t('Gas lengai: suhu dan isi padu tetap. Setiap butang memulakan percubaan baharu; gangguan tidak terkumpul.', 'Inert gas: fixed temperature and volume. Each button starts a new trial; disturbances are not cumulative.')}
          </p>
   </>}
  </section>
      <section className="lab-visual" aria-label={t('Radas, bacaan dan penerangan', 'Apparatus, readings and explanation')}>
   <div className="live-readings" aria-live="polite" aria-atomic="true">
    {kind === 'ionization' && <>
            <Fact label="pH" value={ph.toFixed(2)} detail={ph < 6.99 ? t('Berasid', 'Acidic') : ph > 7.01 ? t('Berbes', 'Basic') : t('Neutral', 'Neutral')} />
            <Fact label={ionMode === 'salts' ? t('Garam', 'Salt') : t('Mengion', 'Ionized')} value={ionMode === 'salts' ? saltNames[salt] : (fraction * 100).toFixed(3) + '%'} detail={concentration.toPrecision(2) + ' M'} />
            <Fact label={ionMode === 'salts' ? '[H₃O⁺]' : base ? '[OH⁻]' : '[H₃O⁺]'} value={(ionMode === 'salts' ? 10 ** -ph : ion).toExponential(2)} detail="mol L⁻¹" />
          </>}
    {kind === 'titration' && <>
            <Fact label="pH" value={tPh.toFixed(2)} />
            <Fact label={t('Titran', 'Titrant')} value={volume.toFixed(1) + ' mL'} />
            <Fact label={t('Peringkat', 'Stage')} value={volume < 25 ? t('Sebelum', 'Before') : volume === 25 ? t('Kesetaraan', 'Equivalence') : t('Selepas', 'After')} detail={t('kesetaraan pada 25.0 mL', 'equivalence at 25.0 mL')} />
          </>}
    {kind === 'buffer' && <>
            <Fact label="pH" value={bPh.toFixed(2)} detail={'ΔpH ' + (bPh - bufferPH(10, 10) >= 0 ? '+' : '') + (bPh - bufferPH(10, 10)).toFixed(3)} />
            <Fact label="HA" value={Math.max(0, Math.min(20, 10 - amount)).toFixed(2) + ' mmol'} />
            <Fact label="A⁻" value={Math.max(0, Math.min(20, 10 + amount)).toFixed(2) + ' mmol'} />
          </>}
    {kind === 'dynamic' && <>
            <Fact label="[A]" value={eq.a.toFixed(3) + ' M'} detail={'vf = ' + eq.forwardRate.toFixed(4) + ' M/s'} />
            <Fact label="[B]" value={eq.b.toFixed(3) + ' M'} detail={'vr = ' + eq.reverseRate.toFixed(4) + ' M/s'} />
            <Fact label={t('Masa', 'Time')} value={time + ' s'} detail={time >= 60 ? t('Hampir keseimbangan', 'Near-equilibrium') : t('Menghampiri keseimbangan', 'Approaching equilibrium')} />
          </>}
    {kind === 'lechatelier' && <>
            <Fact label={t('Peralihan bersih', 'Net shift')} value={gas.shift === 'none' ? t('Tiada', 'None') : gas.shift === 'right' ? t('Ke kanan →', 'Right →') : t('← Ke kiri', '← Left')} />
            <Fact label="K" value={change === 'heat' ? '↑' : change === 'cool' ? '↓' : t('Kekal', 'Unchanged')} />
            <Fact label={t('Peringkat radas', 'Apparatus stage')} value={stage === 'before' ? t('Awal', 'Initial') : stage === 'disturbed' ? t('Gangguan', 'Disturbed') : t('Akhir', 'Final')} />
          </>}
   </div>
   <div className="lab-stage">
          <div className="stage-illustration">
    {kind === 'ionization' && <IonApparatus lang={lang} ph={ph} fraction={fraction} base={ionMode === 'salts' ? salt === 'acetate' : base} salt={ionMode === 'salts' ? saltNames[salt] : null} pulse={pulse} />}
    {kind === 'titration' && <TitrationApparatus lang={lang} ph={tPh} volume={volume} indicator={indicator} pulse={pulse} />}
    {kind === 'buffer' && <BufferApparatus lang={lang} ph={bPh} amount={amount} pulse={pulse} stirring={stirring} />}
    {kind === 'dynamic' && <DynamicApparatus lang={lang} eq={eq} running={running || time >= 80} pulse={pulse} />}
    {kind === 'lechatelier' && <>
              <GasApparatus lang={lang} change={change} stage={stage} pulse={pulse} />
              <div className="stage-switch" role="group" aria-label={t('Peringkat eksperimen', 'Experiment stage')}>
                {[['before', 'Awal', 'Initial'], ['disturbed', 'Gangguan', 'Disturbed'], ['after', 'Akhir', 'Final']].map(([id, a, b], i) => <button key={id} aria-pressed={stage === id} onClick={() => {
                  setStage(id);
                  react();
                }}>{i + 1} · {t(a, b)}</button>)}
              </div>
            </>}
    <p className="visual-caption">
              {kind === 'ionization' ? ionMode === 'salts' ? t('Ion garam ialah ilustrasi. Hanya sesetengah ion bertindak balas dengan air.', 'Salt ions are illustrative. Only some ions react with water.') : t('Sampel 20 unit dibundarkan. Rujuk peratus berangka untuk pengionan kecil. Warna ialah ilustrasi.', 'A rounded 20-unit sample. Use the numerical percentage for small ionization. Colours are illustrative.') : kind === 'buffer' ? t('Jumlah HA/A⁻ selepas stoikiometri, sebelum pelarasan keseimbangan. Ion pemerhati tidak ditunjukkan.', 'HA/A⁻ amounts after stoichiometry, before equilibrium adjustment. Spectator ions omitted.') : kind === 'dynamic' ? t('Sampel 24 zarah dibundarkan; bacaan menggunakan model kinetik.', 'A rounded 24-particle sample; readings use the kinetic model.') : kind === 'lechatelier' ? t('Model gas ideal secara ilustrasi. Warna dan sampel zarah bukan ukuran eksperimen sebenar.', 'Illustrative ideal-gas model. Colours and particle samples are not experimental measurements.') : t('Warna penunjuk ialah anggaran ilustrasi.', 'Indicator colour is an illustrative approximation.')}
            </p>
   </div>
          <aside className="stage-explanation">
    {kind === 'ionization' && (ionMode === 'salts' ? <Insight title={t('Mengapa garam mengubah pH?', 'Why does a salt change pH?')} formula={salt === 'ammonium' ? 'NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺' : salt === 'acetate' ? 'CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻' : 'NaCl → Na⁺ + Cl⁻'}>
              <p>
                {salt === 'ammonium' ? t('NH₄⁺ menderma proton kepada air. H₃O⁺ terbentuk, maka pH kurang daripada 7.', 'NH₄⁺ donates a proton to water. H₃O⁺ forms, so pH is below 7.') : salt === 'acetate' ? t('Asetat menerima proton daripada air. OH⁻ terbentuk, maka pH lebih daripada 7.', 'Acetate accepts a proton from water. OH⁻ forms, so pH is above 7.') : t('Na⁺ dan Cl⁻ tidak menghidrolisis dengan ketara. Larutan kekal neutral pada 25 °C dalam model ini.', 'Na⁺ and Cl⁻ do not hydrolyse appreciably. The solution stays neutral at 25 °C in this model.')}
              </p>
              {prompt(t('Cuba: bandingkan tiga garam pada kepekatan sama. Adakah semua garam neutral?', 'Try: compare the three salts at equal concentration. Are all salts neutral?'))}
            </Insight> : <Insight title={t('Apa yang anda lihat?', 'What do you observe?')} formula={base ? 'B + H₂O ⇌ BH⁺ + OH⁻' : 'HA + H₂O ⇌ A⁻ + H₃O⁺'}>
              <p>
                {strength === 'strong' ? t('Bahan kuat mengion hampir lengkap. Kepekatan awal menentukan jumlah ion yang dihasilkan.', 'A strong species ionizes essentially completely. Initial concentration determines the ions produced.') : t('Bahan lemah mengion sebahagian. Pencairan meningkatkan peratus pengionan, tetapi menurunkan kepekatan ion.', 'A weak species ionizes partially. Dilution raises ionized percentage but lowers ion concentration.')}
              </p>
              <div className="fraction-meter">
                <span>{(fraction * 100).toFixed(3)}% {t('mengion', 'ionized')}</span>
                <meter min="0" max="1" value={fraction} aria-label={t('Pecahan mengion', 'Ionized fraction')} />
              </div>
              {prompt(t('Cuba: tekan “Cairkan 10×”. Bezakan peratus pengionan dengan kepekatan ion.', 'Try: press “Dilute 10×”. Distinguish ionized percentage from ion concentration.'))}
            </Insight>)}
    {kind === 'titration' && <Insight title={t('Mengapa pH berubah?', 'Why does pH change?')} formula={volume === 0 ? t('Larutan analit awal', 'Initial analyte') : volume < 25 ? t('Analit masih berlebihan', 'Analyte remains in excess') : volume === 25 ? t('Mol titran = mol analit', 'Titrant moles = analyte moles') : t('Titran kuat berlebihan', 'Strong titrant in excess')}>
              <p>
                {volume === 0 ? t('Buka pili untuk menambah titran sedikit demi sedikit. Lihat bacaan pH dan warna penunjuk.', 'Open the stopcock to add titrant gradually. Watch the pH and indicator colour.') : volume < 25 ? pair.startsWith('weak') ? t('Pasangan konjugat terbentuk: kawasan penimbal. Pada 12.5 mL, pH ≈ pKa untuk asid lemah; pOH ≈ pKb untuk bes lemah.', 'A conjugate pair forms: the buffer region. At 12.5 mL, pH ≈ pKa for weak acids; pOH ≈ pKb for weak bases.') : t('Analit kuat belum dineutralkan sepenuhnya. Mol berlebihan dan isi padu keseluruhan menentukan pH.', 'Strong analyte remains in excess. Excess moles and total volume determine pH.') : volume === 25 ? pair.startsWith('weak') ? t('Hidrolisis pasangan konjugat menyebabkan pH kesetaraan berbeza daripada 7.', 'Conjugate-species hydrolysis makes the equivalence pH differ from 7.') : t('pH = 7 pada 25 °C dalam model asid kuat + bes kuat yang ideal.', 'pH = 7 at 25 °C in the ideal strong acid + strong base model.') : t('Lebihan titran kuat mengawal pH.', 'Excess strong titrant controls pH.')}
              </p>
              <p>
                <b>{t('Warna', 'Colour')}: </b>
                {mix === 0 ? ind.labels[0][lang === 'ms' ? 0 : 1] : mix === 1 ? ind.labels[1][lang === 'ms' ? 0 : 1] : t('Dalam julat peralihan', 'Within transition range')}
              </p>
              {prompt(t('Titik akhir = perubahan warna. Kesetaraan = nisbah mol. Pilih julat penunjuk dalam bahagian curam lengkung.', 'Endpoint = colour change. Equivalence = mole ratio. Choose an indicator range in the steep part of the curve.'))}
            </Insight>}
    {kind === 'buffer' && <Insight title={Math.abs(amount) >= 10 ? t('Kapasiti penimbal terlampaui', 'Buffer capacity exceeded') : t('Bagaimana penimbal menahan perubahan pH?', 'How does a buffer resist pH change?')} formula={amount < 0 ? 'A⁻ + H₃O⁺ → HA + H₂O' : amount > 0 ? 'HA + OH⁻ → A⁻ + H₂O' : 'HA + H₂O ⇌ A⁻ + H₃O⁺'}>
              <p>
                {Math.abs(amount) >= 10 ? t('Satu komponen habis secara stoikiometri. Tambahan berlebihan menyebabkan perubahan pH yang besar.', 'One component is stoichiometrically exhausted. Excess additions cause a large pH change.') : amount < 0 ? t('A⁻ menerima proton dan membentuk HA. Nisbah A⁻/HA menurun, maka pH menurun sedikit.', 'A⁻ accepts protons and forms HA. The A⁻/HA ratio falls, so pH falls slightly.') : amount > 0 ? t('HA menggunakan OH⁻ dan membentuk A⁻. Nisbah A⁻/HA meningkat, maka pH meningkat sedikit.', 'HA consumes OH⁻ and forms A⁻. The A⁻/HA ratio rises, so pH rises slightly.') : t('Pasangan HA/A⁻ boleh menggunakan sedikit asid atau bes yang ditambah. Penimbal ini berasid; pH bukan semestinya 7.', 'The HA/A⁻ pair can consume a small acid or base addition. This buffer is acidic; buffer pH need not be 7.')}
              </p>
              {prompt(t('Cuba: satu dos HCl, kemudian dos NaOH yang sama. Bandingkan ΔpH penimbal dengan air di bawah.', 'Try: one HCl dose, then an equal NaOH dose. Compare buffer and water ΔpH below.'))}
            </Insight>}
    {kind === 'dynamic' && <Insight title={t('Kadar sama, tindak balas berterusan', 'Equal rates, continuing reactions')} formula={time >= 60 ? 'vf ≈ vr > 0' : 'vf = kf[A] · vr = kr[B]'}>
              <p>
                {time === 0 ? t('Kadar bergantung pada spesies yang tersedia. Jika B belum hadir, kadar songsang bermula pada sifar.', 'Rates depend on available species. If B is absent, the reverse rate starts at zero.') : time >= 60 ? t('Kepekatan hampir malar kerana kadar pembentukan dan penggunaan seimbang. Zarah terus bertukar; A dan B tidak perlu sama banyak.', 'Concentrations are nearly constant because formation and consumption balance. Interconversion continues; A and B need not have equal amounts.') : t('Kadar hadapan dan songsang menghampiri satu sama lain. Jumlah A + B kekal 1 M.', 'Forward and reverse rates converge. Total A + B remains 1 M.')}
              </p>
              {prompt(t('Cuba: mula dengan A sahaja, kemudian B sahaja. Adakah komposisi akhirnya sama?', 'Try: start with only A, then only B. Is the final composition the same?'))}
            </Insight>}
    {kind === 'lechatelier' && <Insight title={t('Sistem memberi respons', 'The system responds')} formula={gas.shift === 'none' ? '⇌' : gas.shift === 'right' ? 'N₂O₄ → 2NO₂' : '2NO₂ → N₂O₄'}>
              <p>
                {change === 'none' ? t('Pilih radas. Bandingkan awal, sejurus gangguan dan keadaan akhir.', 'Choose an apparatus action. Compare initial, immediately disturbed and final states.') : change === 'heat' ? t('Pemanasan memihak arah endotermik. K meningkat dan lebih NO₂ terbentuk.', 'Heating favours the endothermic direction. K rises and more NO₂ forms.') : change === 'cool' ? t('Penyejukan memihak arah eksotermik. K menurun dan lebih N₂O₄ terbentuk.', 'Cooling favours the exothermic direction. K falls and more N₂O₄ forms.') : change === 'compress' ? t('Mampatan menaikkan Q melebihi K. Sistem beralih ke kiri, ke arah lebih sedikit mol gas. Warna boleh kekal lebih perang daripada awal kerana isi padu lebih kecil.', 'Compression raises Q above K. The system shifts left toward fewer gas moles. It may stay browner than initially because the volume is smaller.') : change === 'expand' ? t('Pengembangan menurunkan Q di bawah K. Sistem beralih ke kanan, ke arah lebih banyak mol gas.', 'Expansion lowers Q below K. The system shifts right toward more gas moles.') : change === 'reactant' ? t('Tambahan N₂O₄ menurunkan Q. Sebahagian reaktan tambahan digunakan: peralihan ke kanan.', 'Adding N₂O₄ lowers Q. Some added reactant is consumed: a shift right.') : change === 'product' ? t('Tambahan NO₂ menaikkan Q. Sebahagian produk tambahan digunakan: peralihan ke kiri.', 'Adding NO₂ raises Q. Some added product is consumed: a shift left.') : change === 'inert' ? t('Pada suhu dan isi padu tetap, tekanan separa gas bertindak balas kekal. Tiada peralihan walaupun tekanan keseluruhan meningkat.', 'At fixed temperature and volume, reacting-gas partial pressures stay unchanged. No shift occurs even though total pressure rises.') : t('Mangkin mempercepat kedua-dua arah tanpa mengubah K. Sistem yang sudah seimbang tiada peralihan bersih.', 'A catalyst speeds both directions without changing K. An already equilibrated system has no net shift.')}
              </p>
              {prompt(t('Hanya perubahan suhu mengubah K. Keadaan akhir kembali memenuhi Q = K.', 'Only temperature changes K. The final state again satisfies Q = K.'))}
            </Insight>}
   </aside>
        </div>
   <details className="lab-extra" key={'extra-' + kind + '-' + ionMode}><summary>
            {kind === 'ionization' ? ionMode === 'salts' ? t('Hubungkan dengan nota hidrolisis', 'Connect to hydrolysis notes') : t('Bandingkan kuat dan lemah', 'Compare strong and weak') : kind === 'buffer' ? t('Bandingkan penimbal dengan air', 'Compare buffer and water') : kind === 'titration' ? t('Lihat lengkung titrasi', 'View titration curve') : kind === 'dynamic' ? t('Lihat graf kepekatan dan kadar', 'View concentration and rate graphs') : t('Semak Q, K dan tiga peringkat', 'Review Q, K and the three stages')}
            <ChevronDown size={18} />
          </summary>
    {kind === 'ionization' && (ionMode === 'salts' ? <p>
            {t('Garam asid kuat + bes kuat lazimnya neutral; ion konjugat bahan lemah boleh menghidrolisis. Jika kedua-dua ion menghidrolisis, bandingkan Ka dan Kb. Tiga contoh ini memfokuskan NaCl, NH₄Cl dan CH₃COONa.', 'Strong acid + strong base salts are usually neutral; a weak-species conjugate ion may hydrolyse. If both ions hydrolyse, compare Ka and Kb. These examples focus on NaCl, NH₄Cl and CH₃COONa.')}
          </p> : <IonComparison lang={lang} concentration={concentration} base={base} k={species.k} />)}
    {kind === 'buffer' && <BufferComparison lang={lang} amount={amount} />}
    {kind === 'titration' && <Chart points={Array.from({
            length: 501
          }, (_, i) => [i / 10, titrationPH(i / 10, pair)])} value={[volume, tPh]} label={t('pH / isi padu titran (mL)', 'pH / titrant volume (mL)')} />}
    {kind === 'dynamic' && <>
            <div className="stage-switch">
              <button aria-pressed={plot === 'concentration'} onClick={() => setPlot('concentration')}>
                {t('Kepekatan', 'Concentration')}
              </button>
              <button aria-pressed={plot === 'rate'} onClick={() => setPlot('rate')}>
                {t('Kadar', 'Rate')}
              </button>
            </div>
            <Chart points={Array.from({
              length: 81
            }, (_, i) => {
              const e = equilibriumAt(i, .08, .04, initialA);
              return [i, plot === 'rate' ? e.forwardRate : e.a];
            })} second={Array.from({
              length: 81
            }, (_, i) => {
              const e = equilibriumAt(i, .08, .04, initialA);
              return [i, plot === 'rate' ? e.reverseRate : e.b];
            })} value={[time, plot === 'rate' ? eq.forwardRate : eq.a]} max={80} yMax={plot === 'rate' ? .08 : 1} label={plot === 'rate' ? t('Kadar (M/s) / masa (s)', 'Rate (M/s) / time (s)') : t('Kepekatan (M) / masa (s)', 'Concentration (M) / time (s)')} />
            <p className="chart-legend">
              {plot === 'rate' ? t('Teal penuh: hadapan · Ungu putus-putus: songsang', 'Solid teal: forward · Dashed purple: reverse') : t('Teal penuh: A · Ungu putus-putus: B', 'Solid teal: A · Dashed purple: B')}
            </p>
          </>}
    {kind === 'lechatelier' && <ShiftStages lang={lang} change={change} />}
   </details>
  </section>
    </div>
  <details className="lab-assumptions">
      <summary>
        {t('Andaian model dan cara menggunakan makmal', 'Model assumptions and using the lab')}
      </summary>
      <p>
        {t('Akueus: 25 °C, spesies monoprotik; aktiviti dianggarkan dengan kepekatan. pH menyelesaikan imbangan cas termasuk autoionisasi air. Zarah, warna dan radas ialah ilustrasi pendidikan. Model gas Le Chatelier berasingan daripada sistem asid–bes akueus.', 'Aqueous: 25 °C, monoprotic species; activities approximated by concentrations. pH solves charge balance including water autoionization. Particles, colours and apparatus are educational illustrations. The Le Chatelier gas model is separate from aqueous acid–base systems.')}
      </p>
      <p>
        {t('Pilih ramalan, jalankan perbandingan, kemudian semak penjelasan. Ramalan dan latihan tidak direkod sebagai markah kuiz.', 'Choose a prediction, run the comparison, then check your explanation. Predictions and practice are not recorded as quiz scores.')}
      </p>
    </details>
  {onComplete && <button className="primary" disabled={!guidedDone || !observed} onClick={onComplete}>{t('Simpan aktiviti & teruskan', 'Save activity & continue')} →</button>}
 </div>;
}
