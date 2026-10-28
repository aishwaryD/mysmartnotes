import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './about.module.css';

export default function About() {
  return <Layout title="About these guides" description="What MySmartNotes covers, how the guides are created, and what the examples and checks establish.">
    <main className={styles.page}>
      <Link to="/">← My Smart Notes</Link>
      <h1>About these guides</h1>
      <p>MySmartNotes is an independent collection of free guides to algorithms, system design and AI-native engineering. Each chapter takes a specific question, works through an example, and gives you a chance to check your understanding.</p>
      <h2>How the material is made</h2>
      <p>These guides were drafted with substantial AI assistance. The current material has been checked against the references linked in each chapter, reviewed for internal consistency, and tested where the examples can be exercised automatically. This is an editorial and automated check, not an independent expert certification.</p>
      <p>The explanations connect established ideas to worked scenarios. The algorithms and design patterns themselves are established techniques; presenting a JavaScript implementation does not make the underlying method a new invention. References identify the material used to check definitions, guarantees and trade-offs.</p>
      <h2>What the examples establish</h2>
      <p>Numerical traces and policy documents are teaching examples unless a source is explicitly identified. They are not measurements from a production system. Runnable DSA examples are checked against expected results and edge cases; the interactive examples use deliberately bounded models.</p>
      <p>Architecture pseudocode explains a boundary or sequence. It is not a complete deployment, security system or database migration. Check the documented assumptions and test against the platform and workload you actually use.</p>
      <h2>Coverage and limitations</h2>
      <p>The collection currently contains 12 DSA chapters, 8 system-design chapters and 8 AI-native-engineering chapters. It is a starting collection, not a claim to cover every interview question or every part of software engineering.</p>
      <p>Source documents and software behaviour can change. The linked references let you inspect the original context, while the chapter explains the assumptions needed for its particular example. Automated checks can catch many mistakes, but they do not prove that every explanation is complete or that every possible input has been tested.</p>
      <h2>Your reading data</h2>
      <p>Saved chapters and reading progress stay in this browser's local storage. Chapter-navigation state uses session storage. There is no account or cross-device synchronisation, and clearing site data removes those records.</p>
      <Link to="/dsa">Start with data structures and algorithms →</Link>
    </main>
  </Layout>;
}
