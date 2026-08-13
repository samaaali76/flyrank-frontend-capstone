// Placeholder project data. Replace with real capstone/portfolio
// projects once the Projects page (FE-03/FE-04) is populated.
export type Project = {
  slug: string;
  name: string;
  description: string;
  stack: string[];
  link?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'flyrank-capstone',
    name: 'FlyRank Frontend Capstone',
    description:
      'A Next.js portfolio site with a streaming AI chat assistant, built as part of the FlyRank frontend engineering internship.',
    stack: ['Next.js', 'TypeScript', 'AI SDK', 'Tailwind CSS'],
    link: 'https://flyrank-frontend-capstone-tau.vercel.app',
  },
  {
    slug: 'streaming-chat',
    name: 'Streaming AI Chat',
    description:
      'A real-time streaming chat interface with a thinking indicator, stop button, and markdown rendering.',
    stack: ['React', 'AI SDK', 'Google Gemini'],
  },
];