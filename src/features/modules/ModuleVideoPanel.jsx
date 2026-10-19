import { useState } from "react";
import { Play, ExternalLink, Lightbulb, ArrowRight } from "lucide-react";
import { videosForModule as resolveVideos } from "../../data/videoLibrary.js";
import overrides from "../../data/videoOverrides.json";
import "../../styles/module-videos.css";
const videosForModule = id => resolveVideos(id, overrides);
export function VideoCard({
  video,
  moduleId,
  lang,
  compact = false
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en,
    tr = x => x[lang];
  const [failed, setFailed] = useState(false),
    local = import.meta.env.BASE_URL + 'module-art/' + moduleId + '.png';
  return <article className={'module-video-card' + (compact ? ' compact' : '')}>
  <a className="module-video-preview" href={video.url} target="_blank" rel="noopener noreferrer" aria-label={tr(video.title) + t(' — buka YouTube dalam tab baharu', ' — open YouTube in a new tab')}>
   <img src={failed ? local : 'https://i.ytimg.com/vi/' + video.id + '/hqdefault.jpg'} onError={() => setFailed(true)} alt="" loading="lazy" width="480" height="270" />
   <span className="module-video-play">
        <Play size={26} fill="currentColor" aria-hidden="true" />
      </span>
   <span className="module-video-image-label">
        {failed ? t('Ilustrasi topik', 'Topic illustration') : 'YouTube'}
      </span>
  </a>
  <div className="module-video-copy"><span className="module-video-kicker">
        {t('VIDEO PENERANGAN', 'VIDEO EXPLANATION')}
      </span><h3>
        {tr(video.title)}
      </h3><p>
        {tr(video.summary)}
      </p>
   <div className="module-video-meta">
        <span>
          {video.custom ? t('Pilihan pengurus modul', 'Module owner’s selection') : video.channel}
        </span>
        <span>
          {tr(video.language)}
        </span>
      </div>
   <a className="module-video-button" href={video.url} target="_blank" rel="noopener noreferrer">
        <Play size={17} fill="currentColor" />
        {t('Tonton di YouTube', 'Watch on YouTube')}
        <ExternalLink size={16} />
        <span className="sr-only">
          {t('(tab baharu)', '(new tab)')}
        </span>
      </a>
  </div>
  <div className="module-video-observe">
      <Lightbulb size={20} />
      <p>
        <b>
          {t('Fokus semasa menonton', 'Focus while watching')}
        </b>
        {tr(video.observe)}
      </p>
    </div>
 </article>;
}
export default function ModuleVideos({
  moduleId,
  step,
  lang
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en,
    list = videosForModule(moduleId);
  if (!list.length) return null;
  const featured = list.find(v => v.step === step),
    others = list.filter(v => v !== featured);
  return <section id="module-videos" className="module-videos" aria-label={t('Video penerangan modul', 'Module explanation videos')}>
  {featured && <VideoCard key={featured.id} video={featured} moduleId={moduleId} lang={lang} />}
  {others.length > 0 && <details className="module-video-more">
      <summary>
        <span>
          <Play size={18} />
          {featured ? t('Video tambahan untuk modul ini', 'More videos for this module') : t('Video penerangan modul ini', 'Explanation videos for this module')}
        </span>
        <small>{others.length} {t('video', 'video' + (others.length > 1 ? 's' : ''))}</small>
      </summary>
      <div>
        {others.map(v => <VideoCard key={v.id} video={v} moduleId={moduleId} lang={lang} compact />)}
      </div>
    </details>}
  <p className="module-video-note">
      {t('Video ialah bahan sokongan dan dibuka dalam tab baharu. Teruskan nota serta simulasi mengikut rentak anda.', 'Videos are supporting resources and open in a new tab. Continue the notes and simulations at your own pace.')}
    </p>
 </section>;
}
export function VideoReferenceList({
  modules,
  lang,
  nav
}) {
  const t = (ms, en) => lang === 'ms' ? ms : en,
    tr = x => x[lang];
  return <div className="video-reference-list">
    {modules.map((m, i) => {
      const list = videosForModule(m.id);
      return <details key={m.id} className="video-reference-group">
      <summary>
        <span className="video-reference-number">0{i + 1}</span>
        <span>
          {tr(m.title)}
          <small>{list.length} {t('video sokongan', 'supporting video' + (list.length > 1 ? 's' : ''))}</small>
        </span>
      </summary>
      <div>
        {list.length ? list.map(v => <article key={v.id} className="video-reference-row">
          <div>
            <h3>
              {tr(v.title)}
            </h3>
            <p>
              {tr(v.summary)}
            </p>
            <p className="video-reference-source">{v.custom ? t('Pautan pilihan pengurus modul', 'Module owner’s selected link') : v.channel + ' · ' + v.original} · {tr(v.language)}</p>
            <div className="video-reference-actions">
              <a href={v.url} target="_blank" rel="noopener noreferrer">
                {t('Tonton di YouTube', 'Watch on YouTube')}
                <ExternalLink size={15} />
              </a>
              <button onClick={() => nav('learn/' + m.id + '/' + v.step)}>
                {t('Buka nota berkaitan', 'Open related notes')}
                <ArrowRight size={15} />
              </button>
              {!v.custom && v.sourceUrl !== v.url && <a href={v.sourceUrl} target="_blank" rel="noopener noreferrer">
                {t('Halaman sumber', 'Source lesson')}
                <ExternalLink size={15} />
              </a>}
            </div>
          </div>
        </article>) : <p>
          {t('Tiada video disediakan.', 'No video provided.')}
        </p>}
      </div>
    </details>;
    })}
  </div>;
}
