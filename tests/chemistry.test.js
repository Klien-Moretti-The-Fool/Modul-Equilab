import test from "node:test";
import assert from "node:assert/strict";
import { solutionPH, titrationPH, bufferPH, equilibriumAt } from "../src/lib/chemistry.js";
import { modules, allQuestions } from "../src/data/content.js";
const close = (a, b, tol = .02) => assert.ok(Math.abs(a - b) < tol, `${a} != ${b}`);
test('Strong acid/base values and neutrality at infinite dilution', () => {
  close(solutionPH({
    concentration: .001,
    strength: 'strong'
  }), 3);
  close(solutionPH({
    concentration: .01,
    strength: 'strong',
    base: true
  }), 12);
  close(solutionPH({
    concentration: 0,
    strength: 'strong'
  }), 7);
});
test('Weak acid: quadratic reference and dilution trend', () => {
  close(solutionPH({
    concentration: .1
  }), 2.875);
  const ph1 = solutionPH({
      concentration: .1
    }),
    ph2 = solutionPH({
      concentration: .01
    });
  assert.ok(ph2 > ph1);
  const alpha = ph => 1.8e-5 / (1.8e-5 + 10 ** -ph);
  assert.ok(alpha(ph2) > alpha(ph1));
});
test('Titrations: half-equivalence, equivalence and excess titrant', () => {
  close(titrationPH(25, 'strong-acid'), 7);
  close(titrationPH(12.5, 'weak-acid'), 4.745, .01);
  close(titrationPH(25, 'weak-acid'), 8.722, .015);
  close(titrationPH(25, 'weak-base'), 5.278, .015);
  close(titrationPH(50, 'strong-acid'), 12.523);
});
test('Titration curves are continuous and monotonic across equivalence', () => {
  for (const type of ['strong-acid', 'weak-acid', 'strong-base', 'weak-base']) {
    let prev = titrationPH(0, type);
    for (let i = 1; i <= 500; i++) {
      const curr = titrationPH(i / 10, type);
      assert.ok(type.endsWith('acid') ? curr >= prev - 1e-8 : curr <= prev + 1e-8);
      assert.ok(Number.isFinite(curr));
      prev = curr;
    }
    assert.ok(Math.abs(titrationPH(25.000001, type) - titrationPH(24.999999, type)) < .02);
  }
});
test('Buffer resists small additions but has finite capacity', () => {
  close(bufferPH(10, 10), 4.745);
  close(bufferPH(10, 10, 1), 4.832);
  assert.ok(bufferPH(10, 10, 12) > 12);
  assert.ok(bufferPH(10, 10, -12) < 2);
});
test('Dynamic equilibrium conserves matter and matches rates', () => {
  const eq = equilibriumAt(1000);
  close(eq.a + eq.b, 1, 1e-10);
  close(eq.forwardRate, eq.reverseRate, 1e-10);
  assert.ok(eq.forwardRate > 0);
  close(eq.b / eq.a, 2, 1e-8);
});
test('Every module has translated notes, outcomes and valid quiz answers', () => {
  assert.equal(modules.length, 6);
  assert.equal(new Set(allQuestions.map(q => q.id)).size, allQuestions.length);
  for (const m of modules) {
    assert.equal(m.sections.length, 3);
    for (const l of ['ms', 'en']) {
      assert.ok(m.title[l]);
      assert.equal(m.objectives[l].length, 2);
      for (const s of m.sections) for (const f of ['title', 'text', 'example', 'misconception']) assert.ok(s[f][l]);
    }
    for (const q of m.quiz) {
      assert.ok(q.options[q.answer]);
      for (const l of ['ms', 'en']) {
        assert.ok(q.text[l] && q.explanation[l]);
        for (const o of q.options) assert.ok(o[l]);
      }
    }
  }
});
