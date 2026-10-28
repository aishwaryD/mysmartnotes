import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import articles from '@site/src/data/articleIndex.json';
import playbooks from '@site/src/data/playbooks.mjs';
import { getPath } from '@site/src/data/paths';
import styles from './styles.module.css';
export default function Playbook({ subject }) {
  const data = playbooks[subject];
  const path = getPath(subject);
  const notes = articles
    .filter((a) => a.subject === subject)
    .sort((a, b) => a.order - b.order);
  const [completed, setCompleted] = useState([]);
  useEffect(() => {
    try {
      setCompleted(JSON.parse(localStorage.getItem('msn:completed') || '[]'));
    } catch {}
  }, []);
  function toggle(slug) {
    const updated = completed.includes(slug)
      ? completed.filter((id) => id !== slug)
      : [...completed, slug];
    setCompleted(updated);
    try {
      localStorage.setItem('msn:completed', JSON.stringify(updated));
    } catch {}
  }
  const count = notes.filter((a) => completed.includes(a.slug)).length;
  return (
    <Layout title={`${path.title} playbook`} description={data.intro}>
      <main className={styles.page}>
        <Link to="/playbooks" className={styles.back}>
          ← All learning playbooks
        </Link>
        <header>
          <p className="msn-eyebrow">
            PLAYBOOK {path.number} / {path.title.toUpperCase()}
          </p>
          <h1>{data.title}</h1>
          <p>{data.intro}</p>
          <div className={styles.metadata}>
            <span>{notes.length} GUIDES</span>
            <span>FREE · SELF-PACED</span>
            <a href={`/downloads/${subject}-playbook.md`} download>
              Download the playbook ↓
            </a>
          </div>
        </header>
        <section className={styles.start}>
          <h2>Before you begin</h2>
          <p>{data.prerequisites}</p>
          <p>
            Read a guide, try its worked example, then answer the practice
            question. Use the checkboxes below to keep your place. Your progress
            stays in this browser.
          </p>
        </section>
        <section className={styles.reading}>
          <div className={styles.sectionHead}>
            <h2>Your reading path</h2>
            <span aria-live="polite">
              {count} / {notes.length} read
            </span>
          </div>
          <div className={styles.bar}>
            <span
              style={{
                width: `${notes.length ? (count / notes.length) * 100 : 0}%`,
              }}
            />
          </div>
          {notes.map((note, i) => (
            <div key={note.slug} className={styles.note}>
              <input
                type="checkbox"
                checked={completed.includes(note.slug)}
                onChange={() => toggle(note.slug)}
                aria-label={`Mark ${note.title} as read`}
              />
              <Link to={note.href}>
                <span>
                  NOTE {String(i + 1).padStart(2, '0')} · {note.minutes} MIN
                </span>
                <h3>{note.title}</h3>
                <p>{note.summary}</p>
              </Link>
              <Link to={note.href} aria-label={`Read ${note.title}`}>
                ↗
              </Link>
            </div>
          ))}
        </section>
        <section>
          <p className="msn-eyebrow">KEEP THESE HABITS</p>
          <h2>A better way to practise</h2>
          <ol className={styles.habits}>
            {data.habits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </section>
        <section className={styles.project}>
          <p className="msn-eyebrow">THE PRACTICE PROJECT</p>
          <h2>{data.project}</h2>
          <p>{data.brief}</p>
          <h3>Your acceptance criteria</h3>
          <ul>
            {data.tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ul>
          <p>{data.closing}</p>
        </section>
        <section>
          <p className="msn-eyebrow">A DESK REFERENCE</p>
          <h2>When you see this, think about that.</h2>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Situation</th>
                  <th>Useful starting point</th>
                  <th>Question to ask</th>
                </tr>
              </thead>
              <tbody>
                {data.cheats.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td key={cell}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <nav className={styles.end}>
          <Link to={`/${subject}`}>Browse the subject ↗</Link>
          <Link to="/workbench">Try the workbench ↗</Link>
        </nav>
      </main>
    </Layout>
  );
}
