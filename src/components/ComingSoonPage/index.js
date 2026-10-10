import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function SystemVisual() {
  return (
    <svg viewBox="0 0 720 420" role="img" aria-labelledby="system-title system-desc">
      <title id="system-title">A system architecture taking shape</title>
      <desc id="system-desc">A request travels from a client through routing and replicated services into a queue and durable storage.</desc>
      <defs>
        <marker id="system-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10Z" className={styles.arrowHead} />
        </marker>
      </defs>
      <g className={styles.gridLines}>
        <path d="M42 84H678M42 210H678M42 336H678" />
        <path d="M150 52V368M360 52V368M570 52V368" />
      </g>
      <g className={styles.mutedLines}>
        <path d="M250 210C272 210 274 282 304 282" />
        <path d="M416 282C445 282 445 230 470 230" />
      </g>
      <g className={styles.activeLines} markerEnd="url(#system-arrow)">
        <path d="M142 210H174" />
        <path d="M246 210C273 210 274 138 304 138" />
        <path d="M416 138C446 138 444 190 470 190" />
        <path d="M556 210H598" />
      </g>
      <g className={styles.diagramNodes}>
        <g>
          <rect x="62" y="169" width="80" height="82" rx="4" />
          <path d="M76 188H128M76 200H114M76 224H128M76 236H105" />
        </g>
        <path d="M210 172L248 210L210 248L172 210Z" />
        <rect x="304" y="105" width="112" height="66" rx="4" />
        <rect x="304" y="249" width="112" height="66" rx="4" />
        <rect x="470" y="166" width="86" height="88" rx="43" />
        <path d="M598 178C598 166 660 166 660 178V242C660 254 598 254 598 242ZM598 178C598 190 660 190 660 178M598 210C598 222 660 222 660 210" />
      </g>
      <g className={styles.accentNodes}>
        <circle cx="490" cy="197" r="5" />
        <circle cx="513" cy="210" r="5" />
        <circle cx="536" cy="223" r="5" />
      </g>
      <g className={styles.diagramLabels}>
        <text x="102" y="276">CLIENT</text>
        <text x="210" y="274">ROUTE</text>
        <text x="360" y="143">SERVICE A</text>
        <text x="360" y="287">SERVICE B</text>
        <text x="513" y="280">QUEUE</text>
        <text x="629" y="280">DATA</text>
      </g>
      <g className={styles.diagramNotes}>
        <text x="63" y="67">ONE REQUEST</text>
        <text x="304" y="87">REPLICATE THE WORK</text>
        <text x="440" y="352">ABSORB → PROCESS → REMEMBER</text>
      </g>
    </svg>
  );
}

function AlgorithmVisual() {
  return (
    <svg viewBox="0 0 720 420" role="img" aria-labelledby="algorithm-title algorithm-desc">
      <title id="algorithm-title">A problem becoming an algorithm</title>
      <desc id="algorithm-desc">An unsorted sequence moves through comparison and partitioning into a proven ordered result.</desc>
      <defs>
        <marker id="algorithm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10Z" className={styles.arrowHead} />
        </marker>
      </defs>
      <g className={styles.gridLines}>
        <path d="M48 138H672M48 282H672" />
      </g>
      <g className={styles.arrayCells}>
        {[7, 2, 9, 4, 1, 6].map((value, index) => (
          <g key={value} transform={`translate(${64 + index * 57} 68)`}>
            <rect width="43" height="43" rx="3" />
            <text x="21.5" y="27">{value}</text>
          </g>
        ))}
      </g>
      <g className={styles.diagramNotes}>
        <text x="64" y="48">UNSORTED INPUT</text>
        <text x="505" y="92">notice the structure</text>
        <text x="505" y="248">prove the result</text>
      </g>
      <g className={styles.activeLines} markerEnd="url(#algorithm-arrow)">
        <path d="M208 140C208 171 280 163 280 188" />
        <path d="M280 232C280 259 208 250 208 280" />
      </g>
      <g className={styles.mutedLines}>
        <path d="M324 210H438" />
        <path d="M438 210L414 190M438 210L414 230" />
      </g>
      <g className={styles.accentNodes}>
        <circle cx="280" cy="210" r="43" />
      </g>
      <text className={styles.decisionLabel} x="280" y="205">COMPARE</text>
      <text className={styles.decisionLabel} x="280" y="222">+ CHOOSE</text>
      <g className={styles.outputCells}>
        {[1, 2, 4, 6, 7, 9].map((value, index) => (
          <g key={value} transform={`translate(${64 + index * 57} 309)`}>
            <rect width="43" height="43" rx="3" />
            <text x="21.5" y="27">{value}</text>
          </g>
        ))}
      </g>
      <g className={styles.diagramLabels}>
        <text x="218" y="382">ORDERED OUTPUT</text>
      </g>
      <g className={styles.complexityStamp}>
        <rect x="510" y="305" width="134" height="51" rx="3" />
        <text x="577" y="327">REASON ABOUT COST</text>
        <text x="577" y="346">TIME · SPACE</text>
      </g>
    </svg>
  );
}

