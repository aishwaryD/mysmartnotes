const playbooks = {
  dsa: {
    title: 'Learn to reason about algorithms',
    intro:
      'Work from a precise question to a solution you can explain. The aim is to recognise useful structure and justify your choices, even when the problem looks unfamiliar.',
    prerequisites:
      'Comfort with variables, loops, functions and arrays in one language. The examples use JavaScript; the reasoning transfers to other languages.',
    habits: [
      'Write a tiny example and the expected answer before choosing a technique.',
      'State the invariant or meaning of the state in a sentence.',
      'Test an empty input, a repeated value, and a case where no answer exists.',
      'Count total work and additional space, then state the assumptions behind that count.',
    ],
    project: 'Build a small route finder',
    brief:
      'Represent a building as an adjacency list. Return a fewest-doorway path between two named rooms, then extend the result with a distance and an explicit no-route state.',
    tasks: [
      'Represent directed and undirected connections deliberately.',
      'Handle a start that is already the goal.',
      'Avoid enqueueing the same room twice.',
      'Test cycles, disconnected rooms and two equally short routes.',
      'Explain why weighted travel times would need a different algorithm.',
    ],
    cheats: [
      [
        'Sorted boundary',
        'Binary search',
        'Keep a monotone division and shrink the unresolved interval.',
      ],
      [
        'Repeated lookup',
        'Map or set',
        'Remember a fact instead of rescanning earlier input.',
      ],
      [
        'Fewest equal-cost steps',
        'BFS',
        'Process discoveries in nondecreasing distance.',
      ],
      [
        'Repeated subproblems',
        'Dynamic programming',
        'Give every state a meaning and a valid evaluation order.',
      ],
    ],
    closing:
      'For each guide, solve the practice variation before opening the explanation. If the code works but you cannot explain an update, stay with that example a little longer. Speed comes from understanding what can safely be ignored.',
  },
  'system-design': {
    title: 'Design around the promise you must keep',
    intro:
      'Start with a request and a failure, rather than a shopping list of infrastructure. Build a small design, identify its weak boundaries, and make each new component earn its cost.',
    prerequisites:
      'Basic HTTP, SQL and application-development experience. You do not need a cloud account or a running cluster to work through the design exercises.',
    habits: [
      'Write the user-visible requirement, including latency and freshness.',
      'Draw the critical path and the durable state changes.',
      'Describe what a caller can observe after each possible crash.',
      'Use representative measurements; label every invented number as an assumption.',
    ],
    project: 'Design a reliable document-export service',
    brief:
      'A customer asks for an export, receives a job ID and downloads the result later. Duplicate requests, worker crashes and an unavailable notification provider must have defined outcomes.',
    tasks: [
      'Define an idempotency key for one intended export.',
      'Keep job creation and its outbox event in one transaction.',
      'Make repeated worker delivery safe.',
      'Set a deadline and bounded retry ownership for each remote operation.',
      'Choose progress, latency and oldest-job-age metrics.',
      'Document what happens when export completion succeeds but notification fails.',
    ],
    cheats: [
      [
        'Slow endpoint',
        'Trace first',
        'Separate queueing, connection acquisition and execution.',
      ],
      [
        'Expensive read',
        'Check the access path',
        'Match the index to the predicate and order.',
      ],
      [
        'Duplicate message',
        'Idempotency boundary',
        'Commit the deduplication marker with the local effect.',
      ],
      [
        'Struggling dependency',
        'Deadline and retry budget',
        'Do not multiply work across independently retrying layers.',
      ],
    ],
    closing:
      'Write a one-page failure story for your design. Start with "the worker stopped here". If two teams would interpret the resulting state differently, the contract needs another pass.',
  },
  'ai-native-engineering': {
    title: 'Build an AI feature you can investigate',
    intro:
      'Treat model output as a proposal inside a larger application. Make its evidence, permissions and quality checks inspectable, so a good demo can become a dependable feature.',
    prerequisites:
      'Basic application development and JSON. The guides are provider-neutral. The exercises can be completed with authored fixtures; no paid model subscription is required.',
    habits: [
      'Define the task and evidence contract before tuning phrasing.',
      'Separate retrieved content from instructions with authority.',
      'Keep tool permissions and side-effect decisions in application code.',
      'Inspect failures by slice, not only by an overall score.',
    ],
    project: 'Design a grounded policy assistant',
    brief:
      'Given a question and a small collection of policy documents, return a concise answer with supporting source IDs, or an explicit statement that the evidence is insufficient. The assistant cannot change policies or perform account actions.',
    tasks: [
      'Keep document IDs, versions, permissions and update dates.',
      'Retrieve evidence only from documents the user may read.',
      'Reject or abstain when the retrieved evidence does not answer the question.',
      'Validate the output structure independently of the model.',
      'Build evaluation cases for missing evidence, conflicting versions and injected instructions.',
      'Define release criteria for the critical failure slices.',
    ],
    cheats: [
      [
        'Unreliable answer',
        'Inspect the evidence path',
        'Was the right passage available and actually used?',
      ],
      [
        'Unnecessary autonomy',
        'Prefer a fixed workflow',
        'Use a loop only when adaptive exploration earns it.',
      ],
      [
        'Tool request',
        'Enforce outside the model',
        'Validate arguments, identity, scope and side effects.',
      ],
      [
        'Polished demo',
        'Build a held-out evaluation',
        'Use realistic cases and inspect the failures.',
      ],
    ],
    closing:
      'Keep a small failure notebook. Save the input, permitted evidence, expected behaviour and actual result. Fix the smallest faulty boundary, then rerun the relevant cases and the release set.',
  },
};
export default playbooks;
