export default [
  {
    "slug": "load-balancing-and-health-checks",
    "subject": "system-design",
    "title": "Load balancing and health checks",
    "section": "Requests & traffic",
    "order": 2,
    "summary": "Route traffic to usable capacity, distinguish readiness from liveness, and plan for the moment every target looks unhealthy.",
    "outcome": "Design a health check that supports safe routing without turning a dependency outage into a fleet-wide restart.",
    "level": "Intermediate",
    "tags": [
      "Load balancing",
      "Readiness",
      "Health checks",
      "Graceful shutdown"
    ],
    "quiz": {
      "question": "All application instances lose access to a shared database. What should you investigate before restarting every instance?",
      "options": [
        "Whether restarting instances will clear a database-side connection limit",
        "Whether a shared dependency caused all readiness checks to fail",
        "Whether longer probe timeouts will keep every instance ready"
      ],
      "answer": 1,
      "explanation": "A shared dependency failure can affect every target at once. Restarting the application fleet may add load without fixing that dependency."
    },
    "sources": [
      [
        "AWS: target-group health checks",
        "https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html"
      ]
    ]
  },
  {
    "slug": "replication-and-consistency",
    "subject": "system-design",
    "title": "Replication and consistency",
    "section": "Data & storage",
    "order": 4,
    "summary": "Follow a write from the primary to a replica, explain a stale read, and define what failover is allowed to lose.",
    "outcome": "Separate replication lag, acknowledgement policy and failover safety when describing a data guarantee.",
    "level": "Intermediate",
    "tags": [
      "Replication",
      "Consistency",
      "Failover",
      "Read your writes"
    ],
    "quiz": {
      "question": "A write succeeds on the primary, then an immediate replica read returns the old value. What is one plausible explanation?",
      "options": [
        "The replica has not replayed that write yet",
        "The primary acknowledges only after every replica applies the write",
        "A successful primary commit guarantees an immediate read on any replica"
      ],
      "answer": 0,
      "explanation": "An asynchronous replica can lag behind an acknowledged primary write. The application must choose a read policy appropriate to its freshness requirement."
    },
    "sources": [
      [
        "PostgreSQL: standby servers and streaming replication",
        "https://www.postgresql.org/docs/current/warm-standby.html"
      ]
    ]
  },
  {
    "slug": "partitioning-and-hot-keys",
    "subject": "system-design",
    "title": "Partitioning and hot keys",
    "section": "Data & storage",
    "order": 5,
    "summary": "Split data around real access patterns, recognise a hot key, and account for the read work created by write sharding.",
    "outcome": "Explain why evenly distributed keys do not necessarily create evenly distributed traffic.",
    "level": "Intermediate",
    "tags": [
      "Partitioning",
      "Hot keys",
      "Sharding",
      "Workload skew"
    ],
    "quiz": {
      "question": "One customer generates most writes. Why might partitioning only by customer ID still bottleneck?",
      "options": [
        "Different records under one customer key must land on different partitions",
        "A single hot customer can concentrate work on one key",
        "Adding more customer IDs automatically divides the busiest existing key"
      ],
      "answer": 1,
      "explanation": "Hashing can spread different keys while leaving all requests for one popular key together. The workload distribution still matters."
    },
    "sources": [
      [
        "AWS: partition-key design",
        "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-partition-key-design.html"
      ]
    ]
  },
  {
    "slug": "metrics-logs-and-traces",
    "subject": "system-design",
    "title": "Metrics, logs and traces",
    "section": "Reliability & operations",
    "order": 8,
    "summary": "Use each telemetry signal to answer a specific question, correlate one slow request, and keep labels and payloads under control.",
    "outcome": "Build an investigation path from a latency symptom to a specific waiting boundary.",
    "level": "Intermediate",
    "tags": [
      "Observability",
      "Metrics",
      "Logs",
      "Tracing"
    ],
    "quiz": {
      "question": "Why is adding every request ID as a metric label usually a poor default?",
      "options": [
        "It prevents request IDs from also appearing in traces",
        "It combines all requests into one metric series",
        "It creates an unbounded number of distinct metric series"
      ],
      "answer": 2,
      "explanation": "Request IDs are useful for correlation, but unbounded label values can create excessive cardinality. Use a deliberate trace or log correlation path."
    },
    "sources": [
      [
        "OpenTelemetry: signals",
        "https://opentelemetry.io/docs/concepts/signals/"
      ]
    ]
  },
  {
    "slug": "structured-output-validation",
    "subject": "ai-native-engineering",
    "title": "Structured outputs and validation",
    "section": "Inputs & contracts",
    "order": 2,
    "summary": "Separate parseable JSON from a valid result, then check source identifiers and business rules before an answer enters your application.",
    "outcome": "Define structural and semantic checks for a model response without confusing either with factual truth.",
    "level": "Intermediate",
    "tags": [
      "JSON Schema",
      "Validation",
      "Structured outputs"
    ],
    "quiz": {
      "question": "A response passes its JSON schema but cites a source that was never supplied. What should happen?",
      "options": [
        "Accept it because schema validation covers evidence validity",
        "Reject it or return a controlled evidence failure",
        "Remove the unknown citation and publish the answer unchanged"
      ],
      "answer": 1,
      "explanation": "Schema validation checks shape. Source membership and evidence support are separate application checks, and an unknown citation must not be silently accepted."
    },
    "sources": [
      [
        "JSON Schema: object validation",
        "https://json-schema.org/understanding-json-schema/reference/object"
      ]
    ]
  },
  {
    "slug": "chunking-and-retrieval-quality",
    "subject": "ai-native-engineering",
    "title": "Chunking and retrieval quality",
    "section": "Retrieval & knowledge",
    "order": 4,
    "summary": "Keep the evidence needed to answer a question together, preserve document context, and measure retrieval before changing generation.",
    "outcome": "Diagnose a missing condition in an answer by inspecting the retrieved chunks and the retrieval test set.",
    "level": "Intermediate",
    "tags": [
      "Chunking",
      "Retrieval",
      "RAG",
      "Evaluation"
    ],
    "quiz": {
      "question": "A chunk contains an exception but omits the heading that limits it to one region. What is the first useful investigation?",
      "options": [
        "Check the chunk boundaries and retained document context",
        "Increase overlap without checking which heading was lost",
        "Raise the similarity threshold and assume the scope is now correct"
      ],
      "answer": 0,
      "explanation": "An isolated sentence can lose the conditions that give it meaning. Inspect the evidence representation before trying to fix the answer with prompt wording."
    },
    "sources": [
      [
        "Elastic: chunking strategies",
        "https://www.elastic.co/search-labs/blog/chunking-strategies-elasticsearch"
      ]
    ]
  },
  {
    "slug": "tool-permissions-and-side-effects",
    "subject": "ai-native-engineering",
    "title": "Tool permissions and side effects",
    "section": "Workflows & tools",
    "order": 6,
    "summary": "Treat a tool call as an untrusted request, authorise it in application code, and make repeated execution safe.",
    "outcome": "Design a narrow tool boundary that distinguishes proposed actions from permission to perform them.",
    "level": "Intermediate",
    "tags": [
      "Tool calling",
      "Authorisation",
      "Idempotency",
      "Prompt injection"
    ],
    "quiz": {
      "question": "A retrieved document tells the assistant to export every customer record. Does that instruction authorise the export?",
      "options": [
        "Yes, if the search service ranked the document as relevant",
        "Yes, if the model returns a schema-valid export request",
        "No: the application must enforce the authenticated user's scope and authority"
      ],
      "answer": 2,
      "explanation": "Retrieved text is evidence, not an authorisation grant. Tool execution must be constrained independently of what the model asks to do."
    },
    "sources": [
      [
        "OWASP: excessive agency",
        "https://genai.owasp.org/llmrisk/llm062025-excessive-agency/"
      ]
    ]
  },
  {
    "slug": "ai-request-budgets",
    "subject": "ai-native-engineering",
    "title": "AI request budgets and graceful failure",
    "section": "Evaluation & operations",
    "order": 8,
    "summary": "Bound context, retries and tool work, then define what the user sees when the feature cannot complete within its budget.",
    "outcome": "Design an AI request budget that preserves useful evidence and makes incomplete outcomes explicit.",
    "level": "Intermediate",
    "tags": [
      "Context budgets",
      "Latency",
      "Retries",
      "Graceful failure"
    ],
    "quiz": {
      "question": "A request has exhausted its tool budget without finding supporting evidence. What is a sensible outcome?",
      "options": [
        "Retry with a fresh tool counter while keeping the same user deadline",
        "Return an explicit insufficient-evidence result with a useful next step",
        "Drop the source requirement and return the most likely answer"
      ],
      "answer": 1,
      "explanation": "A budget needs an enforced stopping condition and a defined result. Unsupported confidence is not a successful recovery from missing evidence."
    },
    "sources": [
      [
        "Anthropic: effective context engineering",
        "https://www.anthropic.com/research/effective-context-engineering-for-ai-agents"
      ]
    ]
  }
];
