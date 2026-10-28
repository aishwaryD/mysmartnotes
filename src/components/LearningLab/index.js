import React, { useState } from 'react';
import styles from './styles.module.css';
export function RequestBudget() {
  const [duration, setDuration] = useState(120);
  const [parallel, setParallel] = useState(true);
  const total =
    35 + 25 + (parallel ? Math.max(80, duration) : 80 + duration) + 20;
  return (
    <div className={styles.lab}>
      <p className="msn-eyebrow">SYSTEMS / REQUEST BUDGET</p>
      <h3>Where does the time go?</h3>
      <p>
        Change one database read. See what happens to a request with a 400 ms
        budget.
      </p>
      <label className={styles.slider}>
        Activity read <output>{duration} ms</output>
        <input
          aria-label="Activity read duration"
          type="range"
          min="20"
          max="400"
          step="20"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
        />
      </label>
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          checked={parallel}
          onChange={(e) => setParallel(e.target.checked)}
        />
        Run independent reads in parallel
      </label>
      <div className={styles.pipeline}>
        <span>
          Edge
          <br />
          <b>35 ms</b>
        </span>
        <span>
          App
          <br />
          <b>25 ms</b>
        </span>
        <span>
          Reads
          <br />
          <b>{parallel ? Math.max(80, duration) : 80 + duration} ms</b>
        </span>
        <span>
          Return
          <br />
          <b>20 ms</b>
        </span>
      </div>
      <div className={styles.result} aria-live="polite">
        <strong>
          {total} <small>ms total</small>
        </strong>
        <p>
          {total <= 400
            ? `${400 - total} ms remains in the budget.`
            : `${total - 400} ms over budget. Changing the queue size will not fix this arithmetic.`}
        </p>
      </div>
      <p className={styles.assumption}>
        Illustrative deterministic timings, with no queueing or contention.
        Project read stays at 80 ms. Parallel reads contribute their maximum;
        serial reads contribute their sum. These are observed-duration examples,
        not percentile predictions.
      </p>
    </div>
  );
}
const drafts = [
  {
    label: 'Grounded answer',
    answer:
      'You can return an unopened item within 30 days of delivery. I don’t have evidence here about who pays the return shipping. [returns-v3]',
    checks: [true, true, true],
    note: 'The answer follows the provided conditions and leaves the missing shipping policy unresolved.',
  },
  {
    label: 'Confident but wrong',
    answer:
      'You can return any item within 60 days, and we cover the shipping. [returns-v3]',
    checks: [true, false, false],
    note: 'The source exists, but it does not support 60 days, opened items, or free return shipping. A citation is not a truth guarantee.',
  },
  {
    label: 'No supporting source',
    answer:
      'Most shops accept returns for a month, so yours probably does too.',
    checks: [false, false, false],
    note: 'This uses a general guess rather than the supplied policy and leaves out the unopened-item condition.',
  },
];
export function EvidenceLab() {
  const [index, setIndex] = useState(0);
  const draft = drafts[index];
  return (
    <div className={styles.lab}>
      <p className="msn-eyebrow">AI / EVIDENCE REVIEW</p>
      <h3>Would you trust this answer?</h3>
      <p className={styles.evidence}>
        <b>Evidence · returns-v3</b>
        <br />
        Unopened items may be returned within 30 days of delivery. This passage
        does not state who pays return shipping.
      </p>
      <label className={styles.draftLabel}>
        Inspect a draft
        <select
          value={index}
          onChange={(e) => setIndex(Number(e.target.value))}>
          {drafts.map((d, i) => (
            <option key={d.label} value={i}>
              {d.label}
            </option>
          ))}
        </select>
      </label>
      <blockquote>{draft.answer}</blockquote>
      <div aria-live="polite">
        <ul className={styles.checks}>
          {[
            'Source is identified',
            'Return conditions are supported',
            'Missing information is handled honestly',
          ].map((check, i) => (
            <li key={check}>
              <span>{draft.checks[i] ? '✓' : '×'}</span>
              {check}
            </li>
          ))}
        </ul>
        <p>{draft.note}</p>
      </div>
      <p className={styles.assumption}>
        Three authored examples with annotations explaining each judgement. This
        is a reasoning exercise; it does not call a model or automatically
        verify arbitrary text.
      </p>
    </div>
  );
}
