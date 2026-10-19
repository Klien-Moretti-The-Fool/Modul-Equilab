import { GuideButton } from "../components/PageHeader.jsx";
import { Atom, FlaskConical, BookOpen, ArrowRight, Check, Languages, Target } from "lucide-react";
import { modules } from "../data/content.js";
import { Beaker } from "../features/labs/Lab.jsx";
import ModuleCard from "../features/modules/ModuleCard.jsx";
export default function Home({
  lang,
  openGuide,
  t,
  nav,
  page,
  progress,
  tr
}) {
  return <>
    <div className="page-top home-page-top">
      <span className="eyebrow">EQUILAB · SKU3073</span>
      <GuideButton lang={lang} onOpen={openGuide} />
    </div>
    <section className="hero">
      <div className="hero-copy">
        <span className="pill"><span /> {t('E-MODUL INTERAKTIF · SKU3073', 'INTERACTIVE E-MODULE · SKU3073')}</span>
        <h1>
          {t('Fahami kimia.', 'Understand chemistry.')}
          <br />
          <em>
            {t('Terokai keseimbangan.', 'Explore equilibrium.')}
          </em>
        </h1>
        <p>
          {t('Daripada zarah yang tidak kelihatan kepada konsep yang jelas. Belajar keseimbangan asid–bes melalui nota berpandu, eksperimen interaktif dan latihan kendiri.', 'From invisible particles to clear concepts. Learn acid–base equilibrium through guided notes, interactive experiments and self-paced practice.')}
        </p>
        <div className="hero-actions">
          <button className="primary" onClick={() => nav('modules')}>{t('Mulakan pembelajaran', 'Start learning')} <ArrowRight size={18} /></button>
          <button className="secondary" onClick={() => nav('lab')}>
            <FlaskConical size={18} />
            {t('Terokai makmal', 'Explore the lab')}
          </button>
        </div>
        <div className="hero-foot">
          <span>
            <Check size={15} />
            {t('Belajar mengikut rentak sendiri', 'Learn at your own pace')}
          </span>
          <span><Languages size={15} /> Bahasa Melayu / English</span>
        </div>
      </div>
      <div className="hero-art">
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
        <div className="art-label">
          <span className="status-dot" />
          {t('RUANG PENEMUAN ANDA', 'YOUR DISCOVERY SPACE')}
        </div>
        <div className="art-main">
          <Beaker fraction={.25} large />
        </div>
        <div className="float-card ion-card">
          <span className="mini-icon">
            <Atom size={19} />
          </span>
          <div>
            <b>
              {t('Lihat yang tidak kelihatan', 'Make the invisible visible')}
            </b>
            <small>
              {t('Visualisasi pada aras zarah', 'Particle-level visualization')}
            </small>
          </div>
        </div>
        <div className="float-card ph-card">
          <small>
            {t('SKALA pH', 'pH SCALE')}
          </small>
          <div className="ph-strip" />
          <div className="ph-labels">
            <span>0</span>
            <span>7</span>
            <span>14</span>
          </div>
        </div>
        <div className="formula-float">HA + H₂O ⇌ H₃O⁺ + A⁻</div>
      </div>
    </section>
    <section className="stats-strip">
      <div>
        <strong>06</strong>
        <span>
          {t('Modul berperingkat', 'Progressive modules')}
        </span>
      </div>
      <div>
        <strong>05</strong>
        <span>
          {t('Ruang simulasi', 'Simulation spaces')}
        </span>
      </div>
      <div>
        <strong>02</strong>
        <span>
          {t('Pilihan bahasa', 'Language options')}
        </span>
      </div>
      <div>
        <strong>∞</strong>
        <span>
          {t('Peluang untuk mencuba', 'Opportunities to explore')}
        </span>
      </div>
    </section>
    <section className="section">
      <div className="section-header">
        <div>
          <span className="eyebrow">
            {t('LALUAN PEMBELAJARAN', 'YOUR LEARNING PATH')}
          </span>
          <h2>
            {t('Satu langkah, satu penemuan.', 'One step. A new discovery.')}
          </h2>
          <p>
            {t('Bina kefahaman daripada asas hingga aplikasi.', 'Build understanding from foundations to applications.')}
          </p>
        </div>
        <button className="text-button" onClick={() => nav('modules')}>{t('Lihat semua modul', 'View all modules')} <ArrowRight size={17} /></button>
      </div>
      <div className="module-grid">
        {modules.slice(0, 3).map((m, i) => <ModuleCard key={m.id} m={m} index={i} page={page} progress={progress} lang={lang} nav={nav} tr={tr} t={t} />)}
      </div>
    </section>
    <section className="learning-banner">
      <div>
        <span className="eyebrow">
          {t('LEBIH DARIPADA MEMBACA', 'BEYOND READING')}
        </span>
        <h2>
          {t('Ramalkan. Teroka. Jelaskan.', 'Predict. Explore. Explain.')}
        </h2>
        <p>
          {t('Ubah pemboleh ubah, perhatikan respons sistem dan kaitkan pemerhatian dengan konsep. Kesilapan ialah ruang untuk memahami dengan lebih mendalam.', 'Change variables, observe a system’s response and connect observations to concepts. Mistakes create opportunities to understand more deeply.')}
        </p>
        <button className="primary" onClick={() => nav('lab')}>{t('Masuk ke makmal', 'Enter the lab')} <ArrowRight size={17} /></button>
      </div>
      <div className="method-cards">
        {[[Target, t('Ramalkan', 'Predict'), t('Aktifkan idea awal anda.', 'Activate your initial ideas.')], [FlaskConical, t('Teroka', 'Explore'), t('Uji idea melalui simulasi.', 'Test ideas through simulation.')], [BookOpen, t('Jelaskan', 'Explain'), t('Hubungkan bukti dan konsep.', 'Connect evidence and concepts.')]].map(([Icon, title, text], i) => <div key={title}>
          <span>0{i + 1}</span>
          <Icon size={22} />
          <b>
            {title}
          </b>
          <small>
            {text}
          </small>
        </div>)}
      </div>
    </section>
  </>;
}
