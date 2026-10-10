import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import {useLocation} from '@docusaurus/router';
import searchIndex from '@site/src/data/searchIndex';
import paths from '@site/src/data/paths';
import styles from './index.module.css';

function useQueryValue() {
  const location = useLocation();
  return useMemo(() => new URLSearchParams(location.search).get('q') || '', [location.search]);
}

export default function SearchPage() {
  const initialQuery = useQueryValue();
  const [query, setQuery] = useState(initialQuery);

  const normalizedQuery = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!normalizedQuery) {
      return searchIndex;
    }

    return searchIndex.filter((item) => {
      const haystack = `${item.title} ${item.category} ${item.summary} ${item.keywords}`.toLowerCase();
      return normalizedQuery
        .split(/\s+/)
        .every((token) => haystack.includes(token));
    });
  }, [normalizedQuery]);

  return (
    <Layout title="Search" description="Search published topics from mysmartnotes.">
      <Head>
        <link rel="canonical" href="https://mysmartnotes.com/search" />
      </Head>
      <main className={styles.page}>
        <div className={styles.header}>
          <h1>Search topics</h1>
          <p>Find the topics you want to understand.</p>
          <form action="/search" method="get" className={styles.searchForm}>
            <input
              className={styles.searchInput}
              type="search"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by topic, pattern, or concept"
              aria-label="Search topics"
              autoComplete="off"
            />
          </form>
        </div>

        {searchIndex.length === 0 ? (
          <section className={styles.launchEmpty}>
            <h2>No articles published yet.</h2>
            <p>Browse the planned topics:</p>
            <div>
              {paths.map((path) => (
                <Link key={path.slug} to={`/${path.slug}`}>
                  <span>{path.shortTitle || path.title}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </section>
        ) : (
          <>
            <p className={styles.meta}>
              {normalizedQuery
                ? `${results.length} result${results.length === 1 ? '' : 's'} for “${query}”`
                : `${results.length} topics available`}
            </p>

            <div className={styles.results}>
              {results.length > 0 ? (
            results.map((item) => (
              <Link key={item.href} to={item.href} className={styles.resultCard}>
                <span className={styles.resultCategory}>{item.category}</span>
                <span className={styles.resultTitle}>{item.title}</span>
                <span className={styles.resultSummary}>{item.summary}</span>
              </Link>
            ))
              ) : (
                <div className={styles.empty}>No published topic matches that search.</div>
              )}
            </div>
          </>
        )}
      </main>
    </Layout>
  );
}
