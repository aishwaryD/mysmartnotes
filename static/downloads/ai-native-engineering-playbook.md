# Build an AI feature you can investigate

Treat model output as a proposal inside a larger application. Make its evidence, permissions and quality checks inspectable, so a good demo can become a dependable feature.

## Before you begin

Basic application development and JSON. The guides are provider-neutral. The exercises can be completed with authored fixtures; no paid model subscription is required.

## Reading path

1. [Context and output contracts for AI features](https://mysmartnotes.com/ai-native-engineering/context-as-a-contract) — Define the task, evidence, boundaries and output contract before spending time on clever prompt wording.
2. [Structured outputs and validation](https://mysmartnotes.com/ai-native-engineering/structured-output-validation) — Separate parseable JSON from a valid result, then check source identifiers and business rules before an answer enters your application.
3. [Retrieval, evidence and source citations](https://mysmartnotes.com/ai-native-engineering/retrieval-and-evidence) — Build an evidence path from a user’s question to an answer, including permissions, missing information and honest citations.
4. [Chunking and retrieval quality](https://mysmartnotes.com/ai-native-engineering/chunking-and-retrieval-quality) — Keep the evidence needed to answer a question together, preserve document context, and measure retrieval before changing generation.
5. [Choosing between workflows and agents](https://mysmartnotes.com/ai-native-engineering/workflows-and-agents) — Choose between a fixed flow and a model-directed loop, then bound tools, side effects and stopping conditions.
6. [Tool permissions and side effects](https://mysmartnotes.com/ai-native-engineering/tool-permissions-and-side-effects) — Treat a tool call as an untrusted request, authorise it in application code, and make repeated execution safe.
7. [Building useful AI evaluations](https://mysmartnotes.com/ai-native-engineering/evaluations-that-catch-failures) — Turn a polished demo into a repeatable evaluation with useful failure slices, grounded grading and a real release decision.
8. [AI request budgets and graceful failure](https://mysmartnotes.com/ai-native-engineering/ai-request-budgets) — Bound context, retries and tool work, then define what the user sees when the feature cannot complete within its budget.

## Practice habits

- Define the task and evidence contract before tuning phrasing.
- Separate retrieved content from instructions with authority.
- Keep tool permissions and side-effect decisions in application code.
- Inspect failures by slice, not only by an overall score.

## Design a grounded policy assistant

Given a question and a small collection of policy documents, return a concise answer with supporting source IDs, or an explicit statement that the evidence is insufficient. The assistant cannot change policies or perform account actions.

- [ ] Keep document IDs, versions, permissions and update dates.
- [ ] Retrieve evidence only from documents the user may read.
- [ ] Reject or abstain when the retrieved evidence does not answer the question.
- [ ] Validate the output structure independently of the model.
- [ ] Build evaluation cases for missing evidence, conflicting versions and injected instructions.
- [ ] Define release criteria for the critical failure slices.

Keep a small failure notebook. Save the input, permitted evidence, expected behaviour and actual result. Fix the smallest faulty boundary, then rerun the relevant cases and the release set.

## Desk reference

| Situation | Starting point | Question |
| --- | --- | --- |
| Unreliable answer | Inspect the evidence path | Was the right passage available and actually used? |
| Unnecessary autonomy | Prefer a fixed workflow | Use a loop only when adaptive exploration earns it. |
| Tool request | Enforce outside the model | Validate arguments, identity, scope and side effects. |
| Polished demo | Build a held-out evaluation | Use realistic cases and inspect the failures. |

Free learning material from MySmartNotes. About these guides: https://mysmartnotes.com/about
