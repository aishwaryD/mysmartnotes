import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>© My Smart Notes</Link>
        <p>There's always more to understand.</p>
        <span>Always free to read.</span>
      </div>
    </footer>
  );
}
