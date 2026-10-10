const paths = [
  {
    number: '01',
    slug: 'dsa',
    title: 'Data Structures & Algorithms',
    shortTitle: 'DSA',
    summary: 'Build the habits that turn unfamiliar problems into structures, choices, and testable solutions.',
    visual: 'algorithms',
  },
  {
    number: '02',
    slug: 'system-design',
    title: 'System Design',
    summary: 'See the forces inside reliable systems—and learn to reason about the trade-offs that shape them.',
    visual: 'systems',
  },
  {
    number: '03',
    slug: 'ai-native-engineering',
    title: 'AI-Native Engineering',
    summary: 'Use AI as an engineering material and working partner—without surrendering judgment or craft.',
    visual: 'ai',
  },
];

export function getPath(slug) {
  return paths.find((path) => path.slug === slug);
}

export default paths;
