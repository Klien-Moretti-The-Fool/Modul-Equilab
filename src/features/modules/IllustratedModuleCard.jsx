import { ArrowRight, Check } from "lucide-react";
import "../../styles/module-gallery.css";
export default function IllustratedModuleCard({
  m,
  index,
  count,
  lang,
  onOpen
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en;
  const completed = Math.min(4, Math.max(0, count)),
    percent = completed * 25;
  return <button className={'illustrated-module module-art-' + m.id} onClick={onOpen} aria-label={m.title[lang] + ', ' + percent + '% ' + t('selesai', 'complete')}>
  <span className="module-cover">
      <img src={import.meta.env.BASE_URL + 'module-art/' + m.id + '.png'} alt="" width="1672" height="941" loading="eager" decoding="async" />
      <span className="module-index">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span className={'module-cover-progress ' + (completed === 4 ? 'is-complete' : '')} aria-hidden="true">
        {completed === 4 && <Check size={14} />}
        <span>{percent}%</span>
      </span>
    </span>
  <span className="module-copy">
      <span className="module-title">
        {m.title[lang]}
      </span>
      <span className="module-description">
        {m.subtitle[lang]}
      </span>
      <span className="module-action">
        {completed === 4 ? t('Ulang kaji modul', 'Review module') : count ? t('Teruskan pembelajaran', 'Continue learning') : t('Mulakan pembelajaran', 'Start learning')}
        <ArrowRight size={17} />
      </span>
      <span className="module-progress" role="progressbar" aria-label={t('Kemajuan modul', 'Module progress')} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <span style={{
          width: percent + '%'
        }} />
      </span>
    </span>
 </button>;
}
