# AuditAI: Proactive Evidence Copilot

> An AI-native autonomous risk investigation and proactive evidence-tracking platform for high-frequency commerce audit.

## Overview

AuditAI is a React-based interactive dashboard that simulates an AI-driven audit intelligence system for high-frequency commerce. It demonstrates core concepts of autonomous risk investigation, proactive evidence tracing, and continuous pattern learning through a sleek, animated user interface.

## Major Capabilities

- **AI-Driven Investigation** — Simulated multi-agent risk signal discovery and deep-dive tracing workflows.
- **Autonomous Evidence Tracking** — Structured evidence passport generation with confidence scoring and chain-of-custody visualization.
- **Real-time Risk Orchestration** — Live risk event streaming, agent status monitoring, and human-in-the-loop decision nodes.

## Features

- **Risk Command Center (风险指挥舱)** — Real-time streaming of audit events with signal classification (Strong / Medium / Weak) and automated routing.
- **Proactive Evidence Workbench (主动追证工作台)** — Step-by-step investigation trajectory visualization, evidence passport generation, and comprehensive audit report export.
- **Risk Evolution Lab (风险进化实验室)** — Pattern mining hub for discovering new risk models, rule correlation analysis, and continuous self-learning feedback loops.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (Build tool)
- **Tailwind CSS** (Styling)
- **Motion** (Animations)
- **Lucide React** (Icons)

## Getting Started

### Prerequisites

- Node.js (>= 18)
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be served at `http://localhost:3000`.

### Build

```bash
npm run build
```

Output will be generated in the `dist/` directory.

## Deployment

This project is pre-configured for GitHub Pages deployment via Vite's `base` option.

```bash
npm run build
# Deploy the dist/ folder to GitHub Pages
```

## Environment Variables

Create a `.env.local` file in the project root if you need to configure the Gemini API key:

```env
GEMINI_API_KEY=your_key_here
```

## License

Apache-2.0
