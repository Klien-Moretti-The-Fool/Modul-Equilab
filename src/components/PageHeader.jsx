import { BookOpen } from "lucide-react";
import "../styles/guide.css";
export function GuideButton({
  lang,
  onOpen,
  moduleGuide = false
}) {
  return <button className={'secondary page-guide' + (moduleGuide ? ' module-guide' : '')} onClick={onOpen}>
    <BookOpen size={18} />
    <span>
      {lang === 'ms' ? 'Panduan & rujukan' : 'Guide & references'}
    </span>
  </button>;
}
export default function PageHeader({
  lang,
  onGuide,
  eyebrow,
  title,
  description,
  className = ''
}) {
  return <div className={'page-top ' + className}>
    <div className="page-heading">
      <span className="eyebrow">
        {eyebrow}
      </span>
      <h1>
        {title}
      </h1>
      {description && <p>
        {description}
      </p>}
    </div>
    <GuideButton lang={lang} onOpen={onGuide} moduleGuide={className.includes('module-page-top')} />
  </div>;
}
