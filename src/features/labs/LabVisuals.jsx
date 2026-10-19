import { solutionPH, bufferPH } from "../../lib/chemistry.js";
import { waterAfterAddition } from "./labActivities.js";
export function IonComparison({
  lang,
  concentration,
  base,
  k
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en;
  return <section className="comparison-panel">
    <h4>
      {t('Kuat dan lemah pada kepekatan sama', 'Strong and weak at equal concentration')}
    </h4>
    <p className="small">C = {concentration.toPrecision(3)} M · {base ? 'Kb' : 'Ka'} ({t('lemah', 'weak')}) = {k.toExponential(2)}</p>
    <div className="compare-cards">
      {['strong', 'weak'].map(strength => {
        const ph = solutionPH({
            concentration,
            base,
            ka: k,
            strength
          }),
          ion = 10 ** -(base ? 14 - ph : ph),
          f = strength === 'strong' ? 1 : k / (k + ion);
        return <article key={strength}>
        <b>
          {strength === 'strong' ? t('Kuat', 'Strong') : t('Lemah', 'Weak')}
        </b>
        <strong>pH {ph.toFixed(3)}</strong>
        <p>{(f * 100).toFixed(3)}% {t('mengion', 'ionized')}</p>
        <meter min="0" max="1" value={f} aria-label={(strength === 'strong' ? t('Kuat', 'Strong') : t('Lemah', 'Weak')) + ' ' + t('pecahan mengion', 'ionized fraction')} />
        <p>[{base ? 'OH⁻' : 'H₃O⁺'}] = {ion.toExponential(2)} M</p>
      </article>;
      })}
    </div>
    <p className="small">
      {t('Meter menunjukkan pecahan mengion. Warna larutan dalam ilustrasi bukan warna sebenar bahan.', 'The meters show the ionized fraction. Illustrated solution colours are not actual substance colours.')}
    </p>
  </section>;
}
export function BufferComparison({
  lang,
  amount
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en,
    initial = bufferPH(10, 10),
    final = bufferPH(10, 10, amount),
    water = waterAfterAddition(amount);
  return <section className="comparison-panel">
    <h4>
      {t('Dos sama, perubahan berbeza', 'Same dose, different changes')}
    </h4>
    <p className="small">
      {t('Setiap sampel: 100 mL; perubahan isi padu diabaikan.', 'Each sample: 100 mL; volume change neglected.')}
    </p>
    <div className="compare-cards">
      {[[t('Penimbal', 'Buffer'), initial, final], [t('Air', 'Water'), 7, water]].map(([name, start, end]) => <article key={name}>
        <b>
          {name}
        </b>
        <strong>pH {end.toFixed(3)}</strong>
        <p>{t('Awal', 'Initial')}: {start.toFixed(3)}</p>
        <p>ΔpH = {end - start >= 0 ? '+' : ''}{(end - start).toFixed(3)}</p>
      </article>)}
    </div>
    <div className="formula">
      {amount < 0 ? 'A⁻ + H₃O⁺ → HA + H₂O' : amount > 0 ? 'HA + OH⁻ → A⁻ + H₂O' : 'HA + H₂O ⇌ A⁻ + H₃O⁺'}
    </div>
  </section>;
}
export function DynamicParticles({
  lang,
  eq,
  running
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en,
    countA = Math.round(eq.a * 30);
  return <section className={'dynamic-particles ' + (running ? 'is-running' : '')}>
    <h4>
      {t('Zarah terus bergerak', 'Particles keep moving')}
    </h4>
    <div className="particle-field" aria-label={t('Ilustrasi 30 zarah A dan B', 'Illustration of 30 A and B particles')}>
      {Array.from({
        length: 30
      }, (_, i) => <span key={i} className={i < countA ? 'particle-a' : 'particle-b'} style={{
        '--delay': `${-i * .17}s`
      }}>
        {i < countA ? 'A' : 'B'}
      </span>)}
    </div>
    <div className="reaction-motion">
      <span>A → B</span>
      <span>B → A</span>
    </div>
    <p className="small">
      {t('Sampel ilustrasi 30 zarah dibundarkan; rujuk graf untuk nilai tepat. Gerakan bukan trajektori molekul sebenar. Kedua-dua arah berterusan pada keseimbangan.', 'Illustrative sample of 30 particles is rounded; use the graphs for precise values. Motion is not an actual molecular trajectory. Both directions continue at equilibrium.')}
    </p>
  </section>;
}
const shifts = {
  heat: ['K ↑; lebih NO₂ terbentuk.', 'K ↑; more NO₂ forms.', 'Pemanasan memihak arah endotermik.', 'Heating favours the endothermic direction.'],
  cool: ['K ↓; lebih N₂O₄ terbentuk.', 'K ↓; more N₂O₄ forms.', 'Penyejukan memihak arah eksotermik.', 'Cooling favours the exothermic direction.'],
  compress: ['K kekal; peralihan ke kiri.', 'K unchanged; shift left.', 'Pada suhu tetap, mampatan menaikkan Q melebihi K; arah kiri mempunyai lebih sedikit mol gas.', 'At fixed temperature, compression raises Q above K; the left side has fewer gas moles.'],
  expand: ['K kekal; peralihan ke kanan.', 'K unchanged; shift right.', 'Pada suhu tetap, pengembangan menurunkan Q di bawah K; arah kanan mempunyai lebih banyak mol gas.', 'At fixed temperature, expansion lowers Q below K; the right side has more gas moles.'],
  reactant: ['K kekal; peralihan ke kanan.', 'K unchanged; shift right.', 'Penambahan N₂O₄ pada suhu dan isi padu tetap menurunkan Q; sistem menggunakan sebahagian reaktan tambahan.', 'Adding N₂O₄ at fixed temperature and volume lowers Q; the system consumes some added reactant.'],
  product: ['K kekal; peralihan ke kiri.', 'K unchanged; shift left.', 'Penambahan NO₂ pada suhu dan isi padu tetap menaikkan Q; sistem menggunakan sebahagian produk tambahan.', 'Adding NO₂ at fixed temperature and volume raises Q; the system consumes some added product.'],
  inert: ['K dan kedudukan keseimbangan kekal.', 'K and equilibrium position unchanged.', 'Pada suhu dan isi padu tetap, tekanan separa N₂O₄ dan NO₂ tidak berubah.', 'At fixed temperature and volume, partial pressures of N₂O₄ and NO₂ stay unchanged.'],
  catalyst: ['K dan kedudukan keseimbangan kekal.', 'K and equilibrium position unchanged.', 'Mangkin mempercepat kedua-dua arah. Jika sistem sudah seimbang, tiada peralihan bersih.', 'A catalyst accelerates both directions. An already equilibrated system has no net shift.']
};
export function ShiftStages({
  lang,
  change
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en,
    d = shifts[change];
  if (!d) return <p className="small">
    {t('Pilih gangguan untuk membandingkan tiga peringkat.', 'Choose a disturbance to compare three stages.')}
  </p>;
  return <section className="shift-stages">
    <article>
      <b>1 · {t('Sebelum', 'Before')}</b>
      <p>Q = K</p>
      <p>
        {t('Kadar kedua-dua arah sama.', 'Both reaction rates are equal.')}
      </p>
    </article>
    <article>
      <b>2 · {t('Gangguan', 'Disturbance')}</b>
      <p>
        {t(d[2], d[3])}
      </p>
    </article>
    <article>
      <b>3 · {t('Keadaan akhir', 'Final state')}</b>
      <p>
        {t(d[0], d[1])}
      </p>
      <p>
        {t('Q = K pada suhu akhir.', 'Q = K at the final temperature.')}
      </p>
    </article>
  </section>;
}
export const indicators = {
  phenolphthalein: {
    name: ['Fenolftalein', 'Phenolphthalein'],
    lo: 8.2,
    hi: 10,
    colours: [[255, 255, 255], [221, 46, 133]],
    labels: [['Tidak berwarna', 'Colourless'], ['Merah jambu', 'Pink']]
  },
  bromothymol: {
    name: ['Bromotimol biru', 'Bromothymol blue'],
    lo: 6,
    hi: 7.6,
    colours: [[245, 211, 66], [57, 119, 220]],
    labels: [['Kuning', 'Yellow'], ['Biru', 'Blue']]
  },
  methyl: {
    name: ['Metil jingga', 'Methyl orange'],
    lo: 3.1,
    hi: 4.4,
    colours: [[228, 80, 62], [249, 196, 59]],
    labels: [['Merah', 'Red'], ['Kuning', 'Yellow']]
  }
};
export function TitrationIndicator({
  lang,
  ph,
  volume,
  pair,
  indicator,
  onIndicator
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en,
    d = indicators[indicator],
    mix = Math.max(0, Math.min(1, (ph - d.lo) / (d.hi - d.lo))),
    rgb = d.colours[0].map((v, i) => Math.round(v + (d.colours[1][i] - v) * mix));
  const region = volume === 0 ? t('pH ditentukan oleh asid/bes awal.', 'pH is set by the initial acid/base.') : volume < 25 ? pair.startsWith('weak') ? t('Kawasan penimbal: spesies lemah dan pasangan konjugatnya hadir. Pada 12.5 mL, pH ≈ pKa (asid lemah) atau pOH ≈ pKb (bes lemah).', 'Buffer region: the weak species and its conjugate are present. At 12.5 mL, pH ≈ pKa (weak acid) or pOH ≈ pKb (weak base).') : t('Analit kuat masih berlebihan; ambil kira pencairan oleh titran.', 'Strong analyte remains in excess; account for dilution by titrant.') : volume === 25 ? pair.startsWith('weak') ? t('Kesetaraan: hidrolisis pasangan konjugat menyebabkan pH berbeza daripada 7.', 'Equivalence: conjugate-species hydrolysis gives a pH different from 7.') : t('Kesetaraan: pH = 7 pada 25 °C dalam model ideal.', 'Equivalence: pH = 7 at 25 °C in the ideal model.') : t('Titran kuat berlebihan mengawal pH.', 'Excess strong titrant controls pH.');
  return <section className="indicator-panel">
    <label>
      {t('Penunjuk', 'Indicator')}
      <select value={indicator} onChange={e => onIndicator(e.target.value)}>
        {Object.entries(indicators).map(([key, v]) => <option key={key} value={key}>{v.name[lang === 'ms' ? 0 : 1]} · {v.lo}–{v.hi}</option>)}
      </select>
    </label>
    <div className="indicator-sample">
      <svg viewBox="0 0 140 120" role="img" aria-label={t('Ilustrasi warna penunjuk', 'Illustration of indicator colour')}>
        <path d="M55 10 H85 M60 10 V45 L28 105 Q25 113 35 113 H105 Q115 113 112 105 L80 45 V10" stroke="#64888a" fill="#f8fcfd" strokeWidth="3" />
        <path d="M48 72 H92 L110 105 Q112 110 105 110 H35 Q28 110 30 105 Z" fill={`rgb(${rgb.join(',')})`} stroke="#c5d8dd" />
      </svg>
      <div>
        <b>
          {mix === 0 ? trLabel(d.labels[0], lang) : mix === 1 ? trLabel(d.labels[1], lang) : t('Dalam julat peralihan warna', 'Within colour-transition range')}
        </b>
        <p>{volume.toFixed(1)} mL {t('titran ditambah', 'titrant added')}</p>
        <p>{t('Julat peralihan pH', 'pH transition range')}: {d.lo}–{d.hi}</p>
      </div>
    </div>
    <p>
      {region}
    </p>
    <p className="small">
      {t('Warna ialah anggaran ilustrasi. Titik akhir ialah perubahan warna yang diperhatikan; kesetaraan ialah nisbah mol stoikiometri. Pilih julat penunjuk yang berada dalam bahagian curam lengkung.', 'Colour is illustrative. Endpoint is the observed colour change; equivalence is the stoichiometric mole ratio. Choose an indicator range within the steep part of the curve.')}
    </p>
  </section>;
}
function trLabel(pair, lang) {
  return pair[lang === 'ms' ? 0 : 1];
}
