const paths = [
  {
    number: '01',
    slug: 'dsa',
    title: 'Data Structures & Algorithms',
    shortTitle: 'Algorithms & data structures',
    kicker: 'The shape of a problem',
    chapters: [
      'Complexity & first principles',
      'Arrays, strings & hashing',
      'Trees, graphs & traversal',
      'Patterns for solving problems',
    ],
    questions: [
      'What information can you safely discard?',
      'Which structure makes the next operation cheaper?',
      'Can you explain why your solution is correct?',
    ],
    summary:
      'Build the habits that turn unfamiliar problems into structures, choices, and testable solutions.',
    visual: 'algorithms',
  },
  {
    number: '02',
    slug: 'system-design',
    title: 'System Design',
    kicker: 'The bigger picture',
    chapters: [
      'Requests, latency & throughput',
      'Storage, indexes & caching',
      'Queues, replication & consistency',
      'Designing with trade-offs',
    ],
    questions: [
      'Where does the time actually go?',
      'What happens when one part fails?',
      'Which trade-off fits this workload?',
    ],
    summary:
      'See the forces inside reliable systems—and learn to reason about the trade-offs that shape them.',
    visual: 'systems',
  },
  {
    number: '03',
    slug: 'ai-native-engineering',
    title: 'AI-Native Engineering',
    kicker: 'Tools meet judgment',
    chapters: [
      'Context & useful instructions',
      'Models, tools & workflows',
      'Evaluation & verification',
      'Building with human judgment',
    ],
    questions: [
      'What context does the task really need?',
      'How will you know the output is useful?',
      'Where should a human make the decision?',
    ],
    summary:
      'Use AI as an engineering material and working partner—without surrendering judgment or craft.',
    visual: 'ai',
  },
];

export function getPath(slug) {
  return paths.find((path) => path.slug === slug);
}

export default paths;
