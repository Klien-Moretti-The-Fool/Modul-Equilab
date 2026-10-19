import { Atom, FlaskConical, ShieldCheck, Calculator, Pipette, ArrowLeftRight } from "lucide-react";
export const icons = {
  atom: Atom,
  flask: FlaskConical,
  arrows: ArrowLeftRight,
  calculator: Calculator,
  shield: ShieldCheck,
  pipette: Pipette
};
export const REVIEW = import.meta.env.DEV && new URLSearchParams(location.search).get('review') === '1';
export const empty = {
  steps: [],
  attempts: []
};
export const safeRead = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
export const validProgress = x => x && typeof x === 'object' && !Array.isArray(x) ? Object.fromEntries(Object.entries(x).filter(([, p]) => p && Array.isArray(p.steps) && Array.isArray(p.attempts)).map(([id, p]) => [id, {
  ...p,
  steps: [...new Set(p.steps.filter(s => Number.isInteger(s) && s >= 0 && s <= 4))],
  attempts: p.attempts.filter(a => a && Number.isFinite(a.score) && typeof a.date === 'string' && Number.isFinite(Date.parse(a.date)))
}])) : {};
export function shuffled(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
