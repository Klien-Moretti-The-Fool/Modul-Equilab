import test from "node:test";
import assert from "node:assert/strict";
import { completedNotes, nextNoteStep } from "../src/lib/learningProgress.js";
import { youtubeLink } from "../src/data/legacyVideoLinks.js";
test('Legacy lab completion is ignored while quiz completion and note IDs remain valid', () => {
  assert.equal(completedNotes([0, 1, 2, 3, 4]), 4);
  assert.equal(completedNotes([0, 1, 2, 3]), 3);
  assert.equal(nextNoteStep([0, 1, 2, 3]), 4);
  assert.equal(completedNotes([3]), 0);
  assert.equal(nextNoteStep([3]), 0);
  assert.equal(completedNotes([0, 0, 4, 99]), 2);
  assert.equal(completedNotes(undefined), 0);
});
test('YouTube buttons accept video links and reject unrelated or malformed addresses', () => {
  const id = 'dQw4w9WgXcQ',
    expected = 'https://www.youtube.com/watch?v=' + id;
  for (const url of ['https://youtu.be/' + id, 'https://www.youtube.com/watch?v=' + id + '&t=30', 'https://m.youtube.com/shorts/' + id, 'https://youtube.com/embed/' + id]) assert.equal(youtubeLink(url), expected);
  for (const url of ['', 'https://youtube.com/', 'https://youtube.com/watch?v=short', 'http://youtu.be/' + id, 'https://youtube.com.evil.test/watch?v=' + id, 'javascript:alert(1)', 'https://user:pass@youtube.com/watch?v=' + id, 'https://youtube.com:444/watch?v=' + id]) assert.equal(youtubeLink(url), null);
});
