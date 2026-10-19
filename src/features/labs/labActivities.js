import { solutionPH, bufferPH, equilibriumAt, titrationPH } from "../../lib/chemistry.js";
const bi = (ms, en) => ({
  ms,
  en
});
export const activities = {
  ionization: [{
    id: 'dilution',
    title: bi('Cairkan asid lemah', 'Dilute a weak acid'),
    setup: bi('CH₃COOH, Ka = 1.8 × 10⁻⁵; cairkan 0.100 M kepada 0.010 M pada 25 °C.', 'CH₃COOH, Ka = 1.8 × 10⁻⁵; dilute 0.100 M to 0.010 M at 25 °C.'),
    question: bi('Apakah perubahan pH dan peratus pengionan?', 'How do pH and percent ionization change?'),
    options: [bi('Kedua-duanya meningkat', 'Both increase'), bi('pH menurun, peratus meningkat', 'pH falls, percentage rises'), bi('Kedua-duanya menurun', 'Both decrease')],
    answer: 0,
    misconception: bi('Peratus pengionan ialah pecahan asid yang mengion, bukan kepekatan H₃O⁺.', 'Percent ionization is the fraction of acid ionized, not the H₃O⁺ concentration.'),
    explanation: bi('Selepas pencairan, pecahan asid yang mengion meningkat tetapi [H₃O⁺] menurun. Maka pH meningkat. Ka kekal pada suhu yang sama.', 'After dilution, a larger fraction ionizes but [H₃O⁺] falls. Therefore pH rises. Ka stays constant at the same temperature.'),
    reflection: bi('Apakah yang kekal apabila asid ini dicairkan pada suhu tetap?', 'What stays constant when this acid is diluted at fixed temperature?'),
    reasons: [bi('Kepekatan H₃O⁺', 'H₃O⁺ concentration'), bi('Nilai Ka', 'The value of Ka'), bi('Peratus pengionan', 'Percent ionization')],
    reason: 1,
    state: {
      c: -2,
      strength: 'weak',
      base: false,
      weakChoice: 'acetate-acid'
    }
  }, {
    id: 'strength',
    title: bi('Kuat berbanding lemah', 'Strong versus weak'),
    setup: bi('Bandingkan HCl dengan CH₃COOH pada kepekatan yang sama: 0.100 M, 25 °C.', 'Compare HCl and CH₃COOH at the same concentration: 0.100 M, 25 °C.'),
    question: bi('Larutan manakah mempunyai pH lebih rendah?', 'Which solution has a lower pH?'),
    options: [bi('Kedua-duanya sama', 'Both are equal'), bi('CH₃COOH', 'CH₃COOH'), bi('HCl', 'HCl')],
    answer: 2,
    misconception: bi('Kepekatan awal yang sama tidak bermaksud kepekatan ion yang sama.', 'Equal initial concentrations do not mean equal ion concentrations.'),
    explanation: bi('HCl mengion hampir lengkap dalam air. CH₃COOH hanya mengion sebahagian, lalu menghasilkan [H₃O⁺] yang lebih rendah pada kepekatan awal yang sama.', 'HCl ionizes essentially completely in water. CH₃COOH ionizes partially and gives a lower [H₃O⁺] at the same initial concentration.'),
    reflection: bi('Apakah maksud asid kuat?', 'What does a strong acid mean?'),
    reasons: [bi('Sentiasa pekat', 'Always concentrated'), bi('Mengion hampir lengkap dalam air', 'Ionizes essentially completely in water'), bi('Sentiasa mempunyai pH sifar', 'Always has pH zero')],
    reason: 1,
    state: {
      c: -1,
      strength: 'weak',
      base: false,
      weakChoice: 'acetate-acid'
    }
  }],
  dynamic: [{
    id: 'rates',
    title: bi('Kadar sama, kepekatan berbeza', 'Equal rates, different concentrations'),
    setup: bi('A ⇌ B; mula dengan [A] = 1 M dan [B] = 0. Bandingkan 0 s dengan 80 s.', 'A ⇌ B; initially [A] = 1 M and [B] = 0. Compare 0 s with 80 s.'),
    question: bi('Hampir keseimbangan, apakah yang sama?', 'Near equilibrium, what is equal?'),
    options: [bi('Kepekatan A dan B', 'A and B concentrations'), bi('Kadar hadapan dan songsang', 'Forward and reverse rates'), bi('Kedua-dua kadar menjadi sifar', 'Both rates become zero')],
    answer: 1,
    misconception: bi('Keseimbangan tidak bermaksud jumlah A dan B sama atau tindak balas berhenti.', 'Equilibrium does not mean equal amounts of A and B or a stopped reaction.'),
    explanation: bi('Hampir 80 s, kedua-dua kadar menghampiri 0.0267 M/s, tetapi [A] ≈ 0.333 M dan [B] ≈ 0.667 M. Kedua-dua tindak balas berterusan.', 'Near 80 s, both rates approach 0.0267 M/s, while [A] ≈ 0.333 M and [B] ≈ 0.667 M. Both reactions continue.'),
    reflection: bi('Mengapa kepekatan menjadi hampir malar?', 'Why do concentrations become almost constant?'),
    reasons: [bi('Kadar pembentukan dan penggunaan setiap spesies seimbang', 'Formation and consumption rates of each species balance'), bi('Semua zarah berhenti bergerak', 'All particles stop moving'), bi('Reaktan habis sepenuhnya', 'All reactant is consumed')],
    reason: 0,
    state: {
      time: 80
    }
  }],
  buffer: [{
    id: 'resistance',
    title: bi('Penimbal berbanding air', 'Buffer versus water'),
    setup: bi('Tambah 1 mmol NaOH kepada setiap sampel 100 mL: penimbal 10 mmol HA + 10 mmol A⁻, dan air. Abaikan perubahan isi padu.', 'Add 1 mmol NaOH to each 100 mL sample: a buffer with 10 mmol HA + 10 mmol A⁻, and water. Neglect volume change.'),
    question: bi('Sampel manakah mengalami perubahan pH lebih kecil?', 'Which sample has the smaller pH change?'),
    options: [bi('Air', 'Water'), bi('Perubahan sama', 'Equal change'), bi('Penimbal', 'Buffer')],
    answer: 2,
    misconception: bi('Bandingkan ΔpH daripada nilai awal setiap sampel, bukan hanya pH akhirnya.', 'Compare ΔpH from each sample’s own initial value, not just final pH.'),
    explanation: bi('HA menggunakan OH⁻ yang ditambah dan membentuk A⁻. Nisbah komponen berubah sedikit, maka pH berubah sedikit. Air tiada pasangan penimbal ini.', 'HA consumes added OH⁻ and forms A⁻. The component ratio changes slightly, so pH changes slightly. Water lacks this buffer pair.'),
    reflection: bi('Mengapa penimbal akhirnya gagal menahan perubahan pH?', 'Why can a buffer eventually fail to resist pH changes?'),
    reasons: [bi('pH penimbal mesti sentiasa 7', 'Buffer pH must always be 7'), bi('Satu komponen boleh habis apabila terlalu banyak asid/bes ditambah', 'A component can be exhausted by too much added acid/base'), bi('Penimbal tidak boleh bertindak balas', 'Buffers cannot react')],
    reason: 1,
    state: {
      amount: 1
    }
  }],
  lechatelier: [{
    id: 'heat',
    title: bi('Tambah haba pada sistem gas', 'Heat the gas system'),
    setup: bi('N₂O₄(g) ⇌ 2NO₂(g), arah hadapan endotermik. Sistem bermula pada keseimbangan.', 'N₂O₄(g) ⇌ 2NO₂(g), forward reaction endothermic. The system starts at equilibrium.'),
    question: bi('Apabila suhu dinaikkan, apakah arah peralihan bersih?', 'When temperature rises, which way is the net shift?'),
    options: [bi('Ke kanan', 'Right'), bi('Ke kiri', 'Left'), bi('Tiada peralihan', 'No shift')],
    answer: 0,
    misconception: bi('Kesan suhu bergantung pada tanda ΔH bagi arah tindak balas yang ditulis.', 'The temperature effect depends on ΔH for the reaction as written.'),
    explanation: bi('Pemanasan menggalakkan arah endotermik. Bagi persamaan ini, K meningkat dan lebih NO₂ terbentuk semasa sistem mencapai keseimbangan baharu.', 'Heating favours the endothermic direction. For this equation K increases and more NO₂ forms as the system reaches a new equilibrium.'),
    reflection: bi('Antara perubahan ini, yang manakah mengubah K?', 'Which of these changes changes K?'),
    reasons: [bi('Menambah mangkin', 'Adding a catalyst'), bi('Menambah N₂O₄ pada suhu tetap', 'Adding N₂O₄ at fixed temperature'), bi('Mengubah suhu', 'Changing temperature')],
    reason: 2,
    state: {
      change: 'heat'
    }
  }],
  titration: [{
    id: 'equivalence',
    title: bi('Bandingkan titik kesetaraan', 'Compare equivalence points'),
    setup: bi('25 mL asid 0.100 M dititrat dengan NaOH 0.100 M. Bandingkan HCl dan CH₃COOH selepas 25 mL titran.', 'Titrate 25 mL of 0.100 M acid with 0.100 M NaOH. Compare HCl and CH₃COOH after 25 mL titrant.'),
    question: bi('Apakah pH kesetaraan bagi CH₃COOH + NaOH?', 'What is the equivalence pH for CH₃COOH + NaOH?'),
    options: [bi('Sentiasa 7', 'Always 7'), bi('Lebih daripada 7', 'Greater than 7'), bi('Kurang daripada 7', 'Less than 7')],
    answer: 1,
    misconception: bi('Kesetaraan merujuk nisbah mol stoikiometri, bukan syarat pH = 7.', 'Equivalence refers to stoichiometric mole ratios, not a requirement of pH = 7.'),
    explanation: bi('Pada kesetaraan, asetat yang terbentuk bertindak balas dengan air menghasilkan OH⁻. Oleh itu larutan bersifat bes. Titrasi HCl + NaOH mempunyai pH kesetaraan 7 pada 25 °C dalam model ideal ini.', 'At equivalence, the acetate formed reacts with water to produce OH⁻, making the solution basic. HCl + NaOH has equivalence pH 7 at 25 °C in this ideal model.'),
    reflection: bi('Apakah titik akhir penunjuk?', 'What is the indicator endpoint?'),
    reasons: [bi('Perubahan warna yang diperhatikan', 'The observed colour change'), bi('Saat pH sentiasa 7', 'The point where pH is always 7'), bi('Saat isi padu larutan menjadi sifar', 'The point where solution volume is zero')],
    reason: 0,
    state: {
      pair: 'weak-acid',
      volume: 25
    }
  }]
};
export function waterAfterAddition(amount, volumeL = .1) {
  return solutionPH({
    concentration: Math.abs(amount) / 1000 / volumeL,
    strength: 'strong',
    base: amount >= 0
  });
}
export function activityReadings(id, lang) {
  const t = (ms, en) => lang === 'ms' ? ms : en;
  const acid = (c, strength) => {
    const ph = solutionPH({
      concentration: c,
      strength
    });
    const f = strength === 'strong' ? 1 : 1.8e-5 / (1.8e-5 + 10 ** -ph);
    return [`pH = ${ph.toFixed(3)}`, `${t('Mengion', 'Ionized')} = ${(f * 100).toFixed(3)}%`, `[H₃O⁺] = ${(10 ** -ph).toExponential(3)} M`];
  };
  if (id === 'dilution') return [{
    label: '0.100 M',
    lines: acid(.1, 'weak')
  }, {
    label: '0.010 M',
    lines: acid(.01, 'weak')
  }];
  if (id === 'strength') return [{
    label: 'HCl · 0.100 M',
    lines: acid(.1, 'strong')
  }, {
    label: 'CH₃COOH · 0.100 M',
    lines: acid(.1, 'weak')
  }];
  if (id === 'rates') return [0, 80].map(time => {
    const e = equilibriumAt(time);
    return {
      label: `${time} s`,
      lines: [`[A] = ${e.a.toFixed(3)} M · [B] = ${e.b.toFixed(3)} M`, `vf = ${e.forwardRate.toFixed(4)} M/s`, `vr = ${e.reverseRate.toFixed(4)} M/s`]
    };
  });
  if (id === 'resistance') return [{
    label: t('Penimbal', 'Buffer'),
    lines: [`${bufferPH(10, 10).toFixed(3)} → ${bufferPH(10, 10, 1).toFixed(3)} pH`, `ΔpH = +${(bufferPH(10, 10, 1) - bufferPH(10, 10)).toFixed(3)}`]
  }, {
    label: t('Air', 'Water'),
    lines: [`7.000 → ${waterAfterAddition(1).toFixed(3)} pH`, `ΔpH = +${(waterAfterAddition(1) - 7).toFixed(3)}`]
  }];
  if (id === 'equivalence') return [{
    label: 'HCl + NaOH',
    lines: [`pH = ${titrationPH(25, 'strong-acid').toFixed(3)}`, '25.0 mL NaOH']
  }, {
    label: 'CH₃COOH + NaOH',
    lines: [`pH = ${titrationPH(25, 'weak-acid').toFixed(3)}`, '25.0 mL NaOH']
  }];
  return [{
    label: t('Sebelum', 'Before'),
    lines: [t('Keseimbangan awal', 'Initial equilibrium')]
  }, {
    label: t('Selepas pemanasan', 'After heating'),
    lines: [t('K meningkat · peralihan ke kanan', 'K increases · shift right'), t('Model kualitatif; tiada bacaan berangka', 'Qualitative model; no numerical reading')]
  }];
}
