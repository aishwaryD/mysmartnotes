import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';

const subjects = [
  {slug:'dsa', title:'Data Structures & Algorithms', short:'DSA', description:'Understand the patterns behind a robust solution, from a simple search to graphs and dynamic programming.', count:12},
  {slug:'system-design', title:'System Design', short:'System Design', description:'Follow a request through a system, explore the trade-offs, and learn to design for scale and reliability.', count:8},
  {slug:'ai-native-engineering', title:'AI-Native Engineering', short:'AI-Native Engineering', description:'Build with language models, retrieval and agents. Learn how to test what they do, and when to trust them.', count:8},
];
function Diagram({kind}) {
  return <svg viewBox="0 0 320 140" fill="none" aria-hidden="true" className={styles.diagram}>
    {kind==='dsa' ? <>
      <path d="M160 26L104 68L66 111M104 68L140 111M160 26L216 68L180 111M216 68L254 111"/>
      <path className={styles.trace} d="M160 26L104 68L140 111"/>
      {[[160,26],[104,68],[216,68],[66,111],[140,111],[180,111],[254,111]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i===0?9:7} className={i===4?styles.selected:''}/>)}
    </> : kind==='system-design' ? <>
      <path d="M68 70H125M160 39V101M160 39H214M160 101H214M125 70H160"/>
      <path className={styles.trace} d="M68 70H125M160 39H214"/>
      <rect x="32" y="53" width="36" height="34" rx="3"/><rect x="125" y="53" width="35" height="34" rx="3"/>
      <rect x="214" y="22" width="49" height="34" rx="3"/><rect x="214" y="84" width="49" height="34" rx="3"/>
      <path d="M225 33H251M225 43H242M225 95H251M225 105H242"/>
    </> : <>
      <path d="M78 70H128M184 70H241M157 42V20H78V55M157 98V120H254V85"/>
      <path className={styles.trace} d="M78 70H128M184 70H241"/>
      <circle cx="62" cy="70" r="16"/><rect x="128" y="42" width="56" height="56" rx="7"/>
      <path d="M145 59H168M145 70H162M145 81H168"/><path className={styles.selected} d="M254 54L270 70L254 86L238 70Z"/>
    </>}
  </svg>;
}
export default function Home() {
  return <Layout title="Master the engineering fundamentals" description="Free guides to data structures and algorithms, system design and AI-native engineering. Explanations, code and practice together in every chapter.">
    <main className={styles.page}>
      <header className={styles.hero}>
        <p className={styles.eyebrow}>For the curious engineer</p>
        <h1>From &quot;it works&quot; to <span>&quot;I get it.&quot;</span></h1>
        <p className={styles.heroDescription}>Master the fundamentals. Build with AI. <span>Be a problem solver.</span></p>
      </header>
      <section className={styles.subjects} aria-label="Choose a subject">
        {subjects.map((s,i)=><Link key={s.slug} to={`/${s.slug}`} className={styles.subject}>
          <div className={styles.cardTop}><span>0{i+1}</span><span>{s.count} chapters</span></div>
          <Diagram kind={s.slug}/>
          <div className={styles.cardBody}><h2>{s.short}</h2><p>{s.description}</p></div>
          <div className={styles.cardFoot}><span>Start with the introduction</span><span aria-hidden="true">↗</span></div>
        </Link>)}
      </section>
    </main>
  </Layout>;
}
