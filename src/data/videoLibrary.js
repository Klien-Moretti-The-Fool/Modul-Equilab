import { moduleVideos, youtubeLink } from "./legacyVideoLinks.js";
const bi = (ms, en) => ({
  ms,
  en
});
const video = (id, step, original, title, summary, observe, sourceUrl, channel = 'Khan Academy') => ({
  id,
  step,
  original,
  title,
  summary,
  observe,
  sourceUrl,
  channel,
  url: 'https://www.youtube.com/watch?v=' + id,
  language: bi('Bahasa Inggeris', 'English'),
  checked: '2026-10-16'
});
// Text below is an EQUILAB learning guide, not a transcript or a translated video.
export const videoLibrary = {
  foundations: [video('4441EyWBPt8', 1, 'Conjugate acid–base pairs', bi('Kenali pasangan asid–bes konjugat', 'Recognize conjugate acid–base pairs'), bi('Ikuti perubahan spesies apabila satu proton dipindahkan. Padankan penerangan dengan pasangan HA/A⁻ dalam nota.', 'Follow how species change when one proton transfers. Connect the explanation to the HA/A⁻ pairs in the notes.'), bi('Kenal pasti penderma proton, penerima proton dan kedua-dua pasangan konjugat.', 'Identify the proton donor, proton acceptor and both conjugate pairs.'), 'https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:chemical-reactions/x2eef969c74e0d802:introduction-to-acid-base-reactions/v/conjugate-acid-base-pairs-acids-and-bases-chemistry-khan-academy'), video('vt6WjF1O_08', 2, 'Autoionization of water', bi('Air, Kw dan keadaan neutral', 'Water, Kw and neutrality'), bi('Lihat pemindahan proton antara molekul air serta hubungan H₃O⁺ dengan OH⁻.', 'Explore proton transfer between water molecules and the relationship between H₃O⁺ and OH⁻.'), bi('Terangkan maksud neutral menggunakan kepekatan kedua-dua ion; kaitkan nilai Kw dengan suhu.', 'Explain neutrality using both ion concentrations; connect the value of Kw to temperature.'), 'https://www.khanacademy.org/v/autoionization-of-water-ap')],
  equilibrium: [video('zaHM74k9Z1w', 0, 'Dynamic equilibrium', bi('Kadar sama, tindak balas tetap berlaku', 'Equal rates, reactions keep occurring'), bi('Bina gambaran tentang sistem yang terus bertindak balas walaupun pemerhatian makroskopik kekal.', 'Build a picture of a system that keeps reacting while its macroscopic appearance stays constant.'), bi('Bezakan kadar yang sama dengan kepekatan yang sama. Kemudian bandingkan kedua-dua kadar dalam mini simulasi.', 'Distinguish equal rates from equal concentrations. Then compare both rates in the mini simulation.'), 'https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:equilibrium/x2eef969c74e0d802:introduction-to-equilibrium/v/dynamic-equilibrium'), video('4-fEvpVNTlE', 2, "Le Chatelier's principle", bi('Ramalkan respons terhadap gangguan', 'Predict the response to a disturbance'), bi('Hubungkan perubahan keadaan dengan arah tindak balas bersih apabila sistem membentuk keseimbangan baharu.', 'Connect a change in conditions to the net reaction direction as a system establishes a new equilibrium.'), bi('Pilih satu gangguan. Ramalkan arah peralihan sebelum mencubanya dalam simulasi.', 'Choose one disturbance. Predict the shift before trying it in the simulation.'), 'https://www.khanacademy.org/science/shs-general-chemistry-2/x8e72aa8e889b96da:2nd-quarter/x8e72aa8e889b96da:chemical-equilibrium/v/le-chatelier-s-principle_hs')],
  ionization: [video('nJLNlB-7Rhk', 0, 'Weak acid equilibria', bi('Mengapa asid lemah mengion sebahagian?', 'Why do weak acids ionize partially?'), bi('Bandingkan pengionan asid kuat dan lemah melalui spesies yang hadir pada keseimbangan.', 'Compare strong- and weak-acid ionization through the species present at equilibrium.'), bi('Pada kepekatan awal yang sama, apakah perbezaan antara jumlah HA dan ion yang terhasil?', 'At the same initial concentration, how do the amounts of HA and the resulting ions differ?'), 'https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:acids-and-bases/x2eef969c74e0d802:weak-acid-and-base-equilibria/v/weak-acid-equilibria'), video('_jEe0Tkyn3w', 1, 'Worked example: Finding the percent ionization of a weak acid', bi('Mengira peratus pengionan', 'Calculate percent ionization'), bi('Ikuti contoh asid asetik untuk menghubungkan kepekatan awal dengan kepekatan ion pada keseimbangan.', 'Follow an acetic-acid example linking the initial concentration to the equilibrium ion concentration.'), bi('Catat nilai yang menjadi pengangka dan penyebut. Nilai awal dalam video mungkin berbeza daripada contoh EQUILAB.', 'Note the numerator and denominator. The starting values in the video may differ from the EQUILAB example.'), 'https://www.youtube.com/watch?v=_jEe0Tkyn3w')],
  calculations: [video('icNOBmKjDLo', 1, 'Weak acid equilibrium', bi('Daripada Ka kepada pH asid lemah', 'From Ka to weak-acid pH'), bi('Ikuti contoh pengiraan pH dan hubungkan setiap langkah dengan ungkapan keseimbangan dalam jadual ICE.', 'Follow a pH calculation and connect each step to the equilibrium expression in an ICE table.'), bi('Mengapa kepekatan awal asid lemah tidak terus digunakan sebagai [H₃O⁺]? Semak andaian penghampiran.', 'Why can the initial weak-acid concentration not simply be used as [H₃O⁺]? Check the approximation assumptions.'), 'https://www.khanacademy.org/science/ka-chemistry-grade-11/x7b9df4d3282049b3:in-in-equilibrium/x7b9df4d3282049b3:in-in-acid-base-equilibria/v/weak-acid-equilibrium', 'Khan Academy Organic Chemistry'), video('xGE3sEz6U9Y', 2, 'Weak base equilibrium', bi('Kb, pOH dan pH bes lemah', 'Kb, pOH and weak-base pH'), bi('Luaskan kaedah keseimbangan kepada bes lemah, kemudian hubungkan pOH dengan pH.', 'Extend equilibrium calculations to a weak base, then connect pOH to pH.'), bi('Bezakan ion yang dikira dahulu bagi asid lemah dan bes lemah. Gunakan pH + pOH = 14 pada 25 °C.', 'Distinguish the ion calculated first for a weak acid and a weak base. Use pH + pOH = 14 at 25 °C.'), 'https://www.khanacademy.org/test-prep/mcat/chemical-processes/acid-base-equilibria/v/weak-base-equilibrium', 'Khan Academy Organic Chemistry')],
  buffers: [video('tZH6zvQ8Wl8', 0, 'Properties of buffers', bi('Cara dua komponen penimbal bekerjasama', 'How the two buffer components work together'), bi('Hubungkan asid lemah dan bes konjugatnya dengan respons terhadap penambahan asid atau bes.', 'Connect a weak acid and its conjugate base to the response when acid or base is added.'), bi('Komponen manakah bertindak balas dengan H₃O⁺, dan komponen manakah bertindak balas dengan OH⁻?', 'Which component reacts with H₃O⁺, and which reacts with OH⁻?'), 'https://www.khanacademy.org/v/chem31-buffers'), video('7QgtdYiWH50', 1, 'Henderson–Hasselbalch equation', bi('Gunakan nisbah komponen untuk menganggar pH', 'Estimate pH from the component ratio'), bi('Kaitkan pKa dengan nisbah bes konjugat kepada asid dalam persamaan Henderson–Hasselbalch.', 'Connect pKa to the conjugate-base-to-acid ratio in the Henderson–Hasselbalch equation.'), bi('Ramalkan pH apabila jumlah HA dan A⁻ sama. Selepas menambah bes, gunakan jumlah selepas tindak balas.', 'Predict pH when HA and A⁻ amounts are equal. After adding base, use the amounts remaining after reaction.'), 'https://www.khanacademy.org/science/chemistry/acids-and-bases-topic/buffer-solutions/v/hendersonhasselbalch-equation')],
  titration: [video('sZW1qoQl3ng', 1, 'Weak acid–strong base titrations', bi('Baca lengkung titrasi asid lemah–bes kuat', 'Read a weak-acid–strong-base titration curve'), bi('Kenal pasti kawasan penimbal, separuh kesetaraan dan pH pada titik kesetaraan.', 'Identify the buffer region, half-equivalence and the pH at equivalence.'), bi('Mengapa pH kesetaraan melebihi 7? Cari kedudukan pH ≈ pKa pada lengkung.', 'Why is equivalence pH above 7? Locate the point where pH ≈ pKa on the curve.'), 'https://www.khanacademy.org/science/ap-chemistry-beta/x2eef969c74e0d802:acids-and-bases/x2eef969c74e0d802:acidbase-titrations/v/weak-acid-strong-base-titrations'), video('qkh0SMozSBQ', 0, 'Strong acid–strong base titrations', bi('Bandingkan titrasi asid kuat–bes kuat', 'Compare strong-acid–strong-base titrations'), bi('Lihat perubahan pH sepanjang penambahan titran dan bandingkan bentuk lengkung dengan titrasi asid lemah.', 'Explore pH as titrant is added and compare the curve with weak-acid titration.'), bi('Pada 25 °C dalam model ideal, apakah pH kesetaraan? Bezakan titik kesetaraan dengan titik akhir penunjuk.', 'At 25 °C in the ideal model, what is equivalence pH? Distinguish equivalence from an indicator endpoint.'), 'https://www.youtube.com/watch?v=qkh0SMozSBQ')]
};

