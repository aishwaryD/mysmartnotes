import fs from 'node:fs';
import path from 'node:path';
import articles from '../src/data/articles.mjs';
import playbooks from '../src/data/playbooks.mjs';
const root = process.cwd();
const seen = new Set();
const output = [];
for (const article of articles) {
  if (seen.has(article.slug))
    throw new Error(`Duplicate article slug: ${article.slug}`);
  seen.add(article.slug);
  const file = path.join(
    root,
    'src/content',
    article.subject,
    `${article.slug}.mdx`,
  );
  if (!fs.existsSync(file)) throw new Error(`Missing article: ${file}`);
  const body = fs.readFileSync(file, 'utf8');
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<\/?[A-Za-z][^<>\n]*>/g, ' ')
    .replace(/\{#[^}]+\}/g, ' ')
    .replace(/\[([^\[\]\n]+)\]\([^\n)]+\)/g, '$1')
    .replace(/[#*_`>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = text.split(/\s+/).length;
  output.push({
    ...article,
    href: `/${article.subject}/${article.slug}`,
    category:
      article.subject === 'dsa'
        ? 'Algorithms'
        : article.subject === 'system-design'
          ? 'System design'
          : 'AI-native engineering',
    minutes: Math.max(3, Math.ceil(words / 200)),
    words,
    text,
  });
  const page = `import React from 'react';\nimport Content, {toc} from '@site/src/content/${article.subject}/${article.slug}.mdx';\nimport ArticleLayout from '@site/src/components/ArticleLayout';\nexport default function Note(){return <ArticleLayout slug="${article.slug}" toc={toc}><Content /></ArticleLayout>;}\n`;
  const directory=path.join(root,'src/pages',article.subject);
  fs.mkdirSync(directory,{recursive:true});
  fs.writeFileSync(path.join(directory,`${article.slug}.js`),page);
  const legacyPage=`import React from 'react';\nimport LegacyChapterRedirect from '@site/src/components/LegacyChapterRedirect';\nexport default function Page(){return <LegacyChapterRedirect to="/${article.subject}/${article.slug}"/>;}\n`;
  fs.writeFileSync(path.join(root,'src/pages/notes',`${article.slug}.js`),legacyPage);
}
fs.writeFileSync(
  path.join(root, 'src/data/articleIndex.json'),
  JSON.stringify(output, null, 2) + '\n',
);
console.log(
  `Indexed ${output.length} guides, ${output.reduce((n, a) => n + a.words, 0)} words.`,
);

fs.mkdirSync(path.join(root, 'static/downloads'), { recursive: true });
for (const [subject, book] of Object.entries(playbooks)) {
  const notes = output
    .filter((a) => a.subject === subject)
    .sort((a, b) => a.order - b.order);
  const text = `# ${book.title}\n\n${book.intro}\n\n## Before you begin\n\n${book.prerequisites}\n\n## Reading path\n\n${notes.map((a, i) => `${i + 1}. [${a.title}](https://mysmartnotes.com${a.href}) — ${a.summary}`).join('\n')}\n\n## Practice habits\n\n${book.habits.map((h) => `- ${h}`).join('\n')}\n\n## ${book.project}\n\n${book.brief}\n\n${book.tasks.map((t) => `- [ ] ${t}`).join('\n')}\n\n${book.closing}\n\n## Desk reference\n\n| Situation | Starting point | Question |\n| --- | --- | --- |\n${book.cheats.map((row) => `| ${row.join(' | ')} |`).join('\n')}\n\nFree learning material from MySmartNotes. About these guides: https://mysmartnotes.com/about\n`;
  fs.writeFileSync(
    path.join(root, 'static/downloads', `${subject}-playbook.md`),
    text,
  );
}
