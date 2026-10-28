# Publication content review

Date: 23 October 2026. Repository: `/Users/supaish/mysmartnotes`.

## Scope

Reviewed all 28 published chapter bodies, their metadata and answer checks, the three subject introductions, homepage and utility-page wording, shared reader components, and generated downloads. The corrected chapter index counts 20,294 prose words (release verification on 28 October 2026). Word count is descriptive, not a Google quality target.

## Changes

- Replaced curly double quotation marks with straight quotation marks across authored source and generated content. Removed italic emphasis from lesson prose, removed the interactive heading's italic markup, and enforced upright reading text and block quotations.
- Replaced implausible quiz distractors with relevant alternatives and cleaned up the newer chapters' search tags.
- Added worked numerical examples for replication acknowledgement versus replay, partitioning capacity and read amplification, retrieval precision/recall versus evidence completeness, and an end-to-end AI deadline.
- Replaced the blanket reviewed-date badge with a MySmartNotes byline. Added `/about` describing authorship, substantial AI assistance, test scope and limitations without invented experts or credentials.
- Clarified that standard algorithms are established methods rather than new inventions. Retained inline citations and chapter source lists.
- Marked search and remaining legacy utility routes noindex, gave legacy routes appropriate canonical targets, and added robots.txt with the production sitemap location.

## Originality screening

All 35 distinct cited URLs responded successfully and their retrieved text was compared with the relevant chapters. The final prose comparison found no exact matching runs of 12 consecutive normalised words. Code blocks and inline code were excluded from that heuristic: standard algorithm code and conventional technical terms are often necessarily similar, and no exclusive originality of those methods is claimed.

External phrase searches sampled a passage from each chapter. Search engines can relax exact queries, omit unindexed or paywalled sources, and show only excerpts. These searches and the source comparison are screening tools, not a plagiarism certificate. They do not establish independent provenance for every sentence, rule out paraphrased copying, or search all private and published material.

An internal 5-word-shingle comparison found no chapter pairs above 1% Jaccard overlap. That measures repeated wording, not conceptual novelty. Related chapters deliberately share a policy-assistant or export-service case study.

Detailed local evidence (excluded from Git): `review/source-similarity-audit.json`, `review/final-content-similarity.json`, `review/source-cache/`, and `review/publication-check.json`.

## Verification

- `npm run check`: passes the 580-case binary-search workbench suite, chapter metadata/practice checks and algorithm reference cases.
- `npm run build`: successful production build, including broken-route and declared-anchor checks.
- `python3 scripts/check-publication.py`: 69 HTML pages, 33 public sitemap URLs, 1,147 absolute local links checked; no reported issues. Public routes have one H1, unique titles/descriptions, matching production canonicals, and no accidental noindex. Utility and legacy routes are noindex.
- `git diff --check`: clean.
- Browser checks: straight quotation rendering and upright text, reader layout, source/about links, and the added worked-example presentation.

The custom domain file still names `mysmartnotes.com`. No commit, push or deployment was performed by this review. The existing GitHub workflow builds on a main-branch push. Include the new and modified source files when committing; a successful local build alone does not publish them.

## Search-quality interpretation

Google asks for accurate, useful, original added value and honest information about who created content and how it was made. It does not prescribe a preferred word count. This review improves those qualities but cannot predict indexing, rankings or a future quality assessment.

Primary guidance consulted:

- https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- https://developers.google.com/search/docs/fundamentals/using-gen-ai-content

## Chapter coverage

| Subject | Chapter | Prose words | Cited references |
| --- | --- | ---: | ---: |
| ai-native-engineering | Context and output contracts for AI features | 735 | 2 |
| ai-native-engineering | Structured outputs and validation | 590 | 1 |
| ai-native-engineering | Retrieval, evidence and source citations | 851 | 3 |
| ai-native-engineering | Chunking and retrieval quality | 843 | 1 |
| ai-native-engineering | Choosing between workflows and agents | 766 | 2 |
| ai-native-engineering | Tool permissions and side effects | 589 | 1 |
| ai-native-engineering | Building useful AI evaluations | 783 | 2 |
| ai-native-engineering | AI request budgets and graceful failure | 831 | 1 |
| dsa | Time complexity and cost models | 659 | 1 |
| dsa | Binary search: boundaries and invariants | 812 | 1 |
| dsa | Prefix sums and range queries | 639 | 1 |
| dsa | Hash maps and sliding windows | 774 | 1 |
| dsa | Linked lists and pointer updates | 663 | 1 |
| dsa | Stacks, queues and processing order | 628 | 2 |
| dsa | Merge sort and stable ordering | 628 | 1 |
| dsa | Recursion and backtracking | 651 | 1 |
| dsa | Binary search trees and validation | 593 | 2 |
| dsa | Dependencies and topological sorting | 606 | 1 |
| dsa | Breadth-first search and shortest paths | 784 | 1 |
| dsa | Dynamic programming: states and transitions | 748 | 2 |
| system-design | Request latency and critical paths | 857 | 2 |
| system-design | Load balancing and health checks | 646 | 1 |
| system-design | Database indexes and cache consistency | 774 | 3 |
| system-design | Replication and consistency | 822 | 1 |
| system-design | Partitioning and hot keys | 864 | 1 |
| system-design | Queues, duplicate delivery and idempotency | 788 | 3 |
| system-design | Timeouts, retries and exponential backoff | 752 | 2 |
| system-design | Metrics, logs and traces | 618 | 1 |

## Release verification — 28 October 2026

Fixed search-text extraction so comparison operators and bracketed examples do not swallow the surrounding prose. Full chapter bodies are unchanged. Re-ran content checks, the production build, generated-page checks and Git whitespace checks before release.
