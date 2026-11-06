import { uniformCdf } from '@lp-labs/uniform-distribution';
if (Math.abs(uniformCdf(3, 2, 6) - 0.25) > 1e-12) throw new Error('Distribution');
// @ts-expect-error invalid argument must be rejected by declarations
uniformCdf('3', 2, 6);
