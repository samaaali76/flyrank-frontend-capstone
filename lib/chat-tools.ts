import { tool } from 'ai';
import { z } from 'zod';
import { PROJECTS } from '@/lib/projects-data';

// Tool contract:
// name: getProjectInfo
// input: { projectName?: string } — omit to list all projects
// output: { found: boolean; projects: Project[] }
export const getProjectInfo = tool({
  description:
    "Look up details about Samaa's portfolio projects — name, description, tech stack, and link. Call this whenever the user asks about a specific project or wants to see what she has built.",
  inputSchema: z.object({
    projectName: z
      .string()
      .optional()
      .describe(
        'The project name or keyword to search for (e.g. "capstone", "chat"). Omit to list all projects.'
      ),
  }),
  execute: async ({ projectName }) => {
    const matches = projectName
      ? PROJECTS.filter((p) =>
          p.name.toLowerCase().includes(projectName.toLowerCase())
        )
      : PROJECTS;

    if (matches.length === 0) {
      // Throwing here produces the tool's error state on the client.
      throw new Error(`No project found matching "${projectName}".`);
    }

    return { found: true, projects: matches };
  },
});