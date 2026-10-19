import { useId, useRef, useState } from "react";
import { ArrowRight, RotateCcw, Lightbulb, CheckCircle2, FlaskConical, BookOpen } from "lucide-react";
import "../../styles/theory-explorer.css";
const b = (ms, en) => ({
  ms,
  en
});
const lessons = [{
  id: 'arrhenius',
  name: 'Arrhenius',
  focus: b('Air & ion', 'Water & ions'),
  question: b('Apa berlaku apabila bahan dimasukkan ke dalam air?', 'What happens when a substance enters water?'),
  objective: b('Kenal pasti ion yang dihasilkan oleh asid dan bes dalam air.', 'Identify the ions produced by acids and bases in water.'),
  acid: b('Menghasilkan ion hidronium, H₃O⁺, dalam air.', 'Produces hydronium ions, H₃O⁺, in water.'),
  base: b('Menghasilkan ion hidroksida, OH⁻, dalam air.', 'Produces hydroxide ions, OH⁻, in water.'),
  note: b('H⁺(aq) lazim digunakan sebagai singkatan. Dalam rajah larutan ini, kita gunakan H₃O⁺ untuk menunjukkan proton terikat pada molekul air.', 'H⁺(aq) is a common shorthand. In this solution diagram, H₃O⁺ shows a proton associated with a water molecule.'),
  tip: b('Arrhenius: dalam AIR, perhatikan ION. Asid → H₃O⁺; bes → OH⁻.', 'Arrhenius: in WATER, look for IONS. Acid → H₃O⁺; base → OH⁻.'),
  limit: b('Teori ini berfokus pada larutan berair. Ia tidak mencukupi untuk menghuraikan semua tindak balas asid–bes di luar air.', 'This model focuses on aqueous solutions. It does not explain every acid–base reaction outside water.'),
  mis: b('Na⁺ bukan ion yang menyebabkan NaOH bersifat bes; ion berkaitan ialah OH⁻. NaOH berdisosiasi kepada ion sedia ada, manakala HCl bertindak balas dengan air untuk membentuk ion.', 'Na⁺ is not the ion responsible for NaOH’s basic behaviour; OH⁻ is. NaOH dissociates into pre-existing ions, whereas HCl reacts with water to form ions.')
}, {
  id: 'bronsted',
  name: 'Brønsted–Lowry',
  focus: b('Pemindahan proton', 'Proton transfer'),
  question: b('Siapa memberi dan siapa menerima proton?', 'Who donates and who accepts a proton?'),
  objective: b('Jejak pemindahan H⁺ dan kenal pasti pasangan konjugat.', 'Track H⁺ transfer and identify conjugate pairs.'),
  acid: b('Penderma proton, H⁺. Selepas menderma, terbentuk bes konjugat.', 'A proton (H⁺) donor. Donation produces its conjugate base.'),
  base: b('Penerima proton, H⁺. Selepas menerima, terbentuk asid konjugat.', 'A proton (H⁺) acceptor. Acceptance produces its conjugate acid.'),
  note: b('Pasangan konjugat berbeza sebanyak satu H⁺. Kehilangan H⁺ menurunkan cas sebanyak satu; penerimaan H⁺ menaikkan cas sebanyak satu.', 'Conjugate partners differ by one H⁺. Losing H⁺ lowers the charge by one; accepting H⁺ raises it by one.'),
  tip: b('Jejak H⁺: ASID memberi, BES menerima. Pasangan konjugat = beza satu H⁺.', 'Track H⁺: ACID donates, BASE accepts. Conjugate partners = one H⁺ apart.'),
  limit: b('Teori ini memerlukan pemindahan proton. Tindak balas BF₃ dengan NH₃ tanpa pemindahan proton memerlukan penerangan Lewis.', 'This model requires proton transfer. The BF₃–NH₃ reaction without proton transfer requires the Lewis model.'),
  mis: b('Bes tidak semestinya mempunyai OH dalam formulanya: NH₃ menerima H⁺. Air pula boleh memberi atau menerima proton, bergantung pada pasangan tindak balas.', 'A base need not contain OH: NH₃ accepts H⁺. Water can donate or accept a proton depending on its reaction partner.')
}, {
  id: 'lewis',
  name: 'Lewis',
  focus: b('Pasangan elektron', 'Electron pairs'),
  question: b('Dari mana datangnya pasangan elektron ikatan?', 'Where does the bonding electron pair come from?'),
  objective: b('Kenal pasti penderma dan penerima pasangan elektron serta arah pembentukan ikatan koordinat.', 'Identify the electron-pair donor and acceptor and the direction of coordinate bond formation.'),
  acid: b('Penerima pasangan elektron untuk membentuk ikatan.', 'Accepts an electron pair to form a bond.'),
  base: b('Penderma pasangan elektron untuk membentuk ikatan.', 'Donates an electron pair to form a bond.'),
  note: b('Nitrogen dalam NH₃ mempunyai pasangan elektron bebas. Boron dalam BF₃ mempunyai enam elektron di sekelilingnya dalam struktur Lewis dan boleh menerima pasangan elektron.', 'Nitrogen in NH₃ has a lone pair. Boron in BF₃ has six electrons around it in its Lewis structure and can accept an electron pair.'),
  tip: b('Jejak pasangan elektron: BES memberi, ASID menerima. Anak panah bermula pada pasangan elektron bebas.', 'Track the electron pair: BASE donates, ACID accepts. The arrow starts at the lone pair.'),
  limit: b('Definisi Lewis lebih luas dan tidak memerlukan pemindahan proton. Dalam contoh ini, ikatan N–B terbentuk daripada pasangan elektron yang asalnya pada N.', 'The broader Lewis definition does not require proton transfer. Here, the N–B bond forms from a pair originally on N.'),
  mis: b('“Derma pasangan elektron” bermaksud pasangan itu digunakan bersama dalam ikatan. Jangan gambarkan elektron hilang atau berpindah sepenuhnya seperti pemindahan elektron redoks.', '“Donate an electron pair” means using that pair in a shared bond. Do not depict electrons disappearing or transferring completely as in a redox electron transfer.')
}];
const Q = (ms, en, options, answer, ems, een) => ({
  text: b(ms, en),
  options: options.map(x => b(...x)),
  answer,
  explain: b(ems, een)
});
const checks = [[Q('Ion manakah menerangkan sifat asid HCl dalam air?', 'Which ion explains HCl’s acidity in water?', [['Cl⁻', 'Cl⁻'], ['H₃O⁺', 'H₃O⁺'], ['Na⁺', 'Na⁺']], 1, 'HCl memindahkan proton kepada air dan menghasilkan H₃O⁺.', 'HCl transfers a proton to water, producing H₃O⁺.'), Q('Lengkapkan: NaOH(s) → Na⁺(aq) + …', 'Complete: NaOH(s) → Na⁺(aq) + …', [['OH⁻(aq)', 'OH⁻(aq)'], ['H₃O⁺(aq)', 'H₃O⁺(aq)'], ['O²⁻(aq)', 'O²⁻(aq)']], 0, 'NaOH berdisosiasi dalam air kepada Na⁺ dan OH⁻. Cas keseluruhan kekal sifar.', 'NaOH dissociates in water into Na⁺ and OH⁻. The net charge stays zero.')], [Q('Dalam NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, siapakah penderma proton bagi arah ke kanan?', 'In NH₃ + H₂O ⇌ NH₄⁺ + OH⁻, who donates a proton in the forward direction?', [['NH₃', 'NH₃'], ['NH₄⁺', 'NH₄⁺'], ['H₂O', 'H₂O']], 2, 'H₂O memberikan H⁺ kepada NH₃ lalu menjadi OH⁻.', 'H₂O gives H⁺ to NH₃ and becomes OH⁻.'), Q('Pasangan konjugat NH₃ ialah…', 'The conjugate partner of NH₃ is…', [['OH⁻', 'OH⁻'], ['NH₄⁺', 'NH₄⁺'], ['H₂O', 'H₂O']], 1, 'NH₃ menerima satu H⁺ menjadi NH₄⁺; pasangan ini berbeza sebanyak satu proton.', 'NH₃ accepts one H⁺ to form NH₄⁺; the partners differ by one proton.')], [Q('Dalam pembentukan aduk BF₃–NH₃, bes Lewis ialah…', 'In BF₃–NH₃ adduct formation, the Lewis base is…', [['NH₃', 'NH₃'], ['BF₃', 'BF₃'], ['Kedua-duanya asid', 'Both are acids']], 0, 'NH₃ menderma pasangan elektron bebas pada N untuk membentuk ikatan dengan B.', 'NH₃ donates the lone pair on N to form a bond with B.'), Q('Anak panah pendermaan pasangan elektron perlu menunjuk…', 'The electron-pair donation arrow should point…', [['Dari B ke N', 'From B to N'], ['Dari F ke H', 'From F to H'], ['Dari pasangan bebas N ke B', 'From the N lone pair to B']], 2, 'Anak panah bermula pada pasangan elektron penderma dan berakhir pada atom penerima.', 'The arrow starts at the donor electron pair and ends at the acceptor atom.')]];
const detective = [Q('Gunakan Arrhenius: mengapakah larutan NaOH bersifat bes?', 'Use Arrhenius: why is NaOH solution basic?', [['Menghasilkan OH⁻ dalam air', 'It produces OH⁻ in water'], ['Menghasilkan Na⁺ sahaja', 'It only produces Na⁺'], ['Semua garam ialah bes', 'All salts are bases']], 0, 'Dalam model Arrhenius, fokus ialah penghasilan OH⁻ dalam air.', 'In the Arrhenius model, focus on OH⁻ production in water.'), Q('Gunakan Brønsted–Lowry: dalam HCl + H₂O → H₃O⁺ + Cl⁻, air bertindak sebagai…', 'Use Brønsted–Lowry: in HCl + H₂O → H₃O⁺ + Cl⁻, water acts as…', [['Asid, memberi H⁺', 'An acid, donating H⁺'], ['Bes, menerima H⁺', 'A base, accepting H⁺'], ['Bes, memberi H⁺', 'A base, donating H⁺']], 1, 'Air menerima proton daripada HCl. Bandingkan dengan air yang memberi proton kepada NH₃.', 'Water accepts a proton from HCl. Compare this with water donating a proton to NH₃.'), Q('Gunakan Lewis: mengapakah BF₃ boleh menjadi asid walaupun tiada H?', 'Use Lewis: why can BF₃ be an acid even without H?', [['Ia menghasilkan H⁺ sendiri', 'It generates its own H⁺'], ['Ia menderma proton', 'It donates a proton'], ['Ia menerima pasangan elektron', 'It accepts an electron pair']], 2, 'Definisi Lewis berdasarkan penerimaan pasangan elektron, bukan kehadiran H dalam formula.', 'The Lewis definition concerns electron-pair acceptance, not H in the formula.')];
function CheckSet({
  questions,
  lang
}) {
  const t = (a, c) => lang === 'ms' ? a : c,
    tr = x => x[lang];
  const [selected, setSelected] = useState({}),
    [checked, setChecked] = useState({});
  const count = Object.keys(checked).length,
    score = questions.filter((q, i) => checked[i] && selected[i] === q.answer).length;
  return <div className="te-checks">
    <div className="te-section-title">
      <h3>
        {t('Cuba sendiri', 'Try it yourself')}
      </h3>
      <span>{count}/{questions.length} {t('disemak', 'checked')}</span>
    </div>
    {questions.map((q, i) => <fieldset className="te-question" key={i}>
      <legend>{i + 1}. {tr(q.text)}</legend>
      <div className="te-options">
        {q.options.map((o, j) => <button type="button" key={j} aria-pressed={selected[i] === j} disabled={!!checked[i]} className={(selected[i] === j ? 'selected ' : '') + (checked[i] && j === q.answer ? 'correct ' : '') + (checked[i] && selected[i] === j && j !== q.answer ? 'incorrect' : '')} onClick={() => setSelected({
          ...selected,
          [i]: j
        })}>
          <span>
            {String.fromCharCode(65 + j)}
          </span>
          {tr(o)}
          {checked[i] && j === q.answer && ' ✓'}
        </button>)}
      </div>
      {!checked[i] ? <button className="secondary" disabled={selected[i] === undefined} onClick={() => setChecked({
        ...checked,
        [i]: true
      })}>
        {t('Semak jawapan', 'Check answer')}
      </button> : <p role="status" className={'te-feedback ' + (selected[i] === q.answer ? 'is-right' : 'is-wrong')}>
        <strong>
          {selected[i] === q.answer ? t('✓ Betul. ', '✓ Correct. ') : t('↻ Belum tepat. ', '↻ Not quite. ')}
        </strong>
        {tr(q.explain)}
      </p>}
    </fieldset>)}
    {count === questions.length && <div className="te-feedback is-right" role="status">
      <strong>{t('Keputusan latihan', 'Practice result')}: {score}/{questions.length}</strong>
      <p>
        {t('Semak penerangan sebelum mencuba lagi. Latihan ini tidak menambah mata dashboard.', 'Review the explanations before trying again. This practice does not add dashboard points.')}
      </p>
      <button className="secondary" onClick={() => {
        setSelected({});
        setChecked({});
      }}>
        <RotateCcw size={16} />
        {t('Cuba semula', 'Try again')}
      </button>
    </div>}
  </div>;
}
function Atom({
  x,
  y,
  label,
  color = '#E6F8FA',
  r = 24
}) {
  return <g>
    <circle cx={x} cy={y} r={r} fill={color} stroke="#31506A" strokeWidth="2" />
    <text x={x} y={y + 6} textAnchor="middle" fill="#102A43" fontSize="18" fontWeight="700">
      {label}
    </text>
  </g>;
}
function Diagram({
  kind,
  stage,
  variant,
  lang
}) {
  const id = useId().replace(/:/g, '');
  const t = (a, c) => lang === 'ms' ? a : c;
  const done = stage === 2;
  return <svg className={'te-diagram stage-' + stage} viewBox="0 0 580 250" role="img" aria-labelledby={id + 'title'}><title id={id + 'title'}>
      {kind === 'arrhenius' ? t('Bikar: pembentukan ion dalam air', 'Beaker: ion formation in water') : kind === 'bronsted' ? t('Jejak pemindahan proton antara dua spesies', 'Track proton transfer between two species') : t('Pasangan elektron nitrogen membentuk ikatan dengan boron', 'Nitrogen electron pair forms a bond with boron')}
    </title><defs>
      <marker id={id + 'arrow'} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
        <path d="M0,0 L8,4 L0,8" fill="#087573" />
      </marker>
    </defs>
 {kind === 'arrhenius' ? <>
      <path d="M100 30V211Q100 228 118 228H462Q480 228 480 211V30" fill="none" stroke="#31506A" strokeWidth="4" />
      <path d="M103 92Q195 78 290 92T477 92V210Q477 225 460 225H120Q103 225 103 210Z" fill={done ? variant === 'acid' ? '#FFE7E7' : '#EDE7FA' : '#E6F8FA'} />
      {[150, 235, 325, 425].map((x, i) => <text key={x} x={x} y={185 + i % 2 * 22} fontSize="17" fill="#31506A">H₂O</text>)}
      {done ? <>
        <Atom x={200} y={124} label={variant === 'acid' ? 'H₃O⁺' : 'Na⁺'} color={variant === 'acid' ? '#FFCCCC' : '#E6F8FA'} r={37} />
        <Atom x={377} y={124} label={variant === 'acid' ? 'Cl⁻' : 'OH⁻'} color={variant === 'acid' ? '#E6F8FA' : '#DDD1F5'} r={37} />
      </> : <>
        <text x={290} y={stage === 0 ? 62 : 125} textAnchor="middle" fill="#102A43" fontSize="25" fontWeight="700">
          {variant === 'acid' ? 'HCl' : 'NaOH(s)'}
        </text>
        {stage === 1 && <path d="M250 142H330" stroke="#087573" strokeWidth="3" markerEnd={'url(#' + id + 'arrow)'} />}
      </>}
      <text x={290} y={246} textAnchor="middle" fontSize="14" fill="#31506A">
        {t('Gambaran skematik · bukan nisbah zarah sebenar', 'Schematic · not actual particle proportions')}
      </text>
    </> : kind === 'bronsted' ? <>
      <rect x="40" y="53" width="210" height="146" rx="24" fill="#FFF0F0" />
      <rect x="330" y="53" width="210" height="146" rx="24" fill="#F0EAFC" />
      <text x="145" y="91" textAnchor="middle" fill="#8A3030" fontSize="16">
        {t('Penderma proton', 'Proton donor')}
      </text>
      <text x="435" y="91" textAnchor="middle" fill="#5C4293" fontSize="16">
        {t('Penerima proton', 'Proton acceptor')}
      </text>
      <text x="145" y="147" textAnchor="middle" fill="#102A43" fontSize="30" fontWeight="700">
        {variant === 'waterAcid' ? done ? 'OH⁻' : 'H₂O' : done ? 'Cl⁻' : 'HCl'}
      </text>
      <text x="435" y="147" textAnchor="middle" fill="#102A43" fontSize="30" fontWeight="700">
        {variant === 'waterAcid' ? done ? 'NH₄⁺' : 'NH₃' : done ? 'H₃O⁺' : 'H₂O'}
      </text>
      {stage > 0 && <>
        <path d="M205 35Q290 0 385 35" fill="none" stroke="#087573" strokeWidth="3" markerEnd={'url(#' + id + 'arrow)'} />
        {stage === 1 && <circle className="te-proton-fly" cx="205" cy="35" r="8" fill="#e4ad37" />}
        <text x="290" y="33" textAnchor="middle" fontSize="18" fill="#087573" fontWeight="700">H⁺</text>
      </>}
      <text x="290" y="232" textAnchor="middle" fontSize="15" fill="#31506A">
        {done ? t('Selepas pemindahan: bes konjugat + asid konjugat', 'After transfer: conjugate base + conjugate acid') : t('Jejak satu proton daripada asid kepada bes', 'Track one proton from acid to base')}
      </text>
    </> : <>
      <g stroke="#31506A" strokeWidth="3">
        <path d="M190 125H130M190 125L175 65M190 125L175 185M390 125H450M390 125L405 65M390 125L405 185" />
        {done && <path className="te-bond" d="M215 125H365" stroke="#087573" strokeWidth="5" />}
      </g>
      {[['H', 110, 125], ['H', 170, 50], ['H', 170, 200], ['F', 470, 125], ['F', 410, 50], ['F', 410, 200]].map(([label, x, y]) => <Atom key={label + x + y} x={x} y={y} label={label} />)}
      <Atom x={190} y={125} label="N" color="#DDD1F5" />
      <Atom x={390} y={125} label="B" color="#FFCCCC" />
      {!done && <g fill="#5C4293">
        <circle cx="228" cy="119" r="4" />
        <circle cx="228" cy="132" r="4" />
      </g>}
      {stage === 1 && <g className="te-electrons-fly" fill="#5C4293">
        <circle cx="234" cy="102" r="4" />
        <circle cx="234" cy="113" r="4" />
      </g>}
      {stage === 1 && <path d="M231 103Q295 54 370 104" fill="none" stroke="#087573" strokeWidth="3" markerEnd={'url(#' + id + 'arrow)'} />}
      <text x="190" y="242" textAnchor="middle" fontSize="16" fill="#5C4293">NH₃ · {t('bes Lewis', 'Lewis base')}</text>
      <text x="390" y="242" textAnchor="middle" fontSize="16" fill="#8A3030">BF₃ · {t('asid Lewis', 'Lewis acid')}</text>
    </>}
 </svg>;
}
function Simulation({
  kind,
  lang
}) {
  const t = (a, c) => lang === 'ms' ? a : c;
  const [stage, setStage] = useState(0),
    [variant, setVariant] = useState(kind === 'bronsted' ? 'waterAcid' : 'acid'),
    [prediction, setPrediction] = useState(null);
  const choices = kind === 'arrhenius' ? [['H₃O⁺', 'H₃O⁺'], ['OH⁻', 'OH⁻'], ['Na⁺', 'Na⁺']] : kind === 'bronsted' ? variant === 'waterAcid' ? [['NH₃', 'NH₃'], ['H₂O', 'H₂O']] : [['HCl', 'HCl'], ['H₂O', 'H₂O']] : [['N → B', 'N → B'], ['B → N', 'B → N']];
  const correct = kind === 'arrhenius' ? variant === 'acid' ? 0 : 1 : kind === 'bronsted' ? variant === 'waterAcid' ? 1 : 0 : 0;
  const formulas = kind === 'arrhenius' ? variant === 'acid' ? 'HCl(aq) + H₂O(l) → H₃O⁺(aq) + Cl⁻(aq)' : 'NaOH(s) → Na⁺(aq) + OH⁻(aq)' : kind === 'bronsted' ? variant === 'waterAcid' ? 'NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq)' : 'HCl(aq) + H₂O(l) → H₃O⁺(aq) + Cl⁻(aq)' : 'H₃N: + BF₃ → H₃N→BF₃';
  const explanations = kind === 'arrhenius' ? variant === 'acid' ? t('HCl memberikan proton kepada H₂O. H₃O⁺ terbentuk; Cl⁻ ialah ion pengiring.', 'HCl gives a proton to H₂O. H₃O⁺ forms; Cl⁻ is the accompanying ion.') : t('Dalam air, NaOH berdisosiasi kepada Na⁺ dan OH⁻. OH⁻ menerangkan sifat bes.', 'In water, NaOH dissociates into Na⁺ and OH⁻. OH⁻ explains its basic behaviour.') : kind === 'bronsted' ? variant === 'waterAcid' ? t('Air memberikan H⁺ dan bertindak sebagai asid. NH₃ menerimanya dan bertindak sebagai bes. Pasangan konjugat: H₂O/OH⁻ dan NH₄⁺/NH₃. Animasi menjejaki satu peristiwa ke hadapan; tindak balas sebenar boleh berlaku dalam kedua-dua arah.', 'Water donates H⁺ and acts as an acid. NH₃ accepts it and acts as a base. Conjugate pairs: H₂O/OH⁻ and NH₄⁺/NH₃. This traces one forward event; the real reaction can occur in both directions.') : t('HCl memberikan H⁺; air menerimanya. Air kini ialah bes. Pasangan konjugat: HCl/Cl⁻ dan H₃O⁺/H₂O.', 'HCl donates H⁺; water accepts it. Water is now a base. Conjugate pairs: HCl/Cl⁻ and H₃O⁺/H₂O.') : t('Pasangan bebas pada N digunakan untuk membentuk ikatan N–B. NH₃ ialah penderma (bes); BF₃ ialah penerima (asid). Anak panah N→B menyatakan asal pasangan ikatan, bukan cas atau arah redoks.', 'The N lone pair forms the N–B bond. NH₃ is the donor (base); BF₃ is the acceptor (acid). N→B indicates the origin of the bonding pair, not charge or redox direction.');
  return <section className="te-sim" aria-label={t('Simulasi interaktif', 'Interactive simulation')}>
    <div className="te-section-title">
      <h3>
        <FlaskConical size={20} />
        {t('Makmal mini', 'Mini lab')}
      </h3>
      <span>{t('Langkah', 'Step')} {stage + 1}/3</span>
    </div>
    {kind !== 'lewis' && <label className="te-select">
      {t('Pilih situasi', 'Choose a scenario')}
      <select value={variant} onChange={e => {
        setVariant(e.target.value);
        setStage(0);
        setPrediction(null);
      }}>
        {kind === 'arrhenius' ? <>
          <option value="acid">HCl + {t('air', 'water')}</option>
          <option value="base">NaOH + {t('air', 'water')}</option>
        </> : <>
          <option value="waterAcid">NH₃ + H₂O</option>
          <option value="waterBase">HCl + H₂O</option>
        </>}
      </select>
    </label>}
    <fieldset className="te-predict">
      <legend>01 · {t('Ramalkan', 'Predict')}: {kind === 'arrhenius' ? t('Ion manakah menerangkan sifat larutan?', 'Which ion explains the solution’s behaviour?') : kind === 'bronsted' ? t('Siapakah penderma proton?', 'Who is the proton donor?') : t('Apakah arah pendermaan pasangan elektron?', 'Which way is the electron pair donated?')}</legend>
      <div className="te-choice-row">
        {choices.map(([ms, en], i) => <button className="secondary" key={ms} aria-pressed={prediction === i} disabled={stage > 0} onClick={() => setPrediction(i)}>
          {t(ms, en)}
        </button>)}
      </div>
    </fieldset>
    <Diagram kind={kind} stage={stage} variant={variant} lang={lang} />
    <div className="te-equation">
      {stage === 0 ? t('Buat ramalan, kemudian teroka perubahan.', 'Make a prediction, then explore the change.') : formulas}
    </div>
    <div className="te-sim-controls">
      <button className="primary" disabled={prediction === null || stage === 2} onClick={() => setStage(s => Math.min(2, s + 1))}>
        {stage === 0 ? t('02 · Teroka perubahan', '02 · Explore the change') : stage === 1 ? t('03 · Lihat hasil', '03 · See the result') : t('Pemerhatian selesai', 'Observation complete')}
        <ArrowRight size={16} />
      </button>
      <button className="secondary" onClick={() => {
        setStage(0);
        setPrediction(null);
      }}>
        <RotateCcw size={16} />
        {t('Ulang', 'Reset')}
      </button>
    </div>
    <div aria-live="polite">
      {stage === 2 && <div className="te-observation">
        <strong>
          {prediction === correct ? t('✓ Ramalan tepat', '✓ Correct prediction') : t('↻ Semak semula ramalan', '↻ Revisit your prediction')}
        </strong>
        <p>
          {explanations}
        </p>
        <label>
          {t('Jelaskan dengan ayat sendiri (catatan sementara)', 'Explain in your own words (temporary note)')}
          <textarea key={variant + kind} placeholder={t('Apakah yang berubah, dan mengapa?', 'What changed, and why?')} rows={3} />
        </label>
      </div>}
    </div>
    {kind === 'lewis' && <p className="te-caption">
      {t('Rajah ikatan skematik; bukan geometri 3D. Pasangan bebas F tidak ditunjukkan supaya pasangan penderma pada N jelas.', 'Schematic bonding diagram, not 3D geometry. F lone pairs are omitted to highlight the donor pair on N.')}
    </p>}
  </section>;
}
function Compare({
  lang
}) {
  const t = (a, c) => lang === 'ms' ? a : c;
  return <>
    <div className="te-topic-heading">
      <span className="eyebrow">04 · {t('HUBUNGKAN KONSEP', 'CONNECT THE CONCEPTS')}</span>
      <h2>
        {t('Tiga perspektif, satu gambaran.', 'Three perspectives, one picture.')}
      </h2>
      <p>
        {t('Satu tindak balas boleh dihuraikan melalui lebih daripada satu teori. Sentiasa nyatakan model yang digunakan.', 'One reaction can be described by more than one theory. Always state which model you are using.')}
      </p>
    </div>
    <div className="te-table-wrap" tabIndex={0} aria-label={t('Jadual perbandingan teori', 'Theory comparison table')}>
      <table>
        <caption>
          {t('Perbandingan definisi asid dan bes', 'Comparing acid and base definitions')}
        </caption>
        <thead>
          <tr>
            <th>
              {t('Teori', 'Theory')}
            </th>
            <th>
              {t('Asid', 'Acid')}
            </th>
            <th>
              {t('Bes', 'Base')}
            </th>
            <th>
              {t('Fokus', 'Focus')}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Arrhenius</th>
            <td>
              {t('Menghasilkan H₃O⁺', 'Produces H₃O⁺')}
            </td>
            <td>
              {t('Menghasilkan OH⁻', 'Produces OH⁻')}
            </td>
            <td>
              {t('Dalam air', 'In water')}
            </td>
          </tr>
          <tr>
            <th>Brønsted–Lowry</th>
            <td>
              {t('Memberi H⁺', 'Donates H⁺')}
            </td>
            <td>
              {t('Menerima H⁺', 'Accepts H⁺')}
            </td>
            <td>
              {t('Proton', 'Protons')}
            </td>
          </tr>
          <tr>
            <th>Lewis</th>
            <td>
              {t('Menerima pasangan elektron', 'Accepts an electron pair')}
            </td>
            <td>
              {t('Memberi pasangan elektron', 'Donates an electron pair')}
            </td>
            <td>
              {t('Pasangan elektron', 'Electron pairs')}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="te-tip">
      <Lightbulb size={22} />
      <p>
        {t('Elakkan “asid sentiasa memberi”. Nyatakan apa yang diberi atau diterima: proton atau pasangan elektron.', 'Avoid “acids always donate”. Specify what is donated or accepted: a proton or an electron pair.')}
      </p>
    </div>
    <h3>
      {t('Detektif Asid–Bes', 'Acid–Base Detective')}
    </h3>
    <CheckSet questions={detective} lang={lang} />
  </>;
}
export default function TheoryExplorer({
  lang
}) {
  const [tab, setTab] = useState(0),
    refs = useRef([]),
    id = useId().replace(/:/g, '');
  const t = (a, c) => lang === 'ms' ? a : c,
    tr = x => x[lang],
    lesson = lessons[tab];
  function keyTab(e, i) {
    let next;
    if (e.key === 'ArrowRight') next = (i + 1) % 4;else if (e.key === 'ArrowLeft') next = (i + 3) % 4;else if (e.key === 'Home') next = 0;else if (e.key === 'End') next = 3;else return;
    e.preventDefault();
    setTab(next);
    refs.current[next]?.focus();
  }
  return <div className="theory-explorer">
    <div className="te-intro">
      <BookOpen size={23} />
      <div>
        <strong>
          {t('Studio teori asid–bes', 'Acid–base theory studio')}
        </strong>
        <p>
          {t('Baca → Ramalkan → Teroka → Jelaskan → Semak. Lengkapkan tiga teori sebelum membuat perbandingan.', 'Read → Predict → Explore → Explain → Check. Explore the three theories before comparing them.')}
        </p>
      </div>
    </div>
    <div className="te-tabs" role="tablist" aria-label={t('Teori asid dan bes', 'Acid and base theories')}>
      {[...lessons.map(l => l.name), t('Banding & latih', 'Compare & practise')].map((name, i) => <button key={i} ref={el => refs.current[i] = el} role="tab" aria-selected={tab === i} aria-controls={id + 'panel'} id={id + 'tab' + i} tabIndex={tab === i ? 0 : -1} onKeyDown={e => keyTab(e, i)} onClick={() => setTab(i)}>
        <span>0{i + 1}</span>
        {name}
      </button>)}
    </div>
    <div role="tabpanel" id={id + 'panel'} aria-labelledby={id + 'tab' + tab} tabIndex={0} key={tab}>
      {lesson ? <>
        <div className="te-topic-heading">
          <span className="eyebrow">
            {tr(lesson.focus)}
          </span>
          <h2>
            {tr(lesson.question)}
          </h2>
          <p><CheckCircle2 size={17} /> {tr(lesson.objective)}</p>
        </div>
        <div className="te-definitions">
          <article className="te-acid">
            <span>
              {t('ASID', 'ACID')}
            </span>
            <h3>{t('Asid', 'Acid')} {lesson.name}</h3>
            <p>
              {tr(lesson.acid)}
            </p>
          </article>
          <article className="te-base">
            <span>
              {t('BES', 'BASE')}
            </span>
            <h3>{t('Bes', 'Base')} {lesson.name}</h3>
            <p>
              {tr(lesson.base)}
            </p>
          </article>
        </div>
        <p className="te-note">
          {tr(lesson.note)}
        </p>
        {lesson.id === 'lewis' && <div className="example-box">
          <strong>
            {t('Cuba contoh lain', 'Transfer to another example')}
          </strong>
          <p>Cl⁻ + BCl₃ → BCl₄⁻</p>
          <p>
            {t('Cl⁻ ialah bes Lewis kerana mendermakan pasangan elektron; BCl₃ ialah asid Lewis kerana menerimanya. Dalam pembentukan kompleks [K(H₂O)₆]⁺, molekul air ialah penderma pasangan elektron dan K⁺ ialah penerima. Tiada pemindahan proton diperlukan untuk contoh ini.', 'Cl⁻ is the Lewis base because it donates an electron pair; BCl₃ is the Lewis acid because it accepts it. When [K(H₂O)₆]⁺ forms, water molecules donate electron pairs and K⁺ accepts them. These examples do not require proton transfer.')}
          </p>
        </div>}
        <Simulation kind={lesson.id} lang={lang} />
        <div className="te-tip">
          <Lightbulb size={22} />
          <div>
            <strong>
              {t('Tips mudah ingat', 'Memory tip')}
            </strong>
            <p>
              {tr(lesson.tip)}
            </p>
          </div>
        </div>
        <details className="te-detail">
          <summary>
            {t('Skop dan batas teori', 'Scope and limitations')}
          </summary>
          <p>
            {tr(lesson.limit)}
          </p>
        </details>
        <div className="te-misconception">
          <strong>
            {t('Betulkan salah faham', 'Correct a misconception')}
          </strong>
          <p>
            {tr(lesson.mis)}
          </p>
        </div>
        <CheckSet questions={checks[tab]} lang={lang} />
      </> : <Compare lang={lang} />}
    </div>
    <div className="te-next">
      <span>
        {t('Latihan ini untuk pengukuhan; kuiz modul kekal berasingan.', 'These activities reinforce learning; the module quiz remains separate.')}
      </span>
      {tab < 3 && <button className="primary" onClick={() => {
        setTab(tab + 1);
        refs.current[tab + 1]?.focus();
      }}>
        {tab === 2 ? t('Bandingkan teori', 'Compare theories') : t('Teori seterusnya', 'Next theory')}
        <ArrowRight size={16} />
      </button>}
    </div>
    <details className="te-detail">
      <summary>
        {t('Rujukan nota', 'Note references')}
      </summary>
      <ul>
        <li>
          <a href="https://openstax.org/books/chemistry-2e/pages/14-1-bronsted-lowry-acids-and-bases" target="_blank" rel="noreferrer">OpenStax Chemistry 2e · 14.1 Brønsted–Lowry Acids and Bases</a>
        </li>
        <li>
          <a href="https://openstax.org/books/chemistry-2e/pages/15-2-lewis-acids-and-bases" target="_blank" rel="noreferrer">OpenStax Chemistry 2e · 15.2 Lewis Acids and Bases</a>
        </li>
      </ul>
    </details>
  </div>;
}
