import React from 'react';
import Head from '@docusaurus/Head';
import articles from '@site/src/data/articleIndex.json';
import {Redirect,useLocation} from '@docusaurus/router';
export default function Page(){
 const {hash,search}=useLocation();
 const slug={'#binary-search':'binary-search-invariants','#request-budget':'request-latency','#evidence-review':'retrieval-and-evidence'}[hash];
 const path=slug?articles.find(a=>a.slug===slug).href:'/';
 return <><Head><meta name="robots" content="noindex,follow"/><link rel="canonical" href={`https://mysmartnotes.com${path}`}/></Head><Redirect to={`${path}${search}${slug?'#interactive-example':''}`}/></>;
}
