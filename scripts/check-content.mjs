import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import articles from '../src/data/articles.mjs';
function load(slug) {
  const article = articles.find((a) => a.slug === slug);
  const body = fs.readFileSync(
    `src/content/${article.subject}/${slug}.mdx`,
    'utf8',
  );
  const code = [...body.matchAll(/```js\n([\s\S]*?)```/g)]
    .map((m) => m[1])
    .join('\n');
  const scope = {};
  vm.runInNewContext(code, scope, { timeout: 1000 });
  return scope;
}
const normal = (value) => JSON.parse(JSON.stringify(value));
const indexed = JSON.parse(fs.readFileSync('src/data/articleIndex.json', 'utf8'));
for (const [slug, phrase] of [
  ['binary-search-invariants', 'number of occurrences'],
  ['merge-sort-and-stability', 'Count copying as well as comparisons'],
]) {
  assert.ok(indexed.find((a) => a.slug === slug)?.text.includes(phrase), `${slug}: search text was truncated`);
}

for (const a of articles) {
  assert.ok(a.quiz.answer >= 0 && a.quiz.answer < a.quiz.options.length);
  assert.ok(a.sources.length);
  assert.ok(a.sources.every((source) => source[1].startsWith('https://')));
  const body = fs.readFileSync(
    `src/content/${a.subject}/${a.slug}.mdx`,
    'utf8',
  );
  assert.ok(!/[“”]/.test(body), `${a.slug}: use straight double quotation marks`);
  assert.ok(body.includes('<details>'), `${a.slug}: worked practice missing`);
  assert.ok(body.length > 3000, `${a.slug}: article unexpectedly short`);
  const ids = [...body.matchAll(/\{#([^}]+)\}/g)].map((m) => m[1]);
  assert.equal(new Set(ids).size, ids.length);
}
const { lowerBound, findFirst } = load('binary-search-invariants');
for (let size = 0; size < 50; size++) {
  const a = Array.from({ length: size }, (_, i) => Math.floor(i / 3) * 2);
  for (let x = -2; x < 38; x++) {
    const expected = a.findIndex((v) => v >= x);
    assert.equal(lowerBound(a, x), expected === -1 ? a.length : expected);
    assert.equal(findFirst(a, x), a.indexOf(x));
  }
}
const { findPair, longestUniqueRun } = load('hash-maps-and-repeated-work');
assert.equal(findPair([9], 18), null);
assert.deepEqual(normal(findPair([9, 9], 18)), [0, 1]);
assert.deepEqual(normal(longestUniqueRun(['a', 'b', 'b', 'a'])), {
  start: 0,
  length: 2,
});
assert.equal(longestUniqueRun([]).length, 0);
const { shortestPath } = load('breadth-first-search');
const graph = new Map([
  ['a', ['b', 'c']],
  ['b', ['d']],
  ['c', ['d']],
  ['d', ['a']],
]);
assert.deepEqual(normal(shortestPath(graph, 'a', 'd')), ['a', 'b', 'd']);
assert.deepEqual(normal(shortestPath(graph, 'a', 'a')), ['a']);
assert.equal(shortestPath(graph, 'a', 'missing'), null);
const { minimumCoins } = load('dynamic-programming-state');
assert.equal(minimumCoins([1, 3, 4], 6).count, 2);
assert.equal(minimumCoins([4, 6], 5), null);
assert.deepEqual(normal(minimumCoins([], 0)), { count: 0, coins: [] });
for (let amount = 0; amount < 30; amount++) {
  const result = minimumCoins([1, 3, 4], amount);
  assert.equal(
    result.coins.reduce((sum, c) => sum + c, 0),
    amount,
  );
  let frontier = new Set([0]);
  let distance = 0;
  while (!frontier.has(amount)) {
    const next = new Set();
    for (const value of frontier)
      for (const coin of [1, 3, 4])
        if (value + coin <= amount) next.add(value + coin);
    frontier = next;
    distance++;
  }
  assert.equal(result.count, distance);
}
const { intersectionSorted } = load('complexity-and-cost-models');
assert.deepEqual(
  normal(intersectionSorted([1, 2, 2, 5], [2, 2, 3, 5])),
  [2, 2, 5],
);
const { buildPrefix, rangeSum } = load('arrays-prefix-sums');
const prefix = buildPrefix([4, 2, 7, 1]);
assert.equal(rangeSum(prefix, 1, 3), 9);
assert.equal(rangeSum(prefix, 2, 2), 0);
assert.throws(() => rangeSum(prefix, 3, 2));
const { reverseList } = load('linked-lists-and-ownership');
const c = { value: 'c', next: null },
  b = { value: 'b', next: c },
  a = { value: 'a', next: b };
assert.equal(reverseList(a), c);
assert.equal(c.next, b);
assert.equal(b.next, a);
assert.equal(a.next, null);
assert.equal(reverseList(c), a);
assert.equal(reverseList(null), null);
const { balancedDelimiters } = load('stacks-queues-and-order');
for (const [input, expected] of [
  ['', true],
  ['([{}])', true],
  ['([)]', false],
  ['(', false],
  [')', false],
  ['hello', true],
])
  assert.equal(balancedDelimiters(input), expected);
const { mergeSort } = load('merge-sort-and-stability');
const records = [
  { id: 'a', key: 2 },
  { id: 'b', key: 1 },
  { id: 'c', key: 2 },
  { id: 'd', key: 1 },
];
assert.deepEqual(
  normal(mergeSort(records, (a, b) => a.key - b.key).map((v) => v.id)),
  ['b', 'd', 'a', 'c'],
);
assert.deepEqual(
  records.map((v) => v.id),
  ['a', 'b', 'c', 'd'],
);
for (let size = 0; size < 40; size++) {
  const values = Array.from({ length: size }, (_, i) => ((i * 17) % 13) - 5);
  assert.deepEqual(
    normal(mergeSort(values)),
    values.slice().sort((a, b) => a - b),
  );
}
const { subsets } = load('recursion-and-backtracking');
const selections = subsets([1, 2, 3]);
assert.equal(selections.length, 8);
assert.equal(new Set(selections.map((v) => v.join(','))).size, 8);
assert.deepEqual(normal(subsets([])), [[]]);
const { findInTree, validSearchTree } = load('trees-and-search-order');
const tree = {
  key: 10,
  left: { key: 5, left: null, right: null },
  right: { key: 18, left: null, right: null },
};
assert.equal(validSearchTree(tree), true);
assert.equal(findInTree(tree, 5), tree.left);
assert.equal(findInTree(tree, 99), null);
tree.right.left = { key: 7, left: null, right: null };
assert.equal(validSearchTree(tree), false);
const { topologicalOrder } = load('dependencies-and-topological-order');
const vertices = ['parse', 'check', 'optimise', 'bundle'];
const edges = [
  ['parse', 'check'],
  ['parse', 'optimise'],
  ['check', 'bundle'],
  ['optimise', 'bundle'],
];
const order = topologicalOrder(vertices, edges);
for (const [u, v] of edges) assert.ok(order.indexOf(u) < order.indexOf(v));
assert.equal(topologicalOrder(vertices, [...edges, ['bundle', 'parse']]), null);
assert.deepEqual(normal(topologicalOrder([], [])), []);
const { fullJitterDelay } = load('deadlines-retries-backoff');
assert.equal(
  fullJitterDelay(0, 100, 500, () => 0.5),
  50,
);
assert.equal(
  fullJitterDelay(6, 100, 500, () => 0.5),
  250,
);
assert.equal(articles.filter((a) => a.subject === 'dsa').length, 12);
assert.equal(articles.filter((a) => a.subject === 'system-design').length, 8);
assert.equal(
  articles.filter((a) => a.subject === 'ai-native-engineering').length,
  8,
);
console.log(
  'Content verified: 28 complete guides, 28 answer checks, source metadata, boundary tests, and independently checked algorithm examples.',
);
