import React from 'react';
import {Redirect,useLocation} from '@docusaurus/router';
import Head from '@docusaurus/Head';
export default function LegacyChapterRedirect({to}){const {search,hash}=useLocation();return <><Head><link rel="canonical" href={`https://mysmartnotes.com${to}`}/><meta name="robots" content="noindex"/></Head><Redirect to={`${to}${search}${hash}`}/></>}
