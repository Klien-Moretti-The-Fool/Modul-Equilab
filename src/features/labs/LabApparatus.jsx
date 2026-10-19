import { useId } from "react";
import { indicators } from "./LabVisuals.jsx";
import { gasExperiment } from "./labModels.js";
const text = (lang, ms, en) => lang === 'ms' ? ms : en;
function Bench({
  children,
  label,
  active = true,
  pulse = 0
}) {
  return <svg className={'apparatus ' + (active ? 'apparatus-active' : '')} viewBox="0 0 560 315" role="img" aria-label={label}>
    <rect x="12" y="10" width="536" height="281" rx="24" fill="#f0f9fc" />
    <path d="M35 280 H525" stroke="#8baebd" strokeWidth="8" strokeLinecap="round" />
    <path d="M50 289 H510" stroke="#d8e9ef" strokeWidth="12" strokeLinecap="round" />
    <g className={pulse ? 'apparatus-response' : ''}>
      {children}
    </g>
  </svg>;
}
function Probe({
  ph,
  x = 390,
  y = 94
}) {
  return <g transform={`translate(${x} ${y})`}>
    <path d="M-27 92 V-4 Q-27 -20 -11 -20 H10" fill="none" stroke="#284c62" strokeWidth="4" />
    <rect x="0" y="-36" width="119" height="68" rx="10" fill="#183d53" />
    <rect x="9" y="-27" width="101" height="39" rx="5" fill="#d3fff0" />
    <text x="60" y="-2" textAnchor="middle" fill="#084e4b" fontSize="23" fontWeight="700">
      {ph.toFixed(2)}
    </text>
    <text x="59" y="25" textAnchor="middle" fill="#fff" fontSize="11">pH</text>
    <rect x="-34" y="75" width="14" height="38" rx="5" fill="#243f58" />
    <rect x="-30" y="108" width="6" height="33" rx="3" fill="#627f94" />
  </g>;
}
function Bottle({
  x,
  y,
  label,
  color
}) {
  return <g transform={`translate(${x} ${y})`}>
    <rect x="12" y="0" width="36" height="14" rx="4" fill="#294963" />
    <path d="M14 16 H46 V29 Q62 35 62 47 V100 Q62 108 53 108 H7 Q-2 108 -2 100 V47 Q-2 35 14 29Z" fill={color} stroke="#5b8296" strokeWidth="2" />
    <rect x="3" y="50" width="54" height="34" rx="5" fill="white" />
    <text x="30" y="72" textAnchor="middle" fill="#153c53" fontSize="13" fontWeight="700">
      {label}
    </text>
  </g>;
}
function Glass({
  x = 184,
  y = 116,
  width = 166,
  height = 137,
  color = '#4ccbd0',
  children
}) {
  return <g transform={`translate(${x} ${y})`}>
    <path d={`M0 0 V${height - 12} Q0 ${height} 14 ${height} H${width - 14} Q${width} ${height} ${width} ${height - 12} V0`} fill="#ffffffc9" stroke="#55869b" strokeWidth="3" />
    <path d={`M4 48 Q${width / 2} 57 ${width - 4} 48 V${height - 13} Q${width - 4} ${height - 4} ${width - 14} ${height - 4} H14 Q4 ${height - 4} 4 ${height - 13}Z`} fill={color} opacity=".46" className="liquid-fill" />
    <ellipse cx={width / 2} cy="48" rx={width / 2 - 4} ry="7" fill={color} opacity=".65" />
    <path d={`M-7 0 H${width + 7}`} stroke="#55869b" strokeWidth="4" strokeLinecap="round" />
    {[28, 58, 88].map(n => <path key={n} d={`M${width - 23} ${n} h17`} stroke="#668ca1" strokeWidth="2" />)}
    {children}
  </g>;
}
function MovingDot({
  i,
  x,
  y,
  label,
  color = '#0b8d91'
}) {
  return <g className="molecule-drift" style={{
    '--delay': `${-i * .29}s`,
    '--duration': `${2 + i % 4 * .4}s`
  }}>
    <circle cx={x} cy={y} r="10" fill={color} />
    <text x={x} y={y + 4} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">
      {label}
    </text>
  </g>;
}
export function IonApparatus({
  lang,
  ph,
  fraction,
  base,
  salt,
  pulse
}) {
  const ions = Math.round(20 * fraction),
    label = salt || (base ? 'B + H₂O ⇌ BH⁺ + OH⁻' : 'HA + H₂O ⇌ A⁻ + H₃O⁺');
  return <Bench pulse={pulse} label={text(lang, 'Bikar dengan zarah bergerak dan meter pH', 'Beaker with moving particles and a pH meter')}>
    <text x="280" y="40" textAnchor="middle" fill="#173d53" fontSize="16" fontWeight="700">
      {label}
    </text>
    <Glass color={base ? '#a991f1' : '#37c5d2'}>
      {Array.from({
        length: 20
      }, (_, i) => {
        const x = 23 + i % 5 * 29,
          y = 71 + Math.floor(i / 5) * 17;
        return salt ? <MovingDot key={i} i={i} x={x} y={y} label={i % 2 ? '+' : '−'} color={i % 2 ? '#9470d8' : '#147d9b'} /> : i < ions ? <g key={i}>
        <MovingDot i={i} x={x - 3} y={y} label="−" />
        <circle className="molecule-drift" style={{
            '--delay': `${-i * .29}s`
          }} cx={x + 10} cy={y - 5} r="4" fill="#bb6b13" />
      </g> : <MovingDot key={i} i={i} x={x} y={y} label={base ? 'B' : 'HA'} color="#536fae" />;
      })}
    </Glass>
    <Probe x={370} ph={ph} /><Bottle x={67} y={150} label={salt ? text(lang, 'Garam', 'Salt') : base ? text(lang, 'Bes', 'Base') : text(lang, 'Asid', 'Acid')} color={base ? '#e6dbff' : '#c8f5f1'} />
    <text x="280" y="308" textAnchor="middle" fill="#31566a" fontSize="12">
      {text(lang, 'Bikar · elektrod · meter pH', 'Beaker · electrode · pH meter')}
    </text>
  </Bench>;
}
export function BufferApparatus({
  lang,
  ph,
  amount,
  pulse,
  stirring
}) {
  return <Bench pulse={pulse} active={stirring} label={text(lang, 'Pipet HCl dan NaOH, bikar penimbal, pengacau dan meter pH', 'HCl and NaOH pipettes, buffer beaker, stirrer and pH meter')}>
    <Bottle x={53} y={151} label="HCl" color="#ffe2c6" /><Bottle x={443} y={156} label="NaOH" color="#e6dcff" />
    <g transform="translate(240 38) rotate(14)">
      <rect width="13" height="50" rx="5" fill="#648ba1" />
      <path d="M3 50 H10 V69 L6 79 L3 69Z" fill="#b0e2eb" stroke="#537b91" />
      <circle key={amount} className={amount !== 0 ? 'falling-drop' : 'idle-drop'} cx="6" cy="90" r="5" fill={amount < 0 ? '#d99032' : '#8b62d1'} />
    </g>
    <Glass color="#46cbb5">
      {Array.from({
        length: 16
      }, (_, i) => <MovingDot key={i} i={i} x={24 + i % 4 * 39} y={73 + Math.floor(i / 4) * 15} label={i < Math.round(Math.max(0, Math.min(20, 10 - amount)) / 20 * 16) ? 'HA' : 'A⁻'} color={i < Math.round(Math.max(0, Math.min(20, 10 - amount)) / 20 * 16) ? '#0a7d94' : '#7d50be'} />)}
      <rect className={stirring ? 'stir-bar' : ''} x="65" y="121" width="38" height="6" rx="3" fill="white" />
    </Glass>
    <rect x="173" y="257" width="190" height="18" rx="6" fill="#31536c" /><circle cx="345" cy="266" r="5" fill={stirring ? '#64e1bf' : '#b1c4ce'} /><Probe x={370} y={94} ph={ph} />
    <text x="280" y="308" textAnchor="middle" fill="#31566a" fontSize="12">
      {text(lang, 'Penimbal HA/A⁻ · pengacau magnet', 'HA/A⁻ buffer · magnetic stirrer')}
    </text>
  </Bench>;
}
export function TitrationApparatus({
  lang,
  ph,
  volume,
  indicator,
  pulse
}) {
  const d = indicators[indicator],
    mix = Math.max(0, Math.min(1, (ph - d.lo) / (d.hi - d.lo))),
    rgb = d.colours[0].map((v, i) => Math.round(v + (d.colours[1][i] - v) * mix));
  const id = 'buret-' + useId().replaceAll(':', '');
  return <Bench pulse={pulse} label={text(lang, 'Buret menitis ke dalam kelalang kon dengan penunjuk dan meter pH', 'Burette dripping into an indicator flask with a pH meter')}>
    <defs>
      <clipPath id={id}>
        <rect x="273" y="26" width="18" height="118" rx="2" />
      </clipPath>
    </defs>
    <path d="M151 35 V265 M135 265 H171 M151 62 H283" fill="none" stroke="#617d90" strokeWidth="7" strokeLinecap="round" />
    <rect x="272" y="22" width="20" height="127" rx="4" fill="white" stroke="#527d93" strokeWidth="2" /><rect x="275" y={27 + volume / 50 * 111} width="14" height={Math.max(0, 111 - volume / 50 * 111)} fill="#81d6ec" clipPath={`url(#${id})`} />{Array.from({
      length: 10
    }, (_, i) => <path key={i} d={`M281 ${30 + i * 11} h9`} stroke="#51768a" />)}<path d="M282 149 V172 M268 151 H299" stroke="#29485d" strokeWidth="4" />
    <circle key={volume} className={volume > 0 ? 'falling-drop' : 'idle-drop'} cx="282" cy="182" r="4" fill="#3fbddd" />
    <path d="M266 187 H299 M270 187 V209 L231 254 Q228 270 245 270 H320 Q337 270 334 254 L295 209 V187" fill="#ffffffc9" stroke="#5b859b" strokeWidth="3" />
    <path className="liquid-fill" d="M250 235 H315 L331 257 Q334 266 320 266 H245 Q232 266 235 257Z" fill={`rgb(${rgb.join(',')})`} stroke="#b5cbd5" />
    <Probe x={345} y={124} ph={ph} /><text x="205" y="112" textAnchor="end" fill="#183d53" fontSize="15" fontWeight="700">{volume.toFixed(1)} mL</text>
    <text x="280" y="308" textAnchor="middle" fill="#31566a" fontSize="12">
      {text(lang, 'Buret · kelalang kon · penunjuk', 'Burette · conical flask · indicator')}
    </text>
  </Bench>;
}
export function DynamicApparatus({
  lang,
  eq,
  running,
  pulse
}) {
  const count = Math.round(eq.a * 24);
  return <Bench pulse={pulse} active={running} label={text(lang, 'Bekas tertutup dengan zarah A dan B yang saling bertukar', 'Closed vessel with interconverting A and B particles')}>
    <rect x="208" y="46" width="144" height="25" rx="8" fill="#30546b" /><path d="M222 71 V89 Q162 110 162 146 V238 Q162 263 185 263 H375 Q398 263 398 238 V146 Q398 110 338 89 V71" fill="#def5f5" stroke="#4b8096" strokeWidth="3" />
    <text x="280" y="33" textAnchor="middle" fill="#173d53" fontSize="15" fontWeight="700">
      {text(lang, 'SISTEM TERTUTUP', 'CLOSED SYSTEM')}
    </text>
    {Array.from({
      length: 24
    }, (_, i) => <MovingDot key={i} i={i} x={189 + i % 6 * 36} y={142 + Math.floor(i / 6) * 30} label={i < count ? 'A' : 'B'} color={i < count ? '#087f91' : '#8754bd'} />)}
    <text className="reaction-glow" x="93" y="135" textAnchor="middle" fill="#087c88" fontSize="17" fontWeight="700">A → B</text><text className="reaction-glow" x="469" y="210" textAnchor="middle" fill="#7747ae" fontSize="17" fontWeight="700">B → A</text>
    <text x="280" y="308" textAnchor="middle" fill="#31566a" fontSize="12">
      {text(lang, 'Zarah bergerak; jumlah A + B dikekalkan', 'Moving particles; total A + B conserved')}
    </text>
  </Bench>;
}
export function GasApparatus({
  lang,
  change,
  stage,
  pulse
}) {
  const experiment = gasExperiment(change),
    s = experiment[stage],
    width = 260 * s.volume / 1.65,
    density = s.b / s.volume,
    alpha = Math.min(.8, .15 + density * .26),
    right = 134 + width,
    countNO2 = Math.round(s.b / (s.a + s.b) * 24),
    applied = stage !== 'before';
  return <Bench pulse={pulse} label={text(lang, 'Kebuk gas tertutup dengan omboh dan kawalan haba', 'Closed gas chamber with a piston and thermal controls')}>
    <text x="280" y="39" textAnchor="middle" fill="#173d53" fontSize="17" fontWeight="700">N₂O₄(g) ⇌ 2NO₂(g)</text>
    <rect x="116" y="222" width="330" height="49" rx="12" fill={applied && change === 'heat' ? '#ffdcc7' : applied && change === 'cool' ? '#cce8ff' : '#e0f2f5'} />
    <path d="M135 90 H425 V214 H135 Z" fill="#fff" stroke="#537f95" strokeWidth="3" /><rect className="gas-fill" x="137" y="93" width={width - 3} height="118" fill={`rgba(166,85,43,${alpha})`} />
    {Array.from({
      length: 24
    }, (_, i) => {
      const x = 146 + i % 6 * (width - 26) / 5,
        y = 109 + Math.floor(i / 6) * 28;
      return <g key={i} className="molecule-drift" style={{
        '--delay': `${-i * .24}s`,
        '--duration': applied && change === 'catalyst' ? '1s' : '2.8s'
      }}>
      <circle cx={x} cy={y} r={i < countNO2 ? 5 : 6} fill={i < countNO2 ? '#a43f1b' : '#557e99'} />
      {i >= countNO2 && <circle cx={x + 5} cy={y + 2} r="5" fill="#557e99" />}
    </g>;
    })}
    {applied && change === 'inert' && [0, 1, 2].map(i => <circle key={i} cx={151 + i * (width - 34) / 2} cy="126" r="5" fill="#495d69" />)}
    <path className="gas-piston" d={`M${right} 90 V214 M${right} 151 H473`} stroke="#294f67" strokeWidth="10" /><rect x="469" y="129" width="16" height="43" rx="6" fill="#294f67" />
    <text x="280" y="251" textAnchor="middle" fill="#173d53" fontSize="15" fontWeight="700">
      {applied && change === 'heat' ? text(lang, 'Mandian dipanaskan', 'Heated bath') : applied && change === 'cool' ? text(lang, 'Mandian disejukkan', 'Cooled bath') : text(lang, 'Suhu kekal', 'Temperature held fixed')}
    </text>
    <text x="280" y="308" textAnchor="middle" fill="#31566a" fontSize="12">
      {text(lang, 'Warna perang menunjukkan kepekatan NO₂ secara ilustrasi', 'Brown colour illustrates the NO₂ concentration')}
    </text>
  </Bench>;
}
