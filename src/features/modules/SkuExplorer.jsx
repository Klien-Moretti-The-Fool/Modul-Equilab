import { useState } from "react";
import topics from "../../data/skuTopics.js";
import { KW, solutionPH, weakRoot, weakSpecies, polyproticPH, kpFromKc, vanthoff, saltPH } from "../../lib/chemistry.js";
import "../../styles/sku-explorer.css";
export { topics };
const fmt = x => Math.abs(x) > 0 && (Math.abs(x) < .001 || Math.abs(x) > 1e5) ? x.toExponential(3) : Number(x.toPrecision(5)).toString();
function Field({
  label,
  value,
  onChange,
  min,
  max,
  step = 'any'
}) {
  return <label className="sku-field">
    <span>
      {label}
    </span>
    <input type="number" value={value} min={min} max={max} step={step} onChange={e => onChange(e.target.value === '' ? '' : Number(e.target.value))} />
  </label>;
}
function Practice({
  topic,
  lang
}) {
  const p = topic.practice,
    t = (a, b) => lang === 'ms' ? a : b;
  const [value, setValue] = useState(''),
    [checked, setChecked] = useState(false);
  const normalized = value.trim().replace(/−/g, '-'),
    valid = normalized !== '' && Number.isFinite(Number(normalized));
  const correct = valid && Math.abs(Number(normalized) - p.answer) <= p.tolerance + Math.abs(p.answer) * 1e-12;
  return <section className="sku-practice">
    <h4>
      {t('Cuba sendiri', 'Try it yourself')}
    </h4>
    <p>
      {p.prompt[lang]}
    </p>
    <form onSubmit={e => {
      e.preventDefault();
      setChecked(true);
    }}>
      <label>{t('Jawapan anda', 'Your answer')} {p.unit}<input inputMode="decimal" placeholder="Contoh / e.g. 2.5e-5" value={value} onChange={e => {
          setValue(e.target.value);
          setChecked(false);
        }} /></label>
      <button className="primary" type="submit" disabled={!valid}>
        {t('Semak', 'Check')}
      </button>
    </form>
    {checked && <div className={'sku-feedback ' + (correct ? 'right' : 'retry')} role="status">
      <b>
        {correct ? t('✓ Tepat', '✓ Correct') : t('Cuba semak langkah anda', 'Review your steps')}
      </b>
      <p>
        {p.explanation[lang]}
      </p>
      <p>{t('Jawapan rujukan', 'Reference answer')}: {fmt(p.answer)} {p.unit}</p>
    </div>}
    <small>
      {t('Latihan pengukuhan ini tidak menambah markah dashboard.', 'This reinforcement practice does not add dashboard points.')}
    </small>
  </section>;
}
function ICE({
  base = false,
  c = .1,
  k = 1.8e-5
}) {
  const x = weakRoot(k, c);
  return <div className="sku-table-scroll">
    <table>
      <caption>ICE · {base ? 'B + H₂O ⇌ BH⁺ + OH⁻' : 'HA + H₂O ⇌ A⁻ + H₃O⁺'}</caption>
      <thead>
        <tr>
          <th>M</th>
          <th>
            {base ? 'B' : 'HA'}
          </th>
          <th>
            {base ? 'BH⁺' : 'A⁻'}
          </th>
          <th>
            {base ? 'OH⁻' : 'H₃O⁺'}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>I</th>
          <td>
            {fmt(c)}
          </td>
          <td>0</td>
          <td>≈ 0</td>
        </tr>
        <tr>
          <th>C</th>
          <td>−x</td>
          <td>+x</td>
          <td>+x</td>
        </tr>
        <tr>
          <th>E</th>
          <td>
            {fmt(c - x)}
          </td>
          <td>
            {fmt(x)}
          </td>
          <td>
            {fmt(x)}
          </td>
        </tr>
      </tbody>
    </table>
  </div>;
}
export function LearningTool({
  kind,
  lang
}) {
  const t = (a, b) => lang === 'ms' ? a : b;
  const [v, setV] = useState(.1),
    [w, setW] = useState(.2),
    [z, setZ] = useState(.21),
    [choice, setChoice] = useState('acetate-acid'),
    [a, setA] = useState(4),
    [b, setB] = useState(9),
    [temp, setTemp] = useState(300),
    [temp2, setTemp2] = useState(330),
    [dh, setDh] = useState(20),
    [kc, setKc] = useState(.2),
    [dn, setDn] = useState(1),
    [salt, setSalt] = useState('acetate'),
    [poly, setPoly] = useState('phosphate'),
    [ph, setPh] = useState(3.4),
    [selection, setSelection] = useState(0);
  const positive = (...xs) => xs.every(x => typeof x === 'number' && Number.isFinite(x) && x > 0);
  let body;
  if (kind === 'ph') body = <>
    <Field label="pH" value={ph} onChange={setPh} min={-2} max={16} />
    {typeof ph === 'number' && ph >= -2 && ph <= 16 ? <div className="sku-results">
      <p>pOH = {fmt(14 - ph)}</p>
      <p>[H₃O⁺] = {fmt(10 ** -ph)} M</p>
      <p>[OH⁻] = {fmt(10 ** (ph - 14))} M</p>
      <p>
        {t('Larutan ideal pada 25 °C.', 'Ideal solution at 25 °C.')}
      </p>
    </div> : <p role="alert">
      {t('Masukkan pH antara −2 dan 16.', 'Enter pH between −2 and 16.')}
    </p>}
  </>;
  if (kind === 'weak') {
    const s = weakSpecies.find(s => s.id === choice);
    const ok = positive(v) && v >= 1e-6 && v <= 1;
    body = <>
    <label className="sku-field">
      {t('Bahan', 'Species')}
      <select value={choice} onChange={e => setChoice(e.target.value)}>
        {weakSpecies.map(s => <option key={s.id} value={s.id}>{s.label} · {s.base ? 'Kb' : 'Ka'} = {s.k}</option>)}
      </select>
    </label>
    <Field label={t('Kepekatan awal (M)', 'Initial concentration (M)')} value={v} onChange={setV} min={1e-6} max={1} />
    {ok ? <>
      <ICE base={s.base} c={v} k={s.k} />
      <div className="sku-results">
        <p>pH = {solutionPH({
              concentration: v,
              ka: s.k,
              base: s.base
            }).toFixed(3)}</p>
        <p>x ≈ √(KC) = {fmt(Math.sqrt(s.k * v))} M</p>
        <p>{t('Semakan anggaran', 'Approximation check')}: {(100 * Math.sqrt(s.k * v) / v).toFixed(2)}% · {100 * Math.sqrt(s.k * v) / v <= 5 ? t('≤ 5%: anggaran kecil-x sesuai', '≤ 5%: small-x approximation suitable') : t('> 5%: gunakan kuadratik', '> 5%: use quadratic')}</p>
      </div>
      <p className="sku-caption">
        {t('ICE mengabaikan sumbangan air. Bacaan pH menggunakan imbangan cas termasuk air; pada pencairan ekstrem kedua-duanya boleh berbeza. Model ideal 25 °C.', 'ICE neglects water contributions. The pH reading includes water via charge balance; at extreme dilution these can differ. Ideal 25 °C model.')}
      </p>
    </> : <p role="alert">
      {t('Gunakan kepekatan 1e-6 hingga 1 M.', 'Use a concentration from 1e-6 to 1 M.')}
    </p>}
  </>;
  }
  if (kind === 'polyprotic') {
    const phosphate = poly === 'phosphate',
      constants = phosphate ? [7.2e-3, 6.3e-8, 4.2e-13] : [1e-5, 5e-12],
      labels = phosphate ? ['H₃PO₄', 'H₂PO₄⁻', 'HPO₄²⁻', 'PO₄³⁻'] : ['H₂Asc', 'HAsc⁻', 'Asc²⁻'];
    const result = positive(v) && v >= 1e-5 && v <= .5 ? polyproticPH(v, constants) : null;
    body = <>
    <label className="sku-field">
      {t('Asid', 'Acid')}
      <select value={poly} onChange={e => setPoly(e.target.value)}>
        <option value="phosphate">H₃PO₄</option>
        <option value="ascorbic">H₂Asc</option>
      </select>
    </label>
    <Field label={t('Kepekatan awal (M)', 'Initial concentration (M)')} value={v} onChange={setV} min={1e-5} max={.5} />
    <p>
      {constants.map((k, i) => `Ka${i + 1} = ${k}`).join(' · ')}
    </p>
    {result ? <>
      <div className="sku-reading">pH <strong>
          {result.ph.toFixed(3)}
        </strong></div>
      <div className="sku-species">
        {labels.map((label, i) => <div key={label}>
          <b>
            {label}
          </b>
          <meter aria-label={label} min="0" max="1" value={result.fractions[i]} />
          <span>{fmt(100 * result.fractions[i])}% · {fmt(result.concentrations[i])} M</span>
        </div>)}
      </div>
      <p>
        {t('Model menyelesaikan imbangan jisim dan cas bagi semua tahap termasuk air; pecahan jumlah = 100%. Warna/bar menunjukkan taburan spesies, bukan bilangan proton bebas.', 'The model solves mass and charge balance for all steps including water; fractions total 100%. Bars show species distribution, not free-proton counts.')}
      </p>
    </> : <p role="alert">
      {t('Gunakan 1e-5 hingga 0.5 M.', 'Use 1e-5 to 0.5 M.')}
    </p>}
  </>;
  }
  if (kind === 'salts') {
    const labels = {
      acetate: 'CH₃COONa',
      ammonium: 'NH₄Cl',
      nacl: 'NaCl'
    };
    const ok = positive(v) && v >= 1e-5 && v <= 1;
    body = <>
    <label className="sku-field">
      {t('Garam', 'Salt')}
      <select value={salt} onChange={e => setSalt(e.target.value)}>
        {Object.entries(labels).map(([id, name]) => <option key={id} value={id}>
          {name}
        </option>)}
      </select>
    </label>
    <Field label={t('Kepekatan (M)', 'Concentration (M)')} value={v} onChange={setV} min={1e-5} max={1} />
    {ok ? <div className="sku-results">
      <strong>pH = {saltPH(salt, v).toFixed(3)}</strong>
      <p>
        {salt === 'acetate' ? 'CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻' : salt === 'ammonium' ? 'NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺' : t('Na⁺ dan Cl⁻: ion pengiring, tiada hidrolisis ketara.', 'Na⁺ and Cl⁻: spectators, no appreciable hydrolysis.')}
      </p>
      <p>
        {salt === 'nacl' ? t('Neutral', 'Neutral') : salt === 'acetate' ? t('Berbes; Kb = Kw/Ka(CH₃COOH)', 'Basic; Kb = Kw/Ka(CH₃COOH)') : t('Berasid; Ka = Kw/Kb(NH₃)', 'Acidic; Ka = Kw/Kb(NH₃)')}
      </p>
      <small>
        {t('Model ideal 25 °C; Ka asid asetik dan Kb ammonia = 1.8e-5.', 'Ideal 25 °C model; acetic-acid Ka and ammonia Kb = 1.8e-5.')}
      </small>
    </div> : <p role="alert">
      {t('Gunakan 1e-5 hingga 1 M.', 'Use 1e-5 to 1 M.')}
    </p>}
  </>;
  }
  if (kind === 'qk') body = <>
    <p>N₂O₄(g) ⇌ 2NO₂(g)</p>
    <Field label="[N₂O₄] / M" value={v} onChange={setV} min={.00001} />
    <Field label="[NO₂] / M" value={w} onChange={setW} min={.00001} />
    <Field label="Kc" value={z} onChange={setZ} min={.00001} />
    {positive(v, w, z) && Number.isFinite(w * w / v) ? <div className="sku-results">
      <b>Q = [NO₂]²/[N₂O₄] = {fmt(w * w / v)}</b>
      <p>
        {Math.abs(w * w / v - z) / z < 1e-8 ? t('Q = K: keseimbangan', 'Q = K: equilibrium') : w * w / v < z ? t('Q < K: arah bersih ke kanan →', 'Q < K: net direction right →') : t('Q > K: arah bersih ke kiri ←', 'Q > K: net direction left ←')}
      </p>
    </div> : <p role="alert">
      {t('Masukkan nilai positif.', 'Enter positive values.')}
    </p>}
  </>;
  if (kind === 'kp') body = <>
    <Field label="Kc" value={kc} onChange={setKc} />
    <Field label="T (K)" value={temp} onChange={setTemp} />
    <Field label="Δn (gas)" value={dn} onChange={setDn} step="1" />
    {positive(kc, temp) && Number.isInteger(dn) && Number.isFinite(kpFromKc(kc, temp, dn)) && kpFromKc(kc, temp, dn) > 0 ? <div className="sku-results">Kp = {fmt(kpFromKc(kc, temp, dn))}<p>R = 0.082057 L atm mol⁻¹ K⁻¹</p></div> : <p role="alert">
      {t('Kc dan T mesti positif; Δn integer.', 'Kc and T must be positive; Δn must be an integer.')}
    </p>}
  </>;
  if (kind === 'vanthoff') body = <>
    <Field label="K₁" value={kc} onChange={setKc} />
    <Field label="T₁ (K)" value={temp} onChange={setTemp} />
    <Field label="T₂ (K)" value={temp2} onChange={setTemp2} />
    <Field label="ΔH° (kJ/mol)" value={dh} onChange={setDh} />
    {positive(kc, temp, temp2) && typeof dh === 'number' && Number.isFinite(vanthoff(kc, temp, temp2, dh)) ? <div className="sku-results">K₂ = {fmt(vanthoff(kc, temp, temp2, dh))}<p>
        {t('ΔH° dianggap tetap dalam julat suhu ini.', 'ΔH° is assumed constant over this temperature range.')}
      </p></div> : <p role="alert">
      {t('Semak nilai; suhu mesti dalam Kelvin positif.', 'Check values; temperatures must be positive kelvin.')}
    </p>}
  </>;
  if (kind === 'direction') body = <>
    <p>HA + B ⇌ A⁻ + BH⁺</p>
    <Field label="pKa(HA)" value={a} onChange={setA} min={-30} max={30} />
    <Field label="pKa(BH⁺)" value={b} onChange={setB} min={-10} max={20} />
    {typeof a === 'number' && typeof b === 'number' && Math.abs(a) <= 30 && Math.abs(b) <= 30 ? <div className="sku-results">K = 10^({b} − {a}) = {fmt(10 ** (b - a))}<p>
        {b > a ? t('Produk diutamakan', 'Products favoured') : b < a ? t('Reaktan diutamakan', 'Reactants favoured') : t('K = 1; tiada pihak dominan daripada K sahaja.', 'K = 1; neither side is favoured by K alone.')}
      </p><small>
        {t('Ini kedudukan keseimbangan; arah campuran tertentu memerlukan Q.', 'This describes equilibrium preference; a particular mixture also requires Q.')}
      </small></div> : <p role="alert">
      {t('Masukkan pKa dalam julat −30 hingga 30.', 'Enter pKa in the range −30 to 30.')}
    </p>}
  </>;
  if (kind === 'ice') {
    const ok = positive(v, z) && v <= 2 && z <= 10;
    const x = ok ? weakRoot(z, v) : 0;
    body = <>
    <p>AB(g) ⇌ A(g) + B(g)</p>
    <Field label="[AB]₀ (M)" value={v} onChange={setV} min={1e-6} max={2} />
    <Field label="Kc" value={z} onChange={setZ} min={1e-8} max={10} />
    {ok ? <>
      <div className="sku-table-scroll">
        <table>
          <caption>ICE (M)</caption>
          <thead>
            <tr>
              <th></th>
              <th>AB</th>
              <th>A</th>
              <th>B</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>I</th>
              <td>
                {v}
              </td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <th>C</th>
              <td>−x</td>
              <td>+x</td>
              <td>+x</td>
            </tr>
            <tr>
              <th>E</th>
              <td>
                {fmt(v - x)}
              </td>
              <td>
                {fmt(x)}
              </td>
              <td>
                {fmt(x)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>Qeq = {fmt(x * x / (v - x))} = Kc</p>
      <p>{t('Semakan anggaran √(KC)', 'Check of √(KC) approximation')}: {(100 * Math.sqrt(z * v) / v).toFixed(2)}% · {100 * Math.sqrt(z * v) / v <= 5 ? '≤5%' : '>5%'}</p>
    </> : <p role="alert">
      {t('Gunakan 0 < C ≤ 2 dan 0 < K ≤ 10.', 'Use 0 < C ≤ 2 and 0 < K ≤ 10.')}
    </p>}
  </>;
  }
  if (kind === 'conjugate') {
    const pairs = [['H₂PO₄⁻', 'HPO₄²⁻'], ['NH₄⁺', 'NH₃'], ['HCO₃⁻', 'CO₃²⁻'], ['H₃O⁺', 'H₂O']];
    body = <>
    <label className="sku-field">
      {t('Pilih asid', 'Choose an acid')}
      <select value={selection} onChange={e => setSelection(+e.target.value)}>
        {pairs.map((p, i) => <option key={i} value={i}>
          {p[0]}
        </option>)}
      </select>
    </label>
    <div className="sku-reaction">
      <b>
        {pairs[selection][0]}
      </b>
      <span>− H⁺ →</span>
      <b>
        {pairs[selection][1]}
      </b>
    </div>
    <p>
      {t('Arah songsang: tambah H⁺ kepada bes konjugat. Cas meningkat satu.', 'Reverse direction: add H⁺ to the conjugate base. Charge increases by one.')}
    </p>
  </>;
  }
  if (kind === 'structure') {
    const sets = [['HF < HCl < HBr < HI', t('Menuruni kumpulan: ikatan H–X semakin lemah.', 'Down a group: the H–X bond weakens.')], ['HClO < HClO₂ < HClO₃ < HClO₄', t('Atom pusat sama, bilangan O meningkat.', 'Same central atom; increasing O count.')], ['HIO < HBrO < HClO', t('Bilangan O sama, keelektronegatifan atom pusat meningkat.', 'Same O count; central-atom electronegativity increases.')]];
    body = <>
    <div className="sku-switches">
      {sets.map((s, i) => <button key={i} className="secondary" aria-pressed={selection === i} onClick={() => setSelection(i)}>{t('Siri', 'Series')} {i + 1}</button>)}
    </div>
    <div className="sku-reaction">
      {sets[selection][0]}
    </div>
    <p>
      {sets[selection][1]}
    </p>
    <p>
      {t('Anak susunan menunjukkan kekuatan asid meningkat ke kanan; bukan bacaan pH bagi kepekatan berlainan.', 'Order shows increasing acid strength to the right, not pH values at different concentrations.')}
    </p>
  </>;
  }
  return body ? <section className="sku-tool">
    <h4>
      {t('Teroka konsep', 'Explore the concept')}
    </h4>
    {body}
  </section> : null;
}
export default function SkuExplorer({
  module,
  step,
  lang,
  requestedTopic
}) {
  const items = topics.filter(x => x.module === module && x.step === step);
  const [index, setIndex] = useState(() => Math.max(0, items.findIndex(x => x.id === requestedTopic)));
  const item = items[Math.min(index, items.length - 1)],
    t = (a, b) => lang === 'ms' ? a : b;
  if (!item) return null;
  return <details className="sku-explorer" open={requestedTopic ? true : undefined}>
    <summary>
      <span>
        <strong>
          {t('Teroka nota tambahan', 'Explore the additional notes')}
        </strong>
        <small>{items.length} {t('subtopik · contoh berlangkah · latihan kendiri', 'subtopics · worked examples · self practice')}</small>
      </span>
    </summary>
    <div className="sku-explorer-content">
      <header className="sku-heading">
        <span>SKU3073 · {t('NOTA & LATIHAN', 'NOTES & PRACTICE')}</span>
        <h2>
          {t('Bina kefahaman langkah demi langkah', 'Build understanding step by step')}
        </h2>
        <p>
          {t('Pilih subtopik. Cuba latihan selepas membaca penyelesaian.', 'Choose a topic. Try the practice after reviewing the solution.')}
        </p>
      </header>
      <div className="sku-switches" aria-label={t('Pilihan subtopik', 'Subtopic selection')}>
        {items.map((x, i) => <button key={x.id} className="secondary" aria-pressed={index === i} onClick={() => setIndex(i)}>{i + 1}. {x.title[lang]}</button>)}
      </div>
      <article key={item.id}>
        <p className="sku-source">
          {item.source}
        </p>
        <h3>
          {item.title[lang]}
        </h3>
        <p className="sku-goal">
          {item.goal[lang]}
        </p>
        <ul className="sku-notes">
          {item.notes[lang].map((p, i) => <li key={i}>
            {p}
          </li>)}
        </ul>
        <div className="sku-formula">
          {item.formula}
        </div>
        <section className="sku-worked">
          <h4>
            {t('Contoh berlangkah', 'Worked example')}
          </h4>
          <p>
            {item.example[lang]}
          </p>
          <ol>
            {item.worked[lang].map((p, i) => <li key={i}>
              {p}
            </li>)}
          </ol>
        </section>
        <p className="sku-tip">
          <b>
            {t('Ingat: ', 'Remember: ')}
          </b>
          {item.tip[lang]}
        </p>
        {item.tool && <LearningTool kind={item.tool} lang={lang} />}
        <Practice topic={item} lang={lang} />
      </article>
      <p className="sku-caption">
        {t('Jawapan latihan ini sementara dan direset apabila subtopik ditukar. Kuiz modul menyimpan markah secara berasingan.', 'Practice answers are temporary and reset when changing subtopics. Module quizzes save scores separately.')}
      </p>
    </div>
  </details>;
}
export function ReviewPanel({
  lang,
  nav
}) {
  const t = (a, b) => lang === 'ms' ? a : b;
  return <aside className="sku-review">
    <details>
      <summary>
        {t('Panel developer · semakan kandungan', 'Developer panel · content review')}
      </summary>
      <p>
        {t('Pratonton tempatan sahaja. Semua simpanan kemajuan dan markah dimatikan dalam mod ini. Sesi kuiz semakan diasingkan. Tiada akses pentadbir.', 'Local preview only. All progress and score saving is disabled in this mode. Review quiz sessions are separate. No administrator access.')}
      </p>
      <div className="sku-review-links">
        {topics.map(x => <button key={x.id} onClick={() => nav(`learn/${x.module}/${x.step}/${x.id}`)}>{x.title[lang]} <small>
            {x.source}
          </small></button>)}
      </div>
    </details>
  </aside>;
}
