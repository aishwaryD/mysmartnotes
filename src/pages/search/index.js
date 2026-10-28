import React, { useEffect, useMemo, useState } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import { useLocation, useHistory } from '@docusaurus/router';
import notes from '@site/src/data/searchIndex';
import paths from '@site/src/data/paths';
import styles from './index.module.css';
const subjects = paths.map((path) => ({
  title: path.title,
  summary: path.summary,
  category: 'Subject',
  type: 'subject',
  subject: path.slug,
  href: `/${path.slug}`,
  text: path.questions.join(' '),
}));
const catalogue = [...notes.map(note=>({...note,type:'guide'})),...subjects];
export default function SearchPage() {
  const location = useLocation();
  const history = useHistory();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const [query, setQuery] = useState(params.get('q') || '');
  const [type, setType] = useState(params.get('type') || 'all');
  const [subject, setSubject] = useState(params.get('subject') || 'all');
  const [onlySaved, setOnlySaved] = useState(params.get('saved') === '1');
  const [saved, setSaved] = useState([]);
  useEffect(() => {
    setQuery(params.get('q') || '');
    setType(params.get('type') || 'all');
    setSubject(params.get('subject') || 'all');
    setOnlySaved(params.get('saved') === '1');
  }, [params]);
  useEffect(() => {
    try {
      setSaved(JSON.parse(localStorage.getItem('msn:saved') || '[]'));
    } catch {}
  }, []);
  function sync(q, t, s, save) {
    const next = new URLSearchParams();
    if (q.trim()) next.set('q', q.trim());
    if (t !== 'all') next.set('type', t);
    if (s !== 'all') next.set('subject', s);
    if (save) next.set('saved', '1');
    history.replace({
      pathname: location.pathname,
      search: next.toString() ? `?${next}` : '',
    });
  }
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = catalogue
    .filter(
      (item) =>
        (type === 'all' || item.type === type) &&
        (subject === 'all' || item.subject === subject) &&
        (!onlySaved || saved.includes(item.slug)) &&
        tokens.every((token) => {
          const haystack =
            `${item.title} ${item.summary} ${item.category} ${item.subject} ${(item.tags || []).join(' ')} ${item.text || ''}`.toLowerCase();
          return token.length <= 2
            ? haystack.split(/[^a-z0-9]+/).includes(token)
            : haystack.includes(token);
        }),
    )
    .sort((a, b) => {
      const relevance = (item) => tokens.reduce((score, token) =>
        score + (item.title.toLowerCase().includes(token) ? 10 : 0)
          + ((item.tags || []).some(tag => tag.toLowerCase().includes(token)) ? 5 : 0)
          + (item.summary.toLowerCase().includes(token) ? 2 : 0), 0);
      return relevance(b) - relevance(a) || (a.type === 'guide' && b.type === 'guide'
        ? a.subject.localeCompare(b.subject) || a.order - b.order : 0);
    });
  function excerpt(item) {
    if (!tokens.length || !item.text) return item.summary;
    const summary =
      `${item.title} ${item.summary} ${item.category} ${item.subject} ${(item.tags || []).join(' ')}`.toLowerCase();
    if (tokens.every((t) => summary.includes(t))) return item.summary;
    const index = item.text.toLowerCase().indexOf(tokens[0]);
    return index < 0
      ? item.summary
      : `${index > 70 ? '…' : ''}${item.text.slice(Math.max(0, index - 70), index + 170)}…`;
  }
  return (
    <Layout
      title="Search the library"
      description="Search chapters across data structures and algorithms, system design and AI-native engineering.">
      <Head><meta name="robots" content="noindex,follow" /></Head>
      <main className={styles.page}>
        <Link to="/" className={styles.back}>
          ← All guides
        </Link>
        <header className={styles.header}>
          <p className="msn-eyebrow">Find a topic</p>
          <h1>
            Search chapters
          </h1>
          <p>
            Search {notes.length} chapters across DSA, System Design and AI-Native Engineering.
          </p>
          <form
            role="search"
            className={styles.searchForm}
            onSubmit={(event) => {
              event.preventDefault();
              sync(query, type, subject, onlySaved);
            }}>
            <label className={styles.srOnly} htmlFor="notebook-search">
              Search the library
            </label>
            <input
              id="notebook-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try graphs, caching, or evidence…"
              autoComplete="off"
            />
            <button type="submit" aria-label="Submit search">
              ↗
            </button>
          </form>
          <div className={styles.filters}>
            <label>
              Show
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  sync(query, e.target.value, subject, onlySaved);
                }}>
                <option value="all">Everything</option>
                <option value="guide">Chapters</option>


                <option value="subject">Subjects</option>
              </select>
            </label>
            <label>
              Subject
              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                  sync(query, type, e.target.value, onlySaved);
                }}>
                <option value="all">All subjects</option>
                {paths.map((path) => (
                  <option key={path.slug} value={path.slug}>
                    {path.title}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.savedFilter}>
              <input
                type="checkbox"
                checked={onlySaved}
                onChange={(e) => {
                  setOnlySaved(e.target.checked);
                  sync(query, type, subject, e.target.checked);
                }}
              />
              Saved chapters ({saved.length})
            </label>
          </div>
          <div className={styles.suggestions}>
            <span>TRY</span>
            {['Algorithms', 'Latency', 'Evidence', 'Dynamic programming'].map(
              (term) => (
                <button
                  type="button"
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    sync(term, type, subject, onlySaved);
                  }}>
                  {term}
                </button>
              ),
            )}
          </div>
        </header>
        <div className={styles.resultsHeader} aria-live="polite">
          <span>
            {results.length} result{results.length === 1 ? '' : 's'}
            {query.trim() ? ` for "${query}"` : ''}
          </span>
          <span></span>
        </div>
        <div>
          {results.length ? (
            results.map((item, i) => (
              <Link className={styles.result} to={item.href} key={item.href}>
                <span className={styles.number}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <span className={styles.category}>
                    {item.category}
                    {item.minutes ? ` · ${item.minutes} min read` : ''}
                  </span>
                  <h2>{item.title}</h2>
                  <p>{excerpt(item)}</p>
                </div>
                <span className={styles.arrow}>↗</span>
              </Link>
            ))
          ) : (
            <div className={styles.empty}>
              <h2>
                {onlySaved
                  ? 'Your saved shelf is waiting.'
                  : 'A question for another page.'}
              </h2>
              <p>
                {onlySaved
                  ? 'Open a chapter and use "Save chapter" to keep it here.'
                  : 'Try a broader phrase or clear the filters.'}
              </p>
              <button
                type="button"
                onClick={() => sync('', 'all', 'all', false)}>
                Browse everything ↗
              </button>
            </div>
          )}
        </div>
        <p className={styles.note}>
          Search runs in your browser. Saved chapters and reading progress stay on
          this device.
        </p>
      </main>
    </Layout>
  );
}
