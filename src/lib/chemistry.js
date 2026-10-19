// Ideal dilute aqueous solutions, 25 °C; concentration approximates activity.
export const KW = 1e-14;
export function rootPH(charge) {
  let lo = -2,
    hi = 16;
  for (let i = 0; i < 100; i++) {
    const mid = (lo + hi) / 2;
    if (charge(10 ** -mid) > 0) lo = mid;else hi = mid;
  }
  return (lo + hi) / 2;
}
export function solutionPH({
  concentration: c,
  ka = 1.8e-5,
  strength = 'weak',
  base = false
}) {
  const acidPH = strength === 'strong' ? rootPH(h => h - KW / h - c) : rootPH(h => h - KW / h - c * ka / (ka + h));
  return base ? 14 - acidPH : acidPH;
}
export function titrationPH(volume, type = 'weak-acid', c = 0.1, initialVolume = 25, titrantC = 0.1) {
  const total = (initialVolume + volume) / 1000;
  const analytical = c * initialVolume / 1000 / total;
  const counterIon = titrantC * volume / 1000 / total;
  const weak = type.startsWith('weak');
  const ph = weak ? rootPH(h => h + counterIon - KW / h - analytical * 1.8e-5 / (1.8e-5 + h)) : rootPH(h => h + counterIon - KW / h - analytical);
  return type.endsWith('base') ? 14 - ph : ph;
}
export function bufferPH(acidMmol, saltMmol, addedBaseMmol = 0, volumeL = 0.1) {
  const total = (acidMmol + saltMmol) / 1000 / volumeL;
  const sodiumMinusChloride = (saltMmol + addedBaseMmol) / 1000 / volumeL;
  return rootPH(h => h + sodiumMinusChloride - KW / h - total * 1.8e-5 / (1.8e-5 + h));
}
export function equilibriumAt(t, forward = 0.08, reverse = 0.04, initialA = 1) {
  const aEq = reverse / (forward + reverse);
  const a = aEq + (initialA - aEq) * Math.exp(-(forward + reverse) * t);
  return {
    a,
    b: 1 - a,
    forwardRate: forward * a,
    reverseRate: reverse * (1 - a)
  };
}
export function weakRoot(k, c) {
  if (!(k > 0 && c > 0)) throw new RangeError('Positive constant and concentration required');
  return 2 * k * c / (Math.sqrt(k * k + 4 * k * c) + k);
}
export function polyproticFractions(h, constants) {
  const weights = [1];
  for (const k of constants) weights.push(weights.at(-1) * k / h);
  const total = weights.reduce((a, b) => a + b, 0);
  return weights.map(w => w / total);
}
export function polyproticPH(c, constants) {
  if (!(c > 0) || !constants.length || constants.some(k => !(k > 0))) throw new RangeError('Positive concentration and constants required');
  const ph = rootPH(h => h - KW / h - c * polyproticFractions(h, constants).reduce((n, a, i) => n + i * a, 0));
  const fractions = polyproticFractions(10 ** -ph, constants);
  return {
    ph,
    fractions,
    concentrations: fractions.map(a => a * c)
  };
}
export function kpFromKc(kc, temperature, deltaN) {
  if (!(kc > 0 && temperature > 0)) throw new RangeError('Kc and kelvin must be positive');
  return kc * (0.082057 * temperature) ** deltaN;
}
export function vanthoff(k1, t1, t2, enthalpyKJ) {
  if (!(k1 > 0 && t1 > 0 && t2 > 0)) throw new RangeError('K and kelvin must be positive');
  return k1 * Math.exp(-enthalpyKJ * 1000 / 8.314 * (1 / t2 - 1 / t1));
}
export const weakSpecies = [{
  id: 'acetate-acid',
  label: 'CH₃COOH',
  k: 1.8e-5,
  base: false
}, {
  id: 'formic',
  label: 'HCOOH',
  k: 1.8e-4,
  base: false
}, {
  id: 'propanoic',
  label: 'CH₃CH₂COOH',
  k: 1.3e-5,
  base: false
}, {
  id: 'ammonia',
  label: 'NH₃',
  k: 1.8e-5,
  base: true
}, {
  id: 'dimethylamine',
  label: '(CH₃)₂NH',
  k: 5.9e-4,
  base: true
}];
export function saltPH(salt, c) {
  if (!(c > 0)) throw new RangeError('Concentration must be positive');
  if (salt === 'nacl') return 7;
  if (salt === 'acetate') return solutionPH({
    concentration: c,
    ka: KW / 1.8e-5,
    base: true
  });
  if (salt === 'ammonium') return solutionPH({
    concentration: c,
    ka: KW / 1.8e-5
  });
  throw new RangeError('Unsupported salt');
}
