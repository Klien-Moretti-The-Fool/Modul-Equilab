// Paste an approved YouTube video URL between the quotes. No video is preselected.
// One shared video per module; labels are translated by the interface.
export const moduleVideos = {
  foundations: '',
  equilibrium: '',
  ionization: '',
  calculations: '',
  buffers: '',
  titration: ''
};
export function youtubeLink(value) {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.port) return null;
    const host = url.hostname.toLowerCase();
    let id;
    if (host === 'youtu.be') id = url.pathname.slice(1);else if (['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(host)) {
      id = url.pathname === '/watch' ? url.searchParams.get('v') : /^\/(?:shorts|embed)\/([^/]+)$/.exec(url.pathname)?.[1];
    }
    return /^[a-zA-Z0-9_-]{11}$/.test(id || '') ? 'https://www.youtube.com/watch?v=' + id : null;
  } catch {
    return null;
  }
}
