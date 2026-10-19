import { useId } from "react";
import "../../styles/home-beaker.css";
export { default, labNames } from "./LabWorkbench.jsx";
export function Beaker({
  fraction = .3,
  base = false,
  large = false,
  animated = large
}) {
  const liquidId = 'liquid-' + useId().replaceAll(':', '');
  const ions = Math.round(16 * fraction);
  return <svg className={'beaker ' + (large ? 'large ' : '') + (animated ? 'beaker-animated' : '')} viewBox="0 0 320 290" role="img" aria-label={base ? "B / BH⁺ / OH⁻" : "HA / A⁻ / H₃O⁺"}>
 <defs>
      <linearGradient id={liquidId} x2="0" y2="1">
        <stop stopColor={base ? '#e6ddff' : '#d4f4f7'} />
        <stop offset="1" stopColor={base ? '#8067D8' : '#36C5F0'} />
      </linearGradient>
      <clipPath id={liquidId + '-clip'}>
        <path d="M68 118 Q160 129 252 118 V238 Q252 251 238 251 H82 Q68 251 68 238Z" />
      </clipPath>
    </defs>
 <ellipse cx="160" cy="267" rx="107" ry="11" fill="#0b696e" opacity=".08" />
 <path d="M65 40 L65 239 Q65 255 82 255 H238 Q255 255 255 239 V40" fill="#ffffffaa" stroke="#427b89" strokeWidth="3" />
 <path className="home-liquid" d="M68 118 Q160 129 252 118 V238 Q252 251 238 251 H82 Q68 251 68 238Z" fill={'url(#' + liquidId + ')'} opacity=".6" />
 <ellipse className="home-liquid-surface" cx="160" cy="118" rx="92" ry="9" fill="#a6e6df" opacity=".7" />
 {animated && <g clipPath={'url(#' + liquidId + '-clip)'} aria-hidden="true">
      <path className="home-liquid-light" d="M72 135 Q125 127 171 140 T247 139" fill="none" stroke="#ffffff" strokeWidth="2" opacity=".25" />
      <path className="home-liquid-light alternate" d="M73 204 Q130 217 186 205 T245 202" fill="none" stroke="#ffffff" strokeWidth="2" opacity=".18" />
    </g>}
 <path d="M57 38 H264" stroke="#427b89" strokeWidth="4" strokeLinecap="round" />
 {[75, 100, 150, 175, 200, 225].map(y => <path key={y} d={`M230 ${y} h15`} stroke="#568691" opacity=".5" />)}
 {Array.from({
      length: 16
    }, (_, i) => {
      const x = 88 + i % 4 * 43,
        y = 145 + Math.floor(i / 4) * 27;
      return <g key={i} className="home-beaker-particle" style={{
        '--particle-delay': `${-i * .37}s`,
        '--particle-duration': `${3.2 + i % 4 * .6}s`,
        '--particle-x': `${i % 2 ? -6 : 6}px`,
        '--particle-y': `${i % 3 ? -5 : 5}px`
      }}>
      {i < ions ? <>
        <circle cx={x - 5} cy={y} r="8" fill="#087c89" />
        <circle cx={x + 12} cy={y + 5} r="5" fill="#efac4b" />
      </> : <>
        <circle cx={x} cy={y} r="9" fill="#6e8fb7" />
        <circle cx={x + 7} cy={y - 5} r="4" fill="#fff" />
      </>}
    </g>;
    })}
 <text x="160" y="85" textAnchor="middle" fill="#3c7080" fontSize="14">
      {base ? 'B + H₂O ⇌ BH⁺ + OH⁻' : 'HA + H₂O ⇌ A⁻ + H₃O⁺'}
    </text>
 </svg>;
}
