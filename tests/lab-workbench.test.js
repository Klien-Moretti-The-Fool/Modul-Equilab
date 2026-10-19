import test from "node:test";
import assert from "node:assert/strict";
import { gasExperiment, addDose } from "../src/features/labs/labModels.js";
import { saltPH, equilibriumAt, bufferPH, titrationPH } from "../src/lib/chemistry.js";
test('Gas disturbances preserve stoichiometry during relaxation and end at equilibrium', () => {
  for (const change of ['none', 'heat', 'cool', 'compress', 'expand', 'reactant', 'product', 'inert', 'catalyst']) {
    const {
      disturbed: d,
      after: a
    } = gasExperiment(change);
    assert.ok(Math.abs(d.a + d.b / 2 - a.a - a.b / 2) < 1e-12, change + ' atom balance');
    assert.ok(Math.abs(a.b * a.b / (a.a * a.volume) - a.k) < 1e-12, change + ' mass action');
    assert.ok(a.a > 0 && a.b > 0);
  }
});
test('Le Chatelier directions, fixed-temperature K and compression colour are consistent', () => {
  const expected = {
    heat: 'right',
    cool: 'left',
    compress: 'left',
    expand: 'right',
    reactant: 'right',
    product: 'left',
    inert: 'none',
    catalyst: 'none'
  };
  for (const [change, shift] of Object.entries(expected)) {
    const e = gasExperiment(change);
    assert.equal(e.shift, shift);
    if (!['heat', 'cool'].includes(change)) assert.equal(e.after.k, e.before.k);
  }
  const e = gasExperiment('compress');
  assert.ok(e.after.b < e.disturbed.b, 'less NO2 amount after compression');
  assert.ok(e.after.b / e.after.volume > e.before.b / e.before.volume, 'colour reflects concentration, not amount');
  for (const change of ['inert', 'catalyst']) assert.deepEqual(gasExperiment(change).after, gasExperiment('none').after);
});
test('Pipette doses cancel and stay within apparatus limits', () => {
  for (const step of [.25, .5, 1]) assert.equal(addDose(addDose(0, -step), step), 0);
  assert.equal(addDose(11.75, 1), 12);
  assert.equal(addDose(-11.75, -1), -12);
  assert.throws(() => addDose(NaN, 1), RangeError);
  assert.ok(bufferPH(10, 10, 12) > bufferPH(10, 10, 10));
  assert.ok(bufferPH(10, 10, -12) < bufferPH(10, 10, -10));
});
test('Salt comparisons and all titration pairs retain chemically meaningful readings', () => {
  for (const c of [.0001, .001, .01, .1]) {
    assert.equal(saltPH('nacl', c), 7);
    assert.ok(saltPH('ammonium', c) < 7);
    assert.ok(saltPH('acetate', c) > 7);
  }
  assert.ok(saltPH('ammonium', .01) > saltPH('ammonium', .1));
  assert.ok(saltPH('acetate', .01) < saltPH('acetate', .1));
  assert.ok(titrationPH(25, 'weak-acid') > 7);
  assert.ok(titrationPH(25, 'weak-base') < 7);
  for (const type of ['strong-acid', 'strong-base']) assert.ok(Math.abs(titrationPH(25, type) - 7) < 1e-10);
});
test('Closed-vessel experiments converge from either side with nonzero equal rates', () => {
  for (const initialA of [0, .5, 1]) {
    const e = equilibriumAt(80, .08, .04, initialA);
    assert.ok(Math.abs(e.a - 1 / 3) < .00005);
    assert.ok(Math.abs(e.a + e.b - 1) < 1e-12);
    assert.ok(e.forwardRate > 0 && e.reverseRate > 0);
    assert.ok(Math.abs(e.forwardRate - e.reverseRate) < .00001);
  }
});