// A blank legacy entry uses the curated default. A null override hides the main video.
// Existing legacy URLs remain effective until explicitly overridden.
export function videosForModule(moduleId, settings = {}, legacy = moduleVideos) {
  const list = videoLibrary[moduleId];
  if (!list) return [];
  const raw = Object.prototype.hasOwnProperty.call(settings, moduleId) ? settings[moduleId] : legacy[moduleId]?.trim() || list[0].url;
  if (raw === null || raw === '') return list.slice(1);
  const url = youtubeLink(raw);
  if (!url) return list.slice(1);
  if (url === list[0].url) return list;
  const id = new URL(url).searchParams.get('v');
  return [{
    id,
    step: list[0].step,
    url,
    custom: true,
    original: '',
    channel: '',
    sourceUrl: '',
    title: bi('Video pilihan untuk modul ini', 'Selected video for this module'),
    summary: bi('Pautan ini ditetapkan oleh pengurus modul. Gunakan nota EQUILAB untuk menghubungkan penerangan video dengan konsep yang dipelajari.', 'This link is set by the module owner. Use the EQUILAB notes to connect the video explanation to the concept you are studying.'),
    observe: bi('Catat satu idea utama dan bandingkan dengan contoh atau mini simulasi dalam nota.', 'Note one key idea and compare it with an example or mini simulation in the notes.'),
    language: bi('Bahasa: semak pada video', 'Language: check the video')
  }, ...list.slice(1).filter(v => v.url !== url)];
}
