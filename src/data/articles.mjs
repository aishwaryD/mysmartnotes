import extra from './dsa-extra.mjs';
import expanded from './expanded.mjs';
const articles = [
  {
    slug: 'binary-search-invariants',
    subject: 'dsa',
    order: 1,
    title: 'Binary search: boundaries and invariants',
    summary:
      'Find boundaries, handle duplicates, and understand why every discarded value can safely stay discarded.',
    level: 'Foundation',
    tags: ['Binary search', 'Invariants', 'Complexity'],
    outcome:
      'Write and explain a lower-bound search without guessing its edge cases.',
    quiz: {
      question: 'What should lowerBound([2, 4, 4, 9], 4) return?',
      options: [
        '0: start from the beginning',
        '1: the first position whose value is at least 4',
        '2: any matching position is a lower bound',
      ],
      answer: 1,
      explanation:
        'Lower bound finds the first value greater than or equal to the target. Index 1 is the boundary; returning index 2 would skip an equal value.',
    },
    sources: [
      [
        'Binary search: invariants and boundaries',
        'https://cp-algorithms.com/num_methods/binary_search.html',
      ],
    ],
  },
  {
    slug: 'hash-maps-and-repeated-work',
    subject: 'dsa',
    order: 2,
    title: 'Hash maps and sliding windows',
    summary:
      'Use a hash map to remember useful facts, then build a sliding window that handles repeated values correctly.',
    level: 'Foundation',
    tags: ['Hash maps', 'Arrays', 'Sliding windows'],
    outcome: 'Recognise when remembering a small fact removes a repeated scan.',
    quiz: {
      question:
        'In a duplicate-free window, why use Math.max(left, lastSeen + 1)?',
      options: [
        'To keep the left boundary from moving backwards',
        'To move the boundary to the most recent match even when it is outside the window',
        'To guarantee every Map operation is constant time',
      ],
      answer: 0,
      explanation:
        'The previous occurrence might already be outside the window. Moving left backwards would reintroduce values you had correctly excluded.',
    },
    sources: [
      [
        'ECMAScript: Map objects and access-time requirements',
        'https://tc39.es/ecma262/multipage/keyed-collections.html#sec-map-objects',
      ],
    ],
  },
  {
    slug: 'breadth-first-search',
    subject: 'dsa',
    order: 3,
    title: 'Breadth-first search and shortest paths',
    summary:
      'Use a queue to find the fewest-hop route, reconstruct the path, and see exactly when BFS stops being enough.',
    level: 'Foundation',
    tags: ['Graphs', 'BFS', 'Queues', 'Trees'],
    outcome:
      'Find a shortest path in an unweighted graph and explain the queue invariant.',
    quiz: {
      question: 'When should a vertex be marked as discovered?',
      options: [
        'Only after all of its neighbours finish',
        'When it is added to the queue',
        'Every time another edge reaches it',
      ],
      answer: 1,
      explanation:
        'Marking on enqueue prevents several parents from adding the same vertex before its first turn. The queue then contains each discovered vertex once.',
    },
    sources: [
      [
        'Breadth-first search: shortest paths and reconstruction',
        'https://cp-algorithms.com/graph/breadth-first-search.html',
      ],
    ],
  },
  {
    slug: 'dynamic-programming-state',
    subject: 'dsa',
    order: 4,
    title: 'Dynamic programming: states and transitions',
    summary:
      'Define a useful state, derive a recurrence, and recover an optimal solution rather than just its score.',
    level: 'Intermediate',
    tags: ['Dynamic programming', 'DP', 'Recursion', 'State', 'Coin change'],
    outcome:
      'Turn repeated subproblems into a table whose entries have a precise meaning.',
    quiz: {
      question:
        'For unlimited coins [1, 3, 4], how many coins make 6 optimally?',
      options: [
        '3: choose 4, then 1, then 1',
        '2: choose 3 and 3',
        '6: choose only 1s',
      ],
      answer: 1,
      explanation:
        'The locally largest coin gives three coins, while two 3s are optimal. This is why a greedy choice needs a proof rather than intuition.',
    },
    sources: [
      [
        'Introduction to dynamic programming',
        'https://cp-algorithms.com/dynamic_programming/intro-to-dp.html',
      ],
      [
        'MIT 6.006: dynamic programming and shortest paths',
        'https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/lecture-19-dynamic-programming-i-fibonacci-shortest-paths/',
      ],
    ],
  },
  {
    slug: 'request-latency',
    subject: 'system-design',
    order: 1,
    title: 'Request latency and critical paths',
    summary:
      'Trace a request, separate service time from waiting, and build a latency budget you can actually investigate.',
    level: 'Foundation',
    tags: ['Latency', 'Throughput', 'Tracing', 'Capacity'],
    outcome:
      'Explain the critical path of a request and choose measurements that reveal its bottleneck.',
    quiz: {
      question:
        'Two independent reads take 80 ms and 120 ms. Ignoring overhead, how long do they add when run in parallel?',
      options: ['200 ms', '120 ms', '80 ms: the first completed read determines the response time'],
      answer: 1,
      explanation:
        'For these two particular observations, completion waits for the slower read. A percentile of the combined distribution requires measurements; you cannot obtain it by adding percentiles.',
    },
    sources: [
      [
        'Google SRE: monitoring distributed systems',
        'https://sre.google/sre-book/monitoring-distributed-systems/',
      ],
      [
        'Google SRE: handling overload',
        'https://sre.google/sre-book/handling-overload/',
      ],
    ],
  },
  {
    slug: 'indexes-and-cache-consistency',
    subject: 'system-design',
    order: 2,
    title: 'Database indexes and cache consistency',
    summary:
      'Design an index around a real query, read its plan, and reason through the stale-data race a cache introduces.',
    level: 'Intermediate',
    tags: ['PostgreSQL', 'Indexes', 'Caching', 'SQL'],
    outcome:
      'Choose an access path and describe the freshness contract of the cache in front of it.',
    quiz: {
      question:
        'Does a 60-second TTL guarantee a cached record is never more than 60 seconds behind the latest committed value?',
      options: [
        'Yes, regardless of races',
        'No: an old read can repopulate the cache after a newer write',
        'Yes, provided the TTL starts when the stale read fills the cache',
      ],
      answer: 1,
      explanation:
        'A reader can fetch an old value, pause, and insert it after the writer commits and invalidates the key. TTL bounds the life of that entry after insertion, not the age of its underlying observation.',
    },
    sources: [
      [
        'PostgreSQL: multicolumn indexes',
        'https://www.postgresql.org/docs/18/indexes-multicolumn.html',
      ],
      [
        'PostgreSQL: using EXPLAIN',
        'https://www.postgresql.org/docs/18/using-explain.html',
      ],
      [
        'Microsoft: the cache-aside pattern',
        'https://learn.microsoft.com/en-us/azure/architecture/patterns/cache-aside',
      ],
    ],
  },
  {
    slug: 'queues-and-idempotency',
    subject: 'system-design',
    order: 3,
    title: 'Queues, duplicate delivery and idempotency',
    summary:
      'Walk through a worker crash, a duplicate delivery, and the database boundary that makes a repeated operation safe.',
    level: 'Intermediate',
    tags: ['Queues', 'Idempotency', 'Transactions', 'Outbox'],
    outcome:
      'Separate delivery guarantees from business effects and handle retries across the right boundary.',
    quiz: {
      question:
        'A worker commits its database update, then crashes before acknowledging the message. What must its replacement be ready for?',
      options: [
        'The message can be delivered again',
        'The broker must undo the database commit',
        'The update never happened',
      ],
      answer: 0,
      explanation:
        'The broker has not received the acknowledgement. Redelivery is normal; the consumer must recognise the operation and avoid applying the same business effect again.',
    },
    sources: [
      [
        'RabbitMQ: consumer acknowledgements and publisher confirms',
        'https://www.rabbitmq.com/docs/confirms',
      ],
      [
        'AWS: transactional outbox pattern',
        'https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/transactional-outbox.html',
      ],
      [
        'PostgreSQL: transaction isolation',
        'https://www.postgresql.org/docs/18/transaction-iso.html',
      ],
    ],
  },
  {
    slug: 'deadlines-retries-backoff',
    subject: 'system-design',
    order: 4,
    title: 'Timeouts, retries and exponential backoff',
    summary:
      'Make deadlines, retry limits, idempotency and jitter work together without turning a slow dependency into a larger outage.',
    level: 'Intermediate',
    tags: ['Retries', 'Deadlines', 'Backoff', 'Reliability'],
    outcome:
      'Write a retry policy that fits the caller’s remaining time and the operation’s semantics.',
    quiz: {
      question:
        'Three layers each allow three total attempts. What is the worst-case number of calls to the deepest dependency for one original request?',
      options: ['3', '9', '27'],
      answer: 2,
      explanation:
        'Attempts multiply across independently retrying layers: 3 × 3 × 3. This is why retry ownership and a shared deadline matter.',
    },
    sources: [
      [
        'Amazon Builders’ Library: timeouts, retries and jitter',
        'https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/',
      ],
      [
        'AWS: retry with backoff pattern',
        'https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html',
      ],
    ],
  },
  {
    slug: 'context-as-a-contract',
    subject: 'ai-native-engineering',
    order: 1,
    title: 'Context and output contracts for AI features',
    summary:
      'Define the task, evidence, boundaries and output contract before spending time on clever prompt wording.',
    level: 'Foundation',
    tags: ['Context', 'Prompts', 'Schemas', 'Grounding'],
    outcome:
      'Build a small, testable input contract for a model-assisted task.',
    quiz: {
      question:
        'An answer is valid JSON and includes a source ID. What does that prove?',
      options: [
        'Its factual claims are correct',
        'Only that it meets those structural checks',
        'That retrieval found the right document',
      ],
      answer: 1,
      explanation:
        'Structure, source existence and claim support are separate checks. A perfectly shaped answer can still cite an irrelevant passage or invent a claim.',
    },
    sources: [
      [
        'Anthropic: effective context engineering',
        'https://www.anthropic.com/research/effective-context-engineering-for-ai-agents',
      ],
      [
        'JSON Schema: objects and required properties',
        'https://json-schema.org/understanding-json-schema/reference/object',
      ],
    ],
  },
  {
    slug: 'retrieval-and-evidence',
    subject: 'ai-native-engineering',
    order: 2,
    title: 'Retrieval, evidence and source citations',
    summary:
      'Build an evidence path from a user’s question to an answer, including permissions, missing information and honest citations.',
    level: 'Intermediate',
    tags: ['RAG', 'Retrieval', 'Evidence', 'Search'],
    outcome:
      'Diagnose retrieval failures separately from answer-generation failures.',
    quiz: {
      question:
        'The right document is absent from the retrieved passages. What should you investigate first?',
      options: [
        'The final answer’s tone',
        'Retrieval, filters and document coverage',
        'A longer output limit',
      ],
      answer: 1,
      explanation:
        'The generator cannot faithfully cite evidence it never received. Check the corpus, access filters, candidate retrieval and reranking before editing the answer prompt.',
    },
    sources: [
      [
        'Lewis et al.: retrieval-augmented generation',
        'https://arxiv.org/abs/2005.11401',
      ],
      ['Liu et al.: Lost in the Middle', 'https://arxiv.org/abs/2307.03172'],
      [
        'OWASP: prompt injection',
        'https://genai.owasp.org/llmrisk/llm01-prompt-injection/',
      ],
    ],
  },
  {
    slug: 'workflows-and-agents',
    subject: 'ai-native-engineering',
    order: 3,
    title: 'Choosing between workflows and agents',
    summary:
      'Choose between a fixed flow and a model-directed loop, then bound tools, side effects and stopping conditions.',
    level: 'Intermediate',
    tags: ['Agents', 'Workflows', 'Tools', 'Permissions'],
    outcome:
      'Identify which decisions belong in code and which genuinely need model-directed exploration.',
    quiz: {
      question:
        'A model asks to send an email after reading an instruction inside a retrieved document. What authorises the send?',
      options: [
        'The document’s instruction',
        'The model’s confidence',
        'The application’s trusted user intent and permission checks',
      ],
      answer: 2,
      explanation:
        'Retrieved material is evidence, not authority. The application must enforce permissions and confirmation requirements independently of model output.',
    },
    sources: [
      [
        'Anthropic: building effective agents',
        'https://www.anthropic.com/research/building-effective-agents',
      ],
      [
        'OWASP: excessive agency',
        'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/',
      ],
    ],
  },
  {
    slug: 'evaluations-that-catch-failures',
    subject: 'ai-native-engineering',
    order: 4,
    title: 'Building useful AI evaluations',
    summary:
      'Turn a polished demo into a repeatable evaluation with useful failure slices, grounded grading and a real release decision.',
    level: 'Intermediate',
    tags: ['Evaluations', 'Testing', 'Quality', 'Datasets'],
    outcome:
      'Design an evaluation that detects important regressions instead of rewarding an attractive average.',
    quiz: {
      question:
        'A new version improves the overall pass rate but fails every permission-boundary case. Is the average enough to approve it?',
      options: [
        'Yes: the average improved',
        'No: important failure slices need their own release criteria',
        'Yes, if permission cases are rare in the combined test set',
      ],
      answer: 1,
      explanation:
        'A small but critical slice can disappear inside an average. Define non-negotiable checks before looking at the aggregate score.',
    },
    sources: [
      [
        'Anthropic: demystifying evals for AI agents',
        'https://www.anthropic.com/research/demystifying-evals-for-ai-agents',
      ],
      [
        'OWASP: excessive agency',
        'https://genai.owasp.org/llmrisk/llm062025-excessive-agency/',
      ],
    ],
  },
];
const order = {
  'binary-search-invariants': 2,
  'hash-maps-and-repeated-work': 4,
  'breadth-first-search': 11,
  'dynamic-programming-state': 12,
};
articles.forEach((article) => {
  if (order[article.slug]) article.order = order[article.slug];
});
articles.push(...extra, ...expanded);
const placement={
 'request-latency':[1,'Requests & traffic'],
 'indexes-and-cache-consistency':[3,'Data & storage'],
 'queues-and-idempotency':[6,'Reliability & operations'],
 'deadlines-retries-backoff':[7,'Reliability & operations'],
 'context-as-a-contract':[1,'Inputs & contracts'],
 'retrieval-and-evidence':[3,'Retrieval & knowledge'],
 'workflows-and-agents':[5,'Workflows & tools'],
 'evaluations-that-catch-failures':[7,'Evaluation & operations'],
};
articles.forEach(a=>{if(placement[a.slug]) [a.order,a.section]=placement[a.slug];});
export default articles;
export const getArticle = (slug) =>
  articles.find((article) => article.slug === slug);