function AiVisual() {
  return (
    <svg viewBox="0 0 720 420" role="img" aria-labelledby="ai-title ai-desc">
      <title id="ai-title">Human judgment working with AI</title>
      <desc id="ai-desc">An engineer supplies intent and context, AI produces a draft, and evidence must pass a human verification gate before shipping.</desc>
      <defs>
        <marker id="ai-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10Z" className={styles.arrowHead} />
        </marker>
      </defs>
      <g className={styles.gridLines}>
        <path d="M42 210H678" />
      </g>
      <g className={styles.activeLines} markerEnd="url(#ai-arrow)">
        <path d="M188 210H282" />
        <path d="M410 210H478" />
        <path d="M562 210H626" />
      </g>
      <g className={styles.mutedLines} markerEnd="url(#ai-arrow)">
        <path d="M520 252C512 337 167 342 144 270" />
        <path d="M346 165V122" />
        <path d="M346 255V298" />
      </g>
      <g className={styles.accentNodes}>
        <circle cx="126" cy="210" r="62" />
      </g>
      <g className={styles.diagramNodes}>
        <rect x="282" y="165" width="128" height="90" rx="5" />
        <path d="M520 163L567 210L520 257L473 210Z" />
        <rect x="626" y="177" width="48" height="66" rx="4" />
        <rect x="301" y="78" width="90" height="44" rx="3" />
        <rect x="301" y="298" width="90" height="44" rx="3" />
      </g>
      <g className={styles.diagramLabels}>
        <text x="126" y="205">ENGINEER</text>
        <text x="126" y="223">JUDGMENT</text>
        <text x="346" y="204">AI DRAFT</text>
        <text x="346" y="223">ENGINE</text>
        <text x="520" y="215">VERIFY</text>
        <text x="650" y="215">SHIP</text>
        <text x="346" y="105">CONTEXT</text>
        <text x="346" y="325">TOOLS</text>
      </g>
      <g className={styles.diagramNotes}>
        <text x="95" y="116">INTENT</text>
        <text x="454" y="322">REVISE WITH EVIDENCE</text>
        <text x="570" y="160">ONLY AFTER PROOF</text>
      </g>
    </svg>
  );
}

function PathVisual({kind}) {
  if (kind === 'systems') return <SystemVisual />;
  if (kind === 'algorithms') return <AlgorithmVisual />;
  return <AiVisual />;
}

export default function ComingSoonPage({path}) {
  return (
    <Layout title={`${path.title} — coming soon`} description={path.summary}>
      <main className={styles.page}>
        <section className={styles.content}>
          <div className={styles.copy}>
            <p className={styles.status}>Coming soon</p>
            <h1>{path.title}</h1>
            <p>{path.summary}</p>
            <Link to="/">← Back to topics</Link>
          </div>

          <div className={`${styles.visual} ${styles[path.visual]}`}>
            <PathVisual kind={path.visual} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
