function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function bounds(low: number, high: number): number {
  finite(low, -1e100, 1e100);
  finite(high, -1e100, 1e100);
  const w = high - low;
  if (w < 1e-12) throw new RangeError('Positive resolvable interval required');
  return w;
}
export function uniformPdf(x: number, low: number, high: number): number {
  const w = bounds(low, high);
  finite(x, -1e100, 1e100);
  return x < low || x > high ? 0 : 1 / w;
}
export function uniformCdf(x: number, low: number, high: number): number {
  const w = bounds(low, high);
  finite(x, -1e100, 1e100);
  return x <= low ? 0 : x >= high ? 1 : (x - low) / w;
}
export function uniformQuantile(p: number, low: number, high: number): number {
  const w = bounds(low, high);
  finite(p, 0, 1);
  return p === 0 ? low : p === 1 ? high : low + p * w;
}
