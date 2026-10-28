import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import articles from '@site/src/data/searchIndex';
import styles from './styles.module.css';
export default function SubjectPage({path}){
 const chapters=articles.filter(a=>a.subject===path.slug).sort((a,b)=>a.order-b.order);
 return <Layout title={path.title} description={path.summary}><main className={styles.page}>
 <nav className={styles.breadcrumb} aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>{path.title}</span></nav>
 <header className={styles.header}><p>{chapters.length} chapters · Free to read</p><h1>{path.title}</h1><p>{path.summary}</p><p className={styles.hint}>Read in order or choose the chapter you need. Examples, exercises and relevant projects are included in the chapters.</p><Link className="msn-button" to={chapters[0].href}>Start chapter 1 <span>→</span></Link></header>
 <section aria-labelledby="chapters-title" className={styles.chapters}><h2 id="chapters-title">Chapters</h2><ol>{chapters.map((a,i)=><li key={a.slug}><Link to={a.href}><span className={styles.number}>{String(i+1).padStart(2,'0')}</span><div><h3>{a.title}</h3><p>{a.summary}</p><small>{a.minutes} min read · {a.level}</small></div><span className={styles.arrow}>→</span></Link></li>)}</ol></section>
 </main></Layout>
}
