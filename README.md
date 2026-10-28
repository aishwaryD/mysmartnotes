# MySmartNotes

Docusaurus 3.1.1 / React 18. Local development: http://localhost:3000/. 28 chapters: 12 DSA, 8 System Design, 8 AI-native engineering. Chapter URLs follow `/<subject>/<chapter>`; `/notes/` URLs redirect with query strings and fragments preserved. Canonical content routes are included in the sitemap; legacy and browser-personal pages are excluded.

The maintained repository is `/Users/supaish/mysmartnotes`. This is the approved site version.

The homepage and navigation offer DSA, System Design and AI-Native Engineering. Search stays behind a small navigation icon. Each subject opens its Introduction directly with that item selected under an Introduction group in the left chapter tree. There is no chapter-list landing page. Explanations, exercises, answer checks and sources are inside each chapter. Binary search, request latency and retrieval chapters contain their relevant interactive examples. Projects appear in the BFS, retries and AI evaluation chapters. Prerequisites appear in the first chapter; subject reference notes appear in the last.

Legacy playbook URLs redirect into their subjects. Legacy workbench experiment URLs redirect to the matching chapter example. These resources no longer have separate navigation or search entries.

Uses a dark reading surface with a soft-blue accent: background #1b1b1d, panels #242526, text #e3e3e3, accent #70b8ff. Dark mode only. Browser storage remembers saved chapters, reading size and position.

Build: `npm run build`. Develop: `npm start -- --host 127.0.0.1 --port 3000 --no-open`. Check content: `npm run check`.

Install dependencies with `npm ci`. No deployment has been performed.

Saved chapters use browser local storage, persist across reloads, and are accessible from the dedicated header link and `/saved` page. No login or cross-device sync. Clearing site data removes saved chapters.

Publication audit: see `CONTENT_REVIEW.md`. After building, run `python3 scripts/check-publication.py` to verify public-route metadata, local links and straight quotation marks.
