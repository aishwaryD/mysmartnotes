import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import paths from '@site/src/data/paths';
import styles from './index.module.css';

const principles = [
  'Master the fundamentals.',
  'Integrate AI in daily work.',
  'Be a problem solver.',
];

function PathMark({kind}) {
  if (kind === 'systems') {
    return (
      <svg viewBox="0 0 160 72" aria-hidden="true">
        <rect x="8" y="24" width="34" height="24" />
        <rect x="63" y="12" width="34" height="24" />
        <rect x="118" y="36" width="34" height="24" />
        <path d="M42 36H63M97 30L118 42" />
      </svg>
    );
  }

  if (kind === 'algorithms') {
    return (
      <svg viewBox="0 0 160 72" aria-hidden="true">
        <circle cx="80" cy="12" r="7" />
        <circle cx="45" cy="38" r="7" />
        <circle cx="115" cy="38" r="7" />
        <circle cx="27" cy="62" r="5" />
        <circle cx="63" cy="62" r="5" />
        <circle cx="97" cy="62" r="5" />
        <circle cx="133" cy="62" r="5" />
        <path d="M80 19L45 31M80 19L115 31M45 45L27 57M45 45L63 57M115 45L97 57M115 45L133 57" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 160 72" aria-hidden="true">
      <circle cx="80" cy="36" r="17" />
      <circle cx="29" cy="36" r="7" />
      <circle cx="131" cy="36" r="7" />
      <circle cx="80" cy="7" r="5" />
      <circle cx="80" cy="65" r="5" />
      <path d="M36 36H63M97 36H124M80 12V19M80 53V60" />
    </svg>
  );
}

export default function Home() {
  return (
    <Layout
      title="Master the engineering fundamentals"
      description="Notes on system design, algorithms, and AI-native engineering.">
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="homepage-title">
          <div className={styles.cap}>
            <img src="/images/thinking-cap.png" alt="An illustrated engineer's thinking cap" />
          </div>
          <svg className={styles.rain} viewBox="0 0 520 150" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            <path d="M92 28L82 46M176 64L166 82M261 22L251 40M345 73L335 91M430 34L420 52" />
            <path className={styles.rainSoft} d="M132 99L125 112M220 105L213 118M302 54L295 67M389 110L382 123M468 78L461 91" />
          </svg>
          <h1 id="homepage-title" className={styles.thoughts}>
            {principles.map((principle) => (
              <span key={principle}>{principle}</span>
            ))}
          </h1>
        </section>

        <section className={styles.paths} aria-label="Topics">
          <div className={styles.pathGrid}>
            {paths.map((path) => (
              <Link key={path.slug} to={`/${path.slug}`} className={styles.pathCard}>
                <div className={styles.pathMeta}>
                  <span>{path.number}</span>
                  <span>Open</span>
                </div>
                <PathMark kind={path.visual} />
                <div className={styles.pathCopy}>
                  <h3>{path.shortTitle || path.title}</h3>
                  <p>{path.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
