import { NextResponse } from "next/server";

// In-memory cache
let cachedData: {
  repos: unknown[];
  profile: unknown;
  timestamp: number;
} | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const GITHUB_USERNAME = "harman2212";

// Repos to hide from the Projects section (portfolio website itself)
const HIDDEN_REPOS = ["hs-dev-portfolio"];

async function fetchGitHubData() {
  // Check cache first
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData;
  }

  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  // Use token if available for higher rate limits
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const [profileRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
    fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      { headers }
    ),
  ]);

  if (!profileRes.ok || !reposRes.ok) {
    // Return hardcoded data as fallback
    const fallbackData = {
      profile: {
        login: "harman2212",
        name: "Harman | Full Stack Developer",
        company: "Freelance Full Stack Developer",
        location: "India, Punjab",
        bio: "Full Stack Developer | Next.js | AI Apps, Live Projects",
        avatar_url:
          "https://avatars.githubusercontent.com/u/133370119?v=4",
        html_url: "https://github.com/harman2212",
        hireable: true,
        public_repos: 2,
      },
      repos: [
        {
          name: "nexusai-chat",
          full_name: "harman2212/nexusai-chat",
          description:
            "AI-powered chat application built with Next.js 16, TypeScript, Prisma, and NextAuth",
          html_url: "https://github.com/harman2212/nexusai-chat",
          homepage: "https://nexusai-chat-self.vercel.app",
          language: "TypeScript",
          stargazers_count: 1,
          forks_count: 0,
          topics: [
            "aichatbot",
            "css",
            "java",
            "nextjs",
            "prisma",
            "typescript",
          ],
          created_at: "2026-04-25T07:53:17Z",
          updated_at: "2026-04-25T08:39:13Z",
        },
        {
          name: "Bank-Management-System",
          full_name: "harman2212/Bank-Management-System",
          description:
            "Desktop application built with Java, HTML, and SQLite",
          html_url: "https://github.com/harman2212/Bank-Management-System",
          homepage: null,
          language: "HTML",
          stargazers_count: 1,
          forks_count: 0,
          topics: [],
          created_at: "2026-04-18T08:40:52Z",
          updated_at: "2026-04-23T07:30:31Z",
        },
      ],
      timestamp: Date.now(),
    };

    cachedData = fallbackData;
    return fallbackData;
  }

  const profile = await profileRes.json();
  const repos = await reposRes.json();

  // Filter out the portfolio repo itself
  const filteredRepos = repos.filter(
    (repo: { name: string }) => !HIDDEN_REPOS.includes(repo.name)
  );

  const data = {
    profile,
    repos: filteredRepos,
    timestamp: Date.now(),
  };

  cachedData = data;
  return data;
}

export async function GET() {
  try {
    const data = await fetchGitHubData();
    return NextResponse.json({
      profile: data.profile,
      repos: data.repos,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
