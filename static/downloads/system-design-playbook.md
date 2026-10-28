# Design around the promise you must keep

Start with a request and a failure, rather than a shopping list of infrastructure. Build a small design, identify its weak boundaries, and make each new component earn its cost.

## Before you begin

Basic HTTP, SQL and application-development experience. You do not need a cloud account or a running cluster to work through the design exercises.

## Reading path

1. [Request latency and critical paths](https://mysmartnotes.com/system-design/request-latency) — Trace a request, separate service time from waiting, and build a latency budget you can actually investigate.
2. [Load balancing and health checks](https://mysmartnotes.com/system-design/load-balancing-and-health-checks) — Route traffic to usable capacity, distinguish readiness from liveness, and plan for the moment every target looks unhealthy.
3. [Database indexes and cache consistency](https://mysmartnotes.com/system-design/indexes-and-cache-consistency) — Design an index around a real query, read its plan, and reason through the stale-data race a cache introduces.
4. [Replication and consistency](https://mysmartnotes.com/system-design/replication-and-consistency) — Follow a write from the primary to a replica, explain a stale read, and define what failover is allowed to lose.
5. [Partitioning and hot keys](https://mysmartnotes.com/system-design/partitioning-and-hot-keys) — Split data around real access patterns, recognise a hot key, and account for the read work created by write sharding.
6. [Queues, duplicate delivery and idempotency](https://mysmartnotes.com/system-design/queues-and-idempotency) — Walk through a worker crash, a duplicate delivery, and the database boundary that makes a repeated operation safe.
7. [Timeouts, retries and exponential backoff](https://mysmartnotes.com/system-design/deadlines-retries-backoff) — Make deadlines, retry limits, idempotency and jitter work together without turning a slow dependency into a larger outage.
8. [Metrics, logs and traces](https://mysmartnotes.com/system-design/metrics-logs-and-traces) — Use each telemetry signal to answer a specific question, correlate one slow request, and keep labels and payloads under control.

## Practice habits

- Write the user-visible requirement, including latency and freshness.
- Draw the critical path and the durable state changes.
- Describe what a caller can observe after each possible crash.
- Use representative measurements; label every invented number as an assumption.

## Design a reliable document-export service

A customer asks for an export, receives a job ID and downloads the result later. Duplicate requests, worker crashes and an unavailable notification provider must have defined outcomes.

- [ ] Define an idempotency key for one intended export.
- [ ] Keep job creation and its outbox event in one transaction.
- [ ] Make repeated worker delivery safe.
- [ ] Set a deadline and bounded retry ownership for each remote operation.
- [ ] Choose progress, latency and oldest-job-age metrics.
- [ ] Document what happens when export completion succeeds but notification fails.

Write a one-page failure story for your design. Start with "the worker stopped here". If two teams would interpret the resulting state differently, the contract needs another pass.

## Desk reference

| Situation | Starting point | Question |
| --- | --- | --- |
| Slow endpoint | Trace first | Separate queueing, connection acquisition and execution. |
| Expensive read | Check the access path | Match the index to the predicate and order. |
| Duplicate message | Idempotency boundary | Commit the deduplication marker with the local effect. |
| Struggling dependency | Deadline and retry budget | Do not multiply work across independently retrying layers. |

Free learning material from MySmartNotes. About these guides: https://mysmartnotes.com/about
