import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { videoLibrary, videosForModule } from "../src/data/videoLibrary.js";
import { youtubeLink } from "../src/data/legacyVideoLinks.js";
test('Six modules have twelve unique video sources and complete bilingual learning prompts', () => {
  const videos = Object.values(videoLibrary).flat();
  assert.equal(Object.keys(videoLibrary).length, 6);
  assert.equal(videos.length, 12);
  assert.equal(new Set(videos.map(v => v.id)).size, 12);
  for (const v of videos) {
    assert.equal(youtubeLink(v.url), v.url);
    assert.ok(v.step >= 0 && v.step < 3);
    assert.equal(new URL(v.sourceUrl).protocol, 'https:');
    for (const lang of ['ms', 'en']) for (const field of ['title', 'summary', 'observe', 'language']) assert.ok(v[field][lang]);
  }
});
test('Legacy choices survive; overrides, default reset, hiding and invalid links resolve safely', () => {
  const custom = 'https://youtu.be/abcdefghijk?si=share';
  assert.equal(videosForModule('foundations', {}, {})[0].id, '4441EyWBPt8');
  const old = videosForModule('foundations', {}, {
    foundations: custom
  });
  assert.equal(old[0].url, 'https://www.youtube.com/watch?v=abcdefghijk');
  assert.equal(old[0].custom, true);
  assert.equal(old[0].channel, '');
  assert.equal(videosForModule('foundations', {
    foundations: videoLibrary.foundations[0].url
  }, {
    foundations: custom
  })[0].custom, undefined);
  for (const value of [null, '', 'javascript:alert(1)', 'https://youtube.com.evil.test/watch?v=abcdefghijk']) assert.equal(videosForModule('foundations', {
    foundations: value
  }, {}).length, 1);
  assert.equal(videosForModule('foundations', {
    foundations: videoLibrary.foundations[1].url
  }, {}).length, 1);
  assert.deepEqual(videosForModule('unknown'), []);
});
test('Terminal editor preserves other modules, backs up, rejects bad input and restores defaults', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'equilab-video-test-'));
  try {
    fs.mkdirSync(path.join(tmp, 'src/data'), {
      recursive: true
    });
    for (const file of ['legacyVideoLinks.js', 'videoLibrary.js']) fs.copyFileSync(path.join(root, 'src/data', file), path.join(tmp, 'src/data', file));
    fs.copyFileSync(path.join(root, 'set-video.mjs'), path.join(tmp, 'set-video.mjs'));
    fs.writeFileSync(path.join(tmp, 'package.json'), '{"type":"module"}');
    const target = path.join(tmp, "src/data/videoOverrides.json");
    fs.writeFileSync(target, JSON.stringify({
      buffers: 'https://www.youtube.com/watch?v=tZH6zvQ8Wl8'
    }));
    const run = (...args) => spawnSync(process.execPath, [path.join(tmp, 'set-video.mjs'), ...args], {
      encoding: 'utf8'
    });
    const before = fs.readFileSync(target, 'utf8');
    assert.notEqual(run('foundations', 'javascript:alert(1)').status, 0);
    assert.equal(fs.readFileSync(target, 'utf8'), before);
    assert.equal(run('foundations', 'https://youtu.be/4441EyWBPt8?si=share').status, 0);
    let saved = JSON.parse(fs.readFileSync(target));
    assert.equal(saved.buffers, 'https://www.youtube.com/watch?v=tZH6zvQ8Wl8');
    assert.equal(saved.foundations, videoLibrary.foundations[0].url);
    assert.ok(fs.readdirSync(path.dirname(target)).some(f => f.startsWith('videoOverrides.json.backup-')));
    assert.equal(run('foundations', '--clear').status, 0);
    assert.equal(JSON.parse(fs.readFileSync(target)).foundations, null);
    assert.equal(run('foundations', '--default').status, 0);
    assert.equal(JSON.parse(fs.readFileSync(target)).foundations, videoLibrary.foundations[0].url);
    assert.equal(run('foundations', '--reset').status, 0);
    assert.equal(Object.hasOwn(JSON.parse(fs.readFileSync(target)), 'foundations'), false);
  } finally {
    fs.rmSync(tmp, {
      recursive: true,
      force: true
    });
  }
});
