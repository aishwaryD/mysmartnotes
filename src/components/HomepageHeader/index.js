import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

export default function HomepageHeader() {
  return (
    <header className="hero">
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.text}>
            <h1 className={styles.title}>AI Engineering, Simplified</h1>
            <p className={styles.subtitle}>
              Open-source, structured learning for building the next generation of intelligent systems.
            </p>
            <div className={styles.ctaButtons}>
              <Link className="button button--secondary button--lg custom-primary" to="/introduction-to-agentic-ai">
                Start Learning →
              </Link>
            </div>
          </div>
          <div className={styles.image}>
            <img
              src={useBaseUrl('images/hero.svg')}
              alt="AI Engineering illustration"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
