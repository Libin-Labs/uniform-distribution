import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('analytic fixture', () => {
  assert.ok(Math.abs(api.uniformCdf(3, 2, 6) - 0.25) < 1e-12);
});
test('density and outside', () => {
  assert.equal(api.uniformPdf(3, 2, 6), 0.25);
  assert.equal(api.uniformPdf(1, 2, 6), 0);
});
test('endpoints', () => {
  assert.equal(api.uniformCdf(2, 2, 6), 0);
  assert.equal(api.uniformCdf(6, 2, 6), 1);
});
test('quantile inverse', () => {
  for (let i = 0; i <= 100; i++) {
    const p = i / 100;
    assert.ok(Math.abs(api.uniformCdf(api.uniformQuantile(p, -3, 7), -3, 7) - p) < 1e-14);
  }
});
test('invalid interval', () => {
  assert.throws(() => api.uniformPdf(1, 2, 2));
  assert.throws(() => api.uniformQuantile(2, 0, 1));
});
test('type contract', () => {
  assert.throws(() => api.uniformCdf('3', 2, 6));
});
