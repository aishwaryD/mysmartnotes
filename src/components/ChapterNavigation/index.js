import React, {useRef,useEffect,useLayoutEffect} from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import Link from '@docusaurus/Link';
import articles from '@site/src/data/articleIndex.json';
import styles from './styles.module.css';
const railPositions=new Map();
const useClientLayoutEffect=ExecutionEnvironment.canUseDOM?useLayoutEffect:useEffect;
export default function ChapterNavigation({subject,slug=null}){
 const railRef=useRef(null);
 useClientLayoutEffect(()=>{
  const nav=railRef.current;
  const rail=nav?.closest('aside');
  if(!rail || getComputedStyle(rail).display==='none')return undefined;
  const key=`msn:chapter-rail:${subject.slug}`;
  let saved=railPositions.get(subject.slug);
  if(!saved){try{saved=JSON.parse(sessionStorage.getItem(key)||'null');}catch{}}
  if(saved?.groups){nav.querySelectorAll('details[data-rail-group]').forEach(group=>{const name=group.dataset.railGroup;if(Object.prototype.hasOwnProperty.call(saved.groups,name))group.open=saved.groups[name];});}
  const active=nav.querySelector('[aria-current="page"]');
  if(active?.closest('details'))active.closest('details').open=true;
  if(Number.isFinite(saved?.scrollTop))rail.scrollTop=saved.scrollTop;
  const remember=()=>{
   const state={scrollTop:rail.scrollTop,groups:Object.fromEntries([...nav.querySelectorAll('details[data-rail-group]')].map(group=>[group.dataset.railGroup,group.open]))};
   railPositions.set(subject.slug,state);
   try{sessionStorage.setItem(key,JSON.stringify(state));}catch{}
  };
  const revealActive=()=>{
   if(active){const item=active.getBoundingClientRect();const bounds=rail.getBoundingClientRect();if(item.bottom>bounds.bottom-12)rail.scrollTop+=item.bottom-bounds.bottom+12;else if(item.top<bounds.top+12)rail.scrollTop-=bounds.top+12-item.top;}
   remember();
  };
  // Restore only this rail; never move the document's reading position.
  revealActive();
  const frame=requestAnimationFrame(revealActive);
  rail.addEventListener('scroll',remember,{passive:true});
  nav.addEventListener('click',remember,true);
  nav.addEventListener('toggle',remember,true);
  return ()=>{cancelAnimationFrame(frame);remember();rail.removeEventListener('scroll',remember);nav.removeEventListener('click',remember,true);nav.removeEventListener('toggle',remember,true);};
 },[subject.slug,slug]);
 const chapters=articles.filter(a=>a.subject===subject.slug).sort((a,b)=>a.order-b.order);
 const groups=subject.slug==='dsa'?[['Foundations',chapters.slice(0,4)],['Data structures & techniques',chapters.slice(4,9)],['Graphs & dynamic programming',chapters.slice(9)]]:[...new Set(chapters.map(a=>a.section))].map(section=>[section,chapters.filter(a=>a.section===section)]);
 return <nav ref={railRef} aria-label={`${subject.title} chapters`} className={styles.tree}><p className={styles.title}>{subject.title}</p><details open data-rail-group="Introduction"><summary>Introduction</summary><div><Link to={`/${subject.slug}`} className={!slug?styles.active:''} aria-current={!slug?'page':undefined}>Introduction to {subject.title}</Link></div></details>{groups.map(([title,items])=><details open key={title} data-rail-group={title}><summary>{title}</summary><div>{items.map(a=><Link key={a.slug} to={a.href} className={a.slug===slug?styles.active:''} aria-current={a.slug===slug?'page':undefined}>{a.title}</Link>)}</div></details>)}</nav>
}
