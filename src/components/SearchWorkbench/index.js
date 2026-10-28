import React, { useMemo, useState } from 'react';
import {
  searchValues,
  traceBinarySearch,
} from '@site/src/utils/binarySearch.mjs';
import styles from './styles.module.css';

export default function SearchWorkbench() {
  const [target, setTarget] = useState(37);
  const [step, setStep] = useState(0);
  const trace = useMemo(
    () => traceBinarySearch(searchValues, target),
    [target],
  );
  const current = trace[step];
  return (
    <div className={styles.workbench} id="workbench">
      <div className={styles.topline}>
        <span>
          <i /> INTERACTIVE EXAMPLE
        </span>
        <span>EXPERIMENT 001</span>
      </div>
      <div className={styles.titleRow}>
        <div>
          <p>Halve the uncertainty.</p>
          <h2>
            Binary search, <span>in motion.</span>
          </h2>
        </div>
        <span className={styles.badge}>DSA</span>
      </div>
      <div className={styles.targetRow}>
        <label htmlFor="search-target">Find the number</label>
        <select
          id="search-target"
          value={target}
          onChange={(event) => {
            setTarget(Number(event.target.value));
            setStep(0);
          }}>
          <option value="37">37</option>
          <option value="68">68</option>
          <option value="20">20 · not in the array</option>
        </select>
      </div>
      <div
        className={styles.array}
        role="list"
        aria-label="Sorted array with zero-based indices">
        {searchValues.map((value, index) => {
          const excluded = index < current.low || index > current.high;
          const compared = index === current.mid;
          return (
            <div
              role="listitem"
              key={value}
              className={`${styles.cell} ${excluded ? styles.excluded : ''} ${compared ? styles.compared : ''} ${compared && current.found ? styles.found : ''}`}
              aria-label={`Index ${index}: ${value}${compared ? (current.found ? ', found' : ', last compared') : excluded ? ', eliminated' : ', candidate'}`}>
              <span>{value}</span>
              <small>{index}</small>
            </div>
          );
        })}
      </div>
      <div className={styles.legend}>
        <span>
          <i /> Candidate
        </span>
        <span>
          <i /> Compared
        </span>
        <span>
          <i /> Eliminated
        </span>
      </div>
      <div className={styles.explanation} aria-live="polite" aria-atomic="true">
        <span className={styles.step}>{String(step).padStart(2, '0')}</span>
        <p>{current.message}</p>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          aria-label="Previous comparison">
          ←
        </button>
        <button
          type="button"
          className={styles.next}
          onClick={() => setStep(step + 1)}
          disabled={current.done}>
          {current.done
            ? current.found
              ? 'Target found ✓'
              : 'Search complete ✓'
            : step === 0
              ? 'Compare the middle'
              : 'Next comparison'}{' '}
          <span aria-hidden="true">{!current.done && '→'}</span>
        </button>
        <button
          type="button"
          onClick={() => setStep(0)}
          disabled={step === 0}
          aria-label="Reset experiment">
          ↺
        </button>
      </div>
      <div className={styles.bottomline}>
        <span>
          {current.comparisons} COMPARISON{current.comparisons === 1 ? '' : 'S'}
        </span>
        <span>
          12 VALUES <b>·</b> O(log n)
        </span>
      </div>
    </div>
  );
}
