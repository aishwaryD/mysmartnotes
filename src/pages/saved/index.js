import React,{useEffect,useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import articles from '@site/src/data/articleIndex.json';
import paths from '@site/src/data/paths';
import styles from './styles.module.css';
export default function SavedChapters(){
 const [saved,setSaved]=useState([]);const [loaded,setLoaded]=useState(false);const [notice,setNotice]=useState('');
 useEffect(()=>{try{setSaved(JSON.parse(localStorage.getItem('msn:saved')||'[]'));}catch{}setLoaded(true);},[]);
 function remove(slug){const next=saved.filter(s=>s!==slug);try{localStorage.setItem('msn:saved',JSON.stringify(next));setSaved(next);}catch{setNotice('This browser could not update saved chapters. Check whether site storage is enabled.');}}
 const selected=articles.filter(a=>saved.includes(a.slug));
 return <Layout title="Saved chapters" description="Return to the chapters you saved in this browser."><Head><meta name="robots" content="noindex,follow"/></Head><main className={styles.page}><Link to="/" className={styles.back}>← Home</Link><h1>Saved chapters</h1><p className={styles.explanation}>Chapters you save are kept in this browser’s local storage. They stay here after you close the browser, but won’t appear on another device. Clearing this site’s data removes them.</p><p role="status">{notice}</p>{loaded&&!selected.length&&<section className={styles.empty}><h2>Your reading list starts here.</h2><p>Use <strong>Save chapter</strong> while reading. You can return to it from this page whenever you need it.</p><div>{paths.map(p=><Link key={p.slug} to={`/${p.slug}`}>{p.title} →</Link>)}</div></section>}{paths.map(p=>{const chapters=selected.filter(a=>a.subject===p.slug).sort((a,b)=>a.order-b.order);return !!chapters.length&&<section className={styles.subject} key={p.slug}><h2>{p.title}</h2>{chapters.map(a=><div className={styles.row} key={a.slug}><Link to={a.href}><h3>{a.title}</h3><p>{a.minutes} min read · {a.summary}</p></Link><button onClick={()=>remove(a.slug)} aria-label={`Remove ${a.title} from saved chapters`}>Remove</button></div>)}</section>})}</main></Layout>
}
