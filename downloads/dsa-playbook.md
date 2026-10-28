# Learn to reason about algorithms

Work from a precise question to a solution you can explain. The aim is to recognise useful structure and justify your choices, even when the problem looks unfamiliar.

## Before you begin

Comfort with variables, loops, functions and arrays in one language. The examples use JavaScript; the reasoning transfers to other languages.

## Reading path

1. [Time complexity and cost models](https://mysmartnotes.com/dsa/complexity-and-cost-models) — Build a cost model, distinguish worst-case from amortised work, and stop treating Big O as a stopwatch.
2. [Binary search: boundaries and invariants](https://mysmartnotes.com/dsa/binary-search-invariants) — Find boundaries, handle duplicates, and understand why every discarded value can safely stay discarded.
3. [Prefix sums and range queries](https://mysmartnotes.com/dsa/arrays-prefix-sums) — Turn repeated range queries into prefix differences, and understand the update cost that comes with the shortcut.
4. [Hash maps and sliding windows](https://mysmartnotes.com/dsa/hash-maps-and-repeated-work) — Use a hash map to remember useful facts, then build a sliding window that handles repeated values correctly.
5. [Linked lists and pointer updates](https://mysmartnotes.com/dsa/linked-lists-and-ownership) — Reverse a singly linked list, trace reference changes, and separate cheap rewiring from expensive searching.
6. [Stacks, queues and processing order](https://mysmartnotes.com/dsa/stacks-queues-and-order) — Use a stack to match nested structure, compare it with a queue, and make empty-state behaviour explicit.
7. [Merge sort and stable ordering](https://mysmartnotes.com/dsa/merge-sort-and-stability) — Build a stable merge sort, account for copying, and choose tie-breaking deliberately.
8. [Recursion and backtracking](https://mysmartnotes.com/dsa/recursion-and-backtracking) — Explore subsets with backtracking, keep branch state clean, and understand why output size sets a lower bound.
9. [Binary search trees and validation](https://mysmartnotes.com/dsa/trees-and-search-order) — Search an ordered tree, validate ancestor bounds, and see why a binary tree is not automatically logarithmic.
10. [Dependencies and topological sorting](https://mysmartnotes.com/dsa/dependencies-and-topological-order) — Model dependencies, derive a topological order, and recognise when a cycle makes the requested order impossible.
11. [Breadth-first search and shortest paths](https://mysmartnotes.com/dsa/breadth-first-search) — Use a queue to find the fewest-hop route, reconstruct the path, and see exactly when BFS stops being enough.
12. [Dynamic programming: states and transitions](https://mysmartnotes.com/dsa/dynamic-programming-state) — Define a useful state, derive a recurrence, and recover an optimal solution rather than just its score.

## Practice habits

- Write a tiny example and the expected answer before choosing a technique.
- State the invariant or meaning of the state in a sentence.
- Test an empty input, a repeated value, and a case where no answer exists.
- Count total work and additional space, then state the assumptions behind that count.

## Build a small route finder

Represent a building as an adjacency list. Return a fewest-doorway path between two named rooms, then extend the result with a distance and an explicit no-route state.

- [ ] Represent directed and undirected connections deliberately.
- [ ] Handle a start that is already the goal.
- [ ] Avoid enqueueing the same room twice.
- [ ] Test cycles, disconnected rooms and two equally short routes.
- [ ] Explain why weighted travel times would need a different algorithm.

For each guide, solve the practice variation before opening the explanation. If the code works but you cannot explain an update, stay with that example a little longer. Speed comes from understanding what can safely be ignored.

## Desk reference

| Situation | Starting point | Question |
| --- | --- | --- |
| Sorted boundary | Binary search | Keep a monotone division and shrink the unresolved interval. |
| Repeated lookup | Map or set | Remember a fact instead of rescanning earlier input. |
| Fewest equal-cost steps | BFS | Process discoveries in nondecreasing distance. |
| Repeated subproblems | Dynamic programming | Give every state a meaning and a valid evaluation order. |

Free learning material from MySmartNotes. About these guides: https://mysmartnotes.com/about
