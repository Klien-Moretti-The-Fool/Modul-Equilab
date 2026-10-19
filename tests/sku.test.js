import test from "node:test";
import assert from "node:assert/strict";
import { KW, polyproticPH, weakRoot, solutionPH, saltPH, kpFromKc, vanthoff } from "../src/lib/chemistry.js";
import topics from "../src/data/skuTopics.js";
import { allQuestions } from "../src/data/content.js";
const close = (a, b, tol = 1e-5) => assert.ok(Math.abs(a - b) <= tol, `${a} versus ${b}`);
test('Polyprotic solver conserves mass, charge and stepwise Ka across concentrations', () => {
  for (const ks of [[7.2e-3, 6.3e-8, 4.2e-13], [1e-5, 5e-12]]) for (const c of [.5, .05, .001, 1e-5]) {
    const r = polyproticPH(c, ks),
      h = 10 ** -r.ph;
    close(r.fractions.reduce((x, y) => x + y), 1, 1e-12);
    close(r.concentrations.reduce((x, y) => x + y), c, 1e-12);
    close(h, KW / h + r.concentrations.reduce((n, v, i) => n + i * v, 0), 1e-10);
    ks.forEach((k, i) => close(h * r.concentrations[i + 1] / r.concentrations[i] / k, 1, 1e-10));
  }
  close(polyproticPH(.05, [1e-5, 5e-12]).ph, 3.1536, .005);
});
test('Salt and weak-base examples match independently derived quadratic references', () => {
  close(saltPH('nacl', .1), 7);
  const hydroxide = weakRoot(KW / 1.8e-5, .25);
  close(saltPH('acetate', .25), 14 + Math.log10(hydroxide), .001);
  close(saltPH('ammonium', .1), 5.1276, .005);
  close(solutionPH({
    concentration: .1,
    ka: 1.8e-5,
    base: true
  }), 11.1247, .001);
  assert.throws(() => saltPH('nacl', -1));
});
test('Gas equilibrium conversions are reversible and temperature effects have correct sign', () => {
  for (const dn of [-2, 0, 1]) {
    const kp = kpFromKc(.2, 300, dn);
    close(kp / (.082057 * 300) ** dn, .2, 1e-12);
  }
  close(kpFromKc(.2, 300, 1), 4.92342, 1e-8);
  const k2 = vanthoff(1, 300, 330, 20);
  close(k2, 2.0729, .001);
  close(vanthoff(k2, 330, 300, 20), 1, 1e-10);
  assert.ok(vanthoff(1, 300, 330, -20) < 1);
  assert.throws(() => kpFromKc(.2, 0, 1));
});
test('New lessons and question bank retain original IDs and provide bilingual practice', () => {
  assert.equal(topics.length, 26);
  assert.equal(allQuestions.length, 44);
  assert.equal(new Set(topics.map(t => t.id)).size, 26);
  for (const id of ['foundations', 'equilibrium', 'ionization', 'calculations', 'buffers', 'titration']) for (let n = 0; n < 3; n++) assert.ok(allQuestions.find(q => q.id === `${id}-${n}`));
  for (const t of topics) {
    assert.ok(t.step >= 0 && t.step < 3);
    assert.ok(Number.isFinite(t.practice.answer));
    for (const l of ['ms', 'en']) {
      assert.ok(t.title[l] && t.goal[l]);
      assert.ok(t.notes[l].length >= 3);
      assert.ok(t.worked[l].length >= 3);
      assert.ok(t.practice.prompt[l] && t.practice.explanation[l]);
    }
  }
});
