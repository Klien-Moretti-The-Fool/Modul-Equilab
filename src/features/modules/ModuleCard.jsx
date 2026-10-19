import { completedNotes } from "../../lib/learningProgress.js";
import IllustratedModuleCard from "./IllustratedModuleCard.jsx";
import { ArrowRight } from "lucide-react";
import { icons } from "../../lib/appShared.js";
export default function ModuleCard({
  m,
  index,
  page,
  progress,
  lang,
  nav,
  tr,
  t
}) {
  if (page === 'modules') return <IllustratedModuleCard m={m} index={index} count={completedNotes(progress[m.id]?.steps)} lang={lang} onOpen={() => nav('learn/' + m.id)} />;
  const Icon = icons[m.icon],
    count = completedNotes(progress[m.id]?.steps);
  return <button className={'module-card ' + m.color} onClick={() => nav('learn/' + m.id)}>
    <div className="module-card-top">
      <span className="module-icon">
        <Icon size={25} />
      </span>
      <span className="module-number">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
    <h3>
      {tr(m.title)}
    </h3>
    <p>
      {tr(m.subtitle)}
    </p>
    <div className="module-cta">{t('Teruskan pembelajaran', 'Continue learning')} <ArrowRight size={16} /></div>
    <div className="thin-progress">
      <i style={{
        width: count / 4 * 100 + '%'
      }} />
    </div>
  </button>;
}
