import React, { useEffect, useState } from 'react';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import Link from '@docusaurus/Link';
import articles from '@site/src/data/articleIndex.json';
import { getPath } from '@site/src/data/paths';
import styles from './styles.module.css';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import ChapterNavigation from '@site/src/components/ChapterNavigation';
import ChapterResources, {interactiveChapters, projectChapters} from '@site/src/components/ChapterResources';
const savedKey = 'msn:saved';
export default function ArticleLayout({ slug, toc = [], children }) {
  const article = articles.find((item) => item.slug === slug);
  const subject = getPath(article.subject);
  const sequence = articles
    .filter((item) => item.subject === article.subject)
    .sort((a, b) => a.order - b.order);
  const index = sequence.findIndex((item) => item.slug === slug);
  const {collectAnchor}=useBrokenLinks();
  collectAnchor('checkpoint-title');
  collectAnchor('chapter-sources');
  if(interactiveChapters.includes(slug)){collectAnchor('interactive-example');collectAnchor('interactive-title');}
  if(projectChapters.includes(slug)){collectAnchor('chapter-project');collectAnchor('project-title');}
  if(index===sequence.length-1)collectAnchor('subject-reference');
  const chapterLinks=[...(interactiveChapters.includes(slug)?[['interactive-example','Interactive example']]:[]),...(projectChapters.includes(slug)?[['chapter-project','Practice project']]:[]),...(index===sequence.length-1?[['subject-reference','Quick reference']]:[]),['checkpoint-title','Check your understanding'],['chapter-sources','Sources']];
  const [saved, setSaved] = useState(false);
  const [size, setSize] = useState(18);
  const [progress, setProgress] = useState(0);
  const [selection, setSelection] = useState(null);
  const [checked, setChecked] = useState(false);
  const [linkStatus, setLinkStatus] = useState('Copy link');
  useEffect(() => {
    setSelection(null);
    setChecked(false);
    try {
      setSaved(
        JSON.parse(localStorage.getItem(savedKey) || '[]').includes(slug),
      );
      const storedSize=Number(localStorage.getItem('msn:reader-size'));
      setSize([16,18,20].includes(storedSize)?storedSize:18);
    } catch {}
  }, [slug]);
  useEffect(() => {
    let active = true;
    let restoring = true;
    let lastPercent = -1;
    let previous = null;
    try {
      previous = JSON.parse(
        localStorage.getItem(`msn:position:${slug}`) || 'null',
      );
    } catch {}
    const update = () => {
      if (restoring) return;
      const element = document.getElementById('chapter-reading');
      if (!element) return;
      const start = element.getBoundingClientRect().top + window.scrollY - 100;
      const end = start + element.offsetHeight - window.innerHeight + 150;
      const value = Math.max(
        0,
        Math.min(
          100,
          Math.round(
            ((window.scrollY - start) / Math.max(1, end - start)) * 100,
          ),
        ),
      );
      if (value === lastPercent) return;
      lastPercent = value;
      setProgress(value);
      try {
        localStorage.setItem(
          `msn:position:${slug}`,
          JSON.stringify({ progress: value }),
        );
        localStorage.setItem(
          'msn:last',
          JSON.stringify({
            slug,
            title: article.title,
            href: article.href,
            progress: value,
          }),
        );
        if (value >= 95) {
          const completed = new Set(
            JSON.parse(localStorage.getItem('msn:completed') || '[]'),
          );
          completed.add(slug);
          localStorage.setItem('msn:completed', JSON.stringify([...completed]));
        }
      } catch {}
    };
    window.addEventListener('scroll', update, { passive: true });
    Promise.resolve(document.fonts?.ready).then(() =>
      requestAnimationFrame(() => {
        if (!active) return;
        const element = document.getElementById('chapter-reading');
        if (
          new URLSearchParams(window.location.search).get('resume') === '1' &&
          element &&
          Number.isFinite(previous?.progress)
        ) {
          const start =
            element.getBoundingClientRect().top + window.scrollY - 100;
          const span = Math.max(
            1,
            element.offsetHeight - window.innerHeight + 150,
          );
          window.scrollTo({
            top: Math.max(
              0,
              start +
                (span * Math.min(100, Math.max(0, previous.progress))) / 100,
            ),
            behavior: 'instant',
          });
        }
        restoring = false;
        update();
      }),
    );
    return () => {
      active = false;
      window.removeEventListener('scroll', update);
    };
  }, [slug]);
  function toggleSave() {
    try {
      const items = new Set(JSON.parse(localStorage.getItem(savedKey) || '[]'));
      if (items.has(slug)) items.delete(slug);
      else items.add(slug);
      localStorage.setItem(savedKey, JSON.stringify([...items]));
      setSaved(items.has(slug));
    } catch {}
  }
  function changeSize(value) {
    setSize(value);
    try {
      localStorage.setItem('msn:reader-size', String(value));
    } catch {}
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(
        window.location.origin + article.href,
      );
      setLinkStatus('Link copied ✓');
    } catch {
      setLinkStatus('Copy the URL from your browser');
    }
  }
  return (
    <Layout title={article.title} description={article.summary}>
      <div
        className={styles.progress}
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />
      <main className={styles.page}>
        <div className={styles.layout}>
          <aside className={styles.sidebar}><ChapterNavigation subject={subject} slug={slug}/></aside>
          <div id="chapter-reading" className={styles.reading}>
<nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/${article.subject}`}>{subject.title}</Link>
          <span>/</span>
          <span>Chapter {String(index + 1).padStart(2, '0')}</span>
        </nav>
            <details className={styles.mobileChapters}><summary>{subject.title} · Chapters</summary><ChapterNavigation subject={subject} slug={slug}/></details>
            <header className={styles.header}>
              <p className="msn-eyebrow">
                {article.category.toUpperCase()} / {article.level.toUpperCase()}
              </p>
              <h1>{article.title}</h1>
              <p className={styles.dek}>{article.summary}</p>
              <div className={styles.meta}>
                <span>{article.minutes} MIN READ</span>
                <Link to="/about">BY MYSMARTNOTES</Link>
                <span>FREE TO READ</span>
              </div>
              <div className={styles.toolbar}>
                <button onClick={toggleSave} aria-pressed={saved}>
                  {saved ? 'Saved chapter ✓' : 'Save chapter'}
                </button>
                <button onClick={copyLink}>{linkStatus}</button>
                <fieldset>
                  <legend className={styles.srOnly}>Reading text size</legend>
                  {[16, 18, 20].map((value, i) => (
                    <button
                      key={value}
                      aria-label={`${['Compact', 'Comfortable', 'Large'][i]} reading text`}
                      aria-pressed={size === value}
                      onClick={() => changeSize(value)}
                      style={{ fontSize: 12 + i * 2 }}>
                      A
                    </button>
                  ))}
                </fieldset>
              </div>
              <div className={styles.outcome}>
                <span>BY THE END</span>
                <p>{article.outcome}</p>
              </div>
              <ChapterResources article={article} first={index===0} introduction />
            </header>
            <details className={styles.mobileToc}>
              <summary>On this page</summary>
              {toc
                .filter((item) => item.level === 2)
                .map((item) => (
                  <a key={item.id} href={`#${item.id}`}>
                    {item.value.replace(/<[^>]+>/g, '')}
                  </a>
                ))}
              {chapterLinks.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}
            </details>
            <article
              id="note-body"
              className={`${styles.body} markdown`}
              style={{ '--reading-size': `${size}px` }}>
              <MDXContent>{children}</MDXContent>
            </article>
            <ChapterResources article={article} first={index===0} last={index===sequence.length-1} />
            <section
              className={styles.checkpoint}
              aria-labelledby="checkpoint-title">
              <p className="msn-eyebrow">A QUICK CHECK</p>
              <h2 id="checkpoint-title">Does the idea hold?</h2>
              <fieldset>
                <legend>{article.quiz.question}</legend>
                {article.quiz.options.map((option, i) => (
                  <label key={option}>
                    <input
                      type="radio"
                      name={`quiz-${slug}`}
                      checked={selection === i}
                      onChange={() => {
                        setSelection(i);
                        setChecked(false);
                      }}
                    />
                    {option}
                  </label>
                ))}
              </fieldset>
              <button
                className="msn-button"
                disabled={selection === null}
                onClick={() => setChecked(true)}>
                Check my reasoning <span>↗</span>
              </button>
              {checked && (
                <div role="status" className={styles.feedback}>
                  <strong>
                    {selection === article.quiz.answer
                      ? 'That’s right.'
                      : 'Take another look.'}
                  </strong>
                  <p>{article.quiz.explanation}</p>
                </div>
              )}
            </section>
            <section id="chapter-sources" className={styles.sources}>
              <p className="msn-eyebrow">SOURCES & FURTHER READING</p>
              <p>
                References for the concepts and guarantees discussed in this chapter.
              </p>
              <p><Link to="/about">How these guides are made</Link></p>
              <ol>
                {article.sources.map(([title, url]) => (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noreferrer">
                      {title} ↗
                    </a>
                  </li>
                ))}
              </ol>
            </section>
            <nav className={styles.nextPrev} aria-label="Continue reading">
              {index > 0 ? (
                <Link to={sequence[index - 1].href}>
                  <span>← PREVIOUS CHAPTER</span>
                  <strong>{sequence[index - 1].title}</strong>
                </Link>
              ) : (
                <Link to={`/${article.subject}`}>
                  <span>← BACK TO CHAPTERS</span>
                  <strong>Introduction to {subject.title}</strong>
                </Link>
              )}
              {index < sequence.length - 1 ? (
                <Link to={sequence[index + 1].href}>
                  <span>NEXT CHAPTER →</span>
                  <strong>{sequence[index + 1].title}</strong>
                </Link>
              ) : (
                <Link to={`/${article.subject}`}>
                  <span>ALL CHAPTERS →</span>
                  <strong>Return to {subject.title}</strong>
                </Link>
              )}
            </nav>
          </div>
          <aside className={styles.toc}>
            <p>ON THIS PAGE</p>
            {toc
              .filter((item) => item.level === 2)
              .map((item) => (
                <a key={item.id} href={`#${item.id}`}>
                  {item.value.replace(/<[^>]+>/g, '')}
                </a>
              ))}
            {chapterLinks.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}
            <span>{progress}% through this chapter</span>
          </aside>
        </div>
      </main>
    </Layout>
  );
}
