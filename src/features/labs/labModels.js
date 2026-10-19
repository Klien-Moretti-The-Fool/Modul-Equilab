// An illustrative ideal-gas model, with normalized units rather than measured gas data.
// N2O4 <=> 2 NO2; K = b^2 / (a V). Heating increases K for the endothermic forward step.
export function gasExperiment(change = 'none') {
  const before = {
    a: .5,
    b: 1,
    volume: 1,
    k: 2
  };
  const disturbed = {
    ...before
  };
  if (change === 'heat') disturbed.k = 4;
  if (change === 'cool') disturbed.k = 1;
  if (change === 'compress') disturbed.volume = .55;
  if (change === 'expand') disturbed.volume = 1.65;
  if (change === 'reactant') disturbed.a += .5;
  if (change === 'product') disturbed.b += .5;
  const total = disturbed.a + disturbed.b / 2;
  const kv = disturbed.k * disturbed.volume;
  const b = 4 * kv * total / (Math.sqrt(kv * kv + 16 * kv * total) + kv);
  const after = {
    ...disturbed,
    b,
    a: total - b / 2
  };
  const extent = (after.b - disturbed.b) / 2;
  return {
    before,
    disturbed,
    after,
    shift: Math.abs(extent) < 1e-10 ? 'none' : extent > 0 ? 'right' : 'left'
  };
}
export function addDose(current, delta, limit = 12) {
  if (!Number.isFinite(current) || !Number.isFinite(delta) || !(limit > 0)) throw new RangeError('Invalid dose');
  return Math.round(Math.max(-limit, Math.min(limit, current + delta)) * 1000) / 1000;
}
