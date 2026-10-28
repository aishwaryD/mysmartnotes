import React from 'react';
import SearchWorkbench from '@site/src/components/SearchWorkbench';
import {RequestBudget,EvidenceLab} from '@site/src/components/LearningLab';
import playbooks from '@site/src/data/playbooks.mjs';
import styles from './styles.module.css';
export const interactiveChapters=['binary-search-invariants','request-latency','retrieval-and-evidence'];
export const projectChapters=['breadth-first-search','deadlines-retries-backoff','evaluations-that-catch-failures'];
export default function ChapterResources({article,first,last,introduction=false}){
 const data=playbooks[article.subject];
 if(introduction)return first?<details className={styles.notes}><summary>Getting started with this subject</summary><h3>What you’ll need</h3><p>{data.prerequisites}</p><h3>As you work through the chapters</h3><ul>{data.habits.map(h=><li key={h}>{h}</li>)}</ul></details>:null;
 return <div className={styles.resources}>
  {interactiveChapters.includes(article.slug)&&<section id="interactive-example" className={styles.experiment} aria-labelledby="interactive-title"><h2 id="interactive-title">Try this example</h2><p>Change the inputs and follow what happens. You can return to the explanation above whenever you need it.</p>{article.slug==='binary-search-invariants'?<SearchWorkbench/>:article.slug==='request-latency'?<RequestBudget/>:<EvidenceLab/>}</section>}

  {projectChapters.includes(article.slug)&&<section id="chapter-project" className={styles.project} aria-labelledby="project-title"><p className="msn-eyebrow">Apply what you’ve learned</p><h2 id="project-title">{data.project}</h2><p>{data.brief}</p><h3>Things your solution should handle</h3><ul>{data.tasks.map(t=><li key={t}>{t}</li>)}</ul><p>{data.closing}</p></section>}
  {last&&<details id="subject-reference" className={styles.notes}><summary>Quick reference for this subject</summary><div className={styles.tableWrap}><table><thead><tr><th>When you see</th><th>Consider</th><th>Remember</th></tr></thead><tbody>{data.cheats.map(row=><tr key={row[0]}>{row.map(cell=><td key={cell}>{cell}</td>)}</tr>)}</tbody></table></div><p>{data.closing}</p></details>}
 </div>
}
