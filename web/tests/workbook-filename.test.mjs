import assert from 'node:assert/strict';
import test from 'node:test';
import { buildWorkbookFilename } from '../lib/workbook-filename.ts';

test('workbook filename preserves ordinary slug names', () => {
  assert.equal(buildWorkbookFilename('Team Build'), 'team-build.xlsx');
  assert.equal(buildWorkbookFilename('Alpha ###'), 'alpha.xlsx');
  assert.equal(buildWorkbookFilename('Équipe A'), 'equipe-a.xlsx');
});

test('non-Latin or punctuation-only names use a meaningful fallback', () => {
  for (const name of ['', ' --- ', 'नमस्ते', '测试', '< >']) {
    assert.equal(buildWorkbookFilename(name), 'team-build.xlsx');
  }
});
