import { useEffect, useId, useState } from "react";
import { FlaskConical, Pause, Play, RotateCcw } from "lucide-react";
import { KW, solutionPH, weakRoot, equilibriumAt, bufferPH, titrationPH, saltPH } from "../../lib/chemistry.js";
const format = x => Math.abs(x) > 0 && Math.abs(x) < .001 ? x.toExponential(2) : Number(x.toPrecision(4)).toString();
const translate = lang => (ms, en) => lang === 'ms' ? ms : en;
function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 14,
  step = .1,
  display
}) {
  return <label className="note-slider">
    <span>
      {label}
      <output>
        {display ?? value}
      </output>
    </span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))} />
  </label>;
}
function Reading({
  label,
  value,
  unit
}) {
  return <div className="note-reading">
    <span>
      {label}
    </span>
    <strong>
      {value}
      <small>
        {unit}
      </small>
    </strong>
  </div>;
}
function Vessel({
  strong = false,
  ph = 7,
  label,
  children
}) {
  return <div className="note-vessel-wrap">
    <div className="note-vessel" style={{
      '--liquid': ph < 7 ? '#ffe0c9' : ph > 7 ? '#e4d8ff' : '#ccf2f5'
    }}>
      <div className="note-liquid" />
      {Array.from({
        length: strong ? 12 : 8
      }, (_, i) => <span className={'note-particle ' + (strong ? i % 2 ? 'ion-blue' : 'ion-red' : i < 6 ? 'molecule' : i === 6 ? 'ion-red' : 'ion-blue')} key={i} style={{
        left: 12 + i % 4 * 22 + '%',
        top: 22 + Math.floor(i / 4) * 23 + '%',
        animationDelay: -i * .71 + 's'
      }}>
        {strong ? i % 2 ? 'Cl⁻' : 'H₃O⁺' : i < 6 ? 'HA' : i === 6 ? 'H₃O⁺' : 'A⁻'}
      </span>)}
      {children}
    </div>
    <b>
      {label}
    </b>
  </div>;
}
function Plot({
  series,
  point,
  yMax = 14,
  xMin = 0,
  xMax = 50,
  title,
  xLabel,
  yLabel
}) {
  const sx = x => 42 + (x - xMin) / (xMax - xMin) * 450,
    sy = y => 190 - y / yMax * 160;
  return <svg className="note-plot" viewBox="0 0 540 240" role="img" aria-label={title}>
    <title>
      {title}
    </title>
    <path d="M42 25V190H500" fill="none" stroke="#637d8b" strokeWidth="1.5" />
    {[0, .5, 1].map(f => <g key={f}>
      <path d={`M42 ${sy(f * yMax)}H500`} stroke="#d6e6ed" strokeDasharray="4 4" />
      <text x="33" y={sy(f * yMax) + 5} textAnchor="end">
        {format(f * yMax)}
      </text>
      <text x={sx(xMin + f * (xMax - xMin))} y="210" textAnchor="middle">
        {format(xMin + f * (xMax - xMin))}
      </text>
    </g>)}
    {series.map((s, i) => <polyline key={i} points={s.points.map(([x, y]) => `${sx(x)},${sy(y)}`).join(' ')} fill="none" stroke={s.color} strokeWidth="3" />)}
    {point && <circle cx={sx(point[0])} cy={sy(point[1])} r="6" fill="#092f46" stroke="white" strokeWidth="2" />}
    <text x="275" y="233" textAnchor="middle">
      {xLabel}
    </text>
    <text x="42" y="16">
      {yLabel}
    </text>
  </svg>;
}
function IonScale({
  ph,
  lang
}) {
  const t = translate(lang);
  return <>
    <div className="note-ph-scale">
      <i style={{
        left: Math.max(0, Math.min(100, ph / 14 * 100)) + '%'
      }} />
    </div>
    <div className="note-scale-labels">
      <span>{t('Asid', 'Acid')} · 0</span>
      <span>7 · {t('Neutral', 'Neutral')}</span>
      <span>{t('Bes', 'Base')} · 14</span>
    </div>
    <div className="note-readings">
      <Reading label="[H₃O⁺]" value={format(10 ** -ph)} unit="M" />
      <Reading label="[OH⁻]" value={format(KW / 10 ** -ph)} unit="M" />
    </div>
  </>;
}
function ProtonStudio({
  lang
}) {
  const t = translate(lang),
    [pair, setPair] = useState(0),
    [done, setDone] = useState(false),
    [pkaA, setA] = useState(4),
    [pkaB, setB] = useState(9);
  const pairs = [['HCl', 'H₂O', 'Cl⁻', 'H₃O⁺'], ['H₂PO₄⁻', 'CO₃²⁻', 'HPO₄²⁻', 'HCO₃⁻']],
    p = pairs[pair],
    k = 10 ** (pkaB - pkaA);
  return <>
    <label className="note-select">
      {t('Pilih pasangan tindak balas', 'Choose a reaction')}
      <select value={pair} onChange={e => {
        setPair(Number(e.target.value));
        setDone(false);
      }}>
        {pairs.map((p, i) => <option key={i} value={i}>{p[0]} + {p[1]}</option>)}
      </select>
    </label>
    <div className={'note-proton-scene ' + (done ? 'transferred' : '')}>
      <div>
        <small>
          {done ? t('Bes konjugat', 'Conjugate base') : t('Asid · penderma', 'Acid · donor')}
        </small>
        <strong>
          {p[done ? 2 : 0]}
        </strong>
      </div>
      <span className="note-proton" key={pair + String(done)}>H⁺</span>
      <div>
        <small>
          {done ? t('Asid konjugat', 'Conjugate acid') : t('Bes · penerima', 'Base · acceptor')}
        </small>
        <strong>
          {p[done ? 3 : 1]}
        </strong>
      </div>
    </div>
    <div className="note-sim-actions">
      <button className="primary" onClick={() => setDone(!done)}>
        {done ? t('Pindahkan H⁺ kembali', 'Transfer H⁺ back') : t('Pindahkan satu H⁺', 'Transfer one H⁺')}
      </button>
    </div>
    <p className="note-observation" aria-live="polite">{t('Pasangan konjugat', 'Conjugate pairs')}: {p[0]} / {p[2]} {t('dan', 'and')} {p[3]} / {p[1]}. {t('Kehilangan H⁺ menurunkan cas satu unit; penerimaan H⁺ menaikkannya satu unit.', 'Losing H⁺ lowers charge by one; accepting it raises charge by one.')}</p>
    <h4>
      {t('Bagaimana pKa menentukan kecenderungan?', 'How does pKa predict preference?')}
    </h4>
    <p>
      {t('Teroka sistem umum HA + B ⇌ A⁻ + BH⁺. Nilai di bawah ialah contoh umum, bukan pemalar pasangan yang dipilih di atas.', 'Explore the generic system HA + B ⇌ A⁻ + BH⁺. These values are generic examples, not constants for the selected reaction above.')}
    </p>
    <div className="note-controls">
      <Slider label="pKa(HA)" value={pkaA} onChange={setA} min={0} max={14} />
      <Slider label="pKa(BH⁺)" value={pkaB} onChange={setB} min={0} max={14} />
    </div>
    <div className="note-direction">
      <b>HA + B</b>
      <span>
        {k > 1 ? '⇢' : k < 1 ? '⇠' : '⇌'}
      </span>
      <b>A⁻ + BH⁺</b>
    </div>
    <p className="note-observation" aria-live="polite">K = 10^(pKa(BH⁺) − pKa(HA)) = {format(k)}. {k > 1 ? t('Produk diutamakan pada keseimbangan.', 'Products are favoured at equilibrium.') : k < 1 ? t('Reaktan diutamakan pada keseimbangan.', 'Reactants are favoured at equilibrium.') : t('K = 1: tiada pihak diutamakan oleh K sahaja.', 'K = 1: neither side is favoured by K alone.')} {t('Arah bersih campuran semasa turut memerlukan Q.', 'The net direction of a current mixture also requires Q.')}</p>
  </>;
}
function WaterStudio({
  lang
}) {
  const t = translate(lang),
    [ph, setPh] = useState(7),
    [ionized, setIonized] = useState(false);
  return <>
    <div className={'note-water-scene ' + (ionized ? 'is-ionized' : '')}>
      <span>
        {ionized ? 'H₃O⁺' : 'H₂O'}
      </span>
      <b>⇌</b>
      <span>
        {ionized ? 'OH⁻' : 'H₂O'}
      </span>
    </div>
    <button className="secondary" onClick={() => setIonized(!ionized)}>
      {ionized ? t('Lihat dua molekul air', 'Show two water molecules') : t('Lihat satu peristiwa autoionisasi', 'Show one autoionization event')}
    </button>
    <p>
      {t('Satu molekul air memberi H⁺, satu lagi menerimanya. H₃O⁺ dan OH⁻ terbentuk berpasangan; hanya sebahagian amat kecil air mengion.', 'One water molecule donates H⁺ and another accepts it. H₃O⁺ and OH⁻ form together; only a tiny fraction of water ionizes.')}
    </p>
    <Slider label={t('Tambah asid / bes: pH larutan pada 25 °C', 'Add acid / base: solution pH at 25 °C')} value={ph} onChange={setPh} />
    <IonScale ph={ph} lang={lang} />
    <p className="note-observation" aria-live="polite">Kw = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴. {ph === 7 ? t('Pada pH 7, kedua-dua kepekatan sama: larutan neutral.', 'At pH 7, the two concentrations are equal: a neutral solution.') : ph < 7 ? t('H₃O⁺ lebih banyak daripada OH⁻: larutan berasid.', 'H₃O⁺ exceeds OH⁻: the solution is acidic.') : t('OH⁻ lebih banyak daripada H₃O⁺: larutan berbes.', 'OH⁻ exceeds H₃O⁺: the solution is basic.')} {t('Suhu ditetapkan pada 25 °C; pada suhu lain pH neutral boleh berubah.', 'Temperature is fixed at 25 °C; neutral pH can change at other temperatures.')}</p>
    <button className="secondary" onClick={() => {
      setPh(7);
      setIonized(false);
    }}>
      <RotateCcw size={16} />
      {t('Kembali ke neutral', 'Reset to neutral')}
    </button>
  </>;
}
function RatesStudio({
  lang
}) {
  const t = translate(lang),
    [time, setTime] = useState(0),
    [running, setRunning] = useState(false),
    eq = equilibriumAt(time);
  useEffect(() => {
    if (!running) return;
    let id, last;
    const tick = now => {
      if (last !== undefined) {
        const delta = Math.min(.2, (now - last) / 1000) * 5;
        setTime(v => Math.min(80, v + delta));
      }
      last = now;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [running]);
  useEffect(() => {
    if (time >= 80) setRunning(false);
  }, [time]);
  const xs = Array.from({
    length: 81
  }, (_, i) => i);
  return <>
    <div className="note-closed-system">
      <div className="note-species-row">
        <b className="species-a">A</b>
        <span className="note-cycle">⇌</span>
        <b className="species-b">B</b>
      </div>
      <div className="note-concentration">
        <span style={{
          width: eq.a * 100 + '%'
        }} />
        <i style={{
          width: eq.b * 100 + '%'
        }} />
      </div>
      <p>[A] = {eq.a.toFixed(3)} M · [B] = {eq.b.toFixed(3)} M</p>
    </div>
    <div className="note-readings">
      <Reading label={t('Kadar hadapan', 'Forward rate')} value={eq.forwardRate.toFixed(4)} unit="M s⁻¹" />
      <Reading label={t('Kadar songsang', 'Reverse rate')} value={eq.reverseRate.toFixed(4)} unit="M s⁻¹" />
    </div>
    <Plot series={[{
      color: '#007e9d',
      points: xs.map(x => [x, equilibriumAt(x).forwardRate])
    }, {
      color: '#af4b87',
      points: xs.map(x => [x, equilibriumAt(x).reverseRate])
    }]} point={[time, eq.forwardRate]} yMax={.08} xMax={80} title={t('Kadar hadapan dan songsang menghampiri nilai sama', 'Forward and reverse rates approach the same value')} xLabel={t('Masa (s)', 'Time (s)')} yLabel={t('Kadar (M s⁻¹)', 'Rate (M s⁻¹)')} />
    <div className="note-legend">
      <span className="species-a">● {t('Hadapan', 'Forward')}</span>
      <span className="species-b">● {t('Songsang', 'Reverse')}</span>
    </div>
    <Slider label={t('Masa simulasi (s)', 'Simulation time (s)')} value={time} onChange={v => {
      setRunning(false);
      setTime(v);
    }} min={0} max={80} step={1} display={time.toFixed(1)} />
    <div className="note-sim-actions">
      <button className="primary" onClick={() => {
        if (time >= 80) setTime(0);
        setRunning(!running);
      }}>{running ? <Pause size={16} /> : <Play size={16} />} {running ? t('Jeda', 'Pause') : t('Mainkan', 'Play')}</button>
      <button className="secondary" onClick={() => {
        setRunning(false);
        setTime(0);
      }}>
        <RotateCcw size={16} />
        {t('Ulang', 'Reset')}
      </button>
    </div>
    <p className="note-observation">
      {t('Pada keseimbangan, kadar sama dan bukan sifar; [B] = 2[A], bukan [B] = [A]. Sistem tertutup, jumlah [A] + [B] = 1 M.', 'At equilibrium, rates are equal and nonzero; [B] = 2[A], not [B] = [A]. The closed system has [A] + [B] = 1 M.')}
    </p>
  </>;
}
function IceTable({
  c,
  k,
  base = false,
  generic = false
}) {
  const x = weakRoot(k, c);
  return <div className="note-ice">
    <table>
      <caption>ICE · {generic ? 'AB ⇌ A + B' : base ? 'B + H₂O ⇌ BH⁺ + OH⁻' : 'HA + H₂O ⇌ A⁻ + H₃O⁺'} (M)</caption>
      <thead>
        <tr>
          <th scope="col">M</th>
          <th scope="col">
            {generic ? 'AB' : base ? 'B' : 'HA'}
          </th>
          <th scope="col">
            {generic ? 'A' : base ? 'BH⁺' : 'A⁻'}
          </th>
          <th scope="col">
            {generic ? 'B' : base ? 'OH⁻' : 'H₃O⁺'}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">I</th>
          <td>
            {format(c)}
          </td>
          <td>0</td>
          <td>≈ 0</td>
        </tr>
        <tr>
          <th scope="row">C</th>
          <td>−x</td>
          <td>+x</td>
          <td>+x</td>
        </tr>
        <tr>
          <th scope="row">E</th>
          <td>
            {format(c - x)}
          </td>
          <td>
            {format(x)}
          </td>
          <td>
            {format(x)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>;
}
function QuotientStudio({
  lang
}) {
  const t = translate(lang),
    [q, setQ] = useState(1),
    [c, setC] = useState(.1),
    k = 4;
  return <>
    <div className="note-concept-grid">
      {[['Kc', t('Nisbah pada keseimbangan', 'Ratio at equilibrium')], ['Q', t('Nisbah campuran sekarang', 'Ratio of the current mixture')], ['Kp', t('Gas: gunakan tekanan separa', 'Gases: use partial pressures')]].map(([label, text]) => <div key={label}>
        <strong>
          {label}
        </strong>
        <p>
          {text}
        </p>
      </div>)}
    </div>
    <Slider label="Q (K = 4)" value={q} onChange={setQ} min={.1} max={8} step={.1} />
    <div className="note-direction">
      <b>
        {t('Reaktan', 'Reactants')}
      </b>
      <span>
        {q < k ? '→' : q > k ? '←' : '⇌'}
      </span>
      <b>
        {t('Produk', 'Products')}
      </b>
    </div>
    <p className="note-observation" aria-live="polite">Q {q < k ? '<' : q > k ? '>' : '='} K: {q < k ? t('produk terbentuk secara bersih.', 'net product formation.') : q > k ? t('reaktan terbentuk secara bersih.', 'net reactant formation.') : t('kadar hadapan dan songsang sama.', 'forward and reverse rates are equal.')}</p>
    <div className="note-relation">Kp = Kc(RT)^Δn <small>Δn = {t('mol gas produk − mol gas reaktan', 'gas moles of products − gas moles of reactants')}</small></div>
    <h4>
      {t('Lihat jadual ICE berubah', 'Watch an ICE table change')}
    </h4>
    <Slider label="[AB]₀ (M) · Kc = 0.001" value={c} onChange={setC} min={.01} max={.2} step={.01} />
    <IceTable c={c} k={.001} generic />
    <p>
      {t('I = awal, C = perubahan, E = keseimbangan. Satu AB menghasilkan satu A dan satu B; Kc = x²/(C − x).', 'I = initial, C = change, E = equilibrium. One AB gives one A and one B; Kc = x²/(C − x).')}
    </p>
  </>;
}
function DisturbanceStudio({
  lang
}) {
  const t = translate(lang),
    [choice, setChoice] = useState(0),
    states = [{
      n: 3,
      label: t('Asal', 'Initial'),
      explain: t('Kedua-dua arah berjalan pada kadar sama.', 'Both directions operate at equal rates.')
    }, {
      n: 2,
      label: t('Panaskan', 'Heat'),
      explain: t('Arah endotermik diutamakan: lebih NO₂, K meningkat.', 'The endothermic direction is favoured: more NO₂ and a larger K.')
    }, {
      n: 5,
      label: t('Mampatkan', 'Compress'),
      explain: t('Pada suhu tetap, sistem menghala ke mol gas lebih sedikit (N₂O₄); K kekal.', 'At constant temperature, fewer gas moles (N₂O₄) are favoured; K stays constant.')
    }, {
      n: 3,
      label: t('Tambah mangkin', 'Add catalyst'),
      explain: t('Kedua-dua arah dipercepat; K dan komposisi keseimbangan kekal.', 'Both directions speed up; K and equilibrium composition stay unchanged.')
    }],
    s = states[choice];
  return <>
    <div className="note-relation">N₂O₄(g) ⇌ 2NO₂(g) · ΔH &gt; 0</div>
    <div className="note-choice-row">
      {states.map((s, i) => <button className="secondary" aria-pressed={choice === i} key={i} onClick={() => setChoice(i)}>
        {s.label}
      </button>)}
    </div>
    <div className={'note-gas-box ' + (choice === 2 ? 'compressed' : '')}>
      <div className="note-gas-particles" key={choice}>
        {Array.from({
          length: s.n
        }, (_, i) => <span className="gas-pair" key={'a' + i}>N₂O₄</span>)}
        {Array.from({
          length: 12 - 2 * s.n
        }, (_, i) => <span className="gas-single" key={'b' + i}>NO₂</span>)}
      </div>
    </div>
    <p className="note-observation" aria-live="polite">
      {s.explain}
    </p>
    <p className="note-caption">
      {t('Gambaran kualitatif arah perubahan, bukan nisbah keseimbangan yang dikira. Bilangan atom N dikekalkan dalam rajah; pada keseimbangan kedua-dua arah masih berlaku.', 'A qualitative picture of the shift, not a calculated equilibrium ratio. N atoms are conserved in the diagram; both reactions continue at equilibrium.')}
    </p>
  </>;
}
function IonizationStudio({
  lang,
  step = 0,
  calculation = false
}) {
  const t = translate(lang),
    [logC, setC] = useState(-1),
    [strong, setStrong] = useState(false),
    [base, setBase] = useState(false),
    c = 10 ** logC,
    k = 1.8e-5,
    ph = solutionPH({
      concentration: c,
      ka: k,
      strength: strong ? 'strong' : 'weak',
      base
    }),
    h = 10 ** -(base ? 14 - ph : ph),
    alpha = strong ? 1 : k / (k + h),
    x = weakRoot(k, c),
    approx = Math.sqrt(k * c);
  return <>
    <div className="note-choice-row">
      <button className="secondary" aria-pressed={!strong && !base} onClick={() => {
        setStrong(false);
        setBase(false);
      }}>
        {t('Asid lemah · CH₃COOH', 'Weak acid · CH₃COOH')}
      </button>
      <button className="secondary" aria-pressed={strong} onClick={() => {
        setStrong(true);
        setBase(false);
      }}>
        {t('Asid kuat · HCl', 'Strong acid · HCl')}
      </button>
      {calculation && <button className="secondary" aria-pressed={base} onClick={() => {
        setStrong(false);
        setBase(!base);
      }}>
        {t('Bes lemah · NH₃', 'Weak base · NH₃')}
      </button>}
    </div>
    <Slider label={t('Kepekatan awal C (M)', 'Initial concentration C (M)')} value={logC} onChange={setC} min={-4} max={-1} step={.1} display={format(c)} />
    {base ? <div className="note-relation">NH₃ + H₂O ⇌ NH₄⁺ + OH⁻</div> : <Vessel strong={strong} ph={ph} label={strong ? 'HCl + H₂O → H₃O⁺ + Cl⁻' : 'HA + H₂O ⇌ H₃O⁺ + A⁻'} />}
    <div className="note-readings">
      <Reading label="pH" value={ph.toFixed(3)} />
      <Reading label={t('Pengionan', 'Ionization')} value={(alpha * 100).toFixed(2)} unit="%" />
      <Reading label={strong ? t('Hampir lengkap', 'Essentially complete') : base ? 'Kb' : 'Ka'} value={strong ? '≈ 100%' : format(k)} />
    </div>
    <div className="note-alpha">
      <span style={{
        width: alpha * 100 + '%'
      }} />
    </div>
    <p className="note-caption">
      {t('Bikar ialah rajah spesies, bukan nisbah atau bilangan molekul sebenar. Bar menunjukkan pecahan pengionan yang dikira.', 'The beaker shows species, not actual molecular numbers or proportions. The bar shows the calculated ionization fraction.')}
    </p>
    <p className="note-observation" aria-live="polite">
      {strong ? t('Kekuatan tinggi walaupun C dikurangkan. Kepekatan dan kekuatan ialah dua perkara berbeza.', 'Strength stays high as C decreases. Concentration and strength are different properties.') : base ? t('Pencairan meningkatkan peratus pengionan bes lemah, tetapi kepekatan OH⁻ menurun. Kb kekal pada suhu tetap.', 'Dilution raises weak-base percentage ionization while OH⁻ concentration falls. Kb stays constant at fixed temperature.') : t('Apabila asid lemah dicairkan, peratus pengionan meningkat tetapi kepekatan H₃O⁺ menurun. Ka kekal pada suhu tetap.', 'Diluting a weak acid raises percentage ionization while lowering H₃O⁺ concentration. Ka stays constant at fixed temperature.')}
    </p>
    {!strong && (calculation || step === 1) && <>
      <IceTable c={c} k={k} base={base} />
      <p>x ({t('kuadratik', 'quadratic')}) = {format(x)} M · √(KC) = {format(approx)} M</p>
      <p>{t('Semakan anggaran', 'Approximation check')}: {(approx / c * 100).toFixed(2)}% · {approx / c <= .05 ? t('≤ 5%: anggaran kecil-x sesuai.', '≤ 5%: small-x approximation is suitable.') : t('> 5%: gunakan kuadratik.', '> 5%: use the quadratic.')}</p>
      <p className="note-caption">
        {t('ICE mengabaikan autoionisasi air; pH menggunakan imbangan cas termasuk air. Model larutan ideal, 25 °C.', 'ICE neglects water autoionization; pH includes water through charge balance. Ideal solution model, 25 °C.')}
      </p>
    </>}
  </>;
}
function PHStudio({
  lang
}) {
  const t = translate(lang),
    [ph, setPh] = useState(3);
  return <>
    <Slider label="pH" value={ph} onChange={setPh} />
    <IonScale ph={ph} lang={lang} />
    <div className="note-readings">
      <Reading label="pH = −log₁₀[H₃O⁺]" value={ph.toFixed(2)} />
      <Reading label="pOH = 14 − pH" value={(14 - ph).toFixed(2)} />
    </div>
    <p className="note-observation">{t('Setiap penurunan satu unit pH menaikkan [H₃O⁺] sepuluh kali. Skala ini ialah logaritma, bukan linear.', 'Each one-unit decrease in pH multiplies [H₃O⁺] by ten. This is a logarithmic scale, not a linear one.')} Kw = 1.0 × 10⁻¹⁴ (25 °C).</p>
  </>;
}
function SaltStudio({
  lang
}) {
  const t = translate(lang),
    [salt, setSalt] = useState('acetate'),
    [logC, setC] = useState(-1),
    c = 10 ** logC,
    ph = saltPH(salt, c);
  return <>
    <label className="note-select">
      {t('Pilih garam', 'Choose a salt')}
      <select value={salt} onChange={e => setSalt(e.target.value)}>
        <option value="acetate">CH₃COONa</option>
        <option value="ammonium">NH₄Cl</option>
        <option value="nacl">NaCl</option>
      </select>
    </label>
    <Slider label={t('Kepekatan (M)', 'Concentration (M)')} value={logC} onChange={setC} min={-4} max={-1} step={.1} display={format(c)} />
    <div className="note-relation">
      {salt === 'acetate' ? 'CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻' : salt === 'ammonium' ? 'NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺' : 'Na⁺ + Cl⁻ · ' + t('ion pengiring', 'spectator ions')}
    </div>
    <Reading label="pH" value={ph.toFixed(3)} />
    <IonScale ph={ph} lang={lang} />
    <p className="note-observation">{salt === 'nacl' ? t('Kedua-dua ion tidak menghidrolisis dengan ketara: neutral.', 'Neither ion hydrolyses appreciably: neutral.') : salt === 'acetate' ? t('Bes konjugat asid lemah menerima proton daripada air: larutan berbes.', 'The conjugate base of a weak acid accepts a proton from water: a basic solution.') : t('Asid konjugat bes lemah memberi proton kepada air: larutan berasid.', 'The conjugate acid of a weak base donates a proton to water: an acidic solution.')} {t('Ion logam terhidrat dibincangkan dalam nota tambahan.', 'Hydrated metal ions are discussed in the additional notes.')}</p>
  </>;
}
function BufferStudio({
  lang
}) {
  const t = translate(lang),
    [acid, setAcid] = useState(10),
    [salt, setSalt] = useState(10),
    [added, setAdded] = useState(0),
    ph = bufferPH(acid, salt, added),
    ha = Math.max(0, Math.min(acid + salt, acid - added)),
    a = Math.max(0, Math.min(acid + salt, salt + added)),
    exhausted = added >= acid || -added >= salt;
  const waterPH = n => solutionPH({
    concentration: Math.abs(n) / 100,
    base: n >= 0,
    strength: 'strong'
  });
  const xs = Array.from({
    length: 81
  }, (_, i) => -20 + i * .5);
  return <>
    <div className="note-relation">CH₃COOH / CH₃COO⁻ · Ka = 1.8 × 10⁻⁵</div>
    <div className="note-controls">
      <Slider label="HA (mmol)" value={acid} onChange={setAcid} min={1} max={20} step={1} />
      <Slider label="A⁻ (mmol)" value={salt} onChange={setSalt} min={1} max={20} step={1} />
    </div>
    <Slider label={t('Tambah asid (−) atau bes (+), mmol', 'Add acid (−) or base (+), mmol')} value={added} onChange={setAdded} min={-20} max={20} step={.5} />
    <div className="note-buffer-bars">
      <div>
        <b>HA</b>
        <span style={{
          width: ha / (acid + salt) * 100 + '%'
        }} />
      </div>
      <div>
        <b>A⁻</b>
        <span style={{
          width: a / (acid + salt) * 100 + '%'
        }} />
      </div>
    </div>
    <p className="note-caption">
      {t('Bar menunjukkan jumlah selepas peneutralan stoikiometri, sebelum pelarasan keseimbangan. Isi padu 100 mL; isi padu bahan ditambah diabaikan.', 'Bars show amounts after stoichiometric neutralization, before equilibrium adjustment. Volume is 100 mL; added volume is neglected.')}
    </p>
    <div className="note-readings">
      <Reading label={t('pH penimbal', 'Buffer pH')} value={ph.toFixed(3)} />
      <Reading label={t('pH air + bahan sama', 'Water + same addition pH')} value={waterPH(added).toFixed(3)} />
    </div>
    <Plot series={[{
      color: '#007e9d',
      points: xs.map(n => [n, bufferPH(acid, salt, n)])
    }, {
      color: '#af4b87',
      points: xs.map(n => [n, waterPH(n)])
    }]} point={[added, ph]} xMin={-20} xMax={20} title={t('Respons pH penimbal berbanding air tanpa penimbal', 'pH response of buffer compared with unbuffered water')} xLabel={t('Asid (−) / bes (+) ditambah, mmol', 'Acid (−) / base (+) added, mmol')} yLabel="pH" />
    <div className="note-legend">
      <span className="species-a">● {t('Penimbal', 'Buffer')}</span>
      <span className="species-b">● {t('Air tanpa penimbal', 'Unbuffered water')}</span>
    </div>
    <p className="note-observation" aria-live="polite">
      {exhausted ? t('Satu komponen telah habis secara stoikiometri: kapasiti penimbal dilampaui. Gunakan imbangan cas; Henderson–Hasselbalch tidak sesuai.', 'One component is stoichiometrically exhausted: buffer capacity is exceeded. Use charge balance; Henderson–Hasselbalch is unsuitable.') : added > 0 ? t('HA meneutralkan OH⁻ lalu menjadi A⁻. Nisbah A⁻/HA meningkat dan pH meningkat.', 'HA neutralizes OH⁻ and becomes A⁻. The A⁻/HA ratio and pH increase.') : added < 0 ? t('A⁻ menerima H⁺ lalu menjadi HA. Nisbah A⁻/HA menurun dan pH menurun.', 'A⁻ accepts H⁺ and becomes HA. The A⁻/HA ratio and pH decrease.') : t('Dua komponen tersedia untuk menerima penambahan asid atau bes.', 'Both components are available to respond to added acid or base.')}
    </p>
    <button className="secondary" onClick={() => {
      setAcid(10);
      setSalt(10);
      setAdded(0);
    }}>
      <RotateCcw size={16} />
      {t('Ulang', 'Reset')}
    </button>
  </>;
}
function TitrationStudio({
  lang
}) {
  const t = translate(lang),
    [volume, setVolume] = useState(0),
    [type, setType] = useState('weak-acid'),
    ph = titrationPH(volume, type),
    acid = type.endsWith('acid'),
    weak = type.startsWith('weak');
  const phase = volume === 0 ? t('Larutan awal', 'Initial solution') : Math.abs(volume - 12.5) < .01 && weak ? t('Separuh kesetaraan: pH ≈ pKa / pOH ≈ pKb', 'Half-equivalence: pH ≈ pKa / pOH ≈ pKb') : Math.abs(volume - 25) < .01 ? t('Titik kesetaraan', 'Equivalence point') : volume < 25 ? weak ? t('Sebelum kesetaraan: kawasan penimbal', 'Before equivalence: buffer region') : t('Sebelum kesetaraan: analit berbaki', 'Before equivalence: analyte remains') : t('Selepas kesetaraan: titran berlebihan', 'After equivalence: excess titrant');
  const id = useId().replace(/:/g, '');
  return <>
    <label className="note-select">
      {t('Jenis titrasi', 'Titration type')}
      <select value={type} onChange={e => {
        setType(e.target.value);
        setVolume(0);
      }}>
        {[['weak-acid', t('Asid lemah + bes kuat', 'Weak acid + strong base')], ['strong-acid', t('Asid kuat + bes kuat', 'Strong acid + strong base')], ['weak-base', t('Bes lemah + asid kuat', 'Weak base + strong acid')], ['strong-base', t('Bes kuat + asid kuat', 'Strong base + strong acid')]].map(([v, label]) => <option key={v} value={v}>
          {label}
        </option>)}
      </select>
    </label>
    <div className="note-titration-visual">
      <svg viewBox="0 0 200 210" role="img" aria-labelledby={id}>
        <title id={id}>
          {t('Buret menambah titran ke dalam kelalang', 'A burette adds titrant to a flask')}
        </title>
        <rect x="88" y="8" width="24" height="103" rx="5" fill="#e8f7ff" stroke="#3e6b80" strokeWidth="3" />
        <rect x="91" y={13 + volume * .9} width="18" height={Math.max(3, 88 - volume * .9)} fill="#62c4e6" />
        {[25, 45, 65, 85].map(y => <path key={y} d={`M88 ${y}H99`} stroke="#3e6b80" />)}
        <path d="M100 112V131M86 119H115M82 149V160L54 195Q50 203 61 203H139Q150 203 146 195L118 160V149" fill="none" stroke="#3e6b80" strokeWidth="3" />
        <path d="M70 181L59 198H141L130 181Z" fill={ph < 7 ? '#ffcfae' : '#d8c4f6'} />
        {volume > 0 && <circle key={volume + type} className="note-drop" cx="100" cy="132" r="4" fill="#079ec8" />}
      </svg>
      <div>
        <Reading label="pH" value={ph.toFixed(3)} />
        <p>
          {phase}
        </p>
        <p>25 mL · 0.10 M {t('analit', 'analyte')}<br />0.10 M {t('titran', 'titrant')}</p>
      </div>
    </div>
    <Slider label={t('Isi padu titran (mL)', 'Titrant volume (mL)')} value={volume} onChange={setVolume} min={0} max={50} step={.5} />
    <div className="note-sim-actions">
      <button className="primary" disabled={volume >= 50} onClick={() => setVolume(v => Math.min(50, v + 1))}>
        {t('Tambah 1 mL', 'Add 1 mL')}
      </button>
      <button className="secondary" onClick={() => setVolume(12.5)}>12.5 mL</button>
      <button className="secondary" onClick={() => setVolume(25)}>
        {t('Kesetaraan · 25 mL', 'Equivalence · 25 mL')}
      </button>
      <button className="secondary" onClick={() => setVolume(0)}>
        <RotateCcw size={16} />
        {t('Ulang', 'Reset')}
      </button>
    </div>
    <Plot series={[{
      color: '#007e9d',
      points: Array.from({
        length: 201
      }, (_, i) => [i / 4, titrationPH(i / 4, type)])
    }]} point={[volume, ph]} title={t('Lengkung titrasi dan kedudukan bacaan semasa', 'Titration curve and current reading')} xLabel={t('Isi padu titran (mL)', 'Titrant volume (mL)')} yLabel="pH" />
    <p className="note-observation" aria-live="polite">{t('Isi padu keseluruhan', 'Total volume')} = {(25 + volume).toFixed(1)} mL. {volume === 25 && weak ? acid ? t('Pada kesetaraan, bes konjugat menghidrolisis: pH > 7.', 'At equivalence, conjugate-base hydrolysis gives pH > 7.') : t('Pada kesetaraan, asid konjugat menghidrolisis: pH < 7.', 'At equivalence, conjugate-acid hydrolysis gives pH < 7.') : volume === 25 ? t('Asid kuat–bes kuat: pH = 7 pada kesetaraan, 25 °C.', 'Strong acid–strong base: equivalence pH is 7 at 25 °C.') : t('Bandingkan bacaan sebelum, pada dan selepas kesetaraan.', 'Compare readings before, at and after equivalence.')}</p>
    <p className="note-caption">
      {t('Warna larutan ialah bantuan visual, bukan ramalan warna penunjuk. Model monoprotik ideal pada 25 °C; Ka atau Kb bahan lemah = 1.8 × 10⁻⁵.', 'Solution colour is illustrative, not an indicator-colour prediction. Ideal monoprotic model at 25 °C; weak-species Ka or Kb = 1.8 × 10⁻⁵.')}
    </p>
  </>;
}
export default function NoteStudio({
  module,
  step,
  lang
}) {
  const t = translate(lang);
  let body;
  if (module === 'foundations') body = step === 1 ? <ProtonStudio lang={lang} /> : <WaterStudio lang={lang} />;
  if (module === 'equilibrium') body = step === 0 ? <RatesStudio lang={lang} /> : step === 1 ? <QuotientStudio lang={lang} /> : <DisturbanceStudio lang={lang} />;
  if (module === 'ionization') body = <IonizationStudio lang={lang} step={step} />;
  if (module === 'calculations') body = step === 0 ? <PHStudio lang={lang} /> : step === 1 ? <IonizationStudio lang={lang} calculation /> : <SaltStudio lang={lang} />;
  if (module === 'buffers') body = <BufferStudio lang={lang} />;
  if (module === 'titration') body = <TitrationStudio lang={lang} />;
  return <section className={'note-studio studio-' + module} aria-label={t('Penerokaan mini dalam nota', 'Mini exploration within the notes')}>
    <header>
      <span>
        <FlaskConical size={22} />
      </span>
      <div>
        <h3>
          {t('Lihat. Ubah. Fahami.', 'See. Change. Understand.')}
        </h3>
        <p>
          {t('Cuba kawalan dan kaitkan perubahan dengan nota di atas.', 'Try the controls and connect the changes to the notes above.')}
        </p>
      </div>
    </header>
    {body}
    <p className="note-caption">
      {t('Penerokaan ini untuk pengukuhan konsep; tidak menambah markah kuiz.', 'This exploration reinforces concepts; it does not add quiz points.')}
    </p>
  </section>;
}
