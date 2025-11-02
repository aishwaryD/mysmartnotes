import React from 'react';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Build Intelligent Systems',
    description: 'From deep learning to agentic AI - build models and architectures that reason, plan, and act.',
  },
  {
    title: 'Automate and Deploy',
    description: 'Master MLOps and orchestration tools - train, fine-tune, and deploy AI systems and APIs.',
  },
  {
    title: 'Integrate AI Everywhere',
    description: 'Connect AI models, data, and tools to create seamless, adaptive workflows across the stack.',
  },
];

function Feature({ title, description }) {
  return (
    <div className="col col--4">
      <div className={styles.featureBox}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

