import assert from 'node:assert/strict';
import { searchValues, traceBinarySearch } from '../src/utils/binarySearch.mjs';

const cases = [[], [7], [2, 2, 2, 4, 9], [-12, -3, 0, 6, 19], searchValues];
let searches = 0;
for (const values of cases) {
  for (let target = -15; target <= 100; target += 1) {
    const trace = traceBinarySearch(values, target);
    const result = trace.at(-1);
    assert.equal(result.done, true);
    assert.equal(result.found, values.includes(target));
    if (result.found) assert.equal(values[result.mid], target);
    assert.ok(
      result.comparisons <=
        (values.length ? Math.floor(Math.log2(values.length)) + 1 : 0),
    );
    for (let step = 1; step < trace.length; step += 1) {
      const previous = trace[step - 1];
      const current = trace[step];
      assert.ok(current.mid >= previous.low && current.mid <= previous.high);
      assert.equal(current.comparisons, step);
      assert.ok(current.low >= previous.low && current.high <= previous.high);
      if (!current.found)
        assert.ok(current.high - current.low < previous.high - previous.low);
      if (values.includes(target) && !current.done)
        assert.ok(values.slice(current.low, current.high + 1).includes(target));
    }
    searches += 1;
  }
}
assert.equal(traceBinarySearch(searchValues, 37).at(-1).comparisons, 3);
assert.equal(traceBinarySearch(searchValues, 20).at(-1).comparisons, 4);
console.log(
  `Workbench verified: ${searches} searches, including missing targets, duplicates, negatives, and empty arrays.`,
);
